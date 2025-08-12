<template>
  <canvas v-show="isLoaded" :ref="(el: HTMLCanvasElement) => elCanvas = el" />
</template>

<script setup lang="ts">
/**
 * 通过 canvas 来模拟 <img />
 * 因为 canvas 可绕过 LCP 检测，可用来对初始化时的大图片加载进行优化
 */

import { ref, watch } from 'vue'

const props = defineProps<{
  src: string
}>()
const emit = defineEmits<{
  (event: 'load'): void
  (event: 'error'): void
}>()

const elCanvas = ref<HTMLCanvasElement>()
const isLoaded = ref(false)

watch(
  [elCanvas, () => props.src],
  () => {
    if (!elCanvas.value) return
    if (!props.src) return

    isLoaded.value = false

    const canvas = elCanvas.value
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = props.src
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      isLoaded.value = true
      emit('load')
    }
    img.onerror = () => {
      emit('error')
    }
  },
  { immediate: true }
)
</script>
