import { ref, Ref } from 'vue'
import { useI18n as _useI18n, LocaleMessageValue } from 'vue-i18n'
import { defineStore } from '@/utils/store'
import { defaultLanguageList } from '@/utils/config'
import { setCurrentLocale, getLanguageKey } from '@/utils/locale'

export interface localeInfo {
  locale: string
  localeType: string
}

export const useI18n = defineStore((): {
  locale: Ref<string>;
  t: any;
  changeLocale: (lang: string) => Promise<void>;
  fetchLocaleMessage: (lang: string) => Promise<LocaleMessageValue>;
  getLocaleMessage: any;
  getPostTranslationHandler: any;
  formatLocalPath: (link: string, withCurrentOrigin?: boolean, lang?: string) => string;
  isLocaleFething: Ref<boolean>;
  getMatchLocale: (locales: string[], fallback?: string) => string;
  getPathWithoutLocale: () => string;
  getAppLang: (lang: string) => string;
} => {
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
      const cached = cacheMessages.get(lang)
      return cached instanceof Promise ? await cached : (cached as LocaleMessageValue)
    }

    const localeInfo =
      defaultLanguageList.find((item) => item.locale === lang) ||
      defaultLanguageList.find((item) => item.locale === 'en')
    let localeFiles

    // 优化构建流程，构建ssr时只需打包当前语言；在浏览器/Storybook 环境避免直接访问 process
    const isProcessLocale = typeof process !== 'undefined' && (process as any)?.locale
    if (isProcessLocale) {
      localeFiles = import.meta.glob<{ default: LocaleMessageValue }>(
        `../../locales/js/process.locale.js`
      )
    } else {
      localeFiles = import.meta.glob<{ default: LocaleMessageValue }>(`../../locales/js/*.js`)
    }

    // 兼容一些奇怪名称
    const languageKey = getLanguageKey(localeInfo)
    let filepath = Object.keys(localeFiles).find((filepath) =>
      filepath.toLowerCase().includes(`${languageKey.toLowerCase()}.js`)
    )
    
    // 如果找不到，尝试直接用locale名称查找
    if (!filepath) {
      filepath = Object.keys(localeFiles).find((filepath) =>
        filepath.toLowerCase().includes(`${lang.toLowerCase()}.js`)
      )
    }
    
    // 如果还是找不到，尝试使用locale的下划线版本
    if (!filepath && lang.includes('-')) {
      const underscoreVersion = lang.replace('-', '_')
      filepath = Object.keys(localeFiles).find((filepath) =>
        filepath.toLowerCase().includes(`${underscoreVersion.toLowerCase()}.js`)
      )
    }

    if (!filepath) {
      const error = `language ${lang} ${languageKey} not found. Available files: ${Object.keys(localeFiles).join(', ')}`
      console.error('[fetchLocaleMessage]', error)
      throw new Error(error)
    }

    isLocaleFething.value = true
    try {
      const messages = (await localeFiles[filepath]()).default
      cacheMessages.set(lang, messages)
      setLocaleMessage(lang, messages)
      return messages
    } catch (error) {
      console.error('[fetchLocaleMessage] 文件加载失败:', error)
      throw error
    } finally {
      isLocaleFething.value = false
    }
  }

  /**
   * 切换语言 - 同步runtime全局i18n实例
   */
  async function changeLocale(lang: string) {
    if (import.meta.env.SSR) {
      locale.value = lang
      setCurrentLocale(lang)
      return
    }
    
    // 浏览器端异步加载locales
    fetchingLocale.value = lang
    
    try {
      const messages = await fetchLocaleMessage(lang)

      // 同步更新runtime全局i18n实例
      const anyWindow = window as any
      if (anyWindow.MicroRuntime?.i18n) {
        const globalI18n = anyWindow.MicroRuntime.i18n
        globalI18n.global.setLocaleMessage(lang, messages)
        globalI18n.global.locale.value = lang
      } else if (anyWindow.MicroRuntime?.app?.config?.globalProperties?.$i18n) {
        const globalI18n = anyWindow.MicroRuntime.app.config.globalProperties.$i18n
        globalI18n.global.setLocaleMessage(lang, messages)
        globalI18n.global.locale.value = lang
      }
    } catch (error) {
      console.error('[useI18n] fetchLocaleMessage失败:', error)
      return
    }
    
    if (lang === fetchingLocale.value) {
      setCurrentLocale(lang)
      locale.value = lang
      fetchingLocale.value = lang
    } else {
      console.warn('[useI18n] 语言不一致，跳过设置。目标:', lang, '当前fetching:', fetchingLocale.value)
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
    return withCurrentOrigin && typeof window !== 'undefined' ? `${window.location.origin}${path}` : path
  }

  /** 获取不带语言的pathname */
  function getPathWithoutLocale() {
    const reg = new RegExp(`^\/${locale.value}|\/$`, 'g')
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
