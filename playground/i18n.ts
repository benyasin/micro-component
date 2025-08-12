import { createI18n } from 'vue-i18n'
import LocalCookie, { CookieKey } from '@/utils/request/localCookie'
import en from '../locales/js/en_US'

export const i18n = createI18n({
  locale: LocalCookie.get(CookieKey.LANG) as string,
  fallbackLocale: 'en',
  legacy: false,
  silentTranslationWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  // 内置EN，在其他语言找不到翻译时可回退至EN
  messages: {
    en
  }
})
