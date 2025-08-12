import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useProps } from '@/compositions/useProps'
import { getConfig } from './config'
import { Props, Config } from './types'
import { useI18n } from '@/compositions/useI18n'
import { useSize } from '@/compositions/useSize'
import { useSocialMedia } from './useSocialMedia'
import { useEvent } from '@/compositions/useEvent'
import { Events } from '@/components/Header/types'
import { defineStore } from '@/utils/store'
import { pushQueue } from '@/utils/queue'
import { debounce } from 'lodash-es'
import IconMediaMoreLight from '@/assets/footer/icon-media-more-light.png'
import IconMediaMoreLightHover from '@/assets/footer/icon-media-more-light-hover.png'
import IconMediaMoreDark from '@/assets/footer/icon-media-more-dark.png'
import IconMediaMoreDarkHover from '@/assets/footer/icon-media-more-dark-hover.png'

export const useFooter = defineStore((defaultProps?: Props) => {
  const { props: footerProps, updateProps } = useProps(defaultProps)
  const event = useEvent<Events>()
  const { formatLocalPath, t, locale } = useI18n()
  const { winWidth } = useSize()
  const config = ref<Config>()
  const { footerApiRes } = useSocialMedia()

  const mergeConfig = (source: Partial<Config>, target: Partial<Config>) => {
    config.value = {
      describe: target.describe || source.describe,
      copyright: target.copyright || source.copyright,
      list: target.list || source.list,
      community: target.community || source.community
    }
  }

  const initConfig = () => {
    const defaultConfig = getConfig(locale.value, formatLocalPath, footerProps.value.builderAds)
    mergeConfig(defaultProps, defaultConfig)
  }

  const fetchFooterInfo = async () => {
    let { contacts = [], community = [] } = footerApiRes.value?.data || {}

    if (footerApiRes.value?.code === '00000') {
      if (!footerProps.value.community?.list) {
        config.value.community.list = contacts.map((item) => ({
          title: item?.mainKeyName,
          contact: item?.viceKeyName,
          link: item?.link
        }))
      }

      if (!footerProps.value.community?.iconLinkList) {
        const isSpecialLang = ['de', 'nl', 'pl', 'sv'].includes(footerProps.value.locale)
        // 以下语言下把 Telegram 放第一位 Telegram 需要单独换行
        if (isSpecialLang) {
          const index = community.findIndex((item) => item.mainKeyName === 'Telegram')
          if (index > -1) {
            const telegram = community[index]
            community.splice(index, 1)
            community.unshift(telegram)
          }
        }

        const telegramList = (community || []).filter(
          (item) => item?.mainKeyName.startsWith('Telegram') && item?.mainKeyName !== 'Telegram'
        )
        config.value.community.iconLinkList = (community || [])
          .filter(
            (item) =>
              !(item?.mainKeyName.startsWith('Telegram') && item?.mainKeyName !== 'Telegram')
          )
          .map((item) => {
            const iconItem = {
              name: item?.mainKeyName,
              title: t('common_footer.follow_us', [item?.mainKeyName]),
              url: item?.link,
              img: item?.icon,
              lightIcon: item?.whiteIcon,
              darkIcon: item?.blackIcon,
              lightHoverIcon: item?.whiteHoverIcon,
              darkHoverIcon: item?.blackHoverIcon,
              telegramList: null
            }
            if (iconItem.name === 'Telegram' && telegramList.length > 0) {
              iconItem.telegramList = telegramList.concat([item])
            }
            return iconItem
          }).concat([{
            name: 'more',
            title: t('common_global_dialog.more'),
            url: formatLocalPath('/bitget-community'),
            img: IconMediaMoreLight,
            lightIcon: IconMediaMoreLight,
            darkIcon: IconMediaMoreDark,
            lightHoverIcon: IconMediaMoreLightHover,
            darkHoverIcon: IconMediaMoreDarkHover,
            telegramList: null
          }])
      }
    }
  }

  watch(
    [() => footerApiRes.value?.data],
    () => {
      if (typeof window !== 'undefined') {
        initConfig()
        pushQueue(() => {
          fetchFooterInfo()
        }, 2000)
      }
    },
    { immediate: true }
  )

  let preWinWidth = winWidth.value
  const handleResize = debounce(() => {
    if (Math.abs(preWinWidth - winWidth.value) > 10) {
      initConfig()
      fetchFooterInfo()
    }
    preWinWidth = winWidth.value
  }, 300)

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  initConfig()

  return {
    footerProps,
    updateProps,
    fetchFooterInfo,
    mergeConfig,
    config,
    on: event.on,
    emit: event.emit,
    event
  }
})
