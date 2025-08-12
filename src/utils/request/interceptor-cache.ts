import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { setupCache, buildKeyGenerator, buildStorage, CacheOptions } from 'axios-cache-interceptor'
import cookie from 'js-cookie'
import { axiosCacheStorage } from '@/utils/indexdb'
import { getCurrentLocale } from '@/utils/locale'

/** 匹配开头和结尾的斜杠 */
const SLASHES_REGEX = /^\/|\/$/g

/** 生成请求哈希 */
export function generateKey(req: AxiosRequestConfig) {
  // @ts-ignore
  let { baseURL, url, method, params, data, md5 } = req

  baseURL = baseURL?.replace(SLASHES_REGEX, '') || ''
  url = url?.replace(SLASHES_REGEX, '') || ''
  method = method?.toLowerCase() || 'get'
  data = data === '{}' ? {} : data

  return {
    url: baseURL + (baseURL && url ? '/' : '') + url,
    params,
    method,
    data,
    // 用bt_rtoken来参数生成请求ID，以保证不同账号不会使用同一份缓存
    bt_rtoken: cookie.get('bt_rtoken') || '',
    locale: getCurrentLocale()
  }
}

export function cleanExpiredCache() {
  const now = Date.now()
  axiosCacheStorage.iterate((value = {}, key) => {
    if (value.state !== 'cached' || !value.createdAt || now > value.createdAt + value.ttl) {
      axiosCacheStorage.remove(key)
    }
  })
}

/** 为axios添加缓存拦截器 */
export const withCacheInterceptor = (axios: AxiosInstance, options: CacheOptions = {}) => {
  cleanExpiredCache()

  setupCache(axios, {
    // debug: console.log,
    methods: ['post', 'get'],
    interpretHeader: false,
    ttl: 1000 * 60 * 5,
    cacheTakeover: false,
    storage: buildStorage(axiosCacheStorage),
    generateKey: buildKeyGenerator(generateKey),
    cachePredicate: {
      // 接口有返回data的才缓存，避免缓存失败数据
      responseMatch(res) {
        // @ts-ignore
        return !!res?.data?.data
      }
    },
    ...(options || {})
  })

  axios.interceptors.request.use(async (req) => {
    // @ts-ignore
    if (!req.cache?.open) {
      req.cache.methods = []
      return req
    }
    // 带了withToken请求的接口，只在bt_rtoken cookie存在时才启动缓存
    // 此类接口通常与账号关联较多，需要避免不同账号数据串号
    // 若bt_rtoken意外丢失但sessionid仍然存在，此时将不缓存
    if (req.cache?.withToken) {
      const token = cookie.get('bt_rtoken')
      if (!token) {
        req.cache.methods = []
      }
      return req
    }

    return req
  })
}
