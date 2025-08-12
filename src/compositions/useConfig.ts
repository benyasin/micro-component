import { reactive, watch } from 'vue'
import { extend } from 'lodash-es'
import { defineStore, isClient } from '@/utils'
import { setReactive } from '@/utils/vue'

const CONFIG_KEY = 'micro_config'

export const useConfig = defineStore(() => {
  const config = reactive({
    /** 用户手动选择的汇率 */
    manualCurrency: '',
    /** 是否首次登录或从未登录过 */
    isFirstLogin: true,
    /** tabbar交易区默认跳转 */
    tabbar: {
      tradeType: ''
    }
  })

  watch(
    () => config,
    () => {
      try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
      } catch {}
    },
    { deep: true }
  )

  if (isClient) {
    const storageConfig = localStorage.getItem(CONFIG_KEY)
    if (storageConfig) {
      try {
        const data = extend({}, config, JSON.parse(storageConfig))
        setReactive(config, data)
      } catch {}
    }
  }

  return {
    config
  }
})
