import Clipboard from 'clipboard'
import { browser } from './utils'

/**
 * 获取网络类型
 */
export function getNetworkType() {
  // @ts-ignore
  if (browser().android && navigator?.connection?.type) {
    // @ts-ignore
    return navigator.connection.type
  }

  const network = (navigator.userAgent.match(/NetType\/\w+/)?.[0] || 'NetType/other').replace(
    /nettype\//i,
    ''
  )
  const type =
    {
      wifi: 'WIFI',
      '5g': '5G',
      '4g': '4G',
      '3g': '3G',
      '3gnet': '3G',
      '2g': '2G'
    }[network] || ''

  return type
}

/** 获取屏幕尺寸 */
export function getScreenSize() {
  return {
    width: Math.floor(window.screen.width * window.devicePixelRatio),
    height: Math.floor(window.screen.height * window.devicePixelRatio)
  }
}

export function copy(text: string) {
  const run = () => {
    const $button = document.createElement('button')
    var clipboard = new Clipboard($button, {
      text: () => text,
      action: () => 'copy'
    })
    clipboard.on('success', () => clipboard.destroy())
    clipboard.on('error', () => clipboard.destroy())
    $button.click()
  }
  if (isIOS()) {
    setTimeout(() => run())
  } else {
    run()
  }
}

/***
 * 判断是否移动端
 */
export function isMobile() {
  return (
    typeof window !== 'undefined' &&
    !!navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  )
}

/**
 * 判读是否bitkeep
 */
export function isBitKeep() {
  return typeof window !== 'undefined' && navigator.userAgent.indexOf('BitKeep') > 0
}

/***
 * 判断是否ios
 */
export function isIOS() {
  const u = navigator.userAgent
  return isMobile() && !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
