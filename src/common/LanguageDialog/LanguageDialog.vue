<template>
  <div v-if="visible" class="language-currency" :class="[fullscreen ? 'fullscreen' : '']">
    <BitDialog
      class="dialog"
      :model-value="visible"
      :fullscreen="fullscreen"
      width="840px"
      @update:model-value="emit('update:visible', $event)"
    >
      <template #header>
        <BitTabs class="w-full" v-model="tab">
          <BitTabPane :name="TAB_LANGUAGE" :label="t('common_header.language_area')" />
          <BitTabPane
            :name="TAB_CURRENCY"
            :label="t('common_header.language_rate')"
            :disabled="!currencyVisible"
          />
        </BitTabs>
      </template>
      <div v-if="tab === TAB_LANGUAGE" class="list">
        <div
          v-for="item in languageList"
          class="item"
          :class="{ active: item.locale === locale }"
          @click="changeLanguage(item)"
        >
          {{ item.languageName }}
        </div>
      </div>
      <div v-if="tab === TAB_CURRENCY && currencyVisible" class="list">
        <div
          v-for="item in currencyList"
          class="item"
          :class="{
            active: item.name === currencyInfo?.name
          }"
          @click="changeCurrency(item.type), closeDialog()"
        >
          {{ item.type }} - {{ item.symbol }}
        </div>
      </div>
    </BitDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { cloneDeep } from 'lodash-es'
import { Modal, Tabs, TabPane } from 'ant-design-vue'

// 移除Header服务引用
import LocalCookie, { CookieKey } from '@/utils/request/localCookie.js'
import { useCurrency } from '@/compositions/useCurrency'
import { useI18n } from '@/compositions/useI18n'
import { Language, UserInfo } from '@/types/common'

const props = withDefaults(
  defineProps<{
    tab?: 'language' | 'currency'
    fullscreen?: boolean
    visible: boolean
    currencyVisible?: boolean
    languageList?: Language[]
    userInfo?: UserInfo
  }>(),
  {
    currencyVisible: true
  }
)
const emit = defineEmits(['update:visible', 'update:tab', 'languageChange', 'currencyChange'])

const TAB_LANGUAGE = 'language'
const TAB_CURRENCY = 'currency'

const { t, locale } = useI18n()
const { currencyInfo, currencyList, changeCurrency: _changeCurrency } = useCurrency()

const tab = ref<'language' | 'currency'>(props.tab || 'language')

watchEffect(() => {
  if (props.visible) {
    tab.value = props.tab || tab.value
  }
})

function changeLanguage(language: Language) {
  //  选择相同语言，直接关闭弹窗
  if (language.locale === locale.value) {
    closeDialog()
    return
  }

  // 主站逻辑，
  localStorage.setItem('bitget:uk:redirect', '1')

  // 登录状态请求修改语言接口
  if (props.userInfo) {
    // 移除Header服务调用，使用模拟实现
    console.log('Language changed:', language.languageType)
  }

  // cookie、localstorage
  LocalCookie.set(CookieKey.LANG, language.locale)

  emit('languageChange', language)
  closeDialog()
}

function changeCurrency(currency: string) {
  _changeCurrency(currency)
  emit('currencyChange', cloneDeep(currencyInfo.value))
}

function closeDialog() {
  emit('update:visible', false)
}
</script>

<style scoped lang="less">
.language-currency {
  :deep(*) {
    @apply box-border;
  }
  :deep(.dialog) {
    --mi-dialog-padding-primary: 0;
    --mi-tabs-header-height: 1.4;
    --mi-text-color-primary: var(--color-primary-text);
    --mi-dialog-border-radius: 8px;
    @apply p-0 !light:bg-bg !dark:bg-cardBg;

    .mi-dialog__header {
      @apply p-0;
    }
    .mi-dialog__body {
      @apply p-0;
    }
    .mi-dialog__headerbtn {
      @apply absolute right-18px top-24px text-16px rtl:(right-initial left-18px);
    }
    .mi-tabs__header {
      @apply m-0;
    }
    .mi-tabs__item {
      @apply !px-30px py-24px h-auto leading-21px;

      &.is-active {
        @apply text-primary;
      }
    }
    .mi-tabs__nav-wrap::after {
      @apply h-1px light:bg-[#ddd] dark:bg-[#646b71];
    }
    .mi-tabs__active-bar {
      @apply bg-primary;
    }
  }

  &.fullscreen {
    .item {
      @apply w-full;
    }
    :deep(.dialog) {
      @apply rounded-0;
    }
    :deep(.mi-dialog__header) {
      @apply sticky top-0 mr-0 !p-0 bg-inherit;
    }
    :deep(.mi-dialog__body) {
      @apply !p-0 bg-inherit;
    }
  }
}

.list {
  @apply flex flex-wrap gap-x-16px gap-y-10px p-20px;
  .item {
    @apply px-12px h-44px leading-44px text-primaryText rounded-4px cursor-pointer;
    width: ~'calc(25% - 16px);';

    &:hover,
    &.active {
      @apply text-primary;
      background: var(--color-secondary-btn-bg);
    }
  }
}
</style>
