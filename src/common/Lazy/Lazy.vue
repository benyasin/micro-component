<template>
  <div ref="el">
    <slot v-if="visible" />
  </div>
</template>

<script setup lang="ts">
/**
 * 将子组件延迟到屏幕显示时才加载
 */

import { onMounted, ref, watchEffect } from 'vue'
import { isClient } from '@/utils'

const props = defineProps<{
  disabled?: boolean
}>()

const visible = ref(!isClient || props.disabled)
const el = ref<Element>()

watchEffect(() => {
  if (props.disabled) {
    visible.value = true
  }
})

onMounted(() => {
  if (!props.disabled) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          requestIdleCallback(
            () => {
              visible.value = true
              observer.unobserve(item.target)
            },
            { timeout: 500 }
          )
        }
      })
    })
    if (el.value) {
      observer.observe(el.value)
    }
  }
})
</script>
