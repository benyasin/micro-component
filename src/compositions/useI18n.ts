import { ref, Ref } from 'vue'
import { useI18n as _useI18n, LocaleMessageValue } from 'vue-i18n'
import { defineStore } from '@/utils/store'
import { defaultLanguageList } from '@/utils/config'
import { setCurrentLocale, getLanguageKey } from '@/utils/locale'

export interface localeInfo {
  locale: string
  localeType: string
}

export const useI18n = defineStore(() => {
  const { locale, t, setLocaleMessage, getLocaleMessage, getPostTranslationHandler } = _useI18n({
    useScope: 'global'
  })
  const cacheMessages = new Map<string, LocaleMessageValue | Promise<LocaleMessageValue>>()
  const isLocaleFething = ref(false)
  const fetchingLocale = ref('')
  // const locale = ref(process.client ? '' : i18nLocale.value)

  /**
   * 远程下载多语言文件包
   */
  async function fetchLocaleMessage(lang: string) {
    if (cacheMessages.has(lang)) {
      return await cacheMessages.get[lang]
    }

    const localeInfo =
      defaultLanguageList.find((item) => item.locale === lang) ||
      defaultLanguageList.find((item) => item.locale === 'en')
    let localeFiles

    // 优化构建流程，构建ssr时只需打包当前语言
    //@ts-ignore
    if (process.locale) {
      localeFiles = import.meta.glob<{ default: LocaleMessageValue }>(
        `../../locales/js/process.locale.js`
      )
    } else {
      localeFiles = import.meta.glob<{ default: LocaleMessageValue }>(`../../locales/js/*.js`)
    }

    // 兼容一些奇怪名称
    const languageKey = getLanguageKey(localeInfo)
    const filepath = Object.keys(localeFiles).find((filepath) =>
      filepath.toLowerCase().includes(`${languageKey.toLowerCase()}.js`)
    )

    if (!filepath) {
      throw new Error(`language ${locale} ${languageKey} not found`)
    }

    isLocaleFething.value = true
    try {
      const messages = (await localeFiles[filepath]()).default
      cacheMessages.set(lang, messages)
      setLocaleMessage(lang, messages)
      return messages
    } finally {
      isLocaleFething.value = false
    }
  }

  /**
   * 切换语言
   */
  async function changeLocale(lang: string) {
    if (import.meta.env.SSR) {
      locale.value = lang
      setCurrentLocale(lang)
      return
    }
    // 浏览器端异步加载locales
    fetchingLocale.value = lang
    await fetchLocaleMessage(lang)
    // 避免快速切换语言时，有可能上一个语言比下一个语言加载慢的情况
    if (lang === fetchingLocale.value) {
      setCurrentLocale(lang)
      locale.value = lang
      fetchingLocale.value = lang
    }
  }

  /**
   * 如果当前语言匹配locales，则返回当前语言，否则返回默认语言
   * @param locales
   * @param fallback
   */
  function getMatchLocale(locales: string[], fallback = 'en') {
    return locales.includes(locale.value as string) ? locale.value : fallback
  }

  /**
   * 将路径格式化成带语言的路径
   * @param link
   * @param withCurrentOrigin 是否拼接当前location.origin
   * @param lang 语言，默认为locale.value
   */
  function formatLocalPath(link: string, withCurrentOrigin = false, lang = locale.value) {
    // 跳过http开头的路径
    if (link.startsWith('http://') || link.startsWith('https://')) return link

    // 兼容开头带不带/的情况
    link = link.startsWith('/') ? link : `/${link}`

    // 跳过已经带locale的路径
    if (!link.startsWith(`/${lang}`)) {
      link = `/${lang}${link}`
    }

    // en不拼接语言到url上
    const path = lang === 'en' ? link.replace('/en', '') : link
    return withCurrentOrigin && process.client ? `${window.location.origin}${path}` : path
  }

  /** 获取不带语言的pathname */
  function getPathWithoutLocale() {
    const reg = new RegExp(`^\/${locale.value}|\/$/g`)
    return location.pathname.replace(reg, '')
  }

  /**
   * 获取app下的语言参数
   * @param locales
   */
  function getAppLang(lang: string) {
    return defaultLanguageList.find((item) => item.locale === lang)?.languageKey || 'en_US'
  }

  return {
    locale: locale as unknown as Ref<string>,
    t,
    changeLocale,
    fetchLocaleMessage,
    getLocaleMessage,
    getPostTranslationHandler,
    formatLocalPath,
    isLocaleFething,
    getMatchLocale,
    getPathWithoutLocale,
    getAppLang
  }
})
