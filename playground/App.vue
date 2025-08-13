<template>
  <ConfigProvider>
    <div class="min-h-100vh bg-bg">
      <div
        class="fixed box-border top-0 left-0 flex items-center justify-between w-100vw gap-8px p-20px bg-cardBg text-primaryText"
      >
      <div>
        <span class="lt-md:hidden">Components:</span>
        <Select
          v-model:value="routeName"
          class="w-140px"
          placeholder="Language"
          show-search
          @change="onComponentChange"
        >
          <SelectOption v-for="route in routes" :key="route.name" :value="route.name">
            {{ route.name }}
          </SelectOption>
        </Select>
      </div>

      <Component
          :is="{ light: ImgThemeLight, dark: ImgThemeDark }[theme]"
          class="cursor-pointer ml-10px"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
      />
      </div>
      <div class="relative mt-72px bg-bg">
        <RouterView v-slot="{ Component }">
          <component :is="Component" :key="$route.fullPath" />
        </RouterView>
      </div>
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { ConfigProvider, Select, SelectOption } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/compositions/useI18n'
import { defaultLanguageList } from '@/utils/config'
import { createStore } from '@/utils/store'
import { routes } from './router'
import { useConfig } from './compositions/useConfig'

import ImgThemeLight from './assets/theme-light.svg?component'
import ImgThemeDark from './assets/theme-dark.svg?component'

createStore()
useI18n()

const { theme, locale, direction, isLogin } = useConfig()
const router = useRouter()
const route = useRoute()
const routeName = ref(route.name)

function onComponentChange(component: string) {
  router.push(component)
}

watchEffect(() => {
  routeName.value = route.name
})

// 统一主题体系：根据 theme 同步 body.global-theme 的类
watchEffect(() => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('black', theme.value === 'dark')
  document.body.classList.toggle('white', theme.value === 'light')
})
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
</style>
