<template>
  <div class="p-20px">
    <div class="mb-12 p-16px border border-$line rounded-6 bg-cardBg text-primaryText flex items-start justify-between" style="position:relative; z-index:1;">
      <div>
        <h3 class="m-0 mb-8px font-600" style="font-size: 20px; line-height: 28px;">员工管理系统</h3>
        <p class="m-0 text-secondaryText" style="font-size: 14px; line-height: 22px;">这是一个全面的 ProTable 示例，展示了所有可用的功能和属性</p>
      </div>
      <div class="flex items-center gap-8px">
        <button
          type="button"
          class="px-12px py-4px rounded-4 border border-$line"
          style="font-size:12px; cursor:pointer;"
          @click="toggleMockSwitch"
        >
          {{ isMockOn ? 'Mock ON' : 'Mock OFF' }}
        </button>
        <button
          type="button"
          class="px-12px py-4px rounded-4 bg-#1677ff text-white"
          style="font-size:12px; cursor:pointer; border:1px solid #1677ff;"
          :disabled="isMockLoading"
          @click="refreshMockData"
        >
          {{ isMockLoading ? '加载中...' : '刷新数据' }}
        </button>
      </div>
          </div>

      <!-- 使用说明 -->
      <div class="mb-12 p-16px border border-$line rounded-6 bg-cardBg text-primaryText">
        <h3 class="m-0 mb-8px font-600" style="font-size: 18px; line-height: 26px;">自定义筛选Ant Design组件方案</h3>
        <p class="m-0 text-secondaryText" style="font-size: 14px; line-height: 22px;">
          采用基于Ant Design组件的配置方案，确保样式一致性和跨框架兼容性：
        </p>
        <ul class="m-0 mt-8px text-secondaryText" style="font-size: 14px; line-height: 22px;">
          <li><strong>样式一致</strong>：使用Ant Design组件，保证UI风格统一</li>
          <li><strong>跨框架兼容</strong>：Vue2、Vue3、React都能正常工作</li>
          <li><strong>配置灵活</strong>：支持多种组件类型和组合方式</li>
          <li><strong>高级自定义</strong>：支持render函数进行完全自定义</li>
        </ul>
        
        <details class="mt-12px">
          <summary style="cursor: pointer; color: #1677ff;">查看使用示例</summary>
          <div class="mt-8px p-12px bg-gray-50 rounded-4 text-sm">
            <p class="m-0 mb-8px"><strong>基础配置方案：</strong></p>
            <pre class="m-0 text-xs bg-white p-8px rounded-2 overflow-x-auto"><code>// 输入组合配置
const config = {
  type: 'inputGroup',
  inputGroup: {
    selectConfig: {
      placeholder: '类型',
      options: [{ label: '姓名', value: 'name' }]
    },
    inputConfig: {
      placeholder: '请输入搜索内容',
      allowClear: true
    }
  }
}

// 单一组件配置
const selectConfig = {
  type: 'select',
  placeholder: '请选择',
  options: [{ label: '姓名', value: 'name' }]
}

// 高级自定义
const customConfig = {
  type: 'custom',
  render: ({ updateFilter }) => {
    return h('div', [
      // 完全自定义的组件结构
    ])
  }
}</code></pre>
          </div>
        </details>
      </div>

      <!-- 全面示例 -->
    <div class="mb-12">
      <ProTable 
        v-bind="comprehensiveExample" 
        ref="proTableRef" 
        @reset="handleReset"
        :customFilterRender="customFilterRenderConfig"
        :onCustomFilterChange="handleCustomFilterRenderChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProTable from '@/components/ProTable/ProTable.vue'
import { comprehensiveExample } from '@/components/ProTable/example'

// 自定义筛选组件的响应式数据（用于记录选择的筛选键和值）
const customFilterType = ref('name')
const customFilterValue = ref('')
const proTableRef = ref()
// 顶部演示区：按钮方法与状态
const isMockOn = computed(() => Boolean((proTableRef as any)?.value?.mockEnabled))
const isMockLoading = computed(() => Boolean((proTableRef as any)?.value?.mockLoading))

function toggleMockSwitch() {
  const inst: any = (proTableRef as any)?.value
  if (inst && typeof inst.toggleMock === 'function') {
    inst.toggleMock(!inst.mockEnabled)
  }
}

function refreshMockData() {
  const inst: any = (proTableRef as any)?.value
  if (inst && typeof inst.loadMockData === 'function') {
    inst.loadMockData()
  }
}

// 使用基于Ant Design组件的自定义筛选配置
const customFilterRenderConfig = {
  type: 'inputGroup' as const,
  inputGroup: {
    selectConfig: {
      placeholder: '类型',
      size: 'middle' as const,
      options: [
        { label: '姓名', value: 'name' },
        { label: '邮箱', value: 'email' },
        { label: '电话', value: 'phone' }
      ]
    },
    inputConfig: {
      placeholder: '请输入搜索内容',
      size: 'middle' as const,
      allowClear: true
    },
    selectWidth: '30%',
    inputWidth: '70%'
  }
}

// 处理 ProTable 内部自定义筛选渲染的变化回调
function handleCustomFilterRenderChange(key: string, value: any) {
  // 这里兼容 inputGroup 的变更对象：{ type: 'select' | 'input', value: any }
  if (value && typeof value === 'object' && value.type) {
    if (value.type === 'select') {
      customFilterType.value = value.value
    } else if (value.type === 'input') {
      customFilterValue.value = value.value
    }
  }

  // 同步更新到 ProTable 的筛选值（如果有可用实例）
  const proTableInstance = proTableRef.value
  if (proTableInstance && proTableInstance.updateFilterValue) {
    if (customFilterValue.value && String(customFilterValue.value).trim()) {
      proTableInstance.updateFilterValue(customFilterType.value, String(customFilterValue.value).trim())
    } else {
      // 值为空时，清除对应筛选
      proTableInstance.updateFilterValue(customFilterType.value, null)
    }
  }
}

// 处理重置事件
const handleReset = () => {
  // 重置自定义筛选组件的值
  customFilterType.value = 'name'
  customFilterValue.value = ''
}
</script>
