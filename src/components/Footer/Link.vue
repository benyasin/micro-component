<template>
  <a v-if="href" class="text-primaryText" :href="href" :target="target" @click="onClick">
    <slot />
  </a>
  <span v-else class="text-primaryText">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { useI18n } from '@/compositions/useI18n'
import { computed } from 'vue'
import { useFooter } from './useFooter'

const props = withDefaults(
  defineProps<{
    href?: string
    redirect?: boolean
    formatLocale?: boolean
    target?: string
  }>(),
  {
    formatLocale: false,
    redirect: true,
    target: '_self'
  }
)
const vueEmit = defineEmits<{
  (event: 'push', href: string, target?: string): void
}>()
const { emit } = useFooter()
const { formatLocalPath } = useI18n()

const href = computed(() => {
  if (!props.href) return
  if (!props.formatLocale) return props.href
  if (props.href.startsWith('http://') || props.href.startsWith('https://')) return props.href
  return formatLocalPath(props.href)
})

function onClick(e: MouseEvent) {
  // 完整路径直接跳转
  // if (props.href && (props.href.startsWith('http://') || props.href.startsWith('https://'))) {
  //   return
  // }
  e.preventDefault()
  if (props.redirect && href.value) {
    emit('push', href.value, props.target)
    vueEmit('push', href.value, props.target)
  }
}
</script>
