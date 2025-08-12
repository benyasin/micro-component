import 'axios'
import { AxiosStorage } from 'axios-cache-interceptor'
import { Options } from '@/utils/request/types'

declare module 'axios' {
  export interface InternalAxiosRequestConfig extends Options {}
  export interface AxiosInstance {
    storage: AxiosStorage
  }
}
