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

// 使用 props + 配置/回调 的自定义筛选渲染配置
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
