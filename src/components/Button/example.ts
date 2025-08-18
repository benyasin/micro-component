import type { Props } from './types'

// 基础按钮示例
export const basicExample: Props = {
  locale: 'en',
  text: 'Basic Button',
  type: 'default',
  size: 'middle'
}

// 主要按钮示例
export const primaryExample: Props = {
  locale: 'en',
  text: 'Primary Button',
  type: 'primary',
  size: 'middle',
  color: '#1890ff'
}

// 自定义颜色按钮示例
export const customColorExample: Props = {
  locale: 'en',
  text: 'Custom Color',
  type: 'primary',
  size: 'middle',
  color: '#52c41a'
}

// 大尺寸按钮示例
export const largeExample: Props = {
  locale: 'en',
  text: 'Large Button',
  type: 'primary',
  size: 'large'
}

// 小尺寸按钮示例
export const smallExample: Props = {
  locale: 'en',
  text: 'Small Button',
  type: 'default',
  size: 'small'
}

// 危险按钮示例
export const dangerExample: Props = {
  locale: 'en',
  text: 'Danger Button',
  type: 'primary',
  danger: true
}

// 加载状态按钮示例
export const loadingExample: Props = {
  locale: 'en',
  text: 'Loading Button',
  type: 'primary',
  loading: true
}

// 禁用按钮示例
export const disabledExample: Props = {
  locale: 'en',
  text: 'Disabled Button',
  type: 'default',
  disabled: true
}

// 块级按钮示例
export const blockExample: Props = {
  locale: 'en',
  text: 'Block Button',
  type: 'primary',
  block: true
}

// 圆形按钮示例
export const circleExample: Props = {
  locale: 'en',
  text: '+',
  type: 'primary',
  shape: 'circle'
}

// 自定义尺寸按钮示例
export const customSizeExample: Props = {
  locale: 'en',
  text: 'Custom Size',
  type: 'primary',
  width: 200,
  height: 50
}