<template>
  <div id="app">
    <header class="header">
      <h1>Micro Component Vue3 Test</h1>
      <p>测试编译后的组件产物在 Vue3 环境下的运行情况</p>
      
      <!-- 组件选择器 -->
      <div class="component-selector">
        <span>Components:</span>
        <Select
          v-model:value="selectedComponent"
          class="component-select"
          placeholder="选择组件"
          show-search
          @change="onComponentChange"
        >
          <SelectOption v-for="component in components" :key="component.value" :value="component.value">
            {{ component.label }}
          </SelectOption>
        </Select>
      </div>
    </header>

    <main class="main">
      <!-- Button 组件 -->
      <section v-if="selectedComponent === 'button'" class="test-section">
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

      <!-- Footer 组件 -->
      <section v-if="selectedComponent === 'footer'" class="test-section">
        <h2>Footer 组件测试</h2>
        <div class="component-demo">
          <MicroFooter
            :theme="'light'"
            :is-i18n-enabled="true"
            :theme-switch-enabled="true"
            :languages="languages"
            @theme-change="handleThemeChange"
            @language-change="handleLanguageChange"
            @push="handleLinkClick"
          />
        </div>
      </section>

      <!-- ProTable 组件 -->
      <section v-if="selectedComponent === 'protable'" class="test-section">
        <h2>ProTable 组件测试</h2>
        <div class="component-demo">
                          <MicroProTable
                  ref="proTableRef"
                  title="员工管理系统"
                  description="这是一个全面的 ProTable 示例，展示了所有可用的功能和属性（使用配置渲染方案）"
                  :columns="proTableColumns"
                  :dataSource="proTableData"
                  :showFilter="true"
                  :needExpand="true"
                  :isExpand="false"
                  :labelWidth="'100%'"
                  :formSize="'middle'"
                  :filters="proTableFilters"
                  :showPagination="true"
                  :pagination="proTablePagination"
                  :showSelection="true"
                  :showOperation="true"
                  :showFullScreen="true"
                  :showColumnConfig="true"
                  :rowSelection="proTableRowSelection"
                  :tableConfig="proTableConfig"
                  :customFilterRender="customFilterRenderConfig"
                  :onCustomFilterChange="handleCustomFilterRenderChange"
                  @search="handleProTableSearch"
                  @reset="handleProTableReset"
                  @selectionChange="handleProTableSelectionChange"
                />
        </div>
      </section>

      <!-- 测试结果 -->
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
import { defineComponent, ref, h } from 'vue'
import { Select, SelectOption, Input as AInput, InputGroup as AInputGroup } from 'ant-design-vue'
// @ts-ignore
import MicroFooter from 'micro-components/vue/Footer'
// @ts-ignore
import MicroButton from 'micro-components/vue/Button'
// @ts-ignore
import MicroProTable from 'micro-components/vue/ProTable'



export default defineComponent({
  name: 'App',
  components: {
    MicroFooter,
    MicroButton,
    MicroProTable,
    Select,
    SelectOption,
    AInput,
    AInputGroup
  },
  setup() {
    const selectedComponent = ref('button')
    const testResults = ref<Array<{
      id: string
      name: string
      status: 'success' | 'error' | 'pending'
      message: string
    }>>([])

    // 自定义筛选相关
    const customFilterType = ref('name')
    const customFilterValue = ref('')
    const proTableRef = ref()

    // 组件列表
    const components = [
      { label: 'Button', value: 'button' },
      { label: 'Footer', value: 'footer' },
      { label: 'ProTable', value: 'protable' }
    ]

    const productLinks = [
      { title: 'Features', url: '/features', target: '_self' },
      { title: 'Pricing', url: '/pricing', target: '_self' }
    ]

    const supportLinks = [
      { title: 'Help Center', url: '/help', target: '_self' },
      { title: 'Contact Us', url: '/contact', target: '_self' }
    ]

          const languages = [
        { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
        { locale: 'zh', languageKey: 'zh_CN', languageType: 1, languageName: '中文' }
      ]

          // ProTable 配置 - 复制 playground 的完整配置
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
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
          width: 200
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
          width: 100,
          customRender: (text: string) => {
            const color = text === '在职' ? '#52c41a' : '#ff4d4f'
            return h('span', { style: { color, fontWeight: 'bold' } }, text)
          }
        },
        {
          title: '薪资',
          dataIndex: 'salary',
          key: 'salary',
          width: 100,
          sorter: true,
          customRender: (text: string) => {
            const numValue = parseInt(text) || 0
            return h('span', { style: { color: '#1890ff', fontWeight: 'bold' } }, `¥${numValue.toLocaleString()}`)
          }
        },
        {
          title: '学历',
          dataIndex: 'education',
          key: 'education',
          width: 100,
          filters: [
            { text: '高中', value: '高中' },
            { text: '大专', value: '大专' },
            { text: '本科', value: '本科' },
            { text: '硕士', value: '硕士' },
            { text: '博士', value: '博士' }
          ]
        },
        {
          title: '工作经验',
          dataIndex: 'experience',
          key: 'experience',
          width: 120,
          filters: [
            { text: '应届生', value: '应届生' },
            { text: '1-3年', value: '1-3年' },
            { text: '3-5年', value: '3-5年' },
            { text: '5-10年', value: '5-10年' },
            { text: '10年以上', value: '10年以上' }
          ]
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 120,
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 150,
          fixed: 'right' as const,
          customRender: (text: any, record: any) => {
            return h('div', { style: { display: 'flex', gap: '8px' } }, [
              h('a', { style: { color: '#1890ff' } }, '编辑'),
              h('a', { style: { color: '#ff4d4f' } }, '删除')
            ])
          }
        }
      ]

          const proTableData = [
        {
          id: '1',
          name: '张三',
          age: 25,
          email: 'zhangsan@example.com',
          phone: '13800138001',
          department: '技术部',
          status: '在职',
          salary: 15000,
          education: '本科',
          experience: '3-5年',
          createTime: '2023-01-15'
        },
        {
          id: '2',
          name: '李四',
          age: 30,
          email: 'lisi@example.com',
          phone: '13800138002',
          department: '产品部',
          status: '在职',
          salary: 18000,
          education: '硕士',
          experience: '5-10年',
          createTime: '2023-02-20'
        },
        {
          id: '3',
          name: '王五',
          age: 28,
          email: 'wangwu@example.com',
          phone: '13800138003',
          department: '设计部',
          status: '离职',
          salary: 12000,
          education: '本科',
          experience: '3-5年',
          createTime: '2023-03-10'
        },
        {
          id: '4',
          name: '赵六',
          age: 32,
          email: 'zhaoliu@example.com',
          phone: '13800138004',
          department: '技术部',
          status: '在职',
          salary: 20000,
          education: '硕士',
          experience: '5-10年',
          createTime: '2023-04-05'
        },
        {
          id: '5',
          name: '钱七',
          age: 27,
          email: 'qianqi@example.com',
          phone: '13800138005',
          department: '市场部',
          status: '在职',
          salary: 14000,
          education: '大专',
          experience: '1-3年',
          createTime: '2023-05-12'
        },
        {
          id: '6',
          name: '孙八',
          age: 29,
          email: 'sunba@example.com',
          phone: '13800138006',
          department: '技术部',
          status: '在职',
          salary: 16000,
          education: '本科',
          experience: '3-5年',
          createTime: '2023-06-18'
        },
        {
          id: '7',
          name: '周九',
          age: 31,
          email: 'zhoujiu@example.com',
          phone: '13800138007',
          department: '产品部',
          status: '离职',
          salary: 22000,
          education: '硕士',
          experience: '5-10年',
          createTime: '2023-07-22'
        }
      ]

          const proTableFilters = [
        {
          key: 'name',
          label: '姓名',
          component: 'input',
          placeholder: '请输入姓名',
          span: 6,
          allowClear: true,
          defaultValue: '',
          rules: [{ required: false, message: '请输入姓名' }]
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
          key: 'age',
          label: '年龄范围',
          component: 'input',
          placeholder: '请输入年龄',
          span: 6,
          props: {
            type: 'number',
            min: 18,
            max: 65
          }
        },
        {
          key: 'createTime',
          label: '创建时间',
          component: 'datePicker',
          placeholder: '请选择日期',
          span: 6,
          allowClear: true
        },
        {
          key: 'region',
          label: '地区',
          component: 'cascader',
          placeholder: '请选择地区',
          span: 6,
          options: [
            {
              label: '北京',
              value: 'beijing',
              children: [
                { label: '朝阳区', value: 'chaoyang' },
                { label: '海淀区', value: 'haidian' }
              ]
            },
            {
              label: '上海',
              value: 'shanghai',
              children: [
                { label: '浦东新区', value: 'pudong' },
                { label: '黄浦区', value: 'huangpu' }
              ]
            }
          ],
          allowClear: true
        },
        {
          key: 'custom',
          label: '自定义',
          component: 'custom',
          span: 6,
          slotName: 'custom-filter'
        },
        {
          key: 'salary',
          label: '薪资范围',
          component: 'input',
          placeholder: '请输入薪资',
          span: 6,
          props: {
            type: 'number',
            min: 0
          }
        },
        {
          key: 'education',
          label: '学历',
          component: 'select',
          placeholder: '请选择学历',
          span: 6,
          options: [
            { label: '高中', value: '高中' },
            { label: '大专', value: '大专' },
            { label: '本科', value: '本科' },
            { label: '硕士', value: '硕士' },
            { label: '博士', value: '博士' }
          ],
          allowClear: true
        },
        {
          key: 'experience',
          label: '工作经验',
          component: 'select',
          placeholder: '请选择经验',
          span: 6,
          options: [
            { label: '1年以下', value: '1年以下' },
            { label: '1-3年', value: '1-3年' },
            { label: '3-5年', value: '3-5年' },
            { label: '5-10年', value: '5-10年' },
            { label: '10年以上', value: '10年以上' }
          ],
          allowClear: true
        }
      ]

          const proTablePagination = {
        current: 1,
        pageSize: 10,
        total: 7,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        style: 'text-align: right; margin-top: 16px;',
        showTotal: (total: number, range: [number, number]) => 
          `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
      }

          const proTableRowSelection = {
        selectedRowKeys: ['1', '3'],
        onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
          console.log('选中的行:', selectedRowKeys, selectedRows)
          addTestResult('ProTable 行选择', 'success', `选中了 ${selectedRowKeys.length} 行数据`)
        }
      }

    const proTableConfig = {
      rowKey: 'id',
      loading: false,
      bordered: true,
      size: 'middle',
      scroll: { x: 1000, y: 400 },
      showHeader: true,
      sticky: true
    }

    // 新的自定义筛选渲染配置
    const customFilterRenderConfig = {
      type: 'inputGroup' as const,
      inputGroup: {
        selectConfig: {
          type: 'select' as const,
          placeholder: '类型',
          size: 'middle' as const,
          options: [
            { label: '姓名', value: 'name' },
            { label: '邮箱', value: 'email' },
            { label: '电话', value: 'phone' }
          ]
        },
        inputConfig: {
          type: 'input' as const,
          placeholder: '请输入搜索内容',
          size: 'middle' as const,
          allowClear: true
        },
        selectWidth: '30%',
        inputWidth: '70%'
      }
    }

    function onComponentChange(component: any) {
      selectedComponent.value = component as string
      addTestResult('组件切换', 'success', `切换到 ${component} 组件`)
    }

    function handleButtonClick() {
      addTestResult('Button 点击', 'success', '按钮点击事件触发成功')
    }

    function handleThemeChange(theme: string) {
      addTestResult('Footer 主题切换', 'success', `主题切换到: ${theme}`)
    }

    function handleLanguageChange(locale: string) {
      addTestResult('Footer 语言切换', 'success', `语言切换到: ${locale}`)
    }

    function handleLinkClick(link: any) {
      addTestResult('Footer 链接点击', 'success', `点击链接: ${link.title}`)
    }

    function handleCustomFilterChange(updateFilterFn?: any) {
      console.log('[Vue3 Test] 自定义筛选变化:', customFilterType.value, customFilterValue.value)
      
      // 根据选择的类型更新对应的筛选值
      if (customFilterValue.value && customFilterValue.value.trim()) {
        // 使用插槽传递的 updateFilter 方法
        if (typeof updateFilterFn === 'function') {
          updateFilterFn(customFilterType.value, customFilterValue.value.trim())
        } else {
          // 备用方案：直接访问 ProTable 组件实例的方法
          const proTableInstance = proTableRef.value
          if (proTableInstance && proTableInstance.updateFilterValue) {
            proTableInstance.updateFilterValue(customFilterType.value, customFilterValue.value.trim())
          }
        }
      } else {
        // 如果值为空，清除对应的筛选值
        if (typeof updateFilterFn === 'function') {
          updateFilterFn(customFilterType.value, null)
        } else {
          const proTableInstance = proTableRef.value
          if (proTableInstance && proTableInstance.updateFilterValue) {
            proTableInstance.updateFilterValue(customFilterType.value, null)
          }
        }
      }
      
      addTestResult('ProTable 自定义筛选', 'success', `筛选类型: ${customFilterType.value}, 值: ${customFilterValue.value}`)
    }

    function handleProTableSearch(values: any) {
      addTestResult('ProTable 搜索', 'success', `搜索参数: ${JSON.stringify(values)}`)
    }

    function handleProTableReset() {
      console.log('[Vue3 Test] 重置事件触发，清空自定义筛选条件')
      addTestResult('ProTable 重置', 'success', '筛选条件已重置')
      // 重置自定义筛选组件的值
      customFilterType.value = 'name'
      customFilterValue.value = ''
    }

    function handleProTableSelectionChange(selectedRowKeys: string[], selectedRows: any[]) {
      addTestResult('ProTable 选择变化', 'success', `选中了 ${selectedRowKeys.length} 行数据`)
    }

    // 新的自定义筛选渲染变化处理
    function handleCustomFilterRenderChange(key: string, value: any) {
      console.log('[Vue3 Test] 自定义筛选渲染变化:', key, value)
      addTestResult('ProTable 自定义筛选渲染', 'success', `筛选键: ${key}, 值: ${JSON.stringify(value)}`)
      
      // 这里可以处理筛选逻辑
      if (value && typeof value === 'object' && value.type && value.value) {
        // inputGroup 类型的值处理
        if (value.type === 'select') {
          customFilterType.value = value.value
        } else if (value.type === 'input') {
          customFilterValue.value = value.value
        }
      } else {
        // 简单值处理
        if (key === 'custom') {
          // 处理自定义筛选
        }
      }
    }

    function addTestResult(name: string, status: 'success' | 'error' | 'pending', message: string) {
      testResults.value.push({
        id: Date.now().toString(),
        name,
        status,
        message
      })
    }

    return {
      selectedComponent,
      components,
      testResults,
      productLinks,
      supportLinks,
      languages,
      customFilterType,
      customFilterValue,
      proTableColumns,
      proTableData,
      proTableFilters,
      proTablePagination,
      proTableRowSelection,
      proTableConfig,
      customFilterRenderConfig,
      onComponentChange,
      handleButtonClick,
      handleThemeChange,
      handleLanguageChange,
      handleLinkClick,
      handleCustomFilterChange,
      handleCustomFilterRenderChange,
      handleProTableSearch,
      handleProTableReset,
      handleProTableSelectionChange
    }
  }
})
</script>

<style scoped>
.header {
  background: #f5f5f5;
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.component-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.component-select {
  width: 200px;
}

.main {
  padding: 20px;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: white;
}

.component-demo {
  margin-top: 15px;
}

.button-group {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.test-results {
  margin-top: 15px;
}

.test-result {
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  border-left: 4px solid;
}

.test-result.success {
  background: #f6ffed;
  border-left-color: #52c41a;
  color: #52c41a;
}

.test-result.error {
  background: #fff2f0;
  border-left-color: #ff4d4f;
  color: #ff4d4f;
}

.test-result.pending {
  background: #fffbe6;
  border-left-color: #faad14;
  color: #faad14;
}

.no-results {
  color: #999;
  font-style: italic;
}

/* 自定义筛选组件样式 */
.custom-filter-demo {
  width: 100%;
}

.custom-filter-demo .ant-input-group {
  width: 100%;
  display: flex;
}

.custom-filter-demo .ant-input-group .ant-select {
  flex: 0 0 30%;
}

.custom-filter-demo .ant-input-group .ant-input {
  flex: 1;
  border-left: 0;
}

.custom-filter-demo .ant-input-group .ant-select:focus-within,
.custom-filter-demo .ant-input-group .ant-input:focus {
  z-index: 1;
  border-left-width: 1px;
}
</style>