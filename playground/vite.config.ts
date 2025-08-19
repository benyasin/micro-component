import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import svg from 'vite-svg-loader'
import prefixer from 'postcss-prefix-selector'
import replacePostcss from '../scripts/postcss-replace.js'

export default defineConfig({
  base: '/micro',
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@locales': path.resolve('./locales')
    }
  },
  publicDir: path.resolve('../src/public'),
  define: {
    'process.client': 'true'
  },
  server: {
    port: 5170,
    cors: true,
    open: 'http://localhost:5170/micro/playground/index.html#/footer',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
  },
  build: {
    emptyOutDir: true
  },
  css: {
    postcss: {
      plugins: [
        prefixer({
          prefix: '.micro',
          transform(prefix, selector, prefixedSelector, filePath, rule) {
            if (!filePath.includes('uno.css')) return selector
            if (selector.includes('data-v-')) return selector
            if (selector.includes('mi-')) return selector
            if (selector.match(/^(html|body)/)) {
              return selector.replace(/^([^\s]*)/, `$1 ${prefix}`)
            }
            return prefixedSelector
          }
        }),
        replacePostcss({
          rule: {
            '$1mi-': /(\.|=)bit-/g
          },
          decl: {
            '--mi-': /--bit-/g
          }
        })
      ]
    }
  },
  plugins: [
    vue(),
    svg({
      svgo: false
    }),
    UnoCss()
  ]
})
