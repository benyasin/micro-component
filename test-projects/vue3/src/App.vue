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
          <SelectOption
            v-for="component in components"
            :key="component.value"
            :value="component.value"
          >
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
            <button type="button" @click="refreshMockData" :disabled="isMockLoading" @mousedown.stop style="padding:4px 12px; font-size:12px; border-radius:4px; background:#1677ff; color:#fff; border:1px solid #1677ff; cursor:pointer;">
              {{ isMockLoading ? '加载中...' : '刷新数据' }}
            </button>
          </div>
        </div>
        <div class="component-demo">
          <MicroProTable
            :key="`protable-${refreshTick}`"
            ref="proTableRef"
            title="员工管理系统"
            description="这是一个全面的 ProTable 示例，展示了所有可用的功能和属性（使用配置渲染方案）"
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
            :customFilterRender="customFilterRenderConfig"
            :onCustomFilterChange="handleCustomFilterRenderChange"
            :params="proTableParams"
            :beforeRequest="beforeRequestHook"
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

<script lang="ts">
import { defineComponent, ref, h, computed, shallowRef } from 'vue'
import { comprehensiveExample } from '@/components/ProTable/example'
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
    const testResults = ref<
      Array<{
        id: string
        name: string
        status: 'success' | 'error' | 'pending'
        message: string
      }>
    >([])

    // 自定义筛选相关
    const customFilterType = ref('name')
    const customFilterValue = ref('')
    const proTableRef = ref<any>()

    const isMockOn = ref(true)
    const refreshTick = ref(0)
    const isMockLoading = computed(() => Boolean(proTableRef.value?.mockLoading?.value))

    const toggleMockSwitch = () => {
      const next = !isMockOn.value
      isMockOn.value = next
      const inst: any = proTableRef.value
      if (inst && typeof inst.toggleMock === 'function') inst.toggleMock(next)
      refreshTick.value++
    }

    const refreshMockData = () => {
      const inst: any = proTableRef.value
      if (inst && typeof inst.loadMockData === 'function') inst.loadMockData()
      refreshTick.value++
    }

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

    // ProTable 配置 - 复用 playground example，保持一致
    const proTableColumns = comprehensiveExample.columns as any
    const proTableData = comprehensiveExample.dataSource as any
    const proTableFilters = comprehensiveExample.filters as any
    const proTablePagination = comprehensiveExample.pagination as any
    const proTableRowSelection = comprehensiveExample.rowSelection as any
    const proTableConfig = comprehensiveExample.tableConfig as any

    // 请求参数与 beforeRequest（playground 对齐，避免绑定未定义导致报错）
    const extraParams = { from: 'vue3-test', fixedFlag: true }
    const beforeRequestHook = (params: any) => ({ ...params, envTag: 'dev' })
    
    // 使用computed确保params对象引用稳定
    const proTableParams = computed(() => ({ ...extraParams, _tick: refreshTick.value }))

    // 新的自定义筛选渲染配置 - 使用 shallowRef 确保引用稳定
    const customFilterRenderConfig = shallowRef({
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
    })

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

    const handleCustomFilterRenderChange = (key: string, value: any) => {
      // 处理自定义筛选变化
      if (value && typeof value === 'object' && value.type) {
        if (value.type === 'select') {
          customFilterType.value = value.value
        } else if (value.type === 'input') {
          customFilterValue.value = value.value
        }
      }
      
      addTestResult(
        'ProTable 自定义筛选渲染',
        'success',
        JSON.stringify({ key, value })
      )
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
      isMockOn,
      isMockLoading,
      refreshTick,
      proTableColumns,
      proTableData,
      proTableFilters,
      proTablePagination,
      proTableRowSelection,
      proTableConfig,
      extraParams,
      beforeRequestHook,
      proTableParams,
      customFilterRenderConfig,
      onComponentChange,
      handleButtonClick,
      handleThemeChange,
      handleLanguageChange,
      handleLinkClick,
      toggleMockSwitch,
      refreshMockData,
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
