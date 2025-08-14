import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

// ESM 下获取 __dirname
const __dirname = dirname(fileURLToPath(import.meta.url))

interface CodeSandboxFile {
  content: string
  isBinary?: boolean
}

interface CodeSandboxFiles {
  [path: string]: CodeSandboxFile
}

class CodeSandboxDefine {
  private distPath = join(__dirname, '../dist')
  
  async createSandbox(files: CodeSandboxFiles): Promise<string> {
    const payload = {
      files
    }
    
    try {
      const response = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      const result = await response.json()
      if (!response.ok) {
        console.error('创建沙盒失败: ', response.status, result)
        throw new Error(`CodeSandbox Define API 错误: ${response.status}`)
      }
      if (!result || !result.sandbox_id) {
        console.error('未获取到 sandbox_id，返回结果: ', result)
        throw new Error('CodeSandbox 返回缺少 sandbox_id')
      }
      return result.sandbox_id as string
    } catch (error) {
      console.error('创建沙盒失败:', error)
      throw error
    }
  }
  
  private readDistFile(relativePath: string): string {
    try {
      return readFileSync(join(this.distPath, relativePath), 'utf-8')
    } catch (error) {
      console.warn(`读取文件失败: ${relativePath}`)
      return ''
    }
  }

  // 动态收集 dist/assets 下的所有静态资源
  private collectAssets(target: CodeSandboxFiles, baseDir: string = 'micro-runtime/assets') {
    const assetsDir = join(this.distPath, 'assets')
    if (!existsSync(assetsDir)) return

    const stack = [{ dir: assetsDir, rel: '' }]
    while (stack.length) {
      const { dir, rel } = stack.pop() as { dir: string; rel: string }
      for (const name of readdirSync(dir, { withFileTypes: true }) as unknown as any[]) {
        // @ts-ignore
        const isDir = name.isDirectory?.() || false
        // @ts-ignore
        const entryName: string = name.name
        const full = join(dir, entryName)
        const relPath = rel ? `${rel}/${entryName}` : entryName
        if (isDir) {
          stack.push({ dir: full, rel: relPath })
        } else {
          const content = readFileSync(full, 'utf-8')
          target[`${baseDir}/${relPath}`] = { content }
        }
      }
    }
  }
  
  // 生成 Vue3 + Vite 沙盒文件
  generateVue3Files(): CodeSandboxFiles {
    const files: CodeSandboxFiles = {}
    
    // package.json（最小依赖，避免触发容器环境）
    files['package.json'] = {
      content: JSON.stringify({
        name: 'micro-components-vue3-test',
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview'
        },
        dependencies: {
          vue: '^3.5.18'
        },
        devDependencies: {
          '@vitejs/plugin-vue': '^5.0.0',
          vite: '^5.0.0'
        }
      }, null, 2)
    }

    // vite.config.js 配置
    files['vite.config.js'] = {
      content: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  }
})`
    }
    
    // index.html
    files['index.html'] = {
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3 + Micro Components</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- MicroRuntime 静态注入，避免打包器解析 public 目录问题 -->
    <script src="./micro-runtime/micro-runtime.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`
    }
    
    // src/main.js
    files['src/main.js'] = {
      content: `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')`
    }
    
    // src/App.vue（标准 Vue3 单文件组件）
    files['src/App.vue'] = {
      content: `<template>
  <div class="app">
    <h1>🚀 Vue3 + Micro Components 验证</h1>
    <div class="logs">
      <h3>运行时日志:</h3>
      <div class="logs-container">
        <div v-for="log in logs" :key="log" class="log-item">{{ log }}</div>
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

<script>
import { ref, onMounted } from 'vue'
import Footer from './mc/vue/Footer.js'

export default {
  name: 'App',
  components: {
    Footer
  },
  setup() {
    const brand = ref({ name: 'Vue3 测试品牌' })
    const logs = ref([])

    onMounted(() => {
      window.addEventListener('MicroRuntime:ready', () => {
        logs.value.push('✅ MicroRuntime 已就绪')
      })
      window.addEventListener('MicroRuntime:cssReady', () => {
        logs.value.push('✅ CSS 已加载')
      })
    })

    const handleEvent = (name, ...args) => {
      logs.value.push('🎯 事件: ' + name + ' - ' + JSON.stringify(args))
    }

    return {
      brand,
      logs,
      handleEvent
    }
  }
}
</script>

<style scoped>
.app {
  padding: 20px;
}

.logs {
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.logs-container {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  padding: 4px 0;
  font-family: monospace;
  font-size: 14px;
}

.demo {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>`
    }
    
    // src/style.css
    files['src/style.css'] = {
      content: `body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }`
    }
    
    // 运行时及资源
    files['micro-runtime/micro-runtime.js'] = {
      content: this.readDistFile('micro-runtime.js')
    }
    this.collectAssets(files, 'micro-runtime/assets')
    
    // Vue3 组件包装器
    files['src/mc/vue/Footer.js'] = {
      content: this.readDistFile('components/vue/Footer.js')
    }

    return files
  }
  
  // 生成 React + Vite 沙盒文件
  generateReactFiles(): CodeSandboxFiles {
    const files: CodeSandboxFiles = {}
    
    // package.json（最小依赖，避免触发容器环境）
    files['package.json'] = {
      content: JSON.stringify({
        name: 'micro-components-react-test',
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
          '@vitejs/plugin-react': '^4.0.0',
          vite: '^5.0.0'
        }
      }, null, 2)
    }

    // vite.config.js 配置
    files['vite.config.js'] = {
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})`
    }

    // 指定 CodeSandbox 模板为 react（前端沙盒）
    // 已移除 sandbox.config.json，交由// 指定 CodeSandbox 模板为 react（前端沙盒）
    
    // index.html
    files['index.html'] = {
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React + Micro Components</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- MicroRuntime 静态注入，避免打包器解析 public 目录问题 -->
    <script src="./micro-runtime/micro-runtime.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`
    }
    
    // src/main.js（不使用 JSX，避免浏览器端转译需求）
    files['src/main.js'] = {
      content: `import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

const root = createRoot(document.getElementById('root'))
root.render(React.createElement(StrictMode, null, React.createElement(App)))`
    }
    
    // src/App.js（使用 React.createElement 代替 JSX）
    files['src/App.js'] = {
      content: `import React, { useEffect, useState } from 'react'
import Footer from './mc/react/Footer.js'

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

  return React.createElement('div', { className: 'app' }, [
    React.createElement('h1', { key: 'title' }, '🚀 React + Micro Components 验证'),
    React.createElement('div', { key: 'logs-section', className: 'logs' }, [
      React.createElement('h3', { key: 'logs-title' }, '运行时日志:'),
      React.createElement('div', { key: 'logs-container', className: 'logs-container' }, 
        logs.map((log, index) => React.createElement('div', { key: index, className: 'log-item' }, log))
      )
    ]),
    React.createElement('div', { key: 'demo-section', className: 'demo' }, [
      React.createElement('h3', { key: 'demo-title' }, 'Footer 组件测试:'),
      React.createElement(Footer, {
        key: 'footer-component',
        brand,
        theme: 'light',
        onEvent: (name, ...args) => setLogs((prev) => [...prev, '🎯 事件: ' + name + ' - ' + JSON.stringify(args)])
      })
    ])
  ])
}`
    }
    
    // src/index.css
    files['src/index.css'] = {
      content: `body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
.app { padding: 20px; }
.logs { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0; }
.log-item { font-size: 12px; color: #666; margin: 5px 0; }
.demo { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }`
    }
    
    // 复制运行时和组件文件
    files['micro-runtime/micro-runtime.js'] = {
      content: this.readDistFile('micro-runtime.js')
    }
    this.collectAssets(files, 'micro-runtime/assets')
    
    files['src/mc/react/Footer.js'] = {
      content: this.readDistFile('components/react/Footer.js')
    }
    
    return files
  }
  
  // 生成 Vue2 + Webpack 沙盒文件
  generateVue2Files(): CodeSandboxFiles {
    const files: CodeSandboxFiles = {}
    
    // package.json
    files['package.json'] = {
      content: JSON.stringify({
        name: 'micro-components-vue2-test',
        version: '1.0.0',
        scripts: {
          serve: 'vue-cli-service serve',
          build: 'vue-cli-service build'
        },
        dependencies: {
          'core-js': '^3.8.3',
          vue: '^2.6.14'
        },
        devDependencies: {
          '@vue/cli-plugin-babel': '~5.0.0',
          '@vue/cli-service': '~5.0.0',
          'vue-template-compiler': '^2.6.14'
        }
      }, null, 2)
    }
    
    // public/index.html
    files['public/index.html'] = {
      content: `<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>Vue2 + Micro Components</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but this doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- MicroRuntime 静态注入，避免打包器解析 public 目录问题 -->
    <script src="/micro-runtime/micro-runtime.js"></script>
    <!-- built files will be auto injected -->
  </body>
</html>`
    }
    
    // src/main.js
    files['src/main.js'] = {
      content: `import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')`
    }
    
    // src/App.vue
    files['src/App.vue'] = {
      content: `<template>
  <div class="app">
    <h1>🚀 Vue2 + Micro Components 验证</h1>
    <div class="logs">
      <h3>运行时日志:</h3>
      <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
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

<script>
import Footer from './mc/vue2/Footer.cjs'

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      brand: { name: 'Vue2 测试品牌' },
      logs: []
    }
  },
  mounted() {
    window.addEventListener('MicroRuntime:ready', () => {
      this.logs.push('✅ MicroRuntime 已就绪')
    })
    
    window.addEventListener('MicroRuntime:cssReady', () => {
      this.logs.push('✅ CSS 已加载')
    })
  },
  methods: {
    handleEvent(name, ...args) {
      this.logs.push(\`🎯 事件: \${name} - \${JSON.stringify(args)}\`)
    }
  }
}
</script>

<style>
body {
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

.log-item {
  font-size: 12px;
  color: #666;
  margin: 5px 0;
}

.demo {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}
</style>`
    }
    
    // 复制运行时和组件文件
    files['public/micro-runtime/micro-runtime.js'] = {
      content: this.readDistFile('micro-runtime.js')
    }
    
    // 动态添加 assets 目录内容（Vue2 仍使用 public 前缀）
    this.collectAssets(files, 'public/micro-runtime/assets')
    
    files['src/mc/vue2/Footer.cjs'] = {
      content: this.readDistFile('components/vue2/Footer.cjs')
    }
    
    return files
  }
  
  async run() {
    console.log('🚀 开始创建 CodeSandbox 验证沙盒...')
    
    try {
      // 创建三个沙盒
      const [vue3Id, reactId, vue2Id] = await Promise.all([
        this.createSandbox(this.generateVue3Files()),
        this.createSandbox(this.generateReactFiles()),
        this.createSandbox(this.generateVue2Files())
      ])
      
      console.log('✅ 沙盒创建成功!')
      console.log(`Vue3 沙盒: https://codesandbox.io/s/${vue3Id}`)
      console.log(`React 沙盒: https://codesandbox.io/s/${reactId}`)
      console.log(`Vue2 沙盒: https://codesandbox.io/s/${vue2Id}`)
      
      // 生成验证看板
      const dashboardHtml = this.generateDashboard(vue3Id, reactId, vue2Id)
      const dashboardPath = join(__dirname, '../csb-dashboard.html')
      writeFileSync(dashboardPath, dashboardHtml)
      
      console.log(`🎯 验证看板已生成: ${dashboardPath}`)
      
      // 自动打开看板
      try {
        execSync(`open "${dashboardPath}"`)
      } catch {
        console.log('请手动打开验证看板文件')
      }
      
      return { vue3Id, reactId, vue2Id }
    } catch (error) {
      console.error('❌ 创建失败:', error)
      throw error
    }
  }
  
  private generateDashboard(vue3Id: string, reactId: string, vue2Id: string): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Micro Components 验证看板</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
        }
        .header {
            background: #fff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .header h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .header p {
            color: #666;
            font-size: 14px;
        }
        .container {
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        @media (min-width: 1200px) {
            .container {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        .sandbox-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .sandbox-header {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .sandbox-title {
            font-weight: 600;
            color: #333;
        }
        .sandbox-link {
            color: #0070f3;
            text-decoration: none;
            font-size: 12px;
            padding: 5px 10px;
            border: 1px solid #0070f3;
            border-radius: 4px;
            transition: all 0.2s;
        }
        .sandbox-link:hover {
            background: #0070f3;
            color: white;
        }
        .sandbox-frame {
            width: 100%;
            height: 600px;
            border: none;
        }
        .footer {
            text-align: center;
            padding: 40px 20px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Micro Components 跨框架验证看板</h1>
        <p>实时验证 Vue3、React、Vue2 三个框架的组件兼容性与运行状态</p>
    </div>
    
    <div class="container">
        <div class="sandbox-card">
            <div class="sandbox-header">
                <span class="sandbox-title">🟢 Vue3 + Vite (ESM)</span>
                <a href="https://codesandbox.io/s/${vue3Id}" target="_blank" class="sandbox-link">打开编辑器</a>
            </div>
            <iframe 
                src="https://codesandbox.io/embed/${vue3Id}?fontsize=14&hidenavigation=1&theme=light&view=preview" 
                class="sandbox-frame"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
            </iframe>
        </div>
        
        <div class="sandbox-card">
            <div class="sandbox-header">
                <span class="sandbox-title">🔵 React + Vite (ESM)</span>
                <a href="https://codesandbox.io/s/${reactId}" target="_blank" class="sandbox-link">打开编辑器</a>
            </div>
            <iframe 
                src="https://codesandbox.io/embed/${reactId}?fontsize=14&hidenavigation=1&theme=light&view=preview" 
                class="sandbox-frame"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
            </iframe>
        </div>
        
        <div class="sandbox-card">
            <div class="sandbox-header">
                <span class="sandbox-title">🟡 Vue2 + Webpack (CJS)</span>
                <a href="https://codesandbox.io/s/${vue2Id}" target="_blank" class="sandbox-link">打开编辑器</a>
            </div>
            <iframe 
                src="https://codesandbox.io/embed/${vue2Id}?fontsize=14&hidenavigation=1&theme=light&view=preview" 
                class="sandbox-frame"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
            </iframe>
        </div>
    </div>
    
    <div class="footer">
        <p>🎯 验证点: 运行时加载、组件渲染、Props传递、事件处理、主题切换</p>
        <p>💡 点击 "打开编辑器" 可在 CodeSandbox 中编辑和调试代码</p>
    </div>
</body>
</html>`
  }
}

// 直接执行
const isDirectRun = fileURLToPath(import.meta.url) === process.argv[1]
if (isDirectRun) {
  const csb = new CodeSandboxDefine()
  csb.run().catch(console.error)
}

export default CodeSandboxDefine