import { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { buildKeyGenerator } from 'axios-cache-interceptor'
import { generateKey } from './interceptor-cache'
import { md5CacheStorage } from '@/utils/indexdb'

function generateRequestId(req: InternalAxiosRequestConfig) {
  const generate = buildKeyGenerator((req: InternalAxiosRequestConfig) => {
    const data = generateKey(req)
    // 移除请求对象里的md5，以保证request和response生成的一致
    delete data.params?.[req.md5]
    // 移除bt_rtoken，不同用户使用同一份MD5缓存
    delete data.bt_rtoken
    return data
  })

  return generate({
    ...req,
    // generateKey会优先返回res.id，此处需要把id设成null，让他重新生成
    id: undefined
  })
}

/**
 * 添加MD5请求拦截，为请求加上缓存的MD5参数
 */
export function withMd5RequestInterceptor(axios: AxiosInstance) {
  axios.interceptors.request.use(async (req) => {
    if (!req.md5) return req
    if (req.method.toLowerCase() !== 'get') return req

    try {
      const requestId = generateRequestId(req)
      const cache = await md5CacheStorage.find(requestId)
      // @ts-ignore
      const data: any = cache?.data
      // 请求参数带上 MD5
      if (data) {
        req.params[req.md5] = data.md5Value || data.md5 || ''
      }
    } catch (e) {
      console.error('find md5 error: ', e.message)
    }

    return req
  })
}

/**
 * 添加MD5响应拦截，判断后端返回的MD5与请求时的MD5是否相同，相同则直接用本地缓存的数据
 */
export function withMd5ResponseInterceptor(axios: AxiosInstance) {
  axios.interceptors.response.use(async (res) => {
    if (!res.config?.md5) return res
    if (!res.data) return res
    // 数据从缓存中获取，无需更新MD5
    // @ts-ignore
    if (res.cached) return res

    const data = res.data.data || {}
    const requestMd5 = res.config.params?.[res.config.md5]
    const responseMd5 = data.md5Value || data.md5
    const requestId = generateRequestId(res.config)
    const cacheData: any = await md5CacheStorage.find(requestId)

    // 请求和响应的MD5相同，则优先用缓存数据
    if (requestMd5 === responseMd5) {
      res.data.data = cacheData?.data || res.data.data
    } else {
      md5CacheStorage.set(requestId, {
        ...res.data,
        // 记录缓存时间
        createdAt: Date.now()
      })
    }

    return res
  })
}
