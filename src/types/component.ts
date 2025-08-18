export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark'
}

export interface WebSDK {
  click(...args): void
  expose(...args): void
  registerExposeEvent(...args): void
}

export interface BaseProps {
  locale: string
  theme?: 'light' | 'dark'
  
  // 是否启用国际化（仅当为 true 时启用，默认不启用）
  i18nEnabled?: boolean
  // 是否允许在组件内显示并使用主题切换（默认不启用，由使用方手动开启）
  themeSwitchEnabled?: boolean
  // 是否启用 RTL 布局（默认不启用，由使用方手动开启）
  rtlEnabled?: boolean
  // 文本方向：'ltr' | 'rtl'（新字段，推荐使用）
  direction?: 'ltr' | 'rtl'
  // 是否启用 SSR 模式下的特殊处理（默认不启用，由使用方手动开启）
  ssrEnabled?: boolean

  // 是否打印logger
  logger?: boolean
  logEvent?: {
    click(...args): void
    expose(...args): void
    registerExposeEvent(...args): void
  }
  gtag?: (...args) => void
  twq?: (...args) => void
}

export enum UserAccountType {
  IS_FUTURES_EXPERIENCE_COUPON_ACCOUNT = 7,
  HAS_FUTURES_EXPERIENCE_COUPON_ACCOUNT = 100
}
