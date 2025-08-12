import { getInstance } from '@/utils/request/request'

const commonInstance = getInstance('')

export const getUserKycInfo = (bizCode: string | number) => {
  return commonInstance.post('/v1/user/kyc/getKycVerifyNotifyFlag', { bizCode })
}
// 判断是否需要显示风险地址，用于未登录状态
export const getRiskDeclareFlag = () => {
  return commonInstance.post('/v1/user/public/getRiskDeclareFlag')
}
