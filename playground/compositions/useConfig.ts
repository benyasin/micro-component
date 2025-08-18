import { computed, ref, toRef, watchEffect, watch } from 'vue'
import { defineStore } from '@/utils'
import { getInstance } from '@/utils/request/request'
import { useLocalStorage } from '@/compositions/useLocalStorage'
import { i18n } from '../i18n'

const commonInstance = getInstance()

// 模拟埋点工具
const logEvent = {
  click: (...args) => console.log('[logEvent] click:', args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)),
  expose: (...args) => console.log('[logEvent] expose:', args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)),
  registerExposeEvent: (...args) => console.log('[logEvent] registerExposeEvent:', args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg))
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
    saveConfig(config.value)
  })

  // 监听 locale 变化，同步到 i18n 实例
  watch(
    () => locale.value,
    (newLocale, oldLocale) => {
      // @ts-ignore
      i18n.global.locale.value = newLocale
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
