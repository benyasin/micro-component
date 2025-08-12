import { ref, watchEffect } from 'vue'
import { defineStore } from '@/utils/store'
import { defaultLanguageList } from '@/utils/config'
import { useFooter } from './useFooter'
import { useCurrency } from '@/compositions/useCurrency'
import { Language } from '@/types/common'

export const useSetting = defineStore(() => {
  const { footerProps } = useFooter()
  const { usdtRates } = useCurrency()

  /** 语言列表 */
  const languageList = ref(defaultLanguageList.filter((item) => !item.hidden) as Language[])

  // 优先以props为准，如果props没传则使用内部状态
  watchEffect(() => {
    languageList.value = footerProps.value.languageList ?? languageList.value
  })

  return {
    languageList,
    usdtRates
  }
})
