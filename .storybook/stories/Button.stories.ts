import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../../src/components/Button/Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '按钮文本'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '按钮尺寸'
    },
    color: {
      control: 'color',
      description: '按钮颜色'
    },
    onClick: {
      action: 'clicked',
      description: '点击事件'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 默认按钮
export const Default: Story = {
  args: {
    text: 'Default Button',
  },
}

// 主要按钮
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    color: '#1890ff',
  },
}

// 不同尺寸
export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <Button text="Small" size="small" color="#1890ff" />
        <Button text="Medium" size="medium" color="#1890ff" />
        <Button text="Large" size="large" color="#1890ff" />
      </div>
    `,
  }),
}

// 自定义颜色
export const CustomColors: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <Button text="Green" color="#52c41a" />
        <Button text="Orange" color="#fa8c16" />
        <Button text="Purple" color="#722ed1" />
      </div>
    `,
  }),
}