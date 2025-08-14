import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

function microRuntimePlugin() {
  return {
    name: 'micro-runtime-serve',
    configureServer(server: any) {
      // 处理所有 /micro-runtime/* 路径的资源请求
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/micro-runtime/')) {
          const filename = req.url.replace('/micro-runtime/', '')
          const filePath = resolve(__dirname, '../../dist', filename)
          
          fs.readFile(filePath, (err, data) => {
            if (err) {
              res.statusCode = 404
              res.end(`${filename} not found`)
              return
            }
            
            // 根据文件扩展名设置正确的 Content-Type
            const ext = filename.split('.').pop()?.toLowerCase()
            const contentTypes: Record<string, string> = {
              'js': 'application/javascript',
              'css': 'text/css',
              'json': 'application/json',
              'svg': 'image/svg+xml',
              'map': 'application/json'
            }
            res.setHeader('Content-Type', contentTypes[ext || 'js'] || 'text/plain')
            res.end(data)
          })
        } else {
          next()
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), microRuntimePlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'micro-components/react': resolve(__dirname, '../../dist/components/react')
    }
  },
  // 将库代码中的 process.* 常量在构建/开发时直接替换掉，避免浏览器端出现 "process is not defined"
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.client': 'true',
    'process.browser': 'true'
  },
  server: {
    port: 3001,
    open: true,
    fs: {
      // 允许访问工程根目录之外的构建产物与包根目录
      allow: [
        __dirname,
        resolve(__dirname, '../../dist'),
        resolve(__dirname, '../..')
      ]
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})