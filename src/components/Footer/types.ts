import { BaseProps, Currency, Language, ThemeEnum, UserInfo } from '@/types/component'

export interface Props extends BaseProps, Config {
  webUrl?: string
  currencyVisible?: boolean
}

export interface Config {
  describe?: string
  copyright?: string
  builderAds?: boolean

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
  /** 主站临时属性，telegram相关配置 */
  telegram?: {
    title: string
    change: string
    status: Record<string, string>
  }

  list?: {
    show: boolean
    title: string
    topOffset?: string
    bottomOffset?: string
    row: number
    list?: {
      prefixTitle?: string
      title: string
      url: string
      isTarget: boolean
      isShow: boolean
      rel?: string
      newRel?: string
      type?: string
      content?: string
    }[]
  }[]

  community?: {
    list?: {
      title: string
      contact: string
      link: string
    }[]
    iconLinkList?: {
      name: string
      title: string
      url: string
      img: string
      telegramList?: {
        mainKeyName: string
        link: string
      }[]
    }[]
  }
}

export type Events = {
  push: (path: string, target?: '_blank' | '_self') => any
  themeChange: (theme: ThemeEnum) => any
  languageChange: (locale: Language) => any
  currencyChange: (currency: Currency) => any
}
