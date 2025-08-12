<template>
  <component
    :is="is"
    :class="
      applyColor && {
        'text-contentTradeBuy': num > 0,
        'text-contentTradeSell': num < 0
      }
    "
    dir="ltr"
  >
    {{ percentageText }}
  </component>
</template>

<script setup lang="ts">
/**
 * 兼容 ltr 和 rtl 的数字显示
 */
import { computed } from 'vue'
import { convertPercentage, number2Thousands } from '@/utils/utils'
import { useI18n } from '@/compositions/useI18n'

const props = withDefaults(
  defineProps<{
    is?: string
    num: number | string
    hasSymbol?: boolean
    addZeroPlus?: boolean
    /** 是否添加千位分隔符 */
    addThousandsSeparator?: boolean
    applyColor?: boolean
  }>(),
  {
    is: 'span',
    hasSymbol: true,
    addZeroPlus: false,
    addThousandsSeparator: false,
    applyColor: true
  }
)

const { locale } = useI18n()

const percentageText = computed(() => {
  if (props.num == null || isNaN(props.num)) {
    return '0.00%'
  }

  const num = parseFloat(props.num.toString()).toFixed(2)
  if (isNaN(+num)) {
    return props.num
  }

  if (locale.value !== 'ar') {
    const data = props.addThousandsSeparator ? number2Thousands(locale.value, num) : num
    return +num > 0 ? `+${data}%` : `${data}%`
  }

  // 镜像百分比处理
  return convertPercentage(
    num,
    '%',
    props.addZeroPlus,
    props.hasSymbol,
    props.addThousandsSeparator
  )
})
</script>

<style lang="less" scoped>
.text-buy {
  color: var(--color-buy);
}

.text-sell {
  color: var(--color-sell);
}

.text-normal {
  @apply text-secondaryText;
}
</style>
