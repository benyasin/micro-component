<template>
  <slot v-if="visible" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isClient } from '@/utils'

const visible = ref(isClient)

onMounted(() => {
  visible.value = true
})
</script>
