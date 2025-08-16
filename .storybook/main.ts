import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import svg from 'vite-svg-loader'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

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
      plugins: [
        vue(),
        svg({
          svgo: false
        }),
        UnoCss()
      ],
      resolve: {
        alias: {
          '@': resolve(fileURLToPath(new URL('../src', import.meta.url))),
          '@locales': resolve(fileURLToPath(new URL('../locales', import.meta.url))),
        }
      },
      define: {
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_OPTIONS_API__: true,
        'process.client': 'true',
      },

      server: {
        fs: {
          allow: ['..'],
        },
        proxy: {
          '/micro-runtime': {
            target: 'http://localhost:6006',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/micro-runtime/, '')
          }
        }
      },
      publicDir: resolve(fileURLToPath(new URL('../dist', import.meta.url))),
      build: {
        rollupOptions: {
          external: []
        }
      }
    })
  }
}

export default config