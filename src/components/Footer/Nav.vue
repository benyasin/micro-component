<template>
  <div
    pc="grid grid-cols-5 gap-x-24px gap-y-16px flex-1"
    at-ipad="grid grid-cols-3 gap-x-30px gap-y-16px"
    lt-ipad="space-y-7"
  >
    <div
      v-if="winWidth >= 768"
      v-for="item in config.list"
      :key="item.title"
      v-show="item.show"
      :class="[item.row === 2 ? 'row-span-2' : 'row-span-1', item.topOffset, item.bottomOffset]"
      lt-ipad="hidden"
    >
      <div
        class="footer-item relative overflow-hidden text-primaryText"
        :class="item.row === 2 ? 'row-span-1' : 'row-span-1'"
        ipad="text-fs14 leading-22px"
      >
        <div
          class="footer-item-title flex items-center justify-between w-full"
          pc="text-fs18 fw-500 break-work"
          ipad="fw-500 text-fs18 break-work"
          at-ipad="text-fs18"
        >
          {{ t(item.title) }}
        </div>
        <template v-for="(itemList, indexList) in item.list">
          <a
            v-if="itemList.isShow"
            :key="indexList"
            :href="itemList.url"
            :target="itemList.isTarget ? '_blank' : ''"
            :rel="itemList.newRel != null ? itemList.newRel : `noopener${itemList.rel || ''}`"
            class="nav-item box-border w-full no-underline text-thirdText inline-flex justify-start items-center dark:text-contentDisabled fw-500 text-fs14"
            ipad:hover="text-primary cursor-pointer transition-all"
            @click="handleClickMessi(itemList.type, itemList.content, itemList.url, $event)"
          >
            {{
              itemList.prefixTitle && isClient
                ? `${itemList.prefixTitle} ${t(itemList.title)}`
                : t(itemList.title)
            }}
            <ImgArrow class="arrow-right" />
          </a>
        </template>
      </div>
    </div>
    <Collapse />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/compositions/useI18n'
import { useFooter } from './useFooter'
import { useTrack } from './useTrack'
import { useSize } from '@/compositions/useSize'
import ImgArrow from '@/assets/header/icon-chevron-right2.svg?component'
import Collapse from './Collapse.vue'
import { isClient } from '@/utils'
const { winWidth } = useSize()

const { t } = useI18n()
const { config } = useFooter()
const { trackFooterListLink } = useTrack()

const handleClickMessi = (type, content, url, event) => {
  trackFooterListLink(type, content, url)
}
</script>

<style lang="less" scoped>
.top-offset {
  margin-top: -20px;
}
.bottom-offset {
  margin-top: 50px;
}

.footer-item-title {
  margin-bottom: 24px;
}
// .nav-item {
a.nav-item {
  &:not(:first-of-type) {
    margin-top: 12px;
  }

  .arrow-right {
    margin-left: 5px;
    visibility: hidden;
    // transform: translate(-10px, 0px);
    opacity: 0;
    @apply ltr:-translate-x-10px rtl:translate-x-10px rtl:rotate-y-180;
  }
  .football {
    margin-bottom: 10px;
    visibility: hidden;
    opacity: 0;
  }
  &:hover {
    .arrow-right {
      visibility: visible;
      opacity: 1;
      transition: all 0.25s ease-out;
      @apply translate-x-0 rtl:rotate-y-180;
    }
  }
}
// }
</style>
