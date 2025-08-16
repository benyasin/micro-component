import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { i18n } from '../runtime/i18n'
import '../runtime/index.less'

// 安装 vue-i18n 到 Storybook 的 Vue 应用实例
setup((app) => {
  app.use(i18n)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview