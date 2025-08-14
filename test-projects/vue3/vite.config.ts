import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, extname } from 'path'
import fs from 'fs'

function microRuntimePlugin() {
  return {
    name: 'micro-runtime-serve',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url: string = req.url || ''
        if (!url.startsWith('/micro-runtime/')) return next()

        const distRoot = resolve(__dirname, '../../dist')
        const relativePath = url.replace('/micro-runtime', '') || '/micro-runtime.js'
        const filePath = resolve(distRoot, '.' + relativePath)

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.statusCode = 404
            res.end(`Not found: ${relativePath}`)
            return
          }
          // minimal content-type mapping
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), microRuntimePlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'micro-components/vue': resolve(__dirname, '../../dist/components/vue')
    }
  },
  // 将库代码中的 process.* 常量在构建/开发时直接替换掉，避免浏览器端出现 "process is not defined"
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.client': 'true',
    'process.browser': 'true'
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})