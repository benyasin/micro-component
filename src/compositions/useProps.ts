import { ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { useI18n } from '@/compositions/useI18n'
import { BaseProps } from '@/types/component'

export function useProps<T extends BaseProps>(defaultProps?: T) {
  const { proxy } = getCurrentInstance()
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
    console.log('[useProps] updateProps调用')
    console.log('[useProps] 当前props.value:', JSON.stringify(props.value, null, 2))
    console.log('[useProps] 传入的options:', JSON.stringify(options, null, 2))
    console.log('[useProps] 过滤后的options:', JSON.stringify(filterUndefined(options), null, 2))
    
    Object.assign(props.value, filterUndefined(options))
    
    console.log('[useProps] 更新后的props.value:', JSON.stringify(props.value, null, 2))
    
    // 统一主题：同步到 body.global-theme 上的 white/black
    if (options.theme && typeof document !== 'undefined') {
      console.log('[useProps] 更新主题到document.body')
      console.log('[useProps] 新主题:', options.theme)
      console.log('[useProps] 更新前body.className:', document.body.className)
      
      document.body.classList.toggle('black', options.theme === 'dark')
      document.body.classList.toggle('white', options.theme === 'light')
      
      console.log('[useProps] 更新后body.className:', document.body.className)
    }
    
    console.log('[useProps] updateProps完成')
  }

  watchEffect(() => updateProps(defaultProps || {}))
  watch(
    () => props.value.locale,
    (locale, oldLocale) => {
      console.log('[useProps] locale变化监听器触发')
      console.log('[useProps] 旧locale:', oldLocale)
      console.log('[useProps] 新locale:', locale)
      
      if (locale) {
        console.log('[useProps] 调用changeLocale:', locale)
        changeLocale(locale)
        console.log('[useProps] changeLocale调用完成')
      }
    },
    { immediate: true }
  )

  return {
    props,
    updateProps
  }
}
