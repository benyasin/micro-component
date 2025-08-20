import { ref, watch, onMounted, onUnmounted, toRaw, isReactive, isRef } from 'vue'
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

    // 新增：默认公司/关于链接
    companyLinks: [
      { title: 'About', url: '/about', target: '_self' },
      { title: 'Blog', url: '/blog', target: '_self' },
      { title: 'Careers', url: '/careers', target: '_self' }
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

// 将响应式/Proxy 深度还原为普通对象（便于在控制台查看）
function deepToRaw<T = any>(val: T): any {
  if (isRef(val)) return deepToRaw((val as any).value)
  if (Array.isArray(val)) return val.map((v) => deepToRaw(v))
  if (val && typeof val === 'object') {
    const src: any = isReactive(val) ? toRaw(val as any) : (val as any)
    const out: any = Array.isArray(src) ? [] : {}
    for (const key in src) {
      out[key] = deepToRaw(src[key])
    }
    return out
  }
  return val
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
      companyLinks: target.companyLinks || source.companyLinks || defaultConfig.companyLinks,
      socialLinks: target.socialLinks || source.socialLinks || defaultConfig.socialLinks,
      languages: target.languages || source.languages || defaultConfig.languages
    }
    // 打印最终合并后的配置（转成普通对象，避免多层 Proxy 嵌套）
    console.log('[Footer] final config (plain):', deepToRaw(config.value))
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
