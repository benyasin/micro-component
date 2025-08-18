<template>
  <Footer 
    ref="footerRef"
    :locale="locale" 
    :theme="theme as 'light' | 'dark'" 
    :log-event="logEvent"
    :i18n-enabled="true"
    :theme-switch-enabled="true"
    :rtl-enabled="true"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Footer from '@/components/Footer/Footer.vue'
import { useConfig } from '../compositions/useConfig'

const footerRef = ref<any>()
const { locale, theme, direction, logEvent } = useConfig()

// playground 中直接调用 Footer 暴露的方法做演示
onMounted(() => {
  // 示例：初始化后立即同步一次（可选）
  footerRef.value?.changeLanguage?.(locale.value)
  footerRef.value?.setTheme?.(theme.value)
  footerRef.value?.setRtl?.(direction.value)
})

// 将 Footer 内部暴露的方法向上转发，便于 App 顶部工具条直接调用
defineExpose({
  toggleTheme: () => footerRef.value?.toggleTheme?.(),
  changeLanguage: (l: string) => footerRef.value?.changeLanguage?.(l),
  toggleRtl: () => footerRef.value?.toggleRtl?.()
})
</script>
