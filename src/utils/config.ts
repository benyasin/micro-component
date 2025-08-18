import { readonly } from 'vue'

/** 默认法币列表 */
export const defaultCurrencyList = readonly([
  {
    symbol: '$',
    name: 'USD',
    value: 'USDT_USD',
    type: 'USD'
  },
  {
    symbol: '₩',
    name: 'krw',
    value: 'usdt_krw',
    type: 'KRW'
  },
  {
    symbol: 'Ұ',
    name: 'jpy',
    value: 'usdt_jpy',
    type: 'JPY'
  },

  {
    symbol: '₫',
    name: 'vnd',
    value: 'usdt_vnd',
    type: 'VND'
  },
  {
    symbol: '₽',
    name: 'rub',
    value: 'usdt_rub',
    type: 'RUB'
  },
  {
    symbol: '€',
    name: 'EUR',
    value: 'usdt_eur',
    type: 'EUR'
  },
  {
    symbol: '₺',
    name: 'try',
    value: 'usdt_try',
    type: 'TRY'
  },
  {
    symbol: '￥',
    name: 'cny',
    value: 'usdt_cny',
    type: 'CNY'
  },
  {
    symbol: 'NT$',
    name: 'twd',
    value: 'usdt_twd',
    type: 'TWD'
  },

  {
    symbol: 'Rp',
    name: 'IDR',
    value: 'usdt_IDR',
    type: 'IDR'
  },
  {
    symbol: '₱',
    name: 'php',
    value: 'usdt_php',
    type: 'PHP'
  },
  {
    symbol: 'HKD',
    name: 'HKD',
    value: 'usdt_hkd',
    type: 'HKD'
  },
  {
    symbol: '฿',
    name: 'THB',
    value: 'usdt_thb',
    type: 'THB'
  }
])

/** 默认语言列表 */
export const defaultLanguageList = readonly([
  {
    locale: 'en',
    languageKey: 'en_US',
    languageName: 'English',
    languageType: 0,
    requestMessage: {
      tip: 'Tip',
      timeout: 'Request timed out!',
      expired: 'Login expired, please log in again',
      loginvalid: 'Please login to visit',
      unknow: 'The system is busy',
      notfound: 'Request error',
      forbidden: 'Request is forbidden'
    }
  },
  {
    locale: 'zh-CN',
    languageKey: 'zh_CN',
    languageName: '简体中文',
    languageType: 1,
    requestMessage: {
      tip: '提示',
      timeout: '请求超时!',
      expired: '登录过期,请重新登录',
      loginvalid: '请登录访问',
      unknow: '系统繁忙',
      notfound: '请求错误',
      forbidden: '请求被禁止'
    }
  }
])

/**
 * 涨跌幅时区key
 */
export const ChangeTimezoneLocalstorageKey = 'bitget:change:timezone'

/**
 * 目前仅支持-12-0-+12共25个时区，小数点等特殊时区暂不考虑
 * 数据与getTimezoneOffset对应
 */
export const SupportedChangeTimezone = [
  -720, -660, -600, -540, -480, -420, -360, -300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300,
  360, 420, 480, 540, 600, 660, 720
]

export const Last24HOption = 'last24h'

/**
 * 获取时区显示
 * getTimezoneOffset -480 => 8
 * @param offset
 */
export function getTimezoneDisplayByOffset(offset) {
  let n = -offset / 60
  return `UTC ${(n > 0 ? '+' : '') + n}, 00:00`
}

/**
 * 转换为后端使用参数
 * getTimezoneOffset -480 => 28800
 * @param offset
 */
export function getTimezonePostParamValue(offset) {
  return -offset * 60
}

export function getLocalChangeTimezone() {
  let temp = localStorage.getItem(ChangeTimezoneLocalstorageKey)
  // 检查一下有没有被修改
  if (SupportedChangeTimezone.some((i) => String(i) === temp) || (temp = Last24HOption)) {
    return temp
  } else {
    return Last24HOption
  }
}
