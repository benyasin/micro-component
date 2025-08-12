// Footer组件使用示例配置

export const footerExampleConfig = {
  // 基础配置
  brandName: 'MyApp',
  slogan: 'Build Something Amazing',
  copyright: '© 2024 MyApp. All rights reserved.',
  
  // 主题和语言
  theme: 'light' as const,
  locale: 'en',
  currencyVisible: true,
  
  // 产品链接
  productLinks: [
    { title: 'Features', url: '/features', target: '_self' },
    { title: 'Pricing', url: '/pricing', target: '_self' },
    { title: 'API', url: '/api', target: '_blank' },
    { title: 'Documentation', url: '/docs', target: '_blank' }
  ],
  
  // 支持链接
  supportLinks: [
    { title: 'Help Center', url: '/help', target: '_self' },
    { title: 'Contact Us', url: '/contact', target: '_self' },
    { title: 'Status', url: '/status', target: '_blank' },
    { title: 'Privacy Policy', url: '/privacy', target: '_self' },
    { title: 'Terms of Service', url: '/terms', target: '_self' }
  ],
  
  // 社交媒体链接
  socialLinks: [
    { name: 'twitter', title: 'Follow us on Twitter', url: 'https://twitter.com/myapp', icon: '🐦' },
    { name: 'github', title: 'View on GitHub', url: 'https://github.com/myapp', icon: '📚' },
    { name: 'discord', title: 'Join our Discord', url: 'https://discord.gg/myapp', icon: '💬' },
    { name: 'linkedin', title: 'Connect on LinkedIn', url: 'https://linkedin.com/company/myapp', icon: '💼' }
  ],
  
  // 语言列表
  languages: [
    { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
    { locale: 'zh-CN', languageKey: 'zh_CN', languageType: 1, languageName: '简体中文' },
    { locale: 'zh-TW', languageKey: 'zh_TW', languageType: 5, languageName: '繁體中文' },
    { locale: 'ja', languageKey: 'ja_JP', languageType: 2, languageName: '日本語' },
    { locale: 'ko', languageKey: 'ko_KR', languageType: 3, languageName: '한국어' },
    { locale: 'es', languageKey: 'es_ES', languageType: 6, languageName: 'Español' },
    { locale: 'fr', languageKey: 'fr_FR', languageType: 10, languageName: 'Français' },
    { locale: 'de', languageKey: 'de_DE', languageType: 11, languageName: 'Deutsch' }
  ],
  

}

// Vue 3 使用示例
export const vueExample = `
<template>
  <MicroFooter 
    :theme="theme"
    :locale="locale"
    :currency-visible="true"
    :product-links="footerConfig.productLinks"
    :support-links="footerConfig.supportLinks"
    :social-links="footerConfig.socialLinks"
    :languages="footerConfig.languages"
    :currencies="footerConfig.currencies"
    @theme-change="handleThemeChange"
    @language-change="handleLanguageChange"

    @push="handleLinkClick"
  />
</template>

<script setup>
import { MicroFooter } from 'micro-components/vue/Footer'
import { footerExampleConfig } from './example'

const theme = ref('light')
const locale = ref('en')
const footerConfig = footerExampleConfig

const handleThemeChange = (newTheme) => {
  theme.value = newTheme
  console.log('Theme changed to:', newTheme)
}

const handleLanguageChange = (language) => {
  locale.value = language.locale
  console.log('Language changed to:', language)
}



const handleLinkClick = (url, target) => {
  console.log('Link clicked:', url, target)
  // 处理链接跳转
  if (target === '_blank') {
    window.open(url, '_blank')
  } else {
    // 使用路由跳转
    router.push(url)
  }
}
</script>
`

// React 使用示例
export const reactExample = `
import { Footer } from 'micro-components/react/Footer'
import { footerExampleConfig } from './example'

function App() {
  const [theme, setTheme] = useState('light')
  const [locale, setLocale] = useState('en')
  const footerConfig = footerExampleConfig

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    console.log('Theme changed to:', newTheme)
  }

  const handleLanguageChange = (language) => {
    setLocale(language.locale)
    console.log('Language changed to:', language)
  }

  const handleCurrencyChange = (currency) => {
    console.log('Currency changed to:', currency)
  }

  const handleLinkClick = (url, target) => {
    console.log('Link clicked:', url, target)
    // 处理链接跳转
    if (target === '_blank') {
      window.open(url, '_blank')
    } else {
      // 使用路由跳转
      navigate(url)
    }
  }

  return (
    <div>
      <Footer 
        theme={theme}
        locale={locale}
        currencyVisible={true}
        productLinks={footerConfig.productLinks}
        supportLinks={footerConfig.supportLinks}
        socialLinks={footerConfig.socialLinks}
        languages={footerConfig.languages}
        currencies={footerConfig.currencies}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}

        onPush={handleLinkClick}
      />
    </div>
  )
}
`
