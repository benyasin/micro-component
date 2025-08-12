/**
 * Copy from Web_Separation
 */

import queryString from 'query-string'
import LocalCookie, { CookieKey } from './request/localCookie'
import { appMethods } from './request/appMethod'

// SEO可覆盖的inviteCode
const SEO_INVITE_CODE = [
  'uaih',
  'ohci',
  'p7op',
  'ax3m',
  '2jh1',
  '4z5o',
  'havu',
  'c969',
  'b4wb',
  '70kx',
  'xvzz',
  'yt22',
  'vish',
  'clmw',
  'q4ne',
  'cjpi',
  'igvr',
  'gas4',
  '3psq',
  'skte',
  'jebi',
  'tnkc',
  'imlw',
  '6jqp',
  'b6ex',
  'sdcg',
  'unoi',
  '6vuh',
  'iewd',
  'hxic',
  'suqf',
  'rewk',
  '5br8',
  'yuek',
  '03em',
  '6wws',
  'fgwv',
  'nzry',
  'dln4',
  'qpft',
  'mdba',
  'jjxj',
  'gnjn',
  'nxmb',
  '1g1w',
  'ki7e',
  'auvq',
  'nodw',
  'ejaw',
  'shyy',
  '5g9m',
  'saug',
  '1s2d',
  'blgz',
  'bua0',
  'ycs9',
  'eqne',
  'dyhg',
  '9zca',
  'z49p',
  'xzzg',
  '1fl5',
  '35ym',
  'jgr1',
  'jqa0',
  'oiuk',
  'x6eb',
  'ueuw',
  'ywcr',
  'qxqx',
  '4cbr',
  'bmcz',
  'y1py',
  '4glm',
  'kswm',
  'pwxi',
  'duqj',
  'z9dc',
  'yuwq',
  'r5am',
  'j3ow',
  '7jj6',
  '3na6',
  'ojwl',
  'jfgj',
  'zo4w',
  'ienl',
  'noiw',
  'jbna',
  'dh4i',
  'wokz',
  'a7za',
  'wmaf',
  'h0is',
  'rvbt',
  'rr7o',
  'p26e',
  '6jhc',
  'vzdo',
  'vhgc',
  'id8d',
  '23iv',
  'srqf',
  'r82v',
  'ax0b',
  'lyc1',
  'wpif',
  'drjn',
  '3flw',
  'r01c',
  'bbjx',
  'uo68',
  'aiqz',
  'acxi',
  'gnzd',
  'rgr7',
  'bhdy',
  'nplw',
  'pwnv',
  '1wvz',
  'TurkeyTR'
]

//
const TYPE_NAVIGATOR = [
  'google.',
  'bing.',
  'search.naver.',
  'yandex.',
  'search.yahoo.',
  'duckduckgo.',
  'ecosia.',
  'baidu.',
  'search.daum.',
  'qwant.',
  'search.brave.'
]

export const getAppDownloadUrl = (lang: string, type?: 1 | 2, isApk?: boolean) => {
  if (!process.client) {
    return ''
  }

  // 二维码下载App的SEO归因
  let queryObj = {}
  const searchList = location?.search?.substring(1)?.split('&') || []
  searchList.forEach((item) => {
    let i = item?.split('=') || []
    i[0] && (queryObj[i[0]] = i[1] || '')
  })

  const inviteCode = queryObj?.vipCode || ''
  const sourceReferer = sessionStorage.getItem('sourceReferer')
    ? `${JSON.parse(sessionStorage.getItem('sourceReferer')).replace(
        /^https?:\/\/(www\.)?(([\s\S]*))(com|net)(([\s\S]*))?/,
        '$2'
      )}`
    : ''
  const isCode =
    TYPE_NAVIGATOR.includes(sourceReferer) &&
    ((inviteCode && SEO_INVITE_CODE.includes(inviteCode)) || !inviteCode)
  const newQuery = isCode ? '?channelCode=SSSS&vipCode=s1pz&groupId=230932' : ''
  if ((lang === 'zh-CN' && location.hostname.indexOf('bitget.com') === -1) || isApk) {
    return `${location.origin}/${lang}/download${newQuery}`
  }
  if (type === 1) {
    return `https://play.google.com/store/apps/details?id=com.bitget.exchange`
  }
  if (type === 2) {
    return `https://apps.apple.com/app/id1442778704`
  }

  return lang === 'en'
    ? `${location.origin}/download${newQuery}`
    : `${location.origin}/${lang}/download${newQuery}`
}

/**
 * Copy from Web_Separation get appStore url
 */
export const getAppDownloadStoreUrl = (type?: 1 | 2) => {
  if (!process.client) {
    return ''
  }
  if (type === 1) {
    return `https://play.google.com/store/apps/details?id=com.bitget.exchange`
  }
  if (type === 2) {
    return `https://apps.apple.com/app/id1442778704`
  }
}

/***
 * 数字千分位 国际化处理
 */
export const number2Thousands = (locale, num) => {
  let newNumber = num ? Number(num) || 0 : 0
  return newNumber.toLocaleString('en', { maximumFractionDigits: 16 })
}
/***
 * 判断安卓还是ios
 */
export let isIos = () => {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    return true
  } else {
    return false
  }
}
// Copy from Web_Separation 判断终端访问
export let browser = () => {
  var u = navigator.userAgent
  return {
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
    iPad: u.indexOf('iPad') > -1, //是否iPad
    safari: /Safari/.test(u) && !/Chrome/.test(u) //是否Safar浏览器
  }
}
/**
 * 金额格式化
 * @param {number} amount 金额
 * @param {boolean} [isRound] 是否四舍五入 默认否
 * @param {string} [splitStr] 是否使用分隔符 默认否
 * @param {number} [digits] 小数位数
 * @param {boolean} [endZero] 末尾是否加0
 * @param {boolean} [isNewAssetsRevision] 资产改版千分符
 * @param { String}  [locale] 语言
 * @returns {string} 格式化后的数字，默认两位小数 formatMoney("12345.675910", 3)
 */
export function formatMoney(
  amount,
  isRound = false,
  splitStr = '',
  digits = null,
  endZero = false,
  isNewAssetsRevision,
  locale
) {
  if (amount === null || amount === '' || isNaN(amount)) {
    return '0'
  } else {
    amount = parseFloat((amount + '').replace(/[^\d\.-]/g, ''))
    if (digits === null) {
      if (amount.toString().indexOf('.') > -1) {
        digits = amount.toString().split('.')[1].length
      } else {
        digits = 0
      }
    }
    if (isRound) {
      amount = amount.toFixed(digits) + ''
    } else {
      amount = amount.toFixed(digits + 1)
      amount = amount.substring(0, amount.toString().length - 1)
    }
    let l = amount.split('.')[0].split('').reverse()
    let r = amount.split('.')[1]
    let t = ''
    if (splitStr) {
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? splitStr : '')
      }
    } else {
      for (let i = 0; i < l.length; i++) {
        t += l[i]
      }
    }
    // 末尾是否加0
    if (endZero) {
      r = '.' + r
    } else {
      r = r > 0 ? '.' + r : ''
    }

    const moneyStr = t.split('').reverse().join('') + r
    if (isNewAssetsRevision) return number2Thousands(locale, moneyStr)
    return moneyStr
  }
}

/** 将科学计数法转化为小数 */
export function toNonExponential(num) {
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}

export function isMobile() {
  return document.documentElement.clientWidth < 768
}

/**
 * 阿拉伯语环境需要将百分比涨跌幅由+2.5% 转换成%-2.5
 * @param {boolean} [addZeroPlus] 零的时候添加+号
 * @param {string} [prefixUnit] 前缀单位 默认 %
 * @param {boolean} [hasSymbol] 是否添加 +/-
 * @param {boolean} [addThousandsSeparator] 是否添加千位分隔符
 */
export function convertPercentage(
  percentageStr,
  prefixUnit = '%',
  addZeroPlus = false,
  hasSymbol = true,
  addThousandsSeparator = false
) {
  const percentageNum = parseFloat(percentageStr) // 先转换成数值
  let result = '' // 最终结果
  if (isNaN(percentageNum)) {
    // 如果不是数值，直接返回原字符串
    result = percentageStr
  } else {
    if (percentageNum > 0) {
      const num = addThousandsSeparator ? number2Thousands('ar', percentageNum) : percentageNum
      result = `${hasSymbol ? '+' : ''}${prefixUnit}${num}`
    } else if (percentageNum < 0) {
      const num = addThousandsSeparator
        ? number2Thousands('ar', Math.abs(percentageNum))
        : Math.abs(percentageNum)
      result = `${hasSymbol ? '-' : ''}${prefixUnit}${num}`
    } else {
      result = addZeroPlus ? `${hasSymbol ? '+' : ''}${prefixUnit}0` : `${prefixUnit}0`
    }
  }
  return result
}

/**
 * 获取币单位
 */
export function getCoinUnit(pricedSymbol: string) {
  if (!pricedSymbol) {
    return '$'
  }
  if (pricedSymbol === 'BTC') {
    return '฿'
  }
  if (pricedSymbol === 'ETH') {
    return 'E'
  }
  if (pricedSymbol.indexOf('USDT') > -1) {
    return '₮'
  }
  return '$'
}

/***
 * swap币价格规则
 * @param {string} price 价格
 */
export const formatSwapPrice = (price) => {
  price = String(price)
  if (isNaN(price)) return ''
  if (price == 0) return '0.00'
  // 价格大于等于1U的代币，四舍五入后，显示小数点后2位
  if (price >= 1) {
    return Number(price).toFixed(2)
  } else {
    // 小数点后面是否以0开头,不为0，直接显示4位
    let index = price.indexOf('.')
    if (price[index + 1] != 0) {
      return Number(price).toFixed(4)
    }
    // 计算小数点后连续0的个数
    // 0.01234      -> 1
    // 0.00001234   -> 4
    let zeroLength = 0
    // 保留小数点前面的值
    let preNum = price.split('.')[0]
    // 截取小数点后的值，并且转成array，计算zeroLength的长度
    let zeroPriceArr = price.substring(index + 1).split('')
    for (let i = 0; i < zeroPriceArr.length; i++) {
      if (zeroPriceArr[i] == 0) {
        zeroLength += 1
      } else {
        break
      }
    }
    let fixedNum = zeroLength + 4
    // 四舍五入后的值
    let value = Number(price).toFixed(fixedNum)
    let zeroIdx = value.indexOf('.')
    let nextNum = value.substring(zeroIdx + 1 + zeroLength)
    // 求出转换后是否有进制的情况存在
    // 示例
    // 0.00009999 -> 0.00010000
    let newZeroLength = 0
    // 保留小数点前面的值
    let newPreNum = value.split('.')[0]
    // 截取小数点后的值，并且转成array，计算zeroLength的长度
    let newZeroPriceArr = value.substring(index + 1).split('')
    for (let i = 0; i < newZeroPriceArr.length; i++) {
      if (newZeroPriceArr[i] == 0) {
        newZeroLength += 1
      } else {
        break
      }
    }
    // 示例
    // 0.00001234 -> 0.0{4}1234
    // 0.0001234 -> 0.0001234
    if (zeroLength >= 4 && newZeroLength == zeroLength) {
      return `${preNum}.{${zeroLength}}${nextNum}`
    } else {
      return value
    }
    // 后置除了连续0的数字
    // return Number(price).toFixed(fixedNum)
  }
}

/**
 * 获取业务线businessLine类型：现货spot-1；合约futures-10/11/12；swap-22
 */
export const getBizType = (param: any) => {
  if (typeof param === 'string' || typeof param === 'number') {
    switch (param.toString()?.toLowerCase()) {
      // 现货
      case '1':
        return 'spot'
      // 合约
      case '10':
      case '11':
      case '12':
        return 'futures'
      // megaswap
      case '22':
        return 'swap'
      default:
        return ''
    }
  }

  if (typeof param === 'object' && param.hasOwnProperty('swapTokenId')) {
    return 'swap'
  }
}

/**
 * 判断是否是数字
 * @param {} value
 * @returns
 */
export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * 转换每个位置的数字为0  123,456.789 => 000,000.000
 * @param {*} value
 * @returns
 */
export const resetNumberToZero = (value) => {
  if (value.toString) {
    return value
      .toString()
      .split('')
      .map((item) => {
        return isNumeric(item) ? 0 : item
      })
      .join('')
  }
  return value
}

/**
 * query参数多转一 例如：'123,456' => '123'
 * @param {any} params
 * @returns {string}
 */
export const multipleToSingle = (params) => {
  if (typeof params === 'string') {
    return params.split(',')[0]
  } else if (typeof params === 'number') {
    return params
  } else if (Array.isArray(params)) {
    return params[0] || ''
  }
  return ''
}

// 获取缓存，判断是否过期
export const localStorageGet = (name) => {
  const storage = localStorage.getItem(name)
  const time = new Date().getTime()
  let result = {}
  if (storage) {
    const obj = JSON.parse(storage)
    if (time <= obj.time && time <= obj?.data?.effectiveEndTime) {
      result = obj.data
    } else {
      localStorage.removeItem(name)
    }
  }
  return result
}

// 获取渠道码
export const getLocalCodeStorage = () => {
  const LocalChannelCodeKey = 'bt_register_channelCode'
  const LocalVipCodeKey = 'bt_register_vipCode'
  const localActCodeKey = 'bt_register_actCode'
  const LocalClacCodeKey = 'bt_register_clacCode'
  const LocalCommonCodeKey = 'bt_register_commonCode'
  const LocalGroupIdKey = 'bt_register_groupId'

  const { query = {} } = queryString.parseUrl(location.href)
  let data = {}
  // 主站逻辑: 但凡url有其中一个，则全部从url中获取
  if (
    query.channelCode ||
    query.vipCode ||
    query.clacCode ||
    query.groupId ||
    query.commonCode ||
    query.actCode
  ) {
    data = {
      registerVipNo: multipleToSingle(query.vipCode),
      registerChannel: multipleToSingle(query.channelCode),
      clacCode: multipleToSingle(query.clacCode),
      commonCode: multipleToSingle(query.commonCode),
      // 短链服务的 groupId
      groupId: multipleToSingle(query.groupId),
      actCode: multipleToSingle(query.actCode)
    }
  } else {
    const codeKey = localStorageGet('local_code_key')
    data = {
      registerVipNo: multipleToSingle(codeKey[LocalVipCodeKey]),
      registerChannel: multipleToSingle(codeKey[LocalChannelCodeKey]),
      clacCode: multipleToSingle(codeKey[LocalClacCodeKey]),
      commonCode: multipleToSingle(codeKey[LocalCommonCodeKey]),
      // 短链服务的 groupId
      groupId: multipleToSingle(codeKey[LocalGroupIdKey]),
      actCode: multipleToSingle(codeKey[localActCodeKey])
    }
  }

  data = {
    ...data,
    invitationCode: multipleToSingle(query.invitationCode),
    captain: multipleToSingle(query.captain),
    utmSource: multipleToSingle(query.utmSource || query.utm_source), // 广告系列来源
    utmMedia: multipleToSingle(query.utmMedia || query.utm_media), // 广告系列媒介
    utmCampaign: multipleToSingle(query.utmCampaign || query.utm_campaign), // 广告系列名称
    utmTerm: multipleToSingle(query.utmTerm || query.utm_term), // 广告系列字词
    utmContent: multipleToSingle(query.utmContent || query.utm_content)
  }

  // 移除空值
  // 和主站逻辑一致，值为0也移除
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      delete data[key]
    }
  })

  return data
}

export const loadScript = (url, cb, timeout = 10000) => {
  var script = document.createElement('script')
  var head = document.getElementsByTagName('head')[0]
  script.charset = 'UTF-8'
  script.async = true

  script.onerror = function () {
    cb(true)
    // 错误触发了，超时逻辑就不用了
    loaded = true
  }
  var loaded = false
  script.onload = script.onreadystatechange = function () {
    if (
      !loaded &&
      (!script.readyState || 'loaded' === script.readyState || 'complete' === script.readyState)
    ) {
      loaded = true
      setTimeout(function () {
        cb(false)
      }, 0)
    }
  }
  script.src = url
  head.appendChild(script)

  setTimeout(function () {
    if (!loaded) {
      script.onerror = script.onload = null
      script.remove && script.remove()
      cb(true)
    }
  }, timeout || 10000)
}
