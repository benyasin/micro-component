import { commonInstance } from '@/utils/request/request'
import { Options, Response } from '@/utils/request/types'

export const getMenuList = (options?: Options) => {
  return commonInstance.post('/v1/mix/public/menu/getMenuList', null, options)
}

export const allPartition = (options?: Options) => {
  return commonInstance.get(
    '/v1/spot/symbol/getAllPartitionV2',
    { newFlag: false, md5Value: '' },
    { md5: 'md5Value', ...options }
  )
}

// 根据参数businessLine 获取列表数据
export const getMarketListData = (data, options?: Options) => {
  return commonInstance.get('/v1/mix/market/getHomeQuotation', data, options)
}

/** 切换语言 */
export const setLanguage = (data, options?: Options) => {
  return commonInstance.post('/v1/user/security/changeLanguage', data, options)
}

/**
 * 获取用户是否是代理商
 */
export const getUserAgentRole = (data?, options?: Options) => {
  return commonInstance.post('/v1/mix/overview/userIdentity', data, options)
}

//获取币种信息及链信息列表
export const getSpotCoinChainList = (options?: Options) => {
  return commonInstance.post(
    '/v1/mix/public/getCoinConfigList',
    { region: true },
    {
      md5: 'md5Value',
      ...options
    }
  )
}

/**
 * todo 获取某业务的开盘价
 * @param data
 */
export function getOpenPrice(
  data = {
    timezone: 0,
    business: 'sp'
  },
  options?: Options
) {
  return commonInstance.post(
    '/v1/kline/getOpenPrice',
    {
      timezone: data.timezone,
      bussiness: data.business
    },
    options
  )
}

/** 获取公共配置 */
export const webCommonConfig = (options?: Options) => {
  return commonInstance.post('/v1/mix/public/webCommonConfig', null, options)
}

/** 获取用户资产数据 */
export const getAsset = (options?: Options) => {
  return commonInstance.post('/v1/mix/assetsV2', null, options) as Promise<Response>
}

export const logout = (options?: Options) => {
  return commonInstance.post('/v1/user/login/logout', null, options) as Promise<Response>
}

export const invokeClearCookie = (options?: Options) => {
  return commonInstance.post('/v1/user/public/clearCookie', null, options) as Promise<Response>
}

export const getInmailBusiness = (options?: Options) => {
  return commonInstance.post('/v1/msg/push/stationType', null, options) as Promise<Response>
}

/**
 * 最新站内信，获取业务类型下的数据
 */
export function getInmailListData(
  data: {
    pageSize: number
    openUnread: number
    stationLetterType: string,
    isPre: boolean,
    lastEndId: string | null
  },
  options?: Options
) {
  return commonInstance.post('/v1/msg/push/stationLetterNew', data, options)
}

export function updateInmailReadStates(id: string, options?: Options) {
  return commonInstance.post('/v1/msg/push/updateReadStatus', { id }, options)
}

export const getTelUrl = (options?: Options) => {
  return commonInstance.post('/v1/user/security/tg', null, options) as Promise<Response>
}

export const getUserInfo = (options?: Options) => {
  return commonInstance.post('/v1/user/overview/userinfo', null, options) as Promise<Response>
}

// 新法币接口列表
export const getCurrencyListNew = (options?: Options) => {
  return commonInstance.post(
    '/v1/mix/public/getCurrencyListNew',
    null,
    options
  ) as Promise<Response>
}

/** 获取卡券数量 */
export const getCoupons = (options?: Options) => {
  return commonInstance.post('/v1/assets/rewards/ticketNum', null, options) as Promise<Response>
}

export const updateTaskCard = (data, options?: Options) => {
  return commonInstance.post(
    '/v1/act/task/card/user/click/show',
    data,
    options
  ) as Promise<Response>
}

/** 获取代理商数据 */
export const getAgentInfo = (options?: Options) => {
  return commonInstance.post(
    '/v1/broker/api/getAgentInfoByUserId',
    null,
    options
  ) as Promise<Response>
}

/** 获取语言列表 */
export const getLanguageList = (options?: Options) => {
  return commonInstance.post('/v1/mix/public/languageTypeList', null, options) as Promise<Response>
}

/**  h5首次下载app时保存相关信息 */
export const saveDeepLink = (data, options?: Options) => {
  return commonInstance.post(
    '/v1/user/public/deepLink/saveDeepLink',
    data,
    options
  ) as Promise<Response>
}

/**
 * 观点小红点消失很展示
 * @param {}
 * @return data:number ; 1 展示； 0 消失
 */
export function getRedDotDisplay(data?, options?: Options): Promise<Response<Response>> {
  return commonInstance.post('/v1/social/push/getRedDotDisplay', data, options)
}

/** 获取下载条URL配置数据 */
export async function getDownloadUrl(options?: Options): Promise<Response> {
  return commonInstance.post('/v1/mix/public/getDownloadGuideConfig', null, options)
}

/** 获取行情涨跌幅 */
export async function getMarketQuote(options?: Options): Promise<Response> {
  return commonInstance.post('/v1/cms/crypto/getGlobalMetricsQuoteDetail', null, options)
}

/** 获取跟单合约交易员排行榜 */
export const getFuturesTraderRankingList = (data, options?: Options) => {
  return commonInstance.post('/v1/trigger/trace/public/traderRankingList', data, options)
}

/** 获取跟单现货交易员排行榜 */
export const getSpotTraderRankingList = (data, options?: Options) => {
  return commonInstance.post('/v1/trace/spot/public/traderRankingList', data, options)
}

/** 获取USDT相对各法币的汇率 */
export function getUSDTRate(options?: Options): Promise<Response> {
  return commonInstance.post('/v1/mix/public/usdtRate', null, options)
}

/** 切换子母账户 */
export const switchLogin = (data) => {
  return commonInstance.post('/v1/user/sub/switLogin', data)
}

//账号列表（获取所有可切换登录的子账号列表)
export const switchList = (data) => {
  return commonInstance.post('/v1/user/sub/switchList', data)
}
