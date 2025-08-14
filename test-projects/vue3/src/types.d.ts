// 为 micro-components 包提供类型声明
declare module 'micro-components/vue/Footer' {
  import { DefineComponent } from 'vue'
  
  interface FooterProps {
    brandName?: string
    slogan?: string
    copyright?: string
    locale?: string
    theme?: string
    currencyVisible?: boolean
    productLinks?: Array<{
      title: string
      url: string
      target?: string
    }>
    supportLinks?: Array<{
      title: string
      url: string
      target?: string
    }>
    socialLinks?: Array<{
      name: string
      title: string
      url: string
      icon?: string
    }>
    languages?: Array<{
      locale: string
      languageKey: string
      languageType: number
      languageName: string
    }>
  }

  interface FooterEvents {
    'theme-change': (theme: string) => void
    'language-change': (language: any) => void
    'push': (url: string, target: string) => void
  }

  const MicroFooter: DefineComponent<FooterProps, {}, {}, {}, {}, {}, {}, FooterEvents>
  export default MicroFooter
}