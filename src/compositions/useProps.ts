import { ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { useI18n } from '@/compositions/useI18n'
import { BaseProps } from '@/types/component'

export function useProps<T extends BaseProps>(defaultProps?: T) {
  const instance = getCurrentInstance()
  const { proxy } = instance || {}
  const { changeLocale } = useI18n()
  const props = ref<T>(
    Object.assign(
      {
        locale: '',
        theme: 'light',
        logEvent: null
      },
      filterUndefined(defaultProps)
    ) as any
  )

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
    Object.assign(props.value, filterUndefined(options))
    
    // 统一主题：同步到 body.global-theme 上的 white/black
    // 只有当组件明确启用主题切换时才自动同步到全局
    if (options.theme && typeof document !== 'undefined') {
      // 检查当前组件是否启用了主题切换功能
      const themeSwitchEnabled = (props.value as any).themeSwitchEnabled === true
      if (themeSwitchEnabled) {
        document.body.classList.toggle('black', options.theme === 'dark')
        document.body.classList.toggle('white', options.theme === 'light')
      }
    }
  }

  watchEffect(() => updateProps(defaultProps || {}))
  watch(
    () => props.value.locale,
    (locale, oldLocale) => {
      if (locale) {
        changeLocale(locale)
      }
    },
    { immediate: true }
  )

  return {
    props,
    updateProps
  }
}
