import { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|vue|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
        }
      },
      define: {
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_OPTIONS_API__: true,
      }
    })
  }
}

export default config