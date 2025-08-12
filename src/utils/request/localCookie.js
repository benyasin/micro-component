import Cookies from 'js-cookie'

export const LocalCookieKey = 'BITGET_LOCAL_COOKIE'

const CookieKey = {
  // 网站语言 默认 en
  LANG: 'bitget_lang',
  // 折合货币单位  默认CNY
  UNIT: 'bitget_unit',
  // 新的法币汇率单位
  CURRENCY: 'bitget_currency',
  // 资产显示隐藏  默认 false
  SHOWASSET: 'bitget_showasset',
  //资产折合估值单位
  VALUATIONUNIT: 'bitget_valuationunit',
  // 交易区 主题 默认 dark
  THEME: 'bitget_theme',
  // 交易区布局
  LAYOUT: 'bitget_layout',
  //登录标识
  LOGIN: 'bitgt_login'
}

const LocalCookie = {
  ready: false,
  /**
   * 保存的默认data
   */
  data: {
    [CookieKey.LANG]: '',
    [CookieKey.UNIT]: 'USD',
    [CookieKey.CURRENCY]: '',
    [CookieKey.SHOWASSET]: true,
    [CookieKey.THEME]: 'black',
    [CookieKey.LAYOUT]: 'right',
    [CookieKey.VALUATIONUNIT]: 1,
    [CookieKey.LOGIN]: false
  },
  /**
   * 从cookie中将缓存加载到本实例
   */
  init() {
    try {
      const localData = Cookies.get(LocalCookieKey)
      const local = localData ? JSON.parse(localData) : ''
      if (local) {
        // 防止数据缺失
        Object.assign(this.data, local)
      }
    } catch (e) {
      console.error('本地缓存数据被破坏，使用初始值', e)
    } finally {
      this.ready = true
    }
  },
  get(key) {
    this.init()
    return this.data[key]
  },
  set(key, value) {
    if (!key) {
      return
    }
    if (!this.ready) {
      this.init()
    }
    if (this.data[key] === value) {
      return
    }
    this.data[key] = value
    try {
      Cookies.set(LocalCookieKey, JSON.stringify(this.data), { expires: 365 })
    } catch (e) {
      console.error('Local cookie Error:', e)
    }
  }
}

export { CookieKey }
export default LocalCookie
