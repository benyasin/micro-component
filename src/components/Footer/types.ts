import { BaseProps, ThemeEnum } from '@/types/component'
import { Currency, Language, UserInfo } from '@/types/common'

export interface Props extends BaseProps, Config {
  webUrl?: string
  currencyVisible?: boolean
}

export interface Config {
  /** 品牌名称 */
  brandName?: string
  /** 品牌标语 */
  slogan?: string
  /** 版权信息 */
  copyright?: string
  /** RTL 支持开关，默认关闭 */
  rtlSupport?: boolean
  /** 项目名，如main、events、otc、cms、mix等，用来兼容多站点的一些业务逻辑区别 */
  project?: string
  /** 语言列表，不传则用默认列表 */
  languageList?: Language[]
  /** 法币列表，不传则用默认列表 */
  currencyList?: Currency[]
  /** 显示的法币 */
  currency?: string
  /** 用户信息 */
  userInfo?: UserInfo

  /** 产品链接列表 */
  productLinks?: {
    title: string
    url: string
    target?: '_blank' | '_self'
  }[]

  /** 支持链接列表 */
  supportLinks?: {
    title: string
    url: string
    target?: '_blank' | '_self'
  }[]

  /** 社交媒体链接列表 */
  socialLinks?: {
    name: string
    title: string
    url: string
    icon: string
  }[]

  /** 语言配置 */
  languages?: Language[]

  /** 货币配置 */
  currencies?: Currency[]

  /** 是否显示货币选择器 */
  currencyVisible?: boolean
  /** 是否启用多语言支持 */
  i18nEnabled?: boolean
}

export type Events = {
  push: (path: string, target?: '_blank' | '_self') => any
  themeChange: (theme: ThemeEnum) => any
  languageChange: (locale: Language) => any
}
