import { defineStore } from '@/utils/store'
import { useFooter } from './useFooter'
import { useTrackTool } from '@/compositions/useTrackTool'

export const useTrack = defineStore(() => {
  const { footerProps } = useFooter()
  const { click, expose, registerExposeEvent } = useTrackTool(footerProps)

  /** 下载二维码曝光 */
  const trackQRCodeExpose = () => {
    expose({
      event_tracking: 'bg_web_exchange_base_navbar:app_download_qrcode_exposure',
      event_tracking_id: 'b954'
    })
  }

  const trackLogoClick = () => {
    click({
      event_tracking: 'bg_web_exchange_base_navbar:back_click',
      event_tracking_id: 'b1196',
      timely: 1
    })
  }

  const trackLanguageClick = () => {
    click({
      event_tracking: 'bg_web_exchange_base_navbar:language_selected_click',
      event_tracking_id: 'b957'
    })
  }

  const trackLogoutClick = () => {
    click({
      event_tracking: 'bg_web_exchange_base_navbar:user_list_log_out_click',
      event_tracking_id: 'b1198',
      timely: 1
    })
  }

  // footer 点击链接埋点
  const trackFooterListLink = (type: string, content: string, url: string) => {
    if (url.includes('http:')) {
      url = `${window.location.origin}${url}`
    }
    try {
      if (type === 'Copy Trading') {
        if (url.indexOf('copy-trading/futures') > -1) {
          click({
            event_tracking: 'bg_web_exchange_footer:futures_copytrade_click',
            event_tracking_id: 'b2278',
            event_tracking_ext: {
              type,
              content,
              url
            }
          })
        } else if (url.indexOf('copy-trading/spot') > -1) {
          click({
            event_tracking: 'bg_web_exchange_footer:spot_copytrade_click',
            event_tracking_id: 'b2280',
            event_tracking_ext: {
              type,
              content,
              url
            }
          })
        } else if (url.indexOf('strategy-trading/square') > -1) {
          click({
            event_tracking: 'bg_web_exchange_footer:strategy_copytrade_click',
            event_tracking_id: 'b2281',
            event_tracking_ext: {
              type,
              content,
              url
            }
          })
        } else {
          click({
            event_tracking: 'bg_web_exchange_base_footer:entry_click',
            event_tracking_id: 'b963',
            event_tracking_ext: {
              type,
              content,
              url
            }
          })
        }
      } else if (type === 'Service') {
        if (content === 'Institutional Services') {
          click({
            event_tracking: 'bg_web_exchange_base_home:institutional_services_click',
            event_tracking_id: 'b403'
          })
        } else {
          click({
            event_tracking: 'bg_web_exchange_base_footer:entry_click',
            event_tracking_id: 'b963',
            event_tracking_ext: {
              type,
              content,
              url
            }
          })
        }
      } else if (type === 'Products') {
        // 点击buy crypto 埋点
        if (url.indexOf('buy-sell-crypto') > -1) {
          click({
            event_tracking: 'bg_web_exchange_homepage_footer:buycrypto_click',
            event_tracking_id: 'b3016'
          })
        } else {
          click({
            event_tracking: 'bg_web_exchange_base_footer:entry_click',
            event_tracking_id: 'b963',
            event_tracking_ext: {
              type,
              content,
              url
            }
          })
        }
      } else {
        click({
          event_tracking: 'bg_web_exchange_base_footer:entry_click',
          event_tracking_id: 'b963',
          event_tracking_ext: {
            type,
            content,
            url
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  // footer 曝光
  const trackExposeFooter = (el: HTMLElement) => {
    try {
      registerExposeEvent({
        el,
        event_tracking: 'bg_web_exchange_base_footer:entry_exposure',
        event_tracking_id: 'b962'
      })
    } catch (err) {
      console.error(err)
    }
  }

  // // footer 社交媒体埋点
  const trackFooterSocialContact = (content, url) => {
    try {
      click({
        event_tracking: 'bg_web_exchange_base_footer:social_click',
        event_tracking_id: 'b965',
        event_tracking_ext: {
          content,
          url
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  // 网页端唤起APP 曝光
  const guideExposeApp = (el: HTMLElement) => {
    try {
      registerExposeEvent({
        el,
        event_tracking: 'bg_web_exchange_base:app_download_guide_exposure',
        event_tracking_id: 'b2713',
        business1: 'base'
      })
    } catch (err) {
      console.error(err)
    }
  }

  // 网页端唤起APP 点击
  const guideExchangeApp = () => {
    try {
      click({
        event_tracking: 'bg_web_exchange_base:app_download_guidee_click',
        event_tracking_id: 'b2714',
        business1: 'base'
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    trackQRCodeExpose,
    trackLogoClick,
    trackLanguageClick,
    trackLogoutClick,
    trackExposeFooter,
    trackFooterListLink,
    trackFooterSocialContact,
    guideExposeApp,
    guideExchangeApp
  }
})
