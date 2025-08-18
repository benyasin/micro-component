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
    directionSwitchEnabled: false
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
        const raw = JSON.parse(storageConfig)
        if (raw && typeof raw === 'object') {
        }
        const data = extend({}, config, raw)
        setReactive(config, data)
      } catch {}
    }
  }

  return {
    config
  }
})
