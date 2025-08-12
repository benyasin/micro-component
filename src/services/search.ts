import { commonInstance } from '@/utils/request/request'
import { Options } from '@/utils/request/types'

/**
 * 解决搜索结果的竞态问题，只取最后一次输入查询结果
 */
function onlyResolvesLast(fn) {
  let id = 0

  const wrappedFn = (...args) => {
    const fetchId = id + 1
    id = fetchId
    const result = fn.apply(this, args)

    return new Promise((resolve, reject) => {
      Promise.resolve(result).then(
        (value) => {
          if (fetchId === id) {
            resolve(value)
          }
        },
        (error) => {
          if (fetchId === id) {
            reject(error)
          }
        }
      )
    })
  }

  return wrappedFn
}

export const getHotSearchList = (options?: Options) => {
  return commonInstance.post(
    '/v1/mix/market/indexLeaderboard',
    {
      index: 9,
      isHome: false
    },
    options
  )
}

const fetchSpotAndFuturesList = onlyResolvesLast(commonInstance.post)
const fetchSwapList = onlyResolvesLast(commonInstance.post)

// 24小时开盘价
export const getOpenPrice = (
  data: { timezone: number | string; bussiness: 'sp' | 'mc' },
  options?: Options
) => {
  return commonInstance.post('/v1/kline/getOpenPrice', data, options)
}

/**
 * 现货合约交易对搜索
 */
export const getSpotAndFuturesList = (data: { searchContent: string }, options?: Options) => {
  return fetchSpotAndFuturesList('/v1/mix/index/search/coin', data, options)
}

// swap搜索
export const getSwapList = (data: { paramText: string; chainId: number }, options?: Options) => {
  return fetchSwapList('/v1/swap/public/new/boardSearchList', data, options)
}

// 获取收藏列表
export const getUserFavoriteList = (options?: Options) => {
  return commonInstance.post('/v1/mix/index/userSelectedList', null, options)
}

// 添加收藏
export const addFavorite = (data, options?: Options) => {
  return commonInstance.post('/v1/user/optional/addUserSelf', data, options)
}

// 取消收藏
export const cancelFavorite = (data, options?: Options) => {
  return commonInstance.post('/v1/user/optional/deleteUserSelf', data, options)
}

// 获取所有币种信息
export const getCoinList = (options?: Options) => {
  return commonInstance.post(
    '/v1/mix/public/getCoinConfigList',
    { region: true },
    {
      md5: 'md5Value',
      ...options
    }
  )
}

// 添加历史记录
export const updateSearchHistory = (data, options?: Options) => {
  return commonInstance.post(
    '/v1/mix/index/updateNum',
    {
      searchNum: 1,
      ...data
    },
    options
  )
}

// 查询历史记录
export const getSearchHistory = (data: { userId: string }, options?: Options) => {
  return commonInstance.post('/v1/user/search/list', data, options)
}

// 删除历史记录
export const deleteSearchHistory = (data: { userId: string }, options?: Options) => {
  return commonInstance.post('/v1/user/search/del', data, options)
}

// 跟单-现货
export const getSpotTraders = (options?: Options) => {
  return commonInstance.post('/v1/trace/spot/public/recommendTraders', null, options)
}

// 跟单-合约
export const getFuturesTraders = (options?: Options) => {
  // return commonInstance.post('/v1/trigger/trace/public/traceHomePageTopTraders')
  return commonInstance.post('/v1/trigger/trace/public/recommendTraders', null, options)
}

// 跟单-策略
export const getStrategyTraders = (options?: Options) => {
  return commonInstance.post(
    '/v1/strategyPlatform/public/appTraderHome/strategyHomePageTopTraders',
    null,
    options
  )
}

// 理财-理财宝产品
export const getSavingsProducts = (options?: Options) => {
  return commonInstance.post('/v1/finance/savings/product/list', null, options)
}

// 理财-pos产品
export const getSavingsPos = (options?: Options) => {
  return commonInstance.post('/v1/finance/pos/cardList', null, options)
}
