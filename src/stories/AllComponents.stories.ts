import type { Meta, StoryObj } from '@storybook/vue3'
import type { Component } from 'vue'
import Footer from '../components/Footer/Footer.vue'
import { footerExampleConfig } from '../components/Footer/example'

// 这里也可以追加更多组件的显式导入以设置默认示例
const components: Record<string, Component> = {
  Footer,
}

const defaultArgsMap: Record<string, any> = {
  Footer: footerExampleConfig,
}

const meta: Meta = {
  title: 'Components/All',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    componentName: {
      control: { type: 'select' },
      options: Object.keys(components),
      description: '选择要预览的组件',
    },
  },
}

export default meta

type Story = StoryObj<any>

export const Playground: Story = {
  args: {
    componentName: 'Footer',
    componentProps: defaultArgsMap['Footer'],
  },
  render: (args: any) => ({
    components: { DynComp: components[args.componentName] || Footer },
    setup() { return { args } },
    template: '<DynComp v-bind="args.componentProps" />',
  }),
}