<template>
  <button
    ref="buttonRef"
    :class="buttonClass"
    :style="buttonStyle"
    :disabled="config?.disabled"
    @click="handleClick"
  >
    {{ config?.text || $slots.default?.()[0]?.children }}
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useButton } from './useButton'
import type { Props, ButtonEmits, ButtonExpose } from './types'

// Props
const props = withDefaults(defineProps<Props>(), {
  locale: 'en',
  text: '',
  size: 'medium',
  color: '#1890ff',
  type: 'primary',
  disabled: false
})

// Emits
const emit = defineEmits<ButtonEmits>()

// Refs
const buttonRef = ref<HTMLButtonElement | null>(null)

// Use Button Store
const {
  buttonProps,
  updateProps,
  config,
  buttonClass,
  buttonStyle,
  handleClick,
  on,
  emit: eventEmit,
  event
} = useButton(props)

// 监听内部事件并转发给父组件
on('click', (clickEvent: MouseEvent) => {
  emit('click', clickEvent)
})

// Expose
defineExpose({
  buttonRef,
  updateProps,
  props: buttonProps,
  event,
  on: event.on
})
</script>

<style scoped>
.micro-button {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  color: white;
}

.micro-button:hover {
  opacity: 0.8;
}

.micro-button:active {
  transform: translateY(1px);
}

.micro-button--small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.micro-button--medium {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
}

.micro-button--large {
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
}

.micro-button--primary {
  /* 默认样式已在基础类中定义 */
}

.micro-button--secondary {
  background-color: transparent;
  color: #1890ff;
  border-color: #1890ff;
}

.micro-button--secondary:hover {
  background-color: #1890ff;
  color: white;
}

.micro-button--danger {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.micro-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.micro-button--disabled:hover {
  opacity: 0.6;
  transform: none;
}
</style>