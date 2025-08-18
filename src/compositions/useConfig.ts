import { reactive, watch } from 'vue'
import { extend } from 'lodash-es'
import { defineStore, isClient } from '@/utils'
import { setReactive } from '@/utils/vue'

const CONFIG_KEY = 'micro_config'

export const useConfig = defineStore(() => {
  const config = reactive({
    // 全局开关（默认均为 false）
    i18nEnabled: false,
    themeSwitchEnabled: false,
    rtlEnabled: false,
    ssrEnabled: false
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
