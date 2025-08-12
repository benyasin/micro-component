import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import svg from 'vite-svg-loader'
// 移除私有包 unplugin-bit-design-vue3，使用 ant-design-vue 替代
import prefixer from 'postcss-prefix-selector'
// import rtlPostcss from '@bit/postcss-dir' // 私有包，暂时注释
import replacePostcss from '../scripts/postcss-replace.js'

export default defineConfig({
  base: '/micro',
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@locales': path.resolve('./locales')
    }
  },
  publicDir: path.resolve('./src/public'),
  define: {
    'process.client': 'true'
  },
  server: {
    open: 'http://localhost:5174/micro/playground/index.html#/header'
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
        // rtlPostcss({
        //   selectorBlackList: ['.bit-tabs__active-bar', '.mi-tabs__active-bar']
        // }), // 私有包，暂时注释
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
    // BitDesign({}) - 已移除私有包，ant-design-vue 组件可直接使用
  ]
})
