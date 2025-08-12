<template>
  <BitCollapse class="coll" ipad="hidden">
    <BitCollapseItem v-for="(item, index) in config.list" v-show="item.show">
      <template #title>
        <div class="flex justify-between items-center w-full text-primaryText fw-500">
          {{ t(item.title) }}
          <ImgArrowDown
            class="arrow w-6 transition ease-out delay-150 transform text-thirdText fill-thirdText"
          />
        </div>
      </template>
      <a
        v-for="(itemList, index) in item.list"
        v-show="itemList.isShow"
        :key="index"
        :href="itemList.url"
        :target="itemList.isTarget ? '_blank' : ''"
        :rel="itemList.newRel != null ? itemList.newRel : `noopener${itemList.rel || ''}`"
        class="nav-item box-border w-full inline-block no-underline cursor-pointer pl-4 last:mb-0 text-thirdText dark:text-contentDisabled fw-500"
        @click="trackFooterListLink(itemList.type, itemList.content, itemList.url)"
      >
        {{ itemList.prefixTitle && isClient ? `${itemList.prefixTitle} ${t(itemList.title)}` : t(itemList.title) }}
      </a>
    </BitCollapseItem>
  </BitCollapse>

  <div ipad="hidden">
    <div
      v-show="config?.community?.iconLinkList?.length"
      class="mt-3"
      pc="grid grid-cols-5 gap-y-4"
      lt-pc="flex items-center flex-wrap ltr:children:mr-5 rtl:children:ml-5"
    >
      <div
        v-for="item in config.community.iconLinkList"
        :key="item.img"
        class="flex-none overflow-hidden cursor-pointer w-24px h-24px mb-20px mr-20px"
      >
        <div
          v-if="item.name === 'Telegram' && item.telegramList?.length > 0"
          class="inline-block w-full h-full rounded-1/2"
        >
          <BitTooltip
            append-to="body"
            popper-class="telegram-popper"
            placement="top-start"
            :width="20"
            trigger="hover"
            :effect="footerProps.theme"
          >
            <template #content>
              <a
                class="telegram-item"
                :href="tItem.link"
                rel="nofollow"
                target="_blank"
                v-for="tItem in item.telegramList"
                @click="trackFooterSocialContact(tItem.mainKeyName, tItem.link)"
              >
                {{
                  tItem.mainKeyName === 'Telegram Futures'
                    ? t('common_footer.tg_futures_trading')
                    : tItem.mainKeyName === 'Telegram'
                    ? t('common_footer.tg_english_official')
                    : tItem.mainKeyName
                }}
              </a>
            </template>
            <img
              class="m-3px w-24px h-24px rounded-1/2"
              :src="item[`${footerProps.theme}Icon`]"
              :title="item.title"
              :alt="item.name"
              loading="lazy"
              decoding="async"
            />
            {{ item.name }}
          </BitTooltip>
        </div>
        <MediaLogo 
          v-else
          :url="item.url"
          :title="item.title"
          :name="item.name"
          :iconSrc="item[`${footerProps.theme}Icon`]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Collapse, CollapsePanel, Tooltip } from 'ant-design-vue'
import { useI18n } from '@/compositions/useI18n'
import { useFooter } from './useFooter'
import { useTrack } from './useTrack'
import { isClient } from '@/utils'
import ImgArrowDown from '@/assets/footer/arrow-down.svg'
import MediaLogo from './components/MediaLogo.vue'
const { t } = useI18n()
const { config, footerProps } = useFooter()
const { trackFooterListLink, trackFooterSocialContact } = useTrack()
</script>

<style scoped lang="less">
.coll {
  @apply !border-none;
  --mi-collapse-content-bg-color: transparent;
  --mi-collapse-header-bg-color: transparent;

  :deep {
    .mi-collapse-item__header {
      @apply border-none py-12px px-0;
    }
    .mi-collapse-item__wrap {
      @apply border-none;
    }
    .mi-collapse-item__content {
      @apply py-12px px-0 leading-18px text-primaryText;
    }
    .mi-collapse-item__arrow {
      @apply hidden;
    }
    .mi-collapse-item.is-active {
      .arrow {
        @apply rotate-180;
      }
    }
  }
}
.nav-item {
  margin-bottom: 1.5rem;
}
.telegram-item {
  display: block;
  text-decoration: none;
  line-height: 24px;
  color: var(--content-primary);
  padding: 6px 12px;
  font-weight: 400;
  font-size: 12px;
  &:hover {
    background-color: var(--background-tertiary);
    border-radius: 4px;
  }
}
</style>
