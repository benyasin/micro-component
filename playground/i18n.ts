import { createI18n } from 'vue-i18n'
import LocalCookie, { CookieKey } from '@/utils/request/localCookie'
import en from '../locales/js/en_US'
import zh from '../locales/js/zh_CN'

export const i18n = createI18n({
  locale: LocalCookie.get(CookieKey.LANG) as string || 'zh',
  fallbackLocale: 'zh',
  legacy: false,
  silentTranslationWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  // 内置中文和英文，在其他语言找不到翻译时可回退至中文
  messages: {
    zh,
    en
  }
})
