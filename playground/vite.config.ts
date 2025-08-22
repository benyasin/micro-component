import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import svg from 'vite-svg-loader'
import prefixer from 'postcss-prefix-selector'
import { resolve, extname } from 'path'
import fs from 'fs'
import replacePostcss from '../scripts/postcss-replace'
import postcssPrefixSelector from 'postcss-prefix-selector'

function microRuntimePlugin() {
  return {
    name: 'micro-runtime-serve',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url: string = req.url || ''
        if (!url.startsWith('/micro-runtime/')) return next()

        const distRoot = resolve(__dirname, '../dist')
        const relativePath = url.replace('/micro-runtime', '') || '/micro-runtime.js'
        const filePath = resolve(distRoot, '.' + relativePath)

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.statusCode = 404
            res.end(`Not found: ${relativePath}`)
            return
          }
          const mimeMap: Record<string, string> = {
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.svg': 'image/svg+xml',
            '.map': 'application/json'
          }
          const ext = extname(filePath)
          const type = mimeMap[ext] || 'application/octet-stream'
          res.setHeader('Content-Type', type)
          res.end(data)
        })
      })
    }
  }
}

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
        }),
        // 添加 ant-design-vue 前缀处理
        postcssPrefixSelector({
          prefix: '.micro',
          transform(prefix, selector, prefixedSelector) {
            // 只处理 ant-design-vue 的类名
            if (selector.startsWith('.ant-')) {
              return selector.replace(/^\.ant-/, '.mc-ant-')
            }
            return selector
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
    microRuntimePlugin(),
    UnoCss()
  ],
  server: {
    port: 5170,
    cors: true,
    open: 'http://localhost:5170/micro/playground/index.html#/footer',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    fs: {
      allow: [
        __dirname,
        resolve(__dirname, '../dist'),
        resolve(__dirname, '..')
      ]
    }
  }
})
