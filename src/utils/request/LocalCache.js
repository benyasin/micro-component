const LocalStorageKey = 'BITGET_LOCAL_CACHE'

export const CacheKey = {
  AUTO_STRATEGY_PRODUCTION: 'AUTO_STRATEGY_PRODUCTION',
  CHANGE_MODE_WITHOUT_DIALOG: 'change_mode_without_dialog',
  GLOBAL_LOCALE: 'global_locale',
  GLOBAL_THEME: 'global_theme',
  GLOBAL_LAYOUT: 'global_layout',
  TERMINAL_CODE: 'terminal_code',
  KLINE_INTERVAL: 'kline_interval',
  SPOT_LAYOUT: 'spot_layout',
  OVERALL_THEME: 'overall_theme', // 真·全局切换主题用
  SPOT_PLAN_TIP: 'spot_plan_tip,',
  BACK_HAND_TIP: 'backhand_tip',
  RECHARGE_PROMPT_TIME: 'recharge_prompt_time',
  WITHDRAW_PROMPT_TIME: 'withdraw_prompt_time',
  SPOT_STRATEGY_GUIDE: 'spot_strategy_guid',
  FUTURE_STRATEGY_GUIDE: 'future_strategy_guid',
  COPY_TRADING_GUIDE_SHOW: 'guide_show',
  USER_SELECTED_COIN: 'user_selected_coin',
  TIMEZONE: 'timezone', // 涨跌幅 k线相关的时区 0-UTC0 1-UTC8
  STRATEGY_PRODUCTION: 'STRATEGY_PRODUCTION',
  CONTRACT_GUIDE: 'contract_guide', //新手引导第五步
  S_CONTRACT_GUIDE: 's_contract_guide', //模拟合约引导
  JUMP_TYPE: 'jump_type', // 跳转buy crypto
  OCO_GUIDE_TIPS: 'oco_guide_tips', // oco tooltips
  IP_DIALOG_SHOW_TIME: 'ip_dialog_show_time', // ip 限制弹窗时间
  IP_DIALOG_SHOW: 'ip_dialog_show', // ip 限制弹窗展示
  STRATEGY_REQUESTTIME: 'strategy_requesttime', //策略列表获取系统时间
  FIATNAME: 'fiatName', //币种缓存
  GLOBAL_DIALOG_READ: 'global_dialog_read'
}

const LocalCache = {
  ready: false,
  /**
   * 默认的数值
   */
  data: {
    version: '1.1', // 使用该字段将用户缓存的数据失效
    [CacheKey.CHANGE_MODE_WITHOUT_DIALOG]: false, // 切换逐仓全仓不需要弹窗
    [CacheKey.GLOBAL_LOCALE]: 'en',
    [CacheKey.GLOBAL_THEME]: '',
    [CacheKey.GLOBAL_LAYOUT]: 'right',
    [CacheKey.TERMINAL_CODE]: '', // 设备指纹，请求用户信息等接口时使用
    [CacheKey.KLINE_INTERVAL]: 1, // 默认 1m普通K线
    [CacheKey.SPOT_LAYOUT]: 'center', // 默认币币为居中布局
    [CacheKey.OVERALL_THEME]: '', // 默认黑色
    [CacheKey.BACK_HAND_TIP]: 0, // 反手提示0-未选择 1-选择
    [CacheKey.RECHARGE_PROMPT_TIME]: 0, // ko充币提示框 提示时间
    [CacheKey.WITHDRAW_PROMPT_TIME]: 0, // ko提币提示框 提示时间
    [CacheKey.SPOT_STRATEGY_GUIDE]: 1, // 现货策略引导
    [CacheKey.FUTURE_STRATEGY_GUIDE]: 1, // 合约策略引导
    [CacheKey.COPY_TRADING_GUIDE_SHOW]: false, // 跟单引导
    [CacheKey.USER_SELECTED_COIN]: {}, // 未登录行情自选币种
    [CacheKey.TIMEZONE]: 0, // m默认时区 UTC0
    [CacheKey.STRATEGY_PRODUCTION]: {},
    [CacheKey.AUTO_STRATEGY_PRODUCTION]: {},
    [CacheKey.CONTRACT_GUIDE]: '5',
    [CacheKey.S_CONTRACT_GUIDE]: true,
    [CacheKey.JUMP_TYPE]: 1,
    [CacheKey.OCO_GUIDE_TIPS]: true,
    [CacheKey.IP_DIALOG_SHOW_TIME]: 0,
    [CacheKey.IP_DIALOG_SHOW]: 1, // ip 限制弹窗展示0-不展示 1-展示
    [CacheKey.STRATEGY_REQUESTTIME]: new Date(),
    [CacheKey.FIATNAME]: '',
    [CacheKey.GLOBAL_DIALOG_READ]: []
  },
  /**
   * 从localStorage中将缓存加载到本实例
   */
  init() {
    try {
      const local = JSON.parse(localStorage.getItem(LocalStorageKey))
      if (local) {
        // 检查版本
        if (local.version && local.version === this.data.version) {
          // 防止数据缺失
          Object.assign(this.data, local)
        } else {
          // 刷新用户端保存的内容
          localStorage.setItem(LocalStorageKey, JSON.stringify(this.data))
        }
      }
    } catch (e) {
      console.error('本地缓存数据被破坏，使用初始值')
    } finally {
      this.ready = true
    }
  },
  get(key) {
    this.init()
    return this.data[key]
  },
  set(key, value) {
    if (!this.ready) {
      this.init()
    }
    let oldValue = this.data[key]
    if (oldValue === value) return
    let newCache = Object.assign({}, this.data, { [key]: value })
    try {
      localStorage.setItem(LocalStorageKey, JSON.stringify(newCache))
      this.data = newCache
    } catch (e) {
      console.error('Local Cache Error:', e)
    }
  }
}

export default LocalCache
