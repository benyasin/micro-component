import React, { useState } from 'react'
import { Select } from 'antd'
import MicroFooter from 'micro-components/react/Footer'
import MicroButton from 'micro-components/react/Button'
import MicroProTable from 'micro-components/react/ProTable'
import { comprehensiveExample } from '@/components/ProTable/example'
import './App.css'

const { Option } = Select

interface TestResult {
  id: string
  name: string
  status: 'success' | 'error' | 'pending'
  message: string
}

interface Component {
  label: string
  value: string
}

function App() {
  const [selectedComponent, setSelectedComponent] = useState<string>('button')
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [customFilterType, setCustomFilterType] = useState<string>('name')
  const [customFilterValue, setCustomFilterValue] = useState<string>('')
  const [isMockOn, setIsMockOn] = useState<boolean>(true)
  const [refreshTick, setRefreshTick] = useState<number>(0)

  // 统一记录测试输出
  // 确保唯一且稳定的 ID，避免 React key 警告
  const createUniqueId = React.useCallback(() => {
    // 优先使用 crypto.randomUUID
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return (crypto as any).randomUUID()
    }
    // 退化方案：时间戳 + 随机 + 高精度时间
    const rand = Math.random().toString(36).slice(2)
    const perf = (typeof performance !== 'undefined' ? performance.now() : Math.random()).toString(36)
    return `${Date.now()}-${rand}-${perf}`
  }, [])

  const addTestResult = React.useCallback((name: string, status: 'success' | 'error' | 'pending', message: string) => {
    setTestResults(prev => [{ id: createUniqueId(), name, status, message }, ...prev])
  }, [])

  const components: Component[] = [
    { label: 'Button', value: 'button' },
    { label: 'Footer', value: 'footer' },
    { label: 'ProTable', value: 'protable' }
  ]

  const languages = [
    { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
    { locale: 'zh-CN', languageKey: 'zh_CN', languageType: 1, languageName: '中文' }
  ]

  const proTableColumns = comprehensiveExample.columns as any;

  const proTableData = comprehensiveExample.dataSource as any;

  const proTableFilters = comprehensiveExample.filters as any;

  const proTablePagination = comprehensiveExample.pagination as any

  const proTableRowSelection = comprehensiveExample.rowSelection as any

  const proTableConfig = comprehensiveExample.tableConfig as any

 // 自定义请求参数（用于验证 params 传递）
 const extraParams = React.useMemo(() => ({ from: 'react-test', fixedFlag: true }), [])
 
 // 使用useRef确保params对象引用稳定
 const proTableParamsRef = React.useRef({ ...extraParams, _tick: refreshTick })
 
 // 更新params对象的tick值
 React.useEffect(() => {
   proTableParamsRef.current._tick = refreshTick
 }, [refreshTick])
 
 const proTableParams = proTableParamsRef.current

 // 请求前参数二次处理（验证 beforeRequest）
 const beforeRequestHook = React.useCallback((params: any) => {
   console.log('[React beforeRequest] 入参:', params)
   const merged = { ...params, envTag: 'dev' }
   addTestResult('React beforeRequest 调用', 'success', JSON.stringify(merged))
   return merged
 }, [])

  const onComponentChange = (component: string) => {
    setSelectedComponent(component)
    addTestResult('组件切换', 'success', `切换到 ${component} 组件`)
  }

  const handleThemeChange = (theme: string) => {
    addTestResult('Footer 主题切换', 'success', `主题切换到: ${theme}`)
  }

  const handleLanguageChange = (language: any) => {
    const locale = typeof language === 'string' ? language : language?.locale
    addTestResult('Footer 语言切换', 'success', `语言切换到: ${locale}`)
  }

  const handleLinkClick = (link: any) => {
    addTestResult('Footer 链接点击', 'success', `点击链接: ${link.title}`)
  }

  // 顶部 Mock 控件动作（不依赖内部暴露方法，通过受控 props 驱动）
  const toggleMockSwitch = () => {
    setIsMockOn(prev => !prev)
    addTestResult('Mock 切换', 'success', `切换为: ${!isMockOn ? 'ON' : 'OFF'}`)
  }
  const refreshMockData = () => {
    setRefreshTick(t => t + 1)
    addTestResult('Mock 刷新', 'success', '已触发刷新')
  }

  const handleButtonClick = (event: MouseEvent) => {
    const buttonText = (event.target as HTMLButtonElement)?.textContent || '未知按钮'
    addTestResult('Button 点击', 'success', `按钮被点击: ${buttonText}`)
  }

  // 自定义筛选渲染配置（替换 slot 方案）
  const customFilterRenderConfig = React.useMemo(() => ({
    type: 'inputGroup' as const,
    inputGroup: {
      selectConfig: {
        type: 'select',
        placeholder: '类型',
        size: 'middle',
        options: [
          { label: '姓名', value: 'name' },
          { label: '邮箱', value: 'email' },
          { label: '电话', value: 'phone' }
        ]
      },
      inputConfig: {
        type: 'input',
        placeholder: '请输入搜索内容',
        allowClear: true,
        size: 'middle'
      },
      selectWidth: '30%',
      inputWidth: '70%'
    }
  }), [])

  const handleCustomFilterRenderChange = React.useCallback((key: string, value: any) => {
    // 处理自定义筛选变化
    if (value && typeof value === 'object' && value.type) {
      if (value.type === 'select') {
        setCustomFilterType(String(value.value || 'name'))
      } else if (value.type === 'input') {
        setCustomFilterValue(String(value.value || ''))
      }
    }
    // 避免频繁调用addTestResult，只在必要时记录
    // addTestResult('ProTable 自定义筛选渲染', 'success', JSON.stringify({ key, value }))
  }, [])

  const handleProTableSearch = (values: any) => {
    addTestResult('ProTable 搜索', 'success', `搜索参数: ${JSON.stringify(values)}`)
  }

  const handleProTableReset = () => {
    addTestResult('ProTable 重置', 'success', '筛选条件已重置')
    setCustomFilterType('name')
    setCustomFilterValue('')
  }

  const handleProTableSelectionChange = (selectedRowKeys: string[], selectedRows: any[]) => {
    addTestResult('ProTable 选择变化', 'success', `选中了 ${selectedRowKeys.length} 行数据`)
  }

  // 组件加载成功测试
  React.useEffect(() => {
    addTestResult('MicroFooter 组件导入', 'success', '成功从 micro-components/react/Footer 导入')
    addTestResult('MicroButton 组件导入', 'success', '成功从 micro-components/react/Button 导入')
    addTestResult('MicroProTable 组件导入', 'success', '成功从 micro-components/react/ProTable 导入')
    
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
        
        {/* 组件选择器 */}
        <div className="component-selector">
          <span>Components:</span>
          <Select
            value={selectedComponent}
            className="component-select"
            placeholder="选择组件"
            showSearch
            onChange={onComponentChange}
          >
            {components.map(component => (
              <Option key={component.value} value={component.value}>
                {component.label}
              </Option>
            ))}
          </Select>
        </div>
      </header>

      <main className="main">
        {/* Button 组件 */}
        {selectedComponent === 'button' && (
          <section className="test-section">
            <h2>Button 组件测试</h2>
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
        )}

        {/* Footer 组件 */}
        {selectedComponent === 'footer' && (
          <section className="test-section">
            <h2>Footer 组件测试</h2>
            <div className="component-demo">
              <MicroFooter
                theme="light"
                i18nEnabled={true}
                languages={languages}
                onThemeChange={handleThemeChange}
                onLanguageChange={handleLanguageChange}
                onPush={handleLinkClick}
              />
            </div>
          </section>
        )}

        {/* ProTable 组件 */}
        {selectedComponent === 'protable' && (
          <section className="test-section">
            <h2>ProTable 组件测试</h2>
            {/* 从组件内部移出的演示头部与 Mock 控制 */}
            <div className="component-demo" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0' }}>员工管理系统</h3>
                <p style={{ margin: 0, color: '#666' }}>这是一个全面的 ProTable 示例，展示了所有可用的功能和属性</p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button type="button" onClick={toggleMockSwitch} onMouseDown={(e) => e.stopPropagation()} style={{ padding: '4px 12px', fontSize: 12, borderRadius: 4, border: '1px solid #d9d9d9', cursor: 'pointer' }}>
                  {isMockOn ? 'Mock ON' : 'Mock OFF'}
                </button>
                <button type="button" onClick={refreshMockData} onMouseDown={(e) => e.stopPropagation()} style={{ padding: '4px 12px', fontSize: 12, borderRadius: 4, background: '#1677ff', color: '#fff', border: '1px solid #1677ff', cursor: 'pointer' }}>
                  刷新数据
                </button>
              </div>
            </div>
            <div className="component-demo">
              <MicroProTable
                key={`protable-${refreshTick}`}
                title="员工管理系统"
                description="这是一个全面的 ProTable 示例，展示了所有可用的功能和属性"
                columns={proTableColumns}
                dataSource={proTableData}
                mockEnabled={isMockOn}
                showFilter={true}
                needExpand={true}
                isExpand={false}
                labelWidth="100%"
                formSize="middle"
                filters={proTableFilters}
                showPagination={true}
                pagination={proTablePagination}
                showSelection={true}
                showOperation={true}
                showFullScreen={true}
                showColumnConfig={true}
                rowSelection={proTableRowSelection}
                tableConfig={proTableConfig}
                params={proTableParams}
                beforeRequest={beforeRequestHook}
                onSearch={handleProTableSearch}
                onReset={handleProTableReset}
                onSelectionChange={handleProTableSelectionChange}
                // 新的: 通过 props + 配置/回调 定义自定义筛选
                customFilterRender={customFilterRenderConfig}
                onCustomFilterChange={handleCustomFilterRenderChange}
              />
            </div>
          </section>
        )}

        {/* 测试结果 */}
        <section className="test-section">
          <h2>测试结果</h2>
          <div className="test-results">
            {testResults.length === 0 ? (
              <div className="no-results">暂无测试结果</div>
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