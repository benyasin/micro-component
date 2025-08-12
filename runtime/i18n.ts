import { createI18n } from 'vue-i18n'
import { getCurrentLocale } from '@/utils/locale'
import en from '../locales/js/en_US'

export const i18n = createI18n({
  locale: getCurrentLocale() as string,
  fallbackLocale: 'en',
  legacy: false,
  // 内置EN，在其他语言找不到翻译时可回退至EN
  messages: {
    en
  }
})
