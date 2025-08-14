import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sdk from '@stackblitz/sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))

interface StackBlitzFile {
  [path: string]: string
}

class StackBlitzDefine {
  private distPath = join(__dirname, '../dist')

  private readDistFile(relativePath: string): string {
    const fullPath = join(this.distPath, relativePath)
    if (!existsSync(fullPath)) {
      throw new Error(`文件不存在: ${fullPath}`)
    }
    return readFileSync(fullPath, 'utf-8')
  }

  private collectAssets(target: StackBlitzFile, baseDir: string = 'micro-runtime/assets') {
    const assetsPath = join(this.distPath, baseDir)
    if (!existsSync(assetsPath)) return

    const files = readdirSync(assetsPath, { recursive: true })
    files.forEach(file => {
      if (typeof file === 'string' && file.endsWith('.css')) {
        const content = readFileSync(join(assetsPath, file), 'utf-8')
        target[`public/${baseDir}/${file}`] = content
      }
    })
  }

  // 生成 Vue3 + Vite 沙盒
  generateVue3Files(): StackBlitzFile {
    const files: StackBlitzFile = {}

    // package.json
    files['package.json'] = JSON.stringify({
      name: 'micro-components-vue3-stackblitz',
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        vue: '^3.4.0'
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^5.0.0',
        vite: '^5.0.0'
      }
    }, null, 2)

    // vite.config.js
    files['vite.config.js'] = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  }
})`

    // index.html
    files['index.html'] = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3 + Micro Components</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- MicroRuntime 静态注入 -->
    <script src="./micro-runtime/micro-runtime.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`

    // src/main.js
    files['src/main.js'] = `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')`

    // src/App.vue
    files['src/App.vue'] = `<template>
  <div class="app">
    <h1>🚀 Vue3 + Micro Components 验证</h1>
    
    <div class="logs">
      <h3>运行时日志:</h3>
      <div class="logs-container">
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          {{ log }}
        </div>
      </div>
    </div>

    <div class="demo">
      <h3>Footer 组件测试:</h3>
      <Footer
        :brand="brand"
        theme="light"
        @event="handleEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Footer from './mc/vue/Footer.vue'

const brand = ref({ name: 'Vue3 测试品牌' })
const logs = ref([])

const handleReady = () => {
  logs.value.push('✅ MicroRuntime 已就绪')
}

const handleCssReady = () => {
  logs.value.push('✅ CSS 已加载')
}

const handleEvent = (name, ...args) => {
  logs.value.push('🎯 事件: ' + name + ' - ' + JSON.stringify(args))
}

onMounted(() => {
  window.addEventListener('MicroRuntime:ready', handleReady)
  window.addEventListener('MicroRuntime:cssReady', handleCssReady)
})

onUnmounted(() => {
  window.removeEventListener('MicroRuntime:ready', handleReady)
  window.removeEventListener('MicroRuntime:cssReady', handleCssReady)
})
</script>`

    // src/style.css
    files['src/style.css'] = `body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.app {
  padding: 20px;
}

.logs {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.logs-container {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  font-size: 12px;
  color: #666;
  margin: 5px 0;
}

.demo {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}`

    // 复制运行时和组件文件
    files['public/micro-runtime/micro-runtime.js'] = this.readDistFile('micro-runtime.js')
    this.collectAssets(files, 'micro-runtime/assets')
    
    files['src/mc/vue/Footer.vue'] = this.readDistFile('components/vue/Footer.js')

    return files
  }

  // 生成 React + Vite 沙盒
  generateReactFiles(): StackBlitzFile {
    const files: StackBlitzFile = {}

    // package.json
    files['package.json'] = JSON.stringify({
      name: 'micro-components-react-stackblitz',
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1'
      },
      devDependencies: {
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
        '@vitejs/plugin-react': '^4.0.0',
        vite: '^5.0.0'
      }
    }, null, 2)

    // vite.config.js
    files['vite.config.js'] = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})`

    // index.html
    files['index.html'] = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React + Micro Components</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- MicroRuntime 静态注入 -->
    <script src="./micro-runtime/micro-runtime.js"></script>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`

    // src/main.jsx
    files['src/main.jsx'] = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`

    // src/App.jsx
    files['src/App.jsx'] = `import React, { useEffect, useState } from 'react'
import Footer from './mc/react/Footer.jsx'

export default function App() {
  const [brand] = useState({ name: 'React 测试品牌' })
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const ready = () => setLogs((p) => [...p, '✅ MicroRuntime 已就绪'])
    const cssReady = () => setLogs((p) => [...p, '✅ CSS 已加载'])
    
    window.addEventListener('MicroRuntime:ready', ready)
    window.addEventListener('MicroRuntime:cssReady', cssReady)
    
    return () => {
      window.removeEventListener('MicroRuntime:ready', ready)
      window.removeEventListener('MicroRuntime:cssReady', cssReady)
    }
  }, [])

  const handleEvent = (name, ...args) => {
    setLogs((prev) => [...prev, '🎯 事件: ' + name + ' - ' + JSON.stringify(args)])
  }

  return (
    <div className="app">
      <h1>🚀 React + Micro Components 验证</h1>
      
      <div className="logs">
        <h3>运行时日志:</h3>
        <div className="logs-container">
          {logs.map((log, index) => (
            <div key={index} className="log-item">{log}</div>
          ))}
        </div>
      </div>

      <div className="demo">
        <h3>Footer 组件测试:</h3>
        <Footer
          brand={brand}
          theme="light"
          onEvent={handleEvent}
        />
      </div>
    </div>
  )
}`

    // src/index.css
    files['src/index.css'] = `body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.app {
  padding: 20px;
}

.logs {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.logs-container {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  font-size: 12px;
  color: #666;
  margin: 5px 0;
}

.demo {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}`

    // 复制运行时和组件文件
    files['public/micro-runtime/micro-runtime.js'] = this.readDistFile('micro-runtime.js')
    this.collectAssets(files, 'micro-runtime/assets')
    
    files['src/mc/react/Footer.jsx'] = this.readDistFile('components/react/Footer.js')

    return files
  }

  // 创建 StackBlitz 项目
  async createVue3Project(): Promise<string> {
    const files = this.generateVue3Files()
    
    sdk.openProject({
      title: 'Vue3 + Micro Components',
      description: 'Vue3 微组件库验证沙盒',
      template: 'vue',
      files,
      settings: {
        compile: {
          trigger: 'auto',
          action: 'refresh',
          clearConsole: false
        }
      }
    })

    return 'StackBlitz Vue3 项目创建成功'
  }

  async createReactProject(): Promise<string> {
    const files = this.generateReactFiles()
    
    sdk.openProject({
      title: 'React + Micro Components',
      description: 'React 微组件库验证沙盒',
      template: 'create-react-app',
      files,
      settings: {
        compile: {
          trigger: 'auto',
          action: 'refresh',
          clearConsole: false
        }
      }
    })

    return 'StackBlitz React 项目创建成功'
  }

  async run() {
    console.log('🚀 开始创建 StackBlitz 验证沙盒...')
    
    try {
      console.log('📦 创建 Vue3 沙盒...')
      const vue3Url = await this.createVue3Project()
      console.log('✅ Vue3 沙盒:', vue3Url)
      
      console.log('📦 创建 React 沙盒...')
      const reactUrl = await this.createReactProject()
      console.log('✅ React 沙盒:', reactUrl)
      
      console.log('🎯 StackBlitz 沙盒创建完成!')
      
    } catch (error) {
      console.error('❌ 创建失败:', error)
      throw error
    }
  }
}

// 直接运行检测
const isDirectRun = fileURLToPath(import.meta.url) === process.argv[1]
if (isDirectRun) {
  const stackblitz = new StackBlitzDefine()
  stackblitz.run().catch(console.error)
}

export default StackBlitzDefine