import { ref, onMounted, computed } from 'vue'
import { defineStore } from '@/utils/store'
import { pushQueue } from '@/utils/queue'
// 移除Header服务引用，使用模拟数据
import { defaultCurrencyList } from '@/utils/config'
import LocalCookie, { CookieKey } from '@/utils/request/localCookie.js'
import { Currency } from '@/types/common'
import { useConfig } from './useConfig'

export const useCurrency = defineStore(
  () => {
    const { config } = useConfig()
    /** 法币列表 */
    const currencyList = ref(defaultCurrencyList as Currency[])
    /** 各国法币相对USD的汇率 */
    const usdtRates = ref<Record<string, string>>()
    /** 法币单位 */
    const currency = ref<string>(
      config.manualCurrency || (LocalCookie.get(CookieKey.UNIT) as string) || 'USD'
    )
    /** 根据IP推荐的汇率 */
    const recommendCurrency = ref<string>()

    /** 当前选中的currency */
    const currencyInfo = computed(() => {
      return currencyList.value.find((item) => item.type === currency.value) || currencyList.value[0]
    })

    /** 获取汇率列表 */
    const fetchUSDTRate = async () => {
      // 使用模拟数据，避免依赖Header服务
      const mockData = {
        rates: { USD: '1.00', EUR: '0.85', GBP: '0.73', JPY: '110.00', CNY: '6.45' },
        supported: defaultCurrencyList,
        recommend: 'USD'
      }
      
      const { rates, supported, recommend } = mockData
      currencyList.value = supported.map((item) => {
        return {
          ...item,
          // 兼容以前的字段
          type: item.type?.toUpperCase(),
          iconUrl: item.iconUrl || 'https://img.bitgetimg.com/fiat-country/USD.svg'
        }
      })
      usdtRates.value = rates
      recommendCurrency.value = recommend
      // 设置默认选中汇率，兜底USD
      currency.value = config.manualCurrency || recommend
      if (supported.every((item) => item.type?.toUpperCase() !== currency.value.toUpperCase())) {
        currency.value = 'USD'
      }
      LocalCookie.set(CookieKey.UNIT, currency.value)
    }

    /** 修改选中法币 */
    function changeCurrency(type: string) {
      type = type.toUpperCase()
      currency.value = type
      config.manualCurrency = type
      LocalCookie.set(CookieKey.UNIT, currency.value)
    }

    onMounted(() => {
      pushQueue(() => fetchUSDTRate())
    })

    return {
      currencyList,
      currency,
      usdtRates,
      changeCurrency,
      currencyInfo,
      fetchUSDTRate,
      recommendCurrency
    }
  },
  { global: true }
)
