<template>
  <Footer 
    :locale="locale" 
    :theme="theme as 'light' | 'dark'" 
    :log-event="logEvent" 
    @language-change="handleLanguageChange"
    @theme-change="handleThemeChange"
  />
</template>

<script setup lang="ts">
import Footer from '@/components/Footer/Footer.vue'
import { useConfig } from '../compositions/useConfig'

const { locale, theme, logEvent } = useConfig()

// 处理语言切换事件
const handleLanguageChange = (language: any) => {
  console.log('[Playground] 接收到语言切换事件')
  console.log('[Playground] 当前locale:', locale.value)
  console.log('[Playground] 接收到的language对象:', language)
  console.log('[Playground] 新的locale:', language.locale)
  
  locale.value = language.locale
  
  console.log('[Playground] 更新后的locale:', locale.value)
  console.log('[Playground] 语言切换事件处理完成')
}

// 处理主题切换事件
const handleThemeChange = (newTheme: 'light' | 'dark') => {
  console.log('[Playground] 接收到主题切换事件')
  console.log('[Playground] 当前theme:', theme.value)
  console.log('[Playground] 新的theme:', newTheme)
  
  theme.value = newTheme
  
  console.log('[Playground] 更新后的theme:', theme.value)
  console.log('[Playground] 主题切换事件处理完成')
}
</script>
