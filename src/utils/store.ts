import {
  getCurrentInstance,
  ComponentInternalInstance,
  effectScope,
  onUnmounted,
  EffectScope
} from 'vue'

type MicroStore = Record<string, { state: any; scope: EffectScope }>
const globalRoot = {}

function isRoot(vm: ComponentInternalInstance) {
  return (vm as any)?.microStore
}

function findRoot(vm: ComponentInternalInstance): ComponentInternalInstance {
  if (isRoot(vm)) return vm
  if (vm?.parent) return findRoot(vm.parent)
}

/**
 * 为根组件创建一个store作用域，该组件下所有子组件调用的defineStore都会自动挂载到此组件上，以实现store在组件作用域内的单例
 */
export function createStore() {
  const vm: any = getCurrentInstance()
  if (vm) {
    vm.microStore = vm.microStore || {}
  }
  // 组件卸载时，清除作用域下所有hook
  if (vm) {
    onUnmounted(() => {
      for (const [_, store] of Object.entries(vm.microStore as MicroStore)) {
        store?.scope?.stop?.()
      }
    })
  }
}

export function defineStore<T extends (...args) => unknown>(
  hook: T,
  options?: { global?: boolean }
): T {
  const uuid = Math.floor(Date.now() * Math.random()).toString()
  const isGlobal = !!options?.global

  return function (...args) {
    const vm = getCurrentInstance()
    let root = isGlobal ? globalRoot : (vm ? findRoot(vm) : null)

    if (!root) {
      throw new Error(
        `you must call createStore() in the root component (such as Footer.vue)`
      )
    }

    // @ts-ignore
    root.microStore = root.microStore || {}
    // @ts-ignore
    const store: MicroStore = root.microStore

    if (!store[uuid]) {
      const scope = effectScope(true)
      store[uuid] = {
        state: scope.run(() => hook(...args)),
        scope
      }
    }

    return store[uuid].state
  } as T
}
