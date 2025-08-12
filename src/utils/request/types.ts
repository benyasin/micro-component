import { CacheOptions } from 'axios-cache-interceptor'

export interface Response<T = any> {
  code: string
  msg: string
  data: T
}

export interface Options {
  cache?: CacheOptions & {
    /** 开启缓存 */
    open?: boolean
    /** 是否检测br_token */
    withToken?: boolean
  },
  md5?: string
}
