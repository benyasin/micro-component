<template>
  <div id="app">
    <header class="header">
      <h1>Micro Component Vue2 Test</h1>
      <p>测试编译后的组件产物在 Vue2 环境下的运行情况</p>
    </header>

    <main class="main">
      <section class="test-section">
        <h2>Footer 组件（从 micro-components 包导入）</h2>
        <div class="component-demo">
          <MicroFooter 
            :theme="'light'"
            :is-i18n-enabled="true"
            :languages="languages"
            @theme-change="handleThemeChange"
            @language-change="handleLanguageChange"
            @push="handlePush"
          />
        </div>
      </section>

      <section class="test-section">
        <h2>Button 组件测试</h2>
        <div class="component-demo">
          <div class="button-group">
            <MicroButton text="默认按钮" @click="handleButtonClick" />
            <MicroButton text="主要按钮" color="#1890ff" @click="handleButtonClick" />
            <MicroButton text="成功按钮" color="#52c41a" @click="handleButtonClick" />
            <MicroButton text="警告按钮" color="#faad14" @click="handleButtonClick" />
            <MicroButton text="危险按钮" color="#ff4d4f" @click="handleButtonClick" />
          </div>
          
          <div class="button-group">
            <MicroButton text="大按钮" size="large" color="#1890ff" @click="handleButtonClick" />
            <MicroButton text="中按钮" size="medium" color="#1890ff" @click="handleButtonClick" />
            <MicroButton text="小按钮" size="small" color="#1890ff" @click="handleButtonClick" />
          </div>
          
          <div class="button-group">
            <MicroButton text="绿色" color="#52c41a" @click="handleButtonClick" />
            <MicroButton text="橙色" color="#fa8c16" @click="handleButtonClick" />
            <MicroButton text="紫色" color="#722ed1" @click="handleButtonClick" />
            <MicroButton text="粉色" color="#eb2f96" @click="handleButtonClick" />
          </div>
          
          <div class="button-group">
            <MicroButton text="点击我" color="#1890ff" @click="handleButtonClick" />
          </div>
        </div>
      </section>

      <section class="test-section">
        <h2>测试结果</h2>
        <div class="test-results">
          <div v-if="testResults.length === 0" class="no-results">
            暂无测试结果
          </div>
          <div v-else>
            <div 
              v-for="result in testResults" 
              :key="result.id"
              :class="['test-result', result.status]"
            >
              <strong>{{ result.name }}</strong>: {{ result.message }}
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
const MicroFooter = require('micro-components/vue2/Footer')
const MicroButton = require('micro-components/vue2/Button')

export default {
  name: 'App',
  components: {
    MicroFooter,
    MicroButton
  },
  data() {
    return {
      testResults: [],
      languages: [
        { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
        { locale: 'zh-CN', languageKey: 'zh_CN', languageType: 1, languageName: '简体中文' }
      ]
    }
  },
  methods: {
    addTestResult(result) {
      this.testResults.push({
        ...result,
        id: Date.now().toString()
      })
    },
    handleThemeChange(theme) {
      this.addTestResult({
        name: '主题变更',
        status: 'success',
        message: `主题切换为 ${theme}`
      })
    },
    handleLanguageChange(language) {
      this.addTestResult({
        name: '语言切换',
        status: 'success',
        message: `${(language && language.locale) || ''}`
      })
    },
    handlePush(url, target) {
      this.addTestResult({
        name: '链接跳转',
        status: 'success',
        message: `${url} (${target})`
      })
    },
    handleButtonClick(type) {
      console.log('Button clicked:', type)
      this.addTestResult({
        name: '按钮点击',
        status: 'success',
        message: `${type} 按钮被点击`
      })
    }
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
}

.header p {
  margin: 0;
  opacity: 0.9;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.test-section {
  margin-bottom: 3rem;
  padding: 2rem;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: #f8f9fa;
}

.test-section h2 {
  margin-top: 0;
  color: #2c3e50;
}

.component-demo {
  padding: 2rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  background: white;
  min-height: 200px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.test-results {
  background: white;
  border-radius: 8px;
  padding: 1rem;
}

.no-results {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.test-result {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border-left: 4px solid;
}

.test-result.success {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.test-result.error {
  background: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
}

.test-result.pending {
  background: #fff3cd;
  border-color: #ffc107;
  color: #856404;
}

/* Responsive design */
@media (max-width: 768px) {
  .main {
    padding: 0 1rem;
  }
  
  .test-section {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}
</style>