<template>
  <div id="app">
    <header class="header">
      <h1>Micro Component Vue3 Test</h1>
      <p>测试编译后的组件产物在 Vue3 环境下的运行情况</p>
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
            @push="handleLinkClick"
          />
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MicroFooter from 'micro-components/vue/Footer'

export default defineComponent({
  name: 'App',
  components: {
    MicroFooter
  },
  setup() {
    const testResults = ref<Array<{
      id: string
      name: string
      status: 'success' | 'error' | 'pending'
      message: string
    }>>([])

    const productLinks = [
      { title: 'Features', url: '/features', target: '_self' },
      { title: 'Pricing', url: '/pricing', target: '_self' }
    ]

    const supportLinks = [
      { title: 'Help Center', url: '/help', target: '_self' },
      { title: 'Contact Us', url: '/contact', target: '_self' }
    ]

    const socialLinks = [
      { name: 'twitter', title: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
      { name: 'github', title: 'GitHub', url: 'https://github.com', icon: '📚' }
    ]

    const languages = [
      { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
      { locale: 'zh-CN', languageKey: 'zh_CN', languageType: 1, languageName: '简体中文' }
    ]

    const addTestResult = (result: any) => {
      testResults.value.push({
        ...result,
        id: Date.now().toString()
      })
    }

    const handleThemeChange = (theme: string) => {
      console.log('Theme changed to:', theme)
      addTestResult({
        name: '主题切换',
        status: 'success',
        message: `主题已切换到: ${theme}`
      })
    }

    const handleLanguageChange = (language: any) => {
      console.log('Language changed to:', language)
      addTestResult({
        name: '语言切换',
        status: 'success',
        message: `语言已切换到: ${language.languageName}`
      })
    }

    const handleLinkClick = (url: string, target: string) => {
      console.log('Link clicked:', url, target)
      addTestResult({
        name: '链接点击',
        status: 'success',
        message: `链接已点击: ${url}`
      })
    }

    // 组件加载成功测试
    addTestResult({
      name: 'MicroFooter 组件导入',
      status: 'success',
      message: '成功从 micro-components/vue/Footer 导入'
    })

    return {
      testResults,
      productLinks,
      supportLinks,
      socialLinks,
      languages,
      handleThemeChange,
      handleLanguageChange,
      handleLinkClick
    }
  }
})
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
</style>