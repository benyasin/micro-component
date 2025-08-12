import LocalCookie, { CookieKey } from './request/localCookie'
import { defaultLanguageList } from './config'

let currentLocale = ''

export function setCurrentLocale(locale: string) {
  currentLocale = locale
}

/**
 * 获取当前语言，优先级：业务传入 -> url解析 -> cookie -> en兜底
 * @returns
 */
export function getCurrentLocale() {
  // @ts-ignore
  if (!process.client || currentLocale) {
    return currentLocale || 'en'
  }

  // 尝试从url获取语言
  for (const { locale } of defaultLanguageList) {
    // /ja/xxx、/ja/、/ja
    if (location.pathname.startsWith('/' + locale + '/') || location.pathname === '/' + locale) {
      return locale
    }
  }

  return (LocalCookie.get(CookieKey.LANG) as string) || 'en'
}

export function getCurrentlLocaleConfig(locale = getCurrentLocale()) {
  return (
    defaultLanguageList.find((item) => item.locale === locale) ||
    defaultLanguageList.find((item) => item.locale === 'en')
  )
}

export function getLanguageKey(localeInfo): string {
  return (
    {
      'en-GB': 'en_US',
      'pt-PT': 'pt_PT',
      'es-ES': 'es_ES',
      ar: 'ar_SA',
      es: 'es_AR',
      pt: 'pt_BR',
      nl: 'en_US'
    }[localeInfo.locale] || localeInfo.languageKey
  )
}
