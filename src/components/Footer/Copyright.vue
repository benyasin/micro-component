<template>
  <div
    :class="['max-w-1200px leading-5 text-fs12 text-thirdText', { 'rtl-enabled': config?.rtlSupport }]"
    :pc="config?.rtlSupport ? 'flex justify-between border-t-1 border-line rtl:space-x-reverse' : 'flex justify-between border-t-1 border-line'"
    at-ipad="flex flex-col-reverse border-t-1 border-line"
    lt-ipad="flex flex-col-reverse space-y-5"
  >
    <div class="flex flex-row justify-between items-center w-full" lt-ipad="flex flex-col-reverse">
      <div
        class="flex flex-row items-center flex-wrap copyright py-5"
        lt-ipad="border-t-2 border-line w-full justify-between"
      >
        <div class="mr-16px fw-500 text-thirdText dark:text-[var(--content-disabled)]" :dir="config?.rtlSupport ? 'ltr' : undefined">
          {{ t(config.copyright) }}
        </div>
        <span>丨</span>
        <a
          :href="formatLocalPath('/support/articles/360015150651-Privacy-Policy')"
          rel="nofollow"
          :target="'_self'"
          class="no-underline mx-16px fw-500 text-thirdText dark:text-[var(--content-disabled)]"
        >
          {{ t('common_footer.privacy') }}
        </a>
        <span>·</span>
        <a
          :href="formatLocalPath('/support/articles/360014944032-terms-of-use')"
          :target="'_self'"
          rel="nofollow"
          class="no-underline mx-16px fw-500 text-thirdText dark:text-[var(--content-disabled)]"
        >
          {{ t('common_footer.terms') }}
        </a>
        <span>·</span>
        <a
          :href="formatLocalPath('/support/articles/7700532076057-Risk-Disclosure')"
          rel="nofollow"
          :target="'_self'"
          class="no-underline ml-16px fw-500 text-thirdText dark:text-[var(--content-disabled)]"
        >
          {{ t('common_footer.risk') }}
        </a>
      </div>
      <div class="flex flex-row items-center justify-between" lt-ipad="w-full">
        <div class="item mr-24px" @click="showLanguageDialog('language'), trackLanguageClick()">
          <ImgLanguage class="mr-8px light:text-primaryText dark:text-[var(--content-primary)]" />
          <span class="item-span fw-500">{{ localeName }}</span>
        </div>
        <div
          v-if="footerProps.currencyVisible && currencyInfo"
          class="item"
          @click="showLanguageDialog('currency')"
        >
          <img
            class="mr-8px rounded-full"
            width="20"
            height="20"
            :src="currencyInfo.iconUrl || 'https://img.bitgetimg.com/fiat-country/USD.svg'"
            :alt="currencyInfo.name || t('common_footer.language_rate')"
          />
          <span class="item-span fw-500">
            {{ currencyInfo.type || t('common_footer.language_rate') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'
import { useI18n } from '@/compositions/useI18n'
import { useCurrency } from '@/compositions/useCurrency'
import { useFooter } from './useFooter'
import { useTrack } from './useTrack'
import ImgLanguage from '@/assets/footer/action-language.svg?component'
import { useSetting } from '@/components/Footer/useSetting'
import { useGlobalEvent } from "@/compositions/useGlobalEvent";
const { config, footerProps } = useFooter()
const { globalEvent } = useGlobalEvent()
const { languageList } = useSetting()
const { formatLocalPath, t, locale } = useI18n()
const { trackLanguageClick } = useTrack()
const { currencyInfo } = useCurrency()

type LanguageTab = 'language' | 'currency'
const SHOW_LANGUAGE_DIALOG = 'MICRO_HEADER:SHOW_LANGUAGE_DIALOG'

//@ts-ignore
const ltPc = process.client ? (document.body.clientWidth < 1200 ? true : false) : false
const localeName = computed(
  () => languageList.value?.find((item) => item.locale === locale.value)?.languageName
)

function showLanguageDialog(tab: LanguageTab) {
  globalEvent.emit(SHOW_LANGUAGE_DIALOG, tab)
}
</script>

<style scoped lang="less">
.rtl-enabled[dir='rtl'] .link,
.rtl-enabled[dir='rtl'] .copyright {
  direction: ltr;
}
.item {
  @apply flex items-center h-46px cursor-pointer px-0;
}

.copyright a,
.item-span {
  border: 1px solid transparent;
}

.copyright a:hover,
.item-span:hover {
  border-bottom: 1px dotted var(--color-third-text);
}
</style>
