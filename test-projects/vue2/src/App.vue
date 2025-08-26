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
          <a-select-option
            v-for="component in components"
            :key="component.value"
            :value="component.value"
          >
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
        <!-- 从组件内部移出的演示头部与 Mock 控制 -->
        <div class="component-demo" style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:flex-start; gap:12px; position:relative; z-index:1;">
          <div>
            <h3 style="margin:0 0 8px 0; font-size:20px; line-height:28px;">员工管理系统</h3>
            <p style="margin:0; color:#666; font-size:14px; line-height:22px;">这是一个全面的 ProTable 示例，展示了所有可用的功能和属性</p>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button type="button" @click="toggleMockSwitch" @mousedown.stop style="padding:4px 12px; font-size:12px; border-radius:4px; border:1px solid #d9d9d9; cursor:pointer;">
              {{ isMockOn ? 'Mock ON' : 'Mock OFF' }}
            </button>
            <button type="button" @click="refreshMockData" @mousedown.stop style="padding:4px 12px; font-size:12px; border-radius:4px; background:#1677ff; color:#fff; border:1px solid #1677ff; cursor:pointer;">
              刷新数据
            </button>
          </div>
        </div>
        <div class="component-demo">
          <MicroProTable
            :key="'protable-' + refreshTick"
            ref="proTableRef"
            title="员工管理系统"
            description="这是一个全面的 ProTable 示例，展示了所有可用的功能和属性"
            :columns="proTableColumns"
            :dataSource="proTableData"
            :mockEnabled="isMockOn"
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
            :params="proTableParams"
            :beforeRequest="beforeRequestHook"
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
          <div v-if="testResults.length === 0" class="no-results">暂无测试结果</div>
          <div v-else>
            <div
              v-for="result in testResults"
              :key="result.id"
              :class="['test-result', result.status]"
            >
              <strong>{{ result.name }}</strong>
              : {{ result.message }}
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
const { comprehensiveExample } = require('@/components/ProTable/example')

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
      isMockOn: true,
      refreshTick: 0,
      components: [
        { label: 'Button', value: 'button' },
        { label: 'Footer', value: 'footer' },
        { label: 'ProTable', value: 'protable' }
      ],
      languages: [
        { locale: 'en', languageName: 'English' },
        { locale: 'zh', languageName: '中文' }
      ],
      // 自定义请求参数（用于验证 params 传递）
      extraParams: {
        from: 'vue2-test',
        fixedFlag: true
      },
      // 使用普通属性确保params对象引用稳定
      proTableParams: null,
      // ProTable 配置（与 playground 保持一致）
      proTableColumns: comprehensiveExample.columns,
      proTableData: comprehensiveExample.dataSource,
      proTableFilters: comprehensiveExample.filters,
      proTablePagination: comprehensiveExample.pagination,
      proTableRowSelection: comprehensiveExample.rowSelection,
      proTableConfig: comprehensiveExample.tableConfig,
      // 自定义筛选配置 - 将在created中初始化
      customFilterRenderConfig: null
    }
  },
  // 第二个 data 定义会覆盖第一个，导致 selectedComponent/ components 未初始化
  // 移除该重复 data，改为把 isMockOn/refreshTick 放入上面的 data 中
  created() {
    // 初始化自定义筛选配置，确保引用稳定
    this.customFilterRenderConfig = {
      type: 'inputGroup',
      inputGroup: {
        selectConfig: {
          placeholder: '类型',
          size: 'middle',
          options: [
            { label: '姓名', value: 'name' },
            { label: '邮箱', value: 'email' },
            { label: '电话', value: 'phone' }
          ]
        },
        inputConfig: {
          placeholder: '请输入搜索内容',
          size: 'middle',
          allowClear: true
        },
        selectWidth: '30%',
        inputWidth: '70%'
      }
    }
    
    // 初始化params对象，确保引用稳定
    this.proTableParams = { ...this.extraParams, _tick: this.refreshTick }
  },
  methods: {
    toggleMockSwitch() {
      this.isMockOn = !this.isMockOn
      const inst = this.$refs.proTableRef
      if (inst && typeof inst.toggleMock === 'function') inst.toggleMock(this.isMockOn)
      this.refreshTick += 1
      // 更新params对象而不是重新创建
      this.proTableParams._tick = this.refreshTick
    },
    refreshMockData() {
      const inst = this.$refs.proTableRef
      if (inst && typeof inst.loadMockData === 'function') inst.loadMockData()
      this.refreshTick += 1
      // 更新params对象而不是重新创建
      this.proTableParams._tick = this.refreshTick
    },
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
    handleCustomFilterRenderChange: function(key, value) {
      // 处理自定义筛选变化
      if (value && typeof value === 'object' && value.type) {
        if (value.type === 'select') {
          this.customFilterType = value.value
        } else if (value.type === 'input') {
          this.customFilterValue = value.value
        }
      }
      
      this.addTestResult(
        'ProTable 自定义筛选渲染',
        'success',
        JSON.stringify({ key, value })
      )
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
    },
    // 用于请求前参数二次处理的钩子（验证 beforeRequest）
    beforeRequestHook(params) {
      console.log('[Vue2 beforeRequest] 入参:', params)
      const merged = { ...params, envTag: 'dev' }
      this.addTestResult('Vue2 beforeRequest 调用', 'success', JSON.stringify(merged))
      return merged
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

/* 确保Ant Design Select组件样式正确显示 */
.component-selector .ant-select {
  width: 200px;
}

.component-selector .ant-select-selection {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  display: block;
  font-size: 14px;
  height: 32px;
  line-height: 30px;
  outline: none;
  position: relative;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.component-selector .ant-select-selection:hover {
  border-color: #40a9ff;
}

.component-selector .ant-select-focused .ant-select-selection {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.component-selector .ant-select-selection__rendered {
  display: block;
  line-height: 30px;
  margin-left: 11px;
  margin-right: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.component-selector .ant-select-arrow {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  line-height: 1;
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
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
