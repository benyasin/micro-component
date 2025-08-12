import { reactive, watchEffect, getCurrentInstance } from 'vue'
import { BaseProps } from '@/types/component'

export function useProps<T extends BaseProps>(defaultProps?: T) {
  const { proxy } = getCurrentInstance()
  const props = reactive<T>({
    locale: '',
    theme: 'light',
    logEvent: null,
    ...filterUndefined(defaultProps)
  } as T)

  function filterUndefined(options: Partial<T> = {}) {
    const newProps: Partial<T> = {}
    // 过滤undefined
    Object.keys(options)
      .filter((key) => options[key] !== undefined)
      .forEach((key) => {
        newProps[key] = options[key]
      })
    return newProps
  }

  function updateProps(options: Partial<T> = {}) {
    Object.assign(props, filterUndefined(options))
    // 给父元素挂上theme class
    if (options.theme) {
      const parentElement = proxy?.$el?.parentElement
      if (parentElement) {
        parentElement.classList.remove('micro-light', 'micro-dark')
        parentElement.classList.add(`micro-${options.theme}`)
      }
    }
  }

  watchEffect(() => updateProps(defaultProps || {}))

  return {
    props,
    updateProps
  }
}
