<template>
  <Link href="/" format-locale @click="handleLogoClick">
    <ImgLogo :class="['w-103px h-32px dark:hover:text-[#00E0FF]', { '!rtl:rotate-y-0': config?.rtlSupport }]" />
  </Link>
</template>

<script setup lang="ts">
import { useTrack } from './useTrack'
import { useI18n } from '@/compositions/useI18n'
import { useFooter } from './useFooter'
import Link from './Link.vue'
import ImgLogo from '@/assets/logo.svg'

const { formatLocalPath } = useI18n()
const { trackLogoClick } = useTrack()
const { config } = useFooter()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleLogoClick = () => {
  trackLogoClick()
  if (location.pathname === formatLocalPath('/')) {
    scrollToTop()
  }
}
</script>
