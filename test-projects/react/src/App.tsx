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
      id: Date.now().toString()
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

  const handleButtonClick = (type: string) => {
    console.log('Button clicked:', type)
    addTestResult({
      name: '按钮点击',
      status: 'success',
      message: `${type} 按钮被点击`
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
              <MicroButton text="默认按钮" onClick={() => handleButtonClick('默认')} />
              <MicroButton text="主要按钮" color="#1890ff" onClick={() => handleButtonClick('主要')} />
              <MicroButton text="成功按钮" color="#52c41a" onClick={() => handleButtonClick('成功')} />
              <MicroButton text="警告按钮" color="#faad14" onClick={() => handleButtonClick('警告')} />
              <MicroButton text="危险按钮" color="#ff4d4f" onClick={() => handleButtonClick('危险')} />
            </div>
            <div className="button-group">
              <MicroButton text="大按钮" size="large" color="#1890ff" onClick={() => handleButtonClick('大尺寸')} />
              <MicroButton text="中按钮" size="medium" color="#1890ff" onClick={() => handleButtonClick('中等尺寸')} />
              <MicroButton text="小按钮" size="small" color="#1890ff" onClick={() => handleButtonClick('小尺寸')} />
            </div>
            <div className="button-group">
              <MicroButton text="绿色" color="#52c41a" onClick={() => handleButtonClick('绿色')} />
              <MicroButton text="橙色" color="#fa8c16" onClick={() => handleButtonClick('橙色')} />
              <MicroButton text="紫色" color="#722ed1" onClick={() => handleButtonClick('紫色')} />
              <MicroButton text="粉色" color="#eb2f96" onClick={() => handleButtonClick('粉色')} />
            </div>
            <div className="button-group">
              <MicroButton text="点击我" color="#1890ff" onClick={() => handleButtonClick('点击')} />
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