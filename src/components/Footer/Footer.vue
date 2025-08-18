<template>
  <ConfigProvider>
    <div class="bg-bg micro-app-hide min-h-50px micro" :class="{ 'rtl': rtlEnabledFlag }">
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

        <!-- 主要内容区域 -->
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

          <!-- 语言选择（仅当 i18nEnabled 手动开启时显示） -->
          <div v-if="i18nEnabled">
            <h3 class="text-lg font-semibold text-primaryText mb-4">
              {{ i18nEnabled ? t('footer.settings') : 'Settings' }}
            </h3>
            <div class="space-y-4">
              <!-- 语言选择 -->
              <div>
                <label class="block text-sm mb-2 text-secondaryText">
                  {{ i18nEnabled ? t('footer.language') : 'Language' }}
                </label>
                <select 
                  :value="currentLocale" 
                  @change="handleLanguageChange"
                  class="w-full px-3 py-2 border border-line rounded bg-bg text-primaryText"
                >
                  <option v-for="lang in config?.languages" :key="lang.locale" :value="lang.locale">
                    {{ lang.languageName }}
                  </option>
                </select>
              </div>
            </div>
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
import ConfigProvider from '@/common/ConfigProvider/ConfigProvider.vue'

createStore()

const defaultProps = withDefaults(defineProps<Props>(), {
  theme: 'light',
  locale: 'en',
  i18nEnabled: undefined
})

const $footer = ref()
const { config, footerProps, updateProps, event } = useFooter(defaultProps)

// 计算属性
const currentTheme = computed(() => footerProps.value.theme || 'light')
const currentLocale = computed(() => footerProps.value.locale || 'en')

// 国际化
const { t, changeLocale } = useI18n()

// 开关：优先使用 props 显式传入，仅当为 true 才开启；否则默认关闭
const i18nEnabled = computed(() => defaultProps.i18nEnabled === true || footerProps.value.i18nEnabled === true)
const themeSwitchEnabledFlag = computed(() => footerProps.value.themeSwitchEnabled === true)
const rtlEnabledFlag = computed(() => footerProps.value.rtlEnabled === true)
const ssrEnabledFlag = computed(() => footerProps.value.ssrEnabled === true)

// 主题切换 - 统一使用global-theme体系（仅当 themeSwitchEnabledFlag 为 true 时可切换）
const toggleTheme = () => {
  if (!themeSwitchEnabledFlag.value) return
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  
  updateProps({ theme: newTheme })
  event.emit('themeChange', newTheme as any)
  
  if (typeof document !== 'undefined') {
    // 使用全局主题类名体系
    document.body.classList.remove('global-theme', 'black', 'white')
    document.body.classList.add('global-theme', newTheme === 'dark' ? 'black' : 'white')
  }
}

const handleLanguageChange = async (domEvent: Event) => {
  const target = domEvent.target as HTMLSelectElement
  const newLocale = target.value
  
  const language = config.value?.languages?.find(lang => lang.locale === newLocale)
  if (language) {
    try {
      if (i18nEnabled.value) {
        await changeLocale(newLocale)
      }
      updateProps({ locale: newLocale })
      event.emit('languageChange', language)
    } catch (error) {
      console.error('[Footer] 语言切换失败:', error)
    }
  } else {
    console.warn('[Footer] 未找到对应的语言配置:', newLocale)
  }
}

const handleLinkClick = (url: string, target?: string) => {
  event.emit('push', url, target as '_blank' | '_self')
}

// 监听全局主题变化
watch(
  () => typeof document !== 'undefined' ? document.body.className : '',
  (newClassName) => {
    if (!themeSwitchEnabledFlag.value) return
    const isDark = newClassName.includes('global-theme') && newClassName.includes('black')
    const isLight = newClassName.includes('global-theme') && newClassName.includes('white')
    
    if (isDark && currentTheme.value !== 'dark') {
      updateProps({ theme: 'dark' })
    } else if (isLight && currentTheme.value !== 'light') {
      updateProps({ theme: 'light' })
    }
  },
  { immediate: true }
)

watchEffect(() => {
  if ($footer.value) {
    $footer.value.parentElement.classList.add('micro')
  }
})

onMounted(() => {
  // SSR 环境下避免直接操作 DOM
  if (!ssrEnabledFlag.value) {
    dispatchReady('Footer')
  } else {
    // SSR 模式可以在客户端激活时再行触发
    dispatchReady('Footer')
  }
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
  makeExpose({
    event,
    updateProps,
    props: footerProps
  })
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
