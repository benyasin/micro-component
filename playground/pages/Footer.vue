<template>
  <Footer :locale="locale" :theme="theme" :log-event="logEvent" />
</template>

<script setup lang="ts">
import Footer from '@/components/Footer/Footer.vue'
import { useConfig } from '../compositions/useConfig'

const { locale, theme, logEvent } = useConfig()
</script>
