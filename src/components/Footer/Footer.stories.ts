import type { Meta, StoryObj } from '@storybook/vue3'
import Footer from './Footer.vue'
import { footerExampleConfig } from './example'

const meta: Meta = {
  title: 'Components/Footer',
  component: Footer as any,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: '主题设置'
    },
    locale: {
      control: 'select',
      options: ['en', 'zh-CN'],
      description: '语言设置'
    },
    brandName: {
      control: 'text',
      description: '品牌名称'
    },
    slogan: {
      control: 'text',  
      description: '品牌标语'
    },
    currencyVisible: {
      control: 'boolean',
      description: '是否显示货币选择器'
    },
    i18nEnabled: {
      control: 'boolean',
      description: '是否启用多语言'
    },
    onThemeChange: { action: 'theme-changed' },
    onLanguageChange: { action: 'language-changed' }, 
    onPush: { action: 'link-clicked' },
  },
}

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'en',
    currencyVisible: true,
    i18nEnabled: true,
  } as any,
}

export const DarkTheme: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'dark',
    locale: 'en',
    currencyVisible: true,
    i18nEnabled: true,
  } as any,
}

export const ChineseLocale: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'zh-CN',
    currencyVisible: true,
    i18nEnabled: true,
  } as any,
}

export const Minimal: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'en',
    currencyVisible: false,
    i18nEnabled: false,
    productLinks: (footerExampleConfig.productLinks || []).slice(0, 2),
    supportLinks: (footerExampleConfig.supportLinks || []).slice(0, 3),
    socialLinks: (footerExampleConfig.socialLinks || []).slice(0, 2),
  } as any,
}

export const Enterprise: Story = {
  args: {
    ...(footerExampleConfig as any),
    brandName: 'Enterprise Suite',
    slogan: 'Professional Business Solutions',
    theme: 'light',
    locale: 'en',
    currencyVisible: true,
    productLinks: [
      { title: 'Enterprise Features', url: '/enterprise', target: '_self' as const },
      { title: 'Business API', url: '/business-api', target: '_blank' as const },
      { title: 'White-label Solutions', url: '/white-label', target: '_self' as const },
      { title: 'Professional Services', url: '/services', target: '_self' as const }
    ],
  } as any,
}