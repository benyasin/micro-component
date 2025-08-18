import { BaseProps, ThemeEnum } from '@/types/component'
import type { Language, UserInfo } from '@/types/common'

export interface Props extends BaseProps, Config {
  webUrl?: string
}

export interface Config {
  /** 品牌名称 */
  brandName?: string
  /** 品牌标语 */
  slogan?: string
  /** 版权信息 */
  copyright?: string

  /** 项目名，如main、events、otc、cms、mix等，用来兼容多站点的一些业务逻辑区别 */
  project?: string
  /** 语言列表，不传则用默认列表 */
  languageList?: Language[]
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

  /** 公司/关于链接列表（新增第三列） */
  companyLinks?: {
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
  /** 是否启用多语言支持（覆盖 BaseProps） */
  i18nEnabled?: boolean
  /** 是否启用组件内主题切换（覆盖 BaseProps） */
  themeSwitchEnabled?: boolean
  /** 是否允许在组件内显示并使用方向切换（覆盖 BaseProps） */
  directionSwitchEnabled?: boolean
  /** 文本方向：'ltr' | 'rtl' */
  direction?: 'ltr' | 'rtl'
  /** 是否启用 SSR 模式相关处理（覆盖 BaseProps） */
  ssrEnabled?: boolean
}

export type Events = {
  push: (path: string, target?: '_blank' | '_self') => any
  themeChange: (theme: ThemeEnum) => any
  languageChange: (locale: Language) => any
}
