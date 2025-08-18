import type { Meta, StoryObj } from '@storybook/vue3'
import Footer from '../../src/components/Footer/Footer.vue'
import { footerExampleConfig } from '../../src/components/Footer/example'

const meta: Meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '主题模式'
    },
    locale: {
      control: { type: 'select' },
      options: ['en', 'zh-CN'],
      description: '语言设置'
    },
    direction: {
      control: { type: 'select' },
      options: ['ltr', 'rtl'],
      description: '文本方向'
    },
    i18nEnabled: {
      control: 'boolean',
      description: '是否启用多语言（默认全局为 false，需要手动开启）'
    },
    themeSwitchEnabled: {
      control: 'boolean',
      description: '是否允许在组件内切换主题（默认全局为 false，需要手动开启）'
    },
    directionSwitchEnabled: {
      control: 'boolean',
      description: '是否允许在组件内切换方向（默认全局为 false，需要手动开启）'
    },
    ssrEnabled: {
      control: 'boolean',
      description: '是否开启 SSR 环境兼容模式（默认全局为 false，需要手动开启）'
    },
    onThemeChange: { action: 'theme-changed' },
    onLanguageChange: { action: 'language-changed' },
    onPush: { action: 'link-clicked' }
  }
}

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'en',
    direction: 'ltr',
    i18nEnabled: true,
    themeSwitchEnabled: false,
    directionSwitchEnabled: false,
    ssrEnabled: false,
  } as any,
}

export const DarkTheme: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'dark',
    locale: 'en',
    direction: 'ltr',
    i18nEnabled: true,
    themeSwitchEnabled: true,
    directionSwitchEnabled: true,
  } as any,
}

export const ChineseLocale: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'zh_CN',
    direction: 'ltr',
    i18nEnabled: true,
    directionSwitchEnabled: false,
  } as any,
}

export const Minimal: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'en',
    direction: 'ltr',
    i18nEnabled: false,
    directionSwitchEnabled: false,
    productLinks: (footerExampleConfig.productLinks || []).slice(0, 2),
    supportLinks: (footerExampleConfig.supportLinks || []).slice(0, 3),
    socialLinks: (footerExampleConfig.socialLinks || []).slice(0, 2),
  } as any,
}

export const RTL: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'en',
    direction: 'rtl',
    i18nEnabled: false,
    directionSwitchEnabled: true,
  } as any,
}

export const Enterprise: Story = {
  args: {
    ...(footerExampleConfig as any),
    brandName: 'Enterprise Suite',
    slogan: 'Professional Business Solutions',
    theme: 'light',
    locale: 'en',
    direction: 'ltr',
    directionSwitchEnabled: false,
    productLinks: [
      { title: 'Enterprise Features', url: '/enterprise', target: '_self' as const },
      { title: 'Business API', url: '/business-api', target: '_blank' as const },
      { title: 'White-label Solutions', url: '/white-label', target: '_self' as const },
      { title: 'Professional Services', url: '/services', target: '_self' as const }
    ],
  } as any,
}