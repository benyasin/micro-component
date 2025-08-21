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
    type?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    onClick?: (event: MouseEvent) => void
    [key: string]: any
  }
  
  const Button: ComponentType<ButtonProps>
  export default Button
}

// 新增：React ProTable 类型声明，解决测试项目导入时报错
declare module 'micro-components/react/ProTable' {
  import { ComponentType } from 'react'
  const ProTable: ComponentType<any>
  export default ProTable
}