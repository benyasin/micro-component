import { ref, computed, watch } from 'vue'
import { useProps } from '@/compositions/useProps'
import { useEvent } from '@/compositions/useEvent'
// import { defineStore } from '@/utils/store'
import type { Props, Config, Events } from './types'

const getDefaultConfig = (): Config => {
  return {
    text: '',
    size: 'medium',
    color: '#1890ff',
    type: 'primary',
    disabled: false
  }
}

export const useButton = (defaultProps?: Props) => {
  const { props: buttonProps, updateProps } = useProps(defaultProps)
  const event = useEvent<Events>()
  const config = ref<Config>()

  const mergeConfig = (source: Partial<Props>, target: Partial<Props>) => {
    const defaultConfig = getDefaultConfig()
    
    // 只提取Config相关的属性
    const sourceConfig: Partial<Config> = {
      text: source.text,
      size: source.size,
      color: source.color,
      type: source.type,
      disabled: source.disabled
    }
    
    const targetConfig: Partial<Config> = {
      text: target.text,
      size: target.size,
      color: target.color,
      type: target.type,
      disabled: target.disabled
    }
    
    config.value = {
      ...defaultConfig,
      ...sourceConfig,
      ...targetConfig
    }
  }

  const initConfig = () => {
    mergeConfig(defaultProps || {}, buttonProps.value)
  }

  // 监听props变化
  watch(
    [() => buttonProps.value],
    () => {
      if (typeof window !== 'undefined') {
        initConfig()
      }
    },
    { immediate: true, deep: true }
  )

  // 计算按钮类名
  const buttonClass = computed(() => {
    return [
      'micro-button',
      `micro-button--${config.value?.size || 'medium'}`,
      `micro-button--${config.value?.type || 'primary'}`,
      {
        'micro-button--disabled': config.value?.disabled
      }
    ]
  })

  // 计算按钮样式
  const buttonStyle = computed(() => {
    const color = config.value?.color || '#1890ff'
    const type = config.value?.type || 'primary'
    
    // 只有 primary 类型或自定义颜色时才设置内联样式
    // secondary 和 danger 类型使用 CSS 类样式
    if (type === 'secondary') {
      return config.value?.disabled ? {
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9',
        color: '#00000040'
      } : {}
    }
    
    if (type === 'danger') {
      return config.value?.disabled ? {
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9',
        color: '#00000040'
      } : {}
    }
    
    // primary 类型或有自定义颜色时使用内联样式
    return {
      backgroundColor: config.value?.disabled ? '#f5f5f5' : color,
      borderColor: config.value?.disabled ? '#d9d9d9' : color,
      color: config.value?.disabled ? '#00000040' : 'white'
    }
  })

  // 处理点击事件
  const handleClick = (clickEvent: MouseEvent) => {
    if (config.value?.disabled) {
      return
    }
    event.emit('click', clickEvent)
  }

  initConfig()

  return {
    buttonProps,
    updateProps,
    config,
    buttonClass,
    buttonStyle,
    handleClick,
    on: event.on,
    emit: event.emit,
    event
  }
}