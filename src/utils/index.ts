export * from './store'
export * from './component'
export * from './id'

// 在浏览器环境下安全判断是否为客户端
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
export const isDev = import.meta.env.DEV

export function createElement(id: string) {
  let el = document.querySelector('#' + id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    document.body.appendChild(el)
  }
  return el
}

/**
 * 清空element下面所有子元素
 */
export function clearElementChild(element: HTMLElement | null) {
  while (element?.firstChild) {
    element.removeChild(element.firstChild)
  }
}

export function isApp() {
  if (typeof window === 'undefined') return false
  if (!window) return false
  // 此条件满足安卓app
  // @ts-ignore
  if (window.control) return true
  // 此条件满足非安卓app 和 ios safari 浏览器
  // @ts-ignore
  if (!window.control && !window.webkit) return false
  // ios 执行下此方法 成功执行证明事app环境
  try {
    // @ts-ignore
    window.webkit.messageHandlers.transDomainConfig.postMessage(null)
    return true
  } catch {}

  return false
}

/**
 * 等待下一次宏任务，用来切分任务
 */
export function nextMacroTask() {
  return wait(0)
}

/**
 * 等待指定毫秒
 */
export function wait(time = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export async function waitForOnload() {
  return new Promise<void>((resolve) => {
    if (!isClient) return resolve()
    if (document.readyState === 'complete') {
      return resolve()
    }
    window.addEventListener('load', () => resolve())
  })
}

export function openPage(url: string) {
  if (!url) return
  window.open(url, '_blank')
}

/** 从对象中排除某些属性 */
export function exclude(object, ...keys: string[]) {
  if (!object) return object
  
  const data = {}
  Object.keys(object)
    .filter((key) => !keys.includes(key))
    .forEach((key) => (data[key] = object[key]))
  return data
}
