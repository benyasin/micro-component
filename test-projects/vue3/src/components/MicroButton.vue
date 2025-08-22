<template>
  <button 
    :style="buttonStyle" 
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot>Click Me</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  elementId?: string
  type?: string
  variant?: 'primary' | 'secondary'
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const emit = defineEmits<Emits>()

const baseStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease'
}

const variantStyles = {
  primary: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: 'white'
  }
}

const buttonStyle = computed(() => ({
  ...baseStyle,
  ...variantStyles[props.variant]
}))

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>