import { BaseProps } from '@/types/component'

export interface Config {
  /** 按钮文本 */
  text?: string
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 按钮颜色 */
  color?: string
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'danger'
  /** 是否禁用 */
  disabled?: boolean
}

export interface Props extends BaseProps, Config {}

export interface Events {
  /** 点击事件 */
  click: (event: MouseEvent) => void
  [key: string | number | symbol]: (...args: any[]) => any
}

export interface ButtonEmits {
  /** 点击事件 */
  click: [event: MouseEvent]
}

export interface ButtonExpose {
  /** 按钮元素引用 */
  buttonRef: HTMLButtonElement | null
  /** 更新属性 */
  updateProps: (props: Partial<Props>) => void
  /** 属性对象 */
  props: Props
  /** 事件对象 */
  event: any
}