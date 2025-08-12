<template>
  <ConfigProvider>
    <div class="bg-bgPrimary micro-app-hide min-h-50px micro">
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
              {{ config?.slogan || 'Simple & Powerful' }}
            </div>
          </div>
          
          <!-- 主题切换按钮 -->
          <button 
            class="px-4 py-2 rounded bg-primary text-white hover:bg-primaryHover transition-colors"
            @click="toggleTheme"
          >
            {{ currentTheme === 'dark' ? '🌞' : '🌙' }} {{ isI18nEnabled ? t('footer.switch_theme') : 'Switch Theme' }}
          </button>
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
                  class="transition-colors footer-link"
                  @click="handleLinkClick(item.url, item.target)"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 支持链接 -->
          <div>
            <h3 class="text-lg font-semibold mb-4 footer-section-title">
              {{ isI18nEnabled ? t('footer.support') : 'Support' }}
            </h3>
            <ul class="space-y-2">
              <li v-for="item in config?.supportLinks" :key="item.title">
                <a 
                  :href="item.url" 
                  class="transition-colors footer-link"
                  @click="handleLinkClick(item.url, item.target)"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 语言和货币选择 -->
          <div>
            <h3 class="text-lg font-semibold mb-4 footer-section-title">
              {{ isI18nEnabled ? t('footer.settings') : 'Settings' }}
            </h3>
            <div class="space-y-4">
              <!-- 语言选择 -->
              <div>
                <label class="block text-sm mb-2 footer-section-label">
                  {{ isI18nEnabled ? t('footer.language') : 'Language' }}
                </label>
                <select 
                  :value="currentLocale" 
                  @change="handleLanguageChange"
                  class="w-full px-3 py-2 border rounded footer-select"
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
        <div class="border-t pt-6 flex flex-col md:flex-row justify-between items-center footer-divider">
          <div class="text-sm footer-copyright">
            {{ config?.copyright || `© ${new Date().getFullYear()} MicroApp. All rights reserved.` }}
          </div>
          
          <!-- 社交媒体链接 -->
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a 
              v-for="social in config?.socialLinks" 
              :key="social.name"
              :href="social.url"
              :title="social.title"
              class="transition-colors footer-link"
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
import { onMounted, onUnmounted, watchEffect, watch, ref, computed } from 'vue'
import { createStore } from '@/utils/store'
import { makeExpose, dispatchReady } from '@/utils/component'
import { useSize } from '@/compositions/useSize'
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
const { winWidth } = useSize()

// 计算属性
const currentTheme = computed(() => footerProps.value.theme || 'light')
const currentLocale = computed(() => footerProps.value.locale || 'en')

// 国际化
const { t, changeLocale } = useI18n()

// 检查是否启用多语言
const isI18nEnabled = computed(() => config.value?.i18nEnabled !== false)

// 事件处理
const toggleTheme = () => {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  // 更新props
  updateProps({ theme: newTheme })
  // 触发事件
  event.emit('themeChange', newTheme as any)
  
  // 同步到全局主题（如果在playground环境中）
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('black', newTheme === 'dark')
    document.body.classList.toggle('white', newTheme === 'light')
  }
}

const handleLanguageChange = (domEvent: Event) => {
  const target = domEvent.target as HTMLSelectElement
  const newLocale = target.value
  const language = config.value?.languages?.find(lang => lang.locale === newLocale)
  if (language) {
    // 实际切换国际化
    changeLocale(newLocale)
    // 更新props
    updateProps({ locale: newLocale })
    // 触发事件
    event.emit('languageChange', language)
  }
}



const handleLinkClick = (url: string, target?: string) => {
  event.emit('push', url, target as '_blank' | '_self')
}

onMounted(() => {
  // Footer组件已挂载
})

// 使用watch监听全局主题变化
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
  // 在移动端通过CSS默认隐藏，需要在此重新显示
  if ($footer.value) {
    // 低版本兼容
    $footer.value.parentElement.classList.add('micro')
  }
})

// 组件加载完上报事件
onMounted(() => {
  dispatchReady('Footer')
})

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

// 直接使用全局CSS变量，无需重新定义
.micro {
  // 直接使用全局变量，确保主题切换生效
  --bg-primary: var(--color-bg);
  --bg-secondary: var(--color-card-bg);
  --text-primary: var(--color-primary-text);
  --text-secondary: var(--color-secondary-text);
  --border-color: var(--color-line);
  --theme-btn-bg: var(--color-primary-btn-bg);
  --theme-btn-hover: var(--color-primary-hover-bg);
  --theme-btn-text: var(--color-white-text);
}

// Footer组件样式定义
.footer-container {
  background-color: var(--bg-primary);
}

.footer-brand {
  color: var(--text-primary);
}

.footer-slogan {
  color: var(--text-secondary);
}

.footer-theme-btn {
  background-color: var(--theme-btn-bg);
  color: var(--theme-btn-text);
}

.footer-theme-btn:hover {
  background-color: var(--theme-btn-hover);
}

.footer-section-title {
  color: var(--text-primary);
}

.footer-section-label {
  color: var(--text-secondary);
}

.footer-link {
  color: var(--text-secondary);
}

.footer-link:hover {
  color: var(--text-primary);
}

.footer-select {
  border-color: var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.footer-copyright {
  color: var(--text-secondary);
}

.footer-divider {
  border-color: var(--border-color);
}
</style>
