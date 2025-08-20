<template>
  <ConfigProvider>
    <div class="bg-bg micro-app-hide min-h-50px micro" :class="{ 'rtl': isRtl }">
      <div
        ref="$footer"
        class="mx-auto max-w-1200px px-4 py-8"
      >
        <!-- Logo区域 -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-4">
            <div class="text-2xl font-bold text-primaryText">
              {{ config?.brandName || 'MicroApp' }}
            </div>
            <div class="text-sm text-secondaryText">
              {{ i18nEnabled ? t('footer.slogan') : (config?.slogan || 'Simple & Powerful') }}
            </div>
          </div>
          

        </div>

        <!-- 主要内容区域：三列布局 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <!-- 产品链接 -->
          <div>
            <h3 class="text-lg font-semibold text-primaryText mb-4">
              {{ i18nEnabled ? t('footer.products') : 'Products' }}
            </h3>
            <ul class="space-y-2">
              <li v-for="item in config?.productLinks" :key="item.title">
                <a 
                  :href="item.url" 
                  class="text-secondaryText hover:text-primaryText transition-colors"
                  @click="handleLinkClick(item.url, item.target)"
                >
                  {{ i18nEnabled ? t(`footer.product_links.${item.title.toLowerCase()}`) : item.title }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 支持链接 -->
          <div>
            <h3 class="text-lg font-semibold text-primaryText mb-4">
              {{ i18nEnabled ? t('footer.support') : 'Support' }}
            </h3>
            <ul class="space-y-2">
              <li v-for="item in config?.supportLinks" :key="item.title">
                <a 
                  :href="item.url" 
                  class="text-secondaryText hover:text-primaryText transition-colors"
                  @click="handleLinkClick(item.url, item.target)"
                >
                  {{ i18nEnabled ? t(`footer.support_links.${formatSupportKey(item.title)}`) : item.title }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 新增：公司/关于链接 -->
          <div>
            <h3 class="text-lg font-semibold text-primaryText mb-4">
              {{ i18nEnabled ? t('footer.company') : 'Company' }}
            </h3>
            <ul class="space-y-2">
              <li v-for="item in config?.companyLinks" :key="item.title">
                <a 
                  :href="item.url" 
                  class="text-secondaryText hover:text-primaryText transition-colors"
                  @click="handleLinkClick(item.url, item.target)"
                >
                  {{ i18nEnabled ? t(`footer.company_links.${item.title.toLowerCase().replace(/\s+/g, '_')}`) : item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 底部版权信息 -->
        <div class="border-t border-line pt-6 flex flex-col md:flex-row justify-between items-center">
          <div class="text-sm text-secondaryText">
            <template v-if="i18nEnabled">
              © {{ new Date().getFullYear() }} {{ config?.brandName || 'MicroApp' }}. {{ t('footer.copyright_suffix') }}
            </template>
            <template v-else>
              {{ config?.copyright || `© ${new Date().getFullYear()} MicroApp. All rights reserved.` }}
            </template>
          </div>
          
          <!-- 社交媒体链接 -->
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a  v-if="themeSwitchEnabledFlag" class="mt-1 text-secondaryText hover:text-primaryText transition-colors"
                @click="toggleTheme"
                href="javascript:void(0);"
            >
              <span>{{ currentTheme === 'dark' ? '🌞' : '🌙' }}</span>
            </a>
            <a
              v-for="social in config?.socialLinks" 
              :key="social.name"
              :href="social.url"
              :title="social.title"
              class="text-secondaryText hover:text-primaryText transition-colors"
              @click="handleLinkClick(social.url, '_blank')"
            >
              <span class="text-xl">{{ social.icon }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect, watch, ref, computed } from 'vue'
import { createStore } from '@/utils/store'
import { makeExpose, dispatchReady } from '@/utils/component'
import { useFooter } from './useFooter'
import { useI18n } from '@/compositions/useI18n'
import { Props } from './types'
import { ThemeEnum } from '@/types/component'
import ConfigProvider from '@/common/ConfigProvider/ConfigProvider.vue'

createStore()

const defaultProps = withDefaults(defineProps<Props>(), {
  theme: 'light',
  locale: 'en',
  i18nEnabled: undefined
})

const $footer = ref()
const { 
  config, 
  footerProps, 
  updateProps, 
  event 
} = useFooter(defaultProps)

// 计算属性
const currentTheme = computed(() => footerProps.value.theme || 'light')
const currentLocale = computed(() => footerProps.value.locale || 'en')

// 国际化
const { t, changeLocale } = useI18n()

// 开关：优先使用 props 显式传入，仅当为 true 时开启；否则默认关闭
const i18nEnabled = computed(() => defaultProps.i18nEnabled === true || footerProps.value.i18nEnabled === true)
const themeSwitchEnabledFlag = computed(() => footerProps.value.themeSwitchEnabled === true)

// 新：方向开关
const directionSwitchEnabledFlag = computed(() => footerProps.value.directionSwitchEnabled === true)

// 支持基于 direction 的方式
const directionValue = computed(() => {
  const d = (footerProps.value as any).direction as string | undefined
  const result: 'ltr' | 'rtl' = d === 'ltr' || d === 'rtl' ? (d as 'ltr' | 'rtl') : 'ltr'
  return result
})
const isRtl = computed(() => directionValue.value === 'rtl')

// 设置主题（仅当 themeSwitchEnabledFlag 为 true 时可切换）
const setTheme = (theme: ThemeEnum | 'light' | 'dark'): boolean => {
  if (!themeSwitchEnabledFlag.value) return false
  const newTheme = theme === (ThemeEnum.Dark || theme === 'dark') ? 'dark' : 'light'
  updateProps({ theme: newTheme })
  event.emit('themeChange', newTheme as any)
  if (typeof document !== 'undefined') {
    document.body.classList.remove('global-theme', 'black', 'white')
    document.body.classList.add('global-theme', newTheme === 'dark' ? 'black' : 'white')
  }
  return true
}

// 主题切换 - 使用 setTheme
const toggleTheme = (): boolean => {
  const nextTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  return setTheme(nextTheme)
}

// 切换语言（仅当 i18nEnabled 为 true 时才生效）
const changeLanguage = async (lang: string): Promise<boolean> => {
  if (!i18nEnabled.value) return false
  try {
    await changeLocale(lang)
    updateProps({ locale: lang })
    const matched = config.value?.languages?.find((l) => l.locale === lang)
    if (matched) event.emit('languageChange', matched as any)
    return true
  } catch (e) {
    console.warn('[Footer] changeLanguage failed:', e)
    return false
  }
}

// 设置/切换 RTL（以 'rtl' | 'ltr' 传入；由使用方决定是否允许暴露该能力）
const setRtl = (dir: 'rtl' | 'ltr'): boolean => {
  // 需要开关允许，且仅当允许时才可切换到 rtl
  if (dir === 'rtl' && !directionSwitchEnabledFlag.value) return false
  updateProps({ direction: dir } as any)
  return true
}

const toggleRtl = (): boolean => setRtl(isRtl.value ? 'ltr' : 'rtl')

const handleLinkClick = (url: string, target?: string) => {
  event.emit('push', url, target as '_blank' | '_self')
}

// 监听全局主题变化
watch(
  () => (typeof document !== 'undefined' ? document.body.className : ''),
  (newClassName, _oldClassName) => {
    if (!themeSwitchEnabledFlag.value) return
    const isDark = newClassName.includes('global-theme') && newClassName.includes('black')
    const isLight = newClassName.includes('global-theme') && newClassName.includes('white')

    if (isDark && currentTheme.value !== 'dark') {
      updateProps({ theme: 'dark' })
    } else if (isLight && currentTheme.value !== 'light') {
      updateProps({ theme: 'light' })
    }
  },
  { immediate: false }
)

// 新增：当 theme prop 变化时，同步到 body 保证视觉一致
watch(
  () => currentTheme.value,
  (next) => {
    if (typeof document === 'undefined') return
    document.body.classList.remove('global-theme', 'black', 'white')
    document.body.classList.add('global-theme', next === 'dark' ? 'black' : 'white')
  }
)

watchEffect(() => {
  if ($footer.value) {
    $footer.value.parentElement.classList.add('micro')
  }
})

onMounted(() => {
  // 初始挂载时根据 props 同步一次 body 的主题类
  if (typeof document !== 'undefined') {
    document.body.classList.remove('global-theme', 'black', 'white')
    document.body.classList.add('global-theme', currentTheme.value === 'dark' ? 'black' : 'white')
  }

  // SSR 相关逻辑已移除，始终发送 ready 事件
  dispatchReady('Footer')
})

// Helper function for support link key mapping
const formatSupportKey = (title: string) => {
  const map: Record<string, string> = {
    'Help Center': 'help_center',
    'Contact Us': 'contact_us',
    'Status': 'status',
    'Privacy Policy': 'privacy_policy',
    'Terms of Service': 'terms_of_service'
  }
  return map[title] || title.toLowerCase().replace(/\s+/g, '_')
}

defineExpose(
  makeExpose(
    {
      event,
      updateProps,
      props: footerProps
    },
    {
      // 暴露的能力：在函数内部做好开关判断
      toggleTheme,
      changeLanguage,
      setRtl,
      toggleRtl
    }
  )
)
</script>

<style scoped lang="less">
// 响应式设计
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

// 可选的 RTL class，交由使用方决定是否传入开启
.rtl {
  direction: rtl;
}
</style>
