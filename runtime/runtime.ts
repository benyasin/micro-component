import { ref, markRaw, nextTick } from 'vue'
import { LocaleMessageValue } from 'vue-i18n'
import { clearElementChild, isApp, nextMacroTask, wait } from '@/utils'
import { defaultLanguageList } from '@/utils/config'
import { getLanguageKey } from '@/utils/locale'
import { i18n } from './i18n'
import { getConfig } from './config'
import { usePrefetchData } from '@/compositions/usePrefetchData'

export interface Component {
  microId?: string
  elementId: string
  type: string
  component?: any
  props?: Record<string, any>
  instance?: any
  key?: string
  container?: HTMLElement
  el?: HTMLElement
}

export interface Task {
  priority: number
  component: Component
  promise?: Promise<void>
  status: 'run' | 'wait' | 'complete'
}

export const components = ref<Component[]>([])
export const componentTasks: Task[] = []

// 调试开关与指标记录（仅本地调试启用）
const debugEnabled = () => typeof localStorage !== 'undefined' && !!localStorage.getItem('MICRO_COMPONENT:DEBUG')
const recordMetric = (kind: string, payload: Record<string, any>) => {
  if (!debugEnabled()) return
  const w = window as any
  w.__micro_metrics__ = w.__micro_metrics__ || []
  const entry = { ts: Date.now(), kind, ...payload }
  w.__micro_metrics__.push(entry)
  try {
    window.dispatchEvent(new CustomEvent('MicroRuntime:Metric', { detail: entry }))
  } catch {}
}

function waitStyle() {
  return new Promise<void>((resolve) => {
    const css = document.getElementById('MicroCSS')
    if (css) {
      resolve()
      return
    }
    window.addEventListener('MicroRuntime:cssReady', () => resolve())
  })
}

export function getComponent(params: Partial<Component>) {
  const keys = Object.keys(params)
  return components.value.find((item) => keys.every((key) => params[key] === item[key]))
}

export const createComponent = async (component: Component) => {
  const config = getConfig(component.type)

  // 简单性能打点，仅在本地调试启用
  const isDebug = typeof localStorage !== 'undefined' && localStorage.getItem('MICRO_COMPONENT:DEBUG')
  const start = isDebug ? performance.now() : 0

  // APP 不加载某些组件
  if (isApp() && !config.appShow) {
    return {
      updateProps: () => {}
    }
  }

  const isLoaded = componentTasks.some((item) => item.component.type === component.type)
  if (isLoaded) {
    try {
      const inst = await _createComponent(component)
      if (isDebug) {
        console.log(`[MicroRuntime] createComponent(end-loaded): ${component.type} ${(performance.now() - start).toFixed(1)}ms`)
      }
      return inst
    } catch (e) {
      console.error(`[MicroRuntime] create component failed (loaded): ${component.type}`, e)
      return {
        updateProps: () => {}
      }
    }
  }
  
  // 添加到任务队列 - 修复内存泄漏问题
  const abortController = new AbortController()
  const task: Task = {
    priority: config.priority,
    component,
    status: 'wait',
    promise: new Promise<void>((resolve, reject) => {
      const handleComponentLoaded = (e: CustomEvent) => {
        if (e?.detail === component.type) {
          task.status = 'complete'
          resolve()
          if (isDebug) {
            console.log(`[MicroRuntime] componentLoaded(event): ${component.type} ${(performance.now() - start).toFixed(1)}ms`)
          }
        }
      }
      window.addEventListener(`MicroRuntime:ComponentLoaded`, handleComponentLoaded, {
        signal: abortController.signal,
        once: true
      })
      const timeoutId = setTimeout(() => {
        abortController.abort()
        reject(new Error(`Component ${component.type} load timeout`))
      }, 30000)
      abortController.signal.addEventListener('abort', () => {
        clearTimeout(timeoutId)
      })
    })
  }
  componentTasks.push(task)

  // 最高优先级立即加载
  if (config.priority === 0) {
    task.status = 'run'
    try {
      const inst = await _createComponent(component)
      if (isDebug) {
        console.log(`[MicroRuntime] createComponent(end-p0): ${component.type} ${(performance.now() - start).toFixed(1)}ms`)
      }
      return inst
    } catch (e) {
      console.error(`[MicroRuntime] create component failed (p0): ${component.type}`, e)
      return {
        updateProps: () => {}
      }
    }
  }
  if (!componentTasks.length && componentTasks.every((item) => item.priority !== 0)) {
    await wait(600)
  }
  if (componentTasks.every((item) => item.status !== 'run')) {
    task.status = 'run'
    try {
      const inst = await _createComponent(component)
      if (isDebug) {
        console.log(`[MicroRuntime] createComponent(end-idle): ${component.type} ${(performance.now() - start).toFixed(1)}ms`)
      }
      return inst
    } catch (e) {
      console.error(`[MicroRuntime] create component failed (idle): ${component.type}`, e)
      return {
        updateProps: () => {}
      }
    }
  }
  const latestTask = componentTasks[componentTasks.length - 2]
  if (latestTask?.promise) {
    try {
      await latestTask.promise
    } catch (e) {
      console.warn('[MicroRuntime] previous task ended with error:', e)
    }
  }
  task.status = 'run'
  try {
    const inst = await _createComponent(component)
    if (isDebug) {
      console.log(`[MicroRuntime] createComponent(end-queued): ${component.type} ${(performance.now() - start).toFixed(1)}ms`)
    }
    return inst
  } catch (e) {
    console.error(`[MicroRuntime] create component failed (queued): ${component.type}`, e)
    return {
      updateProps: () => {}
    }
  }
}

export const _createComponent = async ({ el, elementId, microId, type, props }: Component) => {
  const config = getConfig(type)

  // APP 不加载某些组件
  if (isApp() && !config.appShow) {
    return {
      // 兼容 < 1.0 版本，等其他项目升级1.0后移除
      updateProps: () => {}
    }
  }

  // 统一并发加载 + 性能打点
  let comp: any
  const isDebug = debugEnabled()
  const t0 = isDebug ? performance.now() : 0
  const metric: Record<string, any> = { type }
  try {
    const fetchP = fetchComponent(type).then((c) => {
      if (isDebug) metric.fetchMs = +(performance.now() - t0).toFixed(1)
      return c
    })
    const prefetchP = prefetchData(type).then(() => {
      if (isDebug) metric.prefetchMs = +(performance.now() - t0).toFixed(1)
    })
    const styleP = waitStyle().then(() => {
      if (isDebug) metric.styleReadyMs = +(performance.now() - t0).toFixed(1)
    })
    ;[comp] = await Promise.all([fetchP, prefetchP, styleP])
  } catch (e) {
    console.error(`[MicroRuntime] load component failed: ${type}`, e)
    // 降级：不中断渲染，允许组件在稍后被恢复
    try {
      comp = await fetchComponent(type)
      if (isDebug && metric.fetchMs == null) metric.fetchMs = +(performance.now() - t0).toFixed(1)
    } catch (e2) {
      console.error(`[MicroRuntime] fallback load failed: ${type}`, e2)
      return {
        updateProps: () => {}
      }
    }
  }

  // 获取目标容器（优先使用传入的el）
  const element = el || document.getElementById(elementId)
  if (!element) return

  // 查找已有实例，尽量少做find操作
  const existsComp = el ? getComponent({ type }) : getComponent({ elementId })

  // 初始化 microId 和标识
  if (!microId) {
    microId =
      existsComp?.microId ||
      Math.floor(Date.now() * Math.random())
        .toString()
        .substr(4)
    element.dataset.microType = type
    element.classList.add('micro')
    if (props?.theme) {
      element.classList.add(`micro-${props.theme}`)
    }
  }
  element.dataset.microId = microId

  // 处理 KeepAlive 模拟
  if (existsComp) {
    if (config.keepAlive) {
      clearElementChild(element)
      existsComp.container = element
      await nextTick()
      await nextMacroTask()
      existsComp.el = existsComp.instance?.$el?.nextElementSibling
      if (isDebug) {
        metric.keepAliveMs = +(performance.now() - t0).toFixed(1)
        recordMetric('component-keepalive', metric)
        console.log(`[MicroRuntime] ${type} keepAlive: ${metric.keepAliveMs}ms`, metric)
      }
      return existsComp.instance
    } else {
      removeComponent(existsComp.microId)
      await nextTick()
    }
  }

  // 清理容器并推入渲染队列
  clearElementChild(element)

  const data: Component = {
    container: element,
    elementId,
    microId,
    type,
    component: markRaw(comp),
    props: props || {}
  }
  components.value.push(data)

  // 更短的等待和兜底
  await nextTick()
  await wait(0)

  const component = getComponent({ microId }) || data
  component.el = component.instance?.$el?.nextElementSibling
  if (!component.el) {
    await wait(200)
    component.el = component.instance?.$el?.nextElementSibling
  }
  if (isDebug) {
    metric.mountedMs = +(performance.now() - t0).toFixed(1)
    recordMetric('component-mounted', metric)
    console.log(`[MicroRuntime] ${type} mounted: ${metric.mountedMs}ms`, metric)
  }

  return component.instance
}

export const removeComponent = async (microId: string) => {
  const index = components.value.findIndex((item) => item.microId === microId)
  if (index === -1) return
  const removed = components.value[index]
  components.value.splice(index, 1)
  // 等待Vue完成卸载
  await nextTick()
  // 兜底清理容器
  const el = removed?.container || (removed?.elementId ? document.getElementById(removed.elementId) : undefined)
  if (el) {
    try {
      clearElementChild(el)
      el.removeAttribute('data-micro-id')
      el.removeAttribute('data-micro-type')
      // 清理标识类名
      el.classList.remove('micro')
      if (removed?.props?.theme) {
        el.classList.remove(`micro-${removed.props.theme}`)
      }
    } catch {}
  }
}

export const fetchComponent = async (type: string) => {
  // 简单组件缓存，避免重复import
  const cacheKey = `__micro_component_cache__:${type}` as const
  const w = window as any
  w.__micro_component_cache__ = w.__micro_component_cache__ || new Map<string, any>()
  const cache: Map<string, any> = w.__micro_component_cache__
  if (cache.has(type)) return cache.get(type)
  const comp = (await import(`@/components/${type}/${type}.vue`)).default
  cache.set(type, comp)
  return comp
}

/**
 * 加载语言包
 * @param locale
 * @returns
 */
// 统一由组件内useI18n进行语言包加载

/**
 * 加载组件预渲染数据
 * @param type 组件类型
 * @param locale
 * @returns
 */
export const prefetchData = async (type: string) => {
  const config = getConfig(type)
  if (config.prefetch) {
    const { setPrefetchData } = usePrefetchData()
    try {
      const data = await config.prefetch()
      setPrefetchData(type, data)
      return data
    } catch (e) {
      console.error('set prefetch data error', e)
    }
  }
}

export default {
  components,
  getComponent,
  createComponent,
  removeComponent,
  fetchComponent,
  componentTasks
}
