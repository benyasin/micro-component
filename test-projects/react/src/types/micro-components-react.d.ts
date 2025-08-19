declare module 'micro-components/react/Footer' {
  import { ComponentType } from 'react'
  
  interface FooterProps {
    theme?: string
    languages?: Array<{
      locale: string
      languageKey: string
      languageType: number
      languageName: string
    }>
    onThemeChange?: (theme: string) => void
    onLanguageChange?: (language: any) => void
    onPush?: (url: string, target: string) => void
    [key: string]: any
  }
  
  const Footer: ComponentType<FooterProps>
  export default Footer
}

declare module 'micro-components/react/Button' {
  import { ComponentType } from 'react'
  
  interface ButtonProps {
    text?: string
    color?: string
    size?: 'small' | 'medium' | 'large'
    onClick?: () => void
    [key: string]: any
  }
  
  const Button: ComponentType<ButtonProps>
  export default Button
}