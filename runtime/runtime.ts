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

  // APP 不加载某些组件
  if (isApp() && !config.appShow) {
    return {
      // 兼容 < 1.0 版本，等其他项目升级1.0后移除
      updateProps: () => {}
    }
  }

  const isLoaded = componentTasks.some((item) => item.component.type === component.type)
  if (isLoaded) {
    return _createComponent(component)
  }
  // 添加到任务队列
  const task: Task = {
    priority: config.priority,
    component,
    status: 'wait',
    promise: new Promise<void>((resolve) => {
      window.addEventListener(`MicroRuntime:ComponentLoaded`, (e: CustomEvent) => {
        if (e?.detail === component.type) {
          task.status = 'complete'
          resolve()
        }
      })
    })
  }
  componentTasks.push(task)

  // 最高优先级立即加载
  if (config.priority === 0) {
    task.status = 'run'
    return _createComponent(component)
  }
  // 非最高优先级，且队列里没有最高优先级组件，等待一会
  if (!componentTasks.length && componentTasks.every((item) => item.priority !== 0)) {
    await wait(600)
  }
  // 队列里没有任何正在执行的任务，立即执行
  if (componentTasks.every((item) => item.status !== 'run')) {
    task.status = 'run'
    return _createComponent(component)
  }
  // 队列里有任务执行，等待队尾执行完
  const latestTask = componentTasks[componentTasks.length - 2]
  if (latestTask?.promise) {
    await latestTask.promise
  }
  task.status = 'run'
  return _createComponent(component)
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

  // 加载和渲染组件
  const [i18nMessages, comp] = await Promise.all([
    // 下载语言包
    props.locale && props.locale !== 'en' ? fetchLocale(props.locale) : Promise.resolve(null),
    // 下载组件
    fetchComponent(type),
    // 下载组件数据
    prefetchData(type),
    // 下载样式
    waitStyle()
  ])

  if (i18nMessages) {
    i18n.global.setLocaleMessage(props.locale, i18nMessages.default || {})
    i18n.global.locale.value = props.locale
  }

  const element = el || document.getElementById(elementId)
  const existsComp = el
    ? config.keepAlive
      ? getComponent({ type })
      : getComponent({ type })
    : getComponent({ elementId })

  if (!element) return

  // 低版本未传microId，在第一次创建时随机生成
  if (!microId) {
    microId =
      existsComp?.microId ||
      Math.floor(Date.now() * Math.random())
        .toString()
        .substr(4)
    element.dataset.microType = type
    element.classList.add('micro')
    if (props.theme) {
      element.classList.add(`micro-${props.theme}`)
    }
  }
  // element.classList.add('micro')
  element.dataset.microId = microId
  // element.dataset.microType = type

  if (existsComp) {
    // 暂时模拟 KeepAlive，因为 KeepAlive 在 Runtime.vue 无法生效
    if (config.keepAlive) {
      clearElementChild(element)
      existsComp.container = element
      // if (existsComp.el) {
      //   element.appendChild(existsComp.el)
      // }
      // for (const el of element.children) {
      //   if (el !== existsComp.el) {
      //     el.remove()
      //   }
      // }
      await nextTick()
      await nextMacroTask()
      existsComp.el = existsComp.instance?.$el?.nextElementSibling
      return existsComp.instance
    } else {
      removeComponent(existsComp.microId)
      await nextTick()
    }
  }

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

  await nextTick()
  await wait(0)

  // 返回 defineExpose
  const component = getComponent({ microId }) || data
  component.el = component.instance?.$el?.nextElementSibling
  if (!component.el) {
    await wait(500)
    component.el = component.instance?.$el?.nextElementSibling
  }
  return component.instance
}

export const removeComponent = async (microId: string) => {
  const index = components.value.findIndex((item) => item.microId === microId)
  components.value.splice(index, 1)
}

export const fetchComponent = async (type: string) => {
  return (await import(`@/components/${type}/${type}.vue`)).default
}

/**
 * 加载语言包
 * @param locale
 * @returns
 */
export const fetchLocale = async (locale: string) => {
  const localeFiles = import.meta.glob<{ default: LocaleMessageValue }>(`../locales/js/*.js`)
  const localeInfo = defaultLanguageList.find((item) => item.locale === locale)
  const languageKey = getLanguageKey(localeInfo)
  const filepath = Object.keys(localeFiles).find((filepath) =>
    filepath.toLowerCase().includes(`${languageKey.toLowerCase()}.js`)
  )

  return localeFiles[filepath]()
}

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
  fetchLocale,
  componentTasks
}
