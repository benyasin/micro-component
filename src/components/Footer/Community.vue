<template>
  <div pc="w-190px" at-ipad="flex-none flex flex-col-reverse">
    <div
      class="!ml-0 text-primaryText relative z-10 overflow-hidden h-full"
      pc="text-fs14 leading-22px"
    >
      <div at-ipad="pt-5 pb-4 h-full">
        <Logo lt-pc="hidden" class="inline-block logo-bl" />
        <div class="flex-none copyright mb-20px" at-ipad="hidden" lt-ipad="hidden">
          Trade smarter
        </div>
        <template v-if="config?.community?.iconLinkList?.length > 0">
          <div pc="my-20px" lt-ipad="hidden">
            <div
              class="mt-3"
              :lt-pc="config?.rtlSupport ? 'flex items-center pb-6 flex-wrap ltr:children:mr-5 rtl:children:ml-5' : 'flex items-center pb-6 flex-wrap children:mr-5'"
              pc="grid grid-cols-5 gap-y-3"
            >
              <div
                v-for="item in config.community.iconLinkList"
                :key="item.img"
                class="flex items-center justify-center overflow-hidden cursor-pointer w-24px w-24px"
                lt-pc="mr-20px mb-20px"
              >
                <template v-if="item.name === 'Telegram' && item.telegramList?.length > 0">
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
                    <span class="logo-item block relative">
                      <img
                        class="m-3px w-24px h-24px rounded-1/2"
                        :src="item[`${footerProps.theme}Icon`]"
                        :title="item.title"
                        :alt="item.name"
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        class="absolute top-0 left-0 m-3px w-24px h-24px rounded-1/2 invisible"
                        :src="item[`${footerProps.theme}HoverIcon`]"
                        :title="item.title"
                        :alt="item.name"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  </BitTooltip>
                </template>
                <MediaLogo 
                  v-else
                  :url="item.url"
                  :title="item.title"
                  :name="item.name"
                  :iconSrc="item[`${footerProps.theme}Icon`]"
                  :iconHoverSrc="item[`${footerProps.theme}HoverIcon`]"
                />
              </div>
            </div>
          </div>
        </template>

        <div v-if="winWidth >= 1200" lt-pc="hidden">
          <Qrcode />
        </div>

        <div
          class="text-thirdText text-fs14 mb-15px"
          pc="pb-44px space-y-5 mt-6"
          lt-ipad="hidden"
          :at-ipad="config?.rtlSupport ? 'flex items-center ltr:children:mr-5 rtl:children:ml-5' : 'flex items-center children:mr-5'"
        >
          <div v-for="(item, index) in config.community.list" :key="index" at-ipad="w-162px">
            <div class="leading-22px text-primaryText">
              {{ t(item.title) }}
            </div>
            <a
              class="contact-item cursor-pointer flex items-center justify-start leading-18px text-contentTertiary mt-6px gap-3px hover:text-contentSecondary"
              :href="item.link"
              v-if="item.contact?.toLowerCase()?.includes('telegram')"
            >
              <TelegramIcon />
              <span class="text-fs12">{{ t(item.contact) }}</span>
            </a>
            <a
              class="contact-item cursor-pointer flex items-center justify-start leading-18px text-contentTertiary mt-6px gap-3px hover:text-contentSecondary"
              :href="'mailto: ' + item.contact"
              v-else
            >
              <EnvelopeIcon />
              <span class="text-fs12">{{ t(item.contact) }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/compositions/useI18n'
import { useSize } from '@/compositions/useSize'
import { useFooter } from './useFooter'
import { useTrack } from './useTrack'
import Qrcode from './Qrcode.vue'
import { Tooltip } from 'ant-design-vue'
const { t, locale } = useI18n()
const { winWidth } = useSize()
const { config, footerProps } = useFooter()
const { trackFooterSocialContact } = useTrack()
import EnvelopeIcon from '@/assets/footer/envelope-simple.svg?component'
import TelegramIcon from '@/assets/footer/contact-telegram-icon.svg?component'
import Logo from './Logo.vue'
import MediaLogo from './components/MediaLogo.vue'

function open(url: string) {
  if (!url) return
  window.open(url, '_blank')
}
</script>

<style scoped lang="less">
// 为了SSG时可以显示正确的Logo，这里用CSS来控制深浅Logo的显示，不能动态拼接src
.logo {
  @apply hidden w-132px h-54px;
}
.logo.rtl-enabled {
  @apply !rtl:rotate-y-0;
}
.logo-light {
  @apply inline-block;
}

.contact-item {
  .envelope {
    fill: var(--content-tertiary);
  }
  &:hover {
    .envelope {
      fill: var(--content-secondary);
    }
  }
}

.telegram-item {
  cursor: pointer;
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
.logo-item:hover {
  img + img {
    visibility: visible;
  }
}
</style>
<style lang="less">
.mi-popper.telegram-popper {
  padding: 6px !important;

  &.is-light {
    --mi-bg-color-popup: #fff;
    border: solid 1px var(--color-line) !important;
  }
  &.is-dark {
    --mi-bg-color-popup: #303133;
  }
}
</style>
