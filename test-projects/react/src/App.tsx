import React, { useState } from 'react'
import MicroFooter from 'micro-components/react/Footer'
import MicroButton from 'micro-components/react/Button'
import './App.css'

interface TestResult {
  id: string
  name: string
  status: 'success' | 'error' | 'pending'
  message: string
}

function App() {
  const [testResults, setTestResults] = useState<TestResult[]>([])

  const addTestResult = (result: Omit<TestResult, 'id'>) => {
    setTestResults(prev => [...prev, {
      ...result,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }])
  }

  const languages = [
    { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
    { locale: 'zh-CN', languageKey: 'zh_CN', languageType: 1, languageName: '简体中文' }
  ]

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

  // 修复事件处理函数，接受MouseEvent参数
  const handleButtonClick = (event: MouseEvent) => {
    console.log('Button clicked:', event)
    const buttonText = (event.target as HTMLButtonElement)?.textContent || '未知按钮'
    addTestResult({
      name: '按钮点击',
      status: 'success',
      message: `按钮被点击: ${buttonText}`
    })
  }

  // 调试函数：测试事件传递
  const testEventPassing = () => {
    console.log('Testing event passing...')
    addTestResult({
      name: '事件传递测试',
      status: 'pending',
      message: '正在测试事件传递机制...'
    })
  }

  // 组件加载成功测试
  React.useEffect(() => {
    addTestResult({
      name: 'MicroFooter 组件导入',
      status: 'success',
      message: '成功从 micro-components/react/Footer 导入'
    })
    addTestResult({
      name: 'MicroButton 组件导入',
      status: 'success',
      message: '成功从 micro-components/react/Button 导入'
    })
    
    // 启用调试模式
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('MICRO_COMPONENT:DEBUG', 'true')
    }
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Micro Component React Test</h1>
        <p>测试编译后的组件产物在 React 环境下的运行情况</p>
      </header>

      <main className="main">
        <section className="test-section">
          <h2>MicroFooter 组件（从 micro-components 包导入）</h2>
          <div className="component-demo">
            <MicroFooter
              theme="light"
              languages={languages}
              onThemeChange={handleThemeChange}
              onLanguageChange={handleLanguageChange}
              onPush={handleLinkClick}
            />
          </div>
        </section>

        <section className="test-section">
          <h2>MicroButton 组件（从 micro-components 包导入）</h2>
          <div className="component-demo">
            <div className="button-group">
              <MicroButton text="默认按钮" onClick={handleButtonClick} />
              <MicroButton text="主要按钮" color="#1890ff" onClick={handleButtonClick} />
              <MicroButton text="成功按钮" color="#52c41a" onClick={handleButtonClick} />
              <MicroButton text="警告按钮" color="#faad14" onClick={handleButtonClick} />
              <MicroButton text="危险按钮" color="#ff4d4f" onClick={handleButtonClick} />
            </div>
            <div className="button-group">
              <MicroButton text="大按钮" size="large" color="#1890ff" onClick={handleButtonClick} />
              <MicroButton text="中按钮" size="medium" color="#1890ff" onClick={handleButtonClick} />
              <MicroButton text="小按钮" size="small" color="#1890ff" onClick={handleButtonClick} />
            </div>
            <div className="button-group">
              <MicroButton text="绿色" color="#52c41a" onClick={handleButtonClick} />
              <MicroButton text="橙色" color="#fa8c16" onClick={handleButtonClick} />
              <MicroButton text="紫色" color="#722ed1" onClick={handleButtonClick} />
              <MicroButton text="粉色" color="#eb2f96" onClick={handleButtonClick} />
            </div>
            <div className="button-group">
              <MicroButton text="点击我" color="#1890ff" onClick={handleButtonClick} />
            </div>
          </div>
        </section>

        <section className="test-section">
          <h2>测试结果</h2>
          <div className="test-results">
            {testResults.length === 0 ? (
              <div className="no-results">
                暂无测试结果
              </div>
            ) : (
              testResults.map(result => (
                <div 
                  key={result.id}
                  className={`test-result ${result.status}`}
                >
                  <strong>{result.name}</strong>: {result.message}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App