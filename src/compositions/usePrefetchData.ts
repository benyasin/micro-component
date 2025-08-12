import { isClient } from '@/utils'
import { setReactive } from '@/utils/vue'
import { defineStore } from '@/utils/store'
import { getCurrentLocale } from '@/utils/locale'
import { reactive } from 'vue'

export const usePrefetchData = defineStore(
  () => {
    const prefetchData = reactive({})

    function setPrefetchData(component: string, value) {
      const locale = getCurrentLocale()
      setReactive(prefetchData, {
        [component]: {
          [locale]: value
        }
      })
    }

    function getPrefetchData<T>(component: string) {
      const locale = getCurrentLocale()
      return prefetchData[component]?.[locale] as T
    }

    /** 清除上个版本的数据 */
    function clearOldData() {
      for (let i = localStorage.length - 1; i > 0; i--) {
        const key = localStorage.key(i)
        if (key?.startsWith('MICRO_PREFETCH_')) {
          localStorage.removeItem(key)
        }
      }
    }

    if (isClient) {
      clearOldData()
    }

    return {
      prefetchData,
      setPrefetchData,
      getPrefetchData
    }
  },
  { global: true }
)
