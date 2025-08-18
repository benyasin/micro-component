import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useProps } from '@/compositions/useProps'
import { Props, Config } from './types'
import { useI18n } from '@/compositions/useI18n'
import { useSize } from '@/compositions/useSize'
import { useEvent } from '@/compositions/useEvent'
import { Events } from './types'
import { defineStore } from '@/utils/store'
import { debounce } from 'lodash-es'

// 默认配置
const getDefaultConfig = (locale: string): Config => {
  return {
    brandName: 'MicroApp',
    slogan: 'Simple & Powerful',
    copyright: `© ${new Date().getFullYear()} MicroApp. All rights reserved.`,
    // 默认产品链接
    productLinks: [
      { title: 'Features', url: '/features', target: '_self' },
      { title: 'Pricing', url: '/pricing', target: '_self' },
      { title: 'API', url: '/api', target: '_blank' },
      { title: 'Documentation', url: '/docs', target: '_blank' }
    ],
    
    // 默认支持链接
    supportLinks: [
      { title: 'Help Center', url: '/help', target: '_self' },
      { title: 'Contact Us', url: '/contact', target: '_self' },
      { title: 'Status', url: '/status', target: '_blank' },
      { title: 'Privacy Policy', url: '/privacy', target: '_self' },
      { title: 'Terms of Service', url: '/terms', target: '_self' }
    ],
    
    // 默认社交媒体链接
    socialLinks: [
      { name: 'twitter', title: 'Follow us on Twitter', url: 'https://twitter.com/microapp', icon: '🐦' },
      { name: 'github', title: 'View on GitHub', url: 'https://github.com/microapp', icon: '📚' },
      { name: 'discord', title: 'Join our Discord', url: 'https://discord.gg/microapp', icon: '💬' }
    ],
    
    // 默认语言列表 - 只保留中英文
    languages: [
      { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
      { locale: 'zh-CN', languageKey: 'zh_CN', languageType: 1, languageName: '简体中文' }
    ],
  }
}

export const useFooter = defineStore((defaultProps?: Props) => {
  const { props: footerProps, updateProps } = useProps(defaultProps)
  const event = useEvent<Events>()
  const { formatLocalPath, t, locale } = useI18n()
  const { winWidth } = useSize()
  const config = ref<Config>()

  const mergeConfig = (source: Partial<Config>, target: Partial<Config>) => {
    const defaultConfig = getDefaultConfig(locale.value)
    
    config.value = {
      ...defaultConfig,
      ...source,
      ...target,
      // 合并数组配置
      productLinks: target.productLinks || source.productLinks || defaultConfig.productLinks,
      supportLinks: target.supportLinks || source.supportLinks || defaultConfig.supportLinks,
      socialLinks: target.socialLinks || source.socialLinks || defaultConfig.socialLinks,
      languages: target.languages || source.languages || defaultConfig.languages
    }
  }

  const initConfig = () => {
    mergeConfig(defaultProps, footerProps.value)
  }

  // 监听props变化
  watch(
    [() => footerProps.value],
    () => {
      if (typeof window !== 'undefined') {
        initConfig()
      }
    },
    { immediate: true, deep: true }
  )

  // 监听语言变化
  watch(
    [() => locale.value],
    () => {
      initConfig()
    }
  )

  let preWinWidth = winWidth.value
  const handleResize = debounce(() => {
    if (Math.abs(preWinWidth - winWidth.value) > 10) {
      initConfig()
    }
    preWinWidth = winWidth.value
  }, 300)

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  initConfig()

  return {
    footerProps,
    updateProps,
    mergeConfig,
    config,
    on: event.on,
    emit: event.emit,
    event
  }
})
