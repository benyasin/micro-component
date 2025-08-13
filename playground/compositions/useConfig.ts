import { computed, ref, toRef, watchEffect, watch } from 'vue'
import { defineStore } from '@/utils'
import { getInstance } from '@/utils/request/request'
import { useLocalStorage } from '@/compositions/useLocalStorage'
import { i18n } from '../i18n'

const commonInstance = getInstance()

// 模拟埋点工具
const logEvent = {
  click: (...args) => console.log('[logEvent] click:', ...args),
  expose: (...args) => console.log('[logEvent] expose:', ...args),
  registerExposeEvent: (...args) => console.log('[logEvent] registerExposeEvent:', ...args)
}

export const useConfig = defineStore(() => {
  const { cache: config, setCache: saveConfig } = useLocalStorage('playground:config', {
    theme: 'light',
    locale: 'en',
    direction: 'ltr',
    isLogin: true
  })
  const direction = toRef(config.value, 'direction')
  const theme = toRef(config.value, 'theme')
  const locale = toRef(config.value, 'locale')
  const isLogin = toRef(config.value, 'isLogin')
  const userInfo = ref(null)

  async function fetchUserInfo() {
    try {
      const { code, data } = await commonInstance.post('/v1/user/overview/userinfo')
      if (code === '00000') {
        const { userInfo: originUserInfo } = data
        userInfo.value = {
          ...originUserInfo,
          userName: data.userName,
          _userSetting: data
        }
      }
    } catch {}
  }

  watchEffect(() => {
    document.body.classList.toggle('black', theme.value === 'dark')
    document.body.classList.toggle('white', theme.value === 'light')
    document.documentElement.setAttribute('dir', direction.value)
  })

  watchEffect(() => {
    if (isLogin.value) {
      fetchUserInfo()
    } else {
      userInfo.value = null
    }
  })

  watch([direction, theme, isLogin, locale, config], (newValues, oldValues) => {
    console.log('[useConfig] 配置变化监听器触发')
    console.log('[useConfig] 旧配置值:', oldValues)
    console.log('[useConfig] 新配置值:', newValues)
    console.log('[useConfig] 当前config.value:', config.value)
    
    saveConfig(config.value)
    
    console.log('[useConfig] 配置保存完成')
  })

  // 监听 locale 变化，同步到 i18n 实例
  watch(
    () => locale.value,
    (newLocale, oldLocale) => {
      console.log('[useConfig] locale变化监听器触发')
      console.log('[useConfig] 旧locale:', oldLocale)
      console.log('[useConfig] 新locale:', newLocale)
      console.log('[useConfig] 当前i18n.global.locale:', i18n.global.locale.value)
      
      // @ts-ignore
      i18n.global.locale.value = newLocale
      
      console.log('[useConfig] 更新后i18n.global.locale:', i18n.global.locale.value)
      console.log('[useConfig] locale同步完成')
    },
    { immediate: true }
  )

  return {
    userInfo,
    theme,
    locale,
    logEvent,
    direction,
    isLogin,
    fetchUserInfo
  }
})
