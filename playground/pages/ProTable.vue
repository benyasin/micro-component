<template>
  <div class="p-20px">
    <!-- 全面示例 -->
    <div class="mb-12">
      <p class="text-gray-600 mb-4">这个示例展示了 ProTable 的所有功能和属性，包括：</p>
      <ul class="text-gray-400 font-size-4 mb-6 list-disc list-inside space-y-1">
        <li>表格基础功能：排序、筛选、固定列、省略号</li>
        <li>自定义渲染：状态颜色、操作按钮</li>
        <li>筛选功能：输入框、下拉选择、数字输入</li>
        <li>分页功能：页码、每页条数、快速跳转、总数显示</li>
        <li>行选择：多选、选择回调</li>
        <li>操作栏：刷新、全屏、列配置、尺寸切换</li>
        <li>表格配置：边框、尺寸、滚动、粘性表头</li>
        <li>请求配置：模拟 API 调用</li>
      </ul>
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
import { ref } from 'vue'
import ProTable from '@/components/ProTable/ProTable.vue'
import { comprehensiveExample } from '@/components/ProTable/example'

// 自定义筛选组件的响应式数据（用于记录选择的筛选键和值）
const customFilterType = ref('name')
const customFilterValue = ref('')
const proTableRef = ref()

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

<style scoped>
</style>

<style>
</style>
