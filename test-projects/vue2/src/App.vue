<template>
  <div id="app">
    <header class="header">
      <h1>Micro Component Vue2 Test</h1>
      <p>测试编译后的组件产物在 Vue2 环境下的运行情况</p>
      
      <!-- 组件选择器 -->
      <div class="component-selector">
        <span>Components:</span>
        <a-select
          v-model="selectedComponent"
          class="component-select"
          placeholder="选择组件"
          show-search
          @change="onComponentChange"
        >
          <a-select-option v-for="component in components" :key="component.value" :value="component.value">
            {{ component.label }}
          </a-select-option>
        </a-select>
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
            :languages="languages"
            @theme-change="handleThemeChange"
            @language-change="handleLanguageChange"
            @push="handlePush"
          />
        </div>
      </section>

      <!-- ProTable 组件 -->
      <section v-if="selectedComponent === 'protable'" class="test-section">
        <h2>ProTable 组件测试</h2>
        <div class="component-demo">
          <MicroProTable
            title="员工管理系统"
            description="这是一个全面的 ProTable 示例，展示了所有可用的功能和属性"
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
            @search="handleProTableSearch"
            @reset="handleProTableReset"
            @selectionChange="handleProTableSelectionChange"
          >
            <template v-slot:custom-filter="{ filterValues, updateFilter }">
              <div style="width: 100%;">
                <a-input-group compact>
                  <a-select 
                    v-model="customFilterType" 
                    style="width: 30%"
                    placeholder="类型"
                    size="middle"
                  >
                    <a-select-option value="name">姓名</a-select-option>
                    <a-select-option value="email">邮箱</a-select-option>
                    <a-select-option value="phone">电话</a-select-option>
                  </a-select>
                  <a-input 
                    v-model="customFilterValue"
                    style="width: 70%"
                    placeholder="请输入搜索内容" 
                    :allowClear="true"
                    size="middle"
                    @change="() => handleCustomFilterChange(updateFilter)"
                    @pressEnter="() => handleCustomFilterChange(updateFilter)"
                  />
                </a-input-group>
              </div>
            </template>
          </MicroProTable>
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

<script>
const MicroFooter = require('micro-components/vue2/Footer')
const MicroButton = require('micro-components/vue2/Button')
const MicroProTable = require('micro-components/vue2/ProTable')

export default {
  name: 'App',
  components: {
    MicroFooter,
    MicroButton,
    MicroProTable
  },
  data() {
    return {
      selectedComponent: 'button',
      testResults: [],
      customFilterType: 'name',
      customFilterValue: '',
      components: [
        { label: 'Button', value: 'button' },
        { label: 'Footer', value: 'footer' },
        { label: 'ProTable', value: 'protable' }
      ],
      languages: [
        { locale: 'en', languageName: 'English' },
        { locale: 'zh', languageName: '中文' }
      ],
      // ProTable 配置
      proTableColumns: [
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
      ],
      proTableData: [
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
      ],
      proTableFilters: [
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
      ],
      proTablePagination: {
        current: 1,
        pageSize: 10,
        total: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
      },
      proTableRowSelection: {
        selectedRowKeys: ['1'],
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('选中的行:', selectedRowKeys, selectedRows)
          this.addTestResult('ProTable 行选择', 'success', `选中了 ${selectedRowKeys.length} 行数据`)
        }
      },
      proTableConfig: {
        rowKey: 'id',
        loading: false,
        bordered: true,
        size: 'middle',
        scroll: { x: 1000, y: 400 },
        showHeader: true,
        sticky: true
      }
    }
  },
  methods: {
    onComponentChange(component) {
      this.selectedComponent = component
      this.addTestResult('组件切换', 'success', `切换到 ${component} 组件`)
    },
    addTestResult(name, status, message) {
      this.testResults.push({
        id: Date.now().toString(),
        name,
        status,
        message
      })
    },
    handleThemeChange(theme) {
      this.addTestResult('Footer 主题切换', 'success', `主题切换到: ${theme}`)
    },
    handleLanguageChange(locale) {
      this.addTestResult('Footer 语言切换', 'success', `语言切换到: ${locale}`)
    },
    handlePush(link) {
      this.addTestResult('Footer 链接点击', 'success', `点击链接: ${link.title}`)
    },
    handleButtonClick() {
      this.addTestResult('Button 点击', 'success', '按钮点击事件触发成功')
    },
    handleCustomFilterChange(updateFilterFn) {
      console.log('自定义筛选变化:', this.customFilterType, this.customFilterValue)
      
      // 根据选择的类型更新对应的筛选值
      if (this.customFilterValue && this.customFilterValue.trim()) {
        // 使用插槽传递的 updateFilter 方法
        if (typeof updateFilterFn === 'function') {
          updateFilterFn(this.customFilterType, this.customFilterValue.trim())
        } else {
          // 备用方案：直接访问 ProTable 组件实例的方法
          const proTableInstance = this.$refs.proTableRef
          if (proTableInstance && proTableInstance.updateFilterValue) {
            proTableInstance.updateFilterValue(this.customFilterType, this.customFilterValue.trim())
          }
        }
      } else {
        // 如果值为空，清除对应的筛选值
        if (typeof updateFilterFn === 'function') {
          updateFilterFn(this.customFilterType, null)
        } else {
          const proTableInstance = this.$refs.proTableRef
          if (proTableInstance && proTableInstance.updateFilterValue) {
            proTableInstance.updateFilterValue(this.customFilterType, null)
          }
        }
      }
      
      this.addTestResult('ProTable 自定义筛选', 'success', `筛选类型: ${this.customFilterType}, 值: ${this.customFilterValue}`)
    },
    handleProTableSearch(values) {
      this.addTestResult('ProTable 搜索', 'success', `搜索参数: ${JSON.stringify(values)}`)
    },
    handleProTableReset() {
      this.addTestResult('ProTable 重置', 'success', '筛选条件已重置')
      this.customFilterType = 'name'
      this.customFilterValue = ''
    },
    handleProTableSelectionChange(selectedRowKeys, selectedRows) {
      this.addTestResult('ProTable 选择变化', 'success', `选中了 ${selectedRowKeys.length} 行数据`)
    }
  }
}
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
</style>