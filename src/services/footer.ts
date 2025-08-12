import { commonInstance } from '@/utils/request/request'
import { Options, Response } from '@/utils/request/types'

export const getFooterInfo = (options?: Options) => {
  return commonInstance.post('/v1/mix/index/footer', null, options) as Promise<Response>
}

export const setLanguage = (data: { languageType: number }) => {
  return commonInstance.post('/v1/user/security/changeLanguage', data)
}
