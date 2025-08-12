import { ref, watchEffect } from 'vue'
import { defineStore } from '@/utils/store'
import { useFooter } from './useFooter'
import { UserInfo } from '@/types/component'

export const useUser = defineStore(() => {
  const { footerProps } = useFooter()

  const userInfo = ref<UserInfo>()

  watchEffect(() => {
    userInfo.value = footerProps.value.userInfo
  })

  return {
    userInfo
  }
})
