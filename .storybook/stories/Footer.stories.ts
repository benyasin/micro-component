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
      options: ['en', 'zh_CN'],
      description: '语言设置'
    },
    i18nEnabled: {
      control: 'boolean',
      description: '是否启用多语言'
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

    i18nEnabled: true,
  } as any,
}

export const DarkTheme: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'dark',
    locale: 'en',
    i18nEnabled: true,
  } as any,
}

export const ChineseLocale: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'zh_CN',
    i18nEnabled: true,
  } as any,
}

export const Minimal: Story = {
  args: {
    ...(footerExampleConfig as any),
    theme: 'light',
    locale: 'en',

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
    productLinks: [
      { title: 'Enterprise Features', url: '/enterprise', target: '_self' as const },
      { title: 'Business API', url: '/business-api', target: '_blank' as const },
      { title: 'White-label Solutions', url: '/white-label', target: '_self' as const },
      { title: 'Professional Services', url: '/services', target: '_self' as const }
    ],
  } as any,
}