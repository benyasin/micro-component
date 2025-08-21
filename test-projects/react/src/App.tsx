import React, { useState } from 'react'
import { Select, Input, Space } from 'antd'
import MicroFooter from 'micro-components/react/Footer'
import MicroButton from 'micro-components/react/Button'
import MicroProTable from 'micro-components/react/ProTable'
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

  const components: Component[] = [
    { label: 'Button', value: 'button' },
    { label: 'Footer', value: 'footer' },
    { label: 'ProTable', value: 'protable' }
  ]

  const addTestResult = (name: string, status: 'success' | 'error' | 'pending', message: string) => {
    setTestResults(prev => [...prev, {
      id: Date.now().toString(),
      name,
      status,
      message
    }])
  }

  const languages = [
    { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
    { locale: 'zh', languageKey: 'zh_CN', languageType: 1, languageName: '中文' }
  ]

  // ProTable 配置
  const proTableColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120
    },
    {
      title: '薪资',
      dataIndex: 'salary',
      key: 'salary',
      width: 100,
      sorter: true
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      width: 100
    }
  ]

  const proTableData = [
    {
      id: '1',
      name: '张三',
      age: 25,
      department: '技术部',
      status: '在职',
      createTime: '2023-01-15',
      salary: 15000,
      education: '本科'
    },
    {
      id: '2',
      name: '李四',
      age: 30,
      department: '产品部',
      status: '在职',
      createTime: '2023-02-20',
      salary: 18000,
      education: '硕士'
    },
    {
      id: '3',
      name: '王五',
      age: 28,
      department: '设计部',
      status: '离职',
      createTime: '2023-03-10',
      salary: 12000,
      education: '本科'
    },
    {
      id: '4',
      name: '赵六',
      age: 32,
      department: '技术部',
      status: '在职',
      createTime: '2023-04-05',
      salary: 20000,
      education: '硕士'
    },
    {
      id: '5',
      name: '钱七',
      age: 27,
      department: '市场部',
      status: '在职',
      createTime: '2023-05-12',
      salary: 14000,
      education: '大专'
    }
  ]

  const proTableFilters = [
    {
      key: 'name',
      label: '姓名',
      component: 'input',
      placeholder: '请输入姓名',
      span: 6,
      allowClear: true
    },
    {
      key: 'department',
      label: '部门',
      component: 'select',
      placeholder: '请选择部门',
      span: 6,
      options: [
        { label: '技术部', value: '技术部' },
        { label: '产品部', value: '产品部' },
        { label: '设计部', value: '设计部' },
        { label: '市场部', value: '市场部' }
      ],
      allowClear: true
    },
    {
      key: 'status',
      label: '状态',
      component: 'select',
      placeholder: '请选择状态',
      span: 6,
      options: [
        { label: '在职', value: '在职' },
        { label: '离职', value: '离职' }
      ],
      allowClear: true
    },
    {
      key: 'custom',
      label: '自定义',
      component: 'custom',
      span: 6,
      slotName: 'custom-filter'
    }
  ]

  const proTablePagination = {
    current: 1,
    pageSize: 10,
    total: 5,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total: number, range: [number, number]) => 
      `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
  }

  const proTableRowSelection = {
    selectedRowKeys: ['1'],
    onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
      console.log('选中的行:', selectedRowKeys, selectedRows)
      addTestResult('ProTable 行选择', 'success', `选中了 ${selectedRowKeys.length} 行数据`)
    }
  }

  const proTableConfig = {
    rowKey: 'id',
    loading: false,
    bordered: true,
    size: 'middle' as const,
    scroll: { x: 1000, y: 400 },
    showHeader: true,
    sticky: true
  }

 // 自定义请求参数（用于验证 params 传递）
 const extraParams = React.useMemo(() => ({ from: 'react-test', fixedFlag: true }), [])

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

  const handleLanguageChange = (locale: string) => {
    addTestResult('Footer 语言切换', 'success', `语言切换到: ${locale}`)
  }

  const handleLinkClick = (link: any) => {
    addTestResult('Footer 链接点击', 'success', `点击链接: ${link.title}`)
  }

  const handleButtonClick = (event: MouseEvent) => {
    const buttonText = (event.target as HTMLButtonElement)?.textContent || '未知按钮'
    addTestResult('Button 点击', 'success', `按钮被点击: ${buttonText}`)
  }

  const handleCustomFilterChange = () => {
    console.log('自定义筛选变化:', customFilterType, customFilterValue)
    addTestResult('ProTable 自定义筛选', 'success', `筛选类型: ${customFilterType}, 值: ${customFilterValue}`)
  }

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

  const renderCustomFilter = () => (
    <div style={{ width: '100%' }}>
      <Space.Compact style={{ width: '100%' }}>
        <Select 
          value={customFilterType} 
          onChange={setCustomFilterType}
          style={{ width: '30%' }}
          placeholder="类型"
          size="middle"
        >
          <Option value="name">姓名</Option>
          <Option value="email">邮箱</Option>
          <Option value="phone">电话</Option>
        </Select>
        <Input 
          value={customFilterValue}
          onChange={(e) => setCustomFilterValue(e.target.value)}
          style={{ width: '70%' }}
          placeholder="请输入搜索内容" 
          allowClear
          size="middle"
          onPressEnter={handleCustomFilterChange}
        />
      </Space.Compact>
    </div>
  )

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
                isI18nEnabled={true}
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
            <div className="component-demo">
              <MicroProTable
                title="员工管理系统"
                description="这是一个全面的 ProTable 示例，展示了所有可用的功能和属性"
                columns={proTableColumns}
                dataSource={proTableData}
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
               params={extraParams}
               beforeRequest={beforeRequestHook}
                onSearch={handleProTableSearch}
                onReset={handleProTableReset}
                onSelectionChange={handleProTableSelectionChange}
                customFilterSlot={renderCustomFilter}
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