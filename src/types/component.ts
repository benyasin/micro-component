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
  // 是否打印logger
  logger?: boolean
  // theme?: "white" | "black";
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
