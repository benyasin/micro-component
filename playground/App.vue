<template>
  <BitConfigProvider namespace="mi">
    <div class="min-h-100vh bg-bg">
      <div
        class="fixed box-border top-0 left-0 flex items-center justify-center w-100vw gap-8px p-20px bg-cardBg text-primaryText"
      >
        <span class="lt-md:hidden">Components:</span>
        <BitSelect
          v-model="routeName"
          class="w-140px"
          placeholder="Language"
          filterable
          @change="onComponentChange"
        >
          <BitOption v-for="route in routes" :value="route.name" :label="route.name">
            {{ route.name }}
          </BitOption>
        </BitSelect>
        <BitSelect
          v-model="locale"
          class="ms-auto me-10px w-100px"
          placeholder="Language"
          filterable
        >
          <BitOption
            v-for="item in defaultLanguageList"
            :value="item.locale"
            :label="item.locale"
          />
        </BitSelect>
        <BitSelect v-model="direction" class="w-100px" placeholder="Direction">
          <BitOption value="ltr">LTR</BitOption>
          <BitOption value="rtl">RTL</BitOption>
        </BitSelect>
        <BitSelect :model-value="isLogin.toString()" class="w-100px" placeholder="login" @update:model-value="isLogin = $event">
          <BitOption value="true" label="Login"></BitOption>
          <BitOption value="false" label="Unlogin"></BitOption>
        </BitSelect>
        <Component
          :is="{ light: ImgThemeLight, dark: ImgThemeDark }[theme]"
          class="cursor-pointer ml-10px"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
        />
      </div>
      <div class="relative mt-72px bg-bg" :class="[`micro-${theme}`]">
        <RouterView v-slot="{ Component }">
          <component :is="Component" :key="$route.fullPath" />
        </RouterView>
      </div>
    </div>
  </BitConfigProvider>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { Select, SelectOption, ConfigProvider } from 'ant-design-vue'
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

console.log('isLogin', isLogin.value)

function onComponentChange(component: string) {
  router.push(component)
}

watchEffect(() => {
  routeName.value = route.name
})
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
</style>
