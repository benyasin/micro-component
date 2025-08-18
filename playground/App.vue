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
            <SelectOption v-for="route in routes" :key="route.name" :value="String(route.name)">
              {{ route.name }}
            </SelectOption>
          </Select>
        </div>

        <!-- i18n / Theme / RTL controls -->
        <div class="flex items-center gap-8px mx-12px">
          <!-- Language selector -->
          <Select v-model:value="locale" class="w-160px" placeholder="Locale" show-search @change="onLocaleChange">
            <SelectOption
              v-for="lang in defaultLanguageList"
              :key="lang.locale"
              :value="lang.locale"
            >
              {{ lang.languageName }}
            </SelectOption>
          </Select>

          <!-- RTL switch -->
          <AntSwitch
            :checked="direction === 'rtl'"
            checked-children="RTL"
            un-checked-children="LTR"
            @change="onDirectionSwitch"
          />

          <Component
            :is="{ light: ImgThemeLight, dark: ImgThemeDark }[theme]"
            class="cursor-pointer"
            @click="onThemeIconClick"
          />
        </div>
      </div>
      <div class="relative mt-72px bg-bg">
        <RouterView v-slot="{ Component }">
          <component :is="Component" :key="$route.fullPath" ref="activeComponentRef" />
        </RouterView>
      </div>
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue'
import { ConfigProvider, Select, SelectOption, Switch as AntSwitch } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/compositions/useI18n'
import { defaultLanguageList } from '@/utils/config'
import { createStore } from '@/utils/store'
import { routes } from './router'
import { useConfig } from './compositions/useConfig'
import { useConfig as useGlobalConfig } from '@/compositions/useConfig'

import ImgThemeLight from './assets/theme-light.svg?component'
import ImgThemeDark from './assets/theme-dark.svg?component'

createStore()
useI18n()

const { theme, locale, direction } = useConfig()
const { config: finalConfig } = useGlobalConfig()
const router = useRouter()
const route = useRoute()
const routeName = ref<string>(String(route.name || ''))
const activeComponentRef = ref<any>()

function onComponentChange(component: string) {
  router.push(component)
}

function onDirectionSwitch(checked: boolean) {
  if (activeComponentRef.value?.toggleRtl) {
    const ok = activeComponentRef.value.toggleRtl()
    if (!ok) return
  }
  direction.value = checked ? 'rtl' : 'ltr'
}

function onThemeIconClick() {
  if (activeComponentRef.value?.toggleTheme) {
    activeComponentRef.value.toggleTheme()
    return
  }
}

function onLocaleChange(newLocale: string) {
  locale.value = newLocale
  if (activeComponentRef.value?.changeLanguage) {
    activeComponentRef.value.changeLanguage(newLocale)
  }
}

watchEffect(() => {
  routeName.value = String(route.name || '')
})
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
</style>
