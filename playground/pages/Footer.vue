<template>
  <!-- 测试不传 i18nEnabled 参数，应该使用默认值 true -->
  <Footer 
    :locale="locale" 
    :theme="theme as 'light' | 'dark'" 
    :log-event="logEvent"
    :i18n-enabled="true"
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
  locale.value = language.locale
}

// 处理主题切换事件
const handleThemeChange = (newTheme: 'light' | 'dark') => {
  theme.value = newTheme
}
</script>
