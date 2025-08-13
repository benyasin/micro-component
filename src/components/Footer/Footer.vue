<template>
  <ConfigProvider>
    <div class="bg-bg micro-app-hide min-h-50px micro">
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
              {{ isI18nEnabled ? t('footer.slogan') : (config?.slogan || 'Simple & Powerful') }}
            </div>
          </div>
          
          <!-- 主题切换按钮 -->
           <!-- 
          <button 
            class="px-4 py-2 rounded bg-primary text-white hover:bg-primaryHover transition-colors"
            @click="toggleTheme"
          >
            {{ currentTheme === 'dark' ? '🌞' : '🌙' }} {{ isI18nEnabled ? t('footer.switch_theme') : 'Switch Theme' }}
          </button>
           -->
        </div>

        <!-- 主要内容区域 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <!-- 产品链接 -->
          <div>
            <h3 class="text-lg font-semibold text-primaryText mb-4">
              {{ isI18nEnabled ? t('footer.products') : 'Products' }}
            </h3>
            <ul class="space-y-2">
              <li v-for="item in config?.productLinks" :key="item.title">
                <a 
                  :href="item.url" 
                  class="text-secondaryText hover:text-primaryText transition-colors"
                  @click="handleLinkClick(item.url, item.target)"
                >
                  {{ isI18nEnabled ? t(`footer.product_links.${item.title.toLowerCase()}`) : item.title }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 支持链接 -->
          <div>
            <h3 class="text-lg font-semibold text-primaryText mb-4">
              {{ isI18nEnabled ? t('footer.support') : 'Support' }}
            </h3>
            <ul class="space-y-2">
              <li v-for="item in config?.supportLinks" :key="item.title">
                <a 
                  :href="item.url" 
                  class="text-secondaryText hover:text-primaryText transition-colors"
                  @click="handleLinkClick(item.url, item.target)"
                >
                  {{ isI18nEnabled ? t(`footer.support_links.${formatSupportKey(item.title)}`) : item.title }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 语言选择 -->
          <div>
            <h3 class="text-lg font-semibold text-primaryText mb-4">
              {{ isI18nEnabled ? t('footer.settings') : 'Settings' }}
            </h3>
            <div class="space-y-4">
              <!-- 语言选择 -->
              <div>
                <label class="block text-sm mb-2 text-secondaryText">
                  {{ isI18nEnabled ? t('footer.language') : 'Language' }}
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
            <template v-if="isI18nEnabled">
              © {{ new Date().getFullYear() }} {{ config?.brandName || 'MicroApp' }}. {{ t('footer.copyright_suffix') }}
            </template>
            <template v-else>
              {{ config?.copyright || `© ${new Date().getFullYear()} MicroApp. All rights reserved.` }}
            </template>
          </div>
          
          <!-- 社交媒体链接 -->
          <div class="flex space-x-4 mt-4 md:mt-0">
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
  currencyVisible: true,
  theme: 'light',
  locale: 'en'
})

const $footer = ref()
const { config, footerProps, updateProps, event } = useFooter(defaultProps)

// 计算属性
const currentTheme = computed(() => footerProps.value.theme || 'light')
const currentLocale = computed(() => footerProps.value.locale || 'en')

// 国际化
const { t, changeLocale } = useI18n()

// 检查是否启用多语言 - 优先使用 props，然后是 config，默认为 true
const isI18nEnabled = computed(() => {
  // 如果 props 中明确设置了 isI18nEnabled，使用 props 的值
  if (footerProps.value.isI18nEnabled !== undefined) {
    return footerProps.value.isI18nEnabled
  }
  // 否则使用 config 中的设置，默认为 true
  return config.value?.i18nEnabled !== false
})

// 主题切换 - 统一使用global-theme体系
const toggleTheme = () => {
  console.log('[Footer] 开始主题切换')
  console.log('[Footer] 当前主题:', currentTheme.value)
  console.log('[Footer] 国际化开启状态:', isI18nEnabled.value)
  console.log('[Footer] 当前配置:', config.value)
  
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  console.log('[Footer] 新主题:', newTheme)
  
  // 更新props
  console.log('[Footer] 更新props前的footerProps:', footerProps.value)
  updateProps({ theme: newTheme })
  console.log('[Footer] 更新props后的footerProps:', footerProps.value)
  
  // 触发事件
  console.log('[Footer] 触发themeChange事件:', newTheme)
  event.emit('themeChange', newTheme as any)
  
  // 同步到全局主题 - 只使用一套主题体系
  if (typeof document !== 'undefined') {
    console.log('[Footer] 更新document.body类名')
    console.log('[Footer] 更新前body.className:', document.body.className)
    document.body.classList.toggle('black', newTheme === 'dark')
    document.body.classList.toggle('white', newTheme === 'light')
    console.log('[Footer] 更新后body.className:', document.body.className)
  }
  
  console.log('[Footer] 主题切换完成')
}

const handleLanguageChange = async (domEvent: Event) => {
  console.log('[Footer] 开始语言切换')
  console.log('[Footer] 当前语言:', currentLocale.value)
  console.log('[Footer] 国际化开启状态:', isI18nEnabled.value)
  console.log('[Footer] 可用语言列表:', config.value?.languages)
  
  const target = domEvent.target as HTMLSelectElement
  const newLocale = target.value
  console.log('[Footer] 选择的新语言:', newLocale)
  
  const language = config.value?.languages?.find(lang => lang.locale === newLocale)
  console.log('[Footer] 找到的语言配置:', language)
  
  if (language) {
    console.log('[Footer] 开始切换语言到:', newLocale)
    
    try {
      // 等待i18n实例切换完成
      console.log('[Footer] 调用changeLocale并等待完成')
      await changeLocale(newLocale)
      console.log('[Footer] changeLocale完成')
      
      // 更新组件props
      console.log('[Footer] 更新props前的footerProps:', footerProps.value)
      updateProps({ locale: newLocale })
      console.log('[Footer] 更新props后的footerProps:', footerProps.value)
      
      // 触发事件
      console.log('[Footer] 触发languageChange事件:', language)
      event.emit('languageChange', language)
      
      console.log('[Footer] 语言切换完成')
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
  () => document.body.className,
  (newClassName) => {
    const isDark = newClassName.includes('black')
    const isLight = newClassName.includes('white')
    
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
</style>
