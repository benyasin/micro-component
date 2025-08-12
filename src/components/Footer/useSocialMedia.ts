import { ref, watchEffect } from 'vue'
import { defineStore } from '@/utils/store'
import { getFooterInfo } from '@/services/footer'
import { useI18n } from '@/compositions/useI18n'

export const useSocialMedia = defineStore(() => {
  const footerApiRes = ref({})
  const { locale } = useI18n()

  async function fetchFooterInfo() {
    const { code, data } = await getFooterInfo({
      cache: {
        open: true
      }
    })
    // @ts-ignore
    footerApiRes.value.code = code
    // @ts-ignore
    footerApiRes.value.data = data
  }

  watchEffect(() => {
    if (typeof window !== 'undefined' && locale.value) {
      fetchFooterInfo()
    }
  })

  return {
    footerApiRes
  }
})
