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
      <ProTable v-bind="comprehensiveExample" ref="proTableRef" @reset="handleReset">
        <!-- 自定义筛选插槽 -->
        <template #custom-filter="{ filterValues, updateFilter }">
          <div class="custom-filter-demo">
            <a-input-group compact>
              <a-select 
                v-model:value="customFilterType" 
                style="width: 30%"
                placeholder="类型"
                size="middle"
                :getPopupContainer="(triggerNode) => triggerNode?.parentNode"
              >
                <a-select-option value="name">姓名</a-select-option>
                <a-select-option value="email">邮箱</a-select-option>
                <a-select-option value="phone">电话</a-select-option>
              </a-select>
              <a-input 
                v-model:value="customFilterValue"
                style="width: 70%"
                placeholder="请输入搜索内容" 
                :allowClear="true"
                size="middle"
                @change="handleCustomFilterChange"
                @pressEnter="handleCustomFilterChange"
              />
            </a-input-group>
          </div>
        </template>
      </ProTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProTable from '@/components/ProTable/ProTable.vue'
import { comprehensiveExample } from '@/components/ProTable/example'
import {
  Input as AInput,
  Select as ASelect,
  SelectOption as ASelectOption,
  InputGroup as AInputGroup
} from 'ant-design-vue'

// 自定义筛选组件的响应式数据
const customFilterType = ref('name')
const customFilterValue = ref('')
const proTableRef = ref()

// 处理自定义筛选变化
const handleCustomFilterChange = () => {
  // 直接访问 ProTable 组件实例的方法
  const proTableInstance = proTableRef.value
  if (proTableInstance && proTableInstance.updateFilterValue) {
    console.log('[Playground] 自定义筛选变化:', customFilterType.value, customFilterValue.value)
    
    // 根据选择的类型更新对应的筛选值
    if (customFilterValue.value && customFilterValue.value.trim()) {
      proTableInstance.updateFilterValue(customFilterType.value, customFilterValue.value.trim())
    } else {
      // 如果值为空，清除对应的筛选值
      proTableInstance.updateFilterValue(customFilterType.value, null)
    }
  } else {
    console.warn('[Playground] ProTable 实例或 updateFilterValue 方法不存在')
  }
}

// 处理重置事件
const handleReset = () => {
  console.log('[Playground] 重置事件触发，清空自定义筛选条件')
  // 重置自定义筛选组件的值
  customFilterType.value = 'name'
  customFilterValue.value = ''
}
</script>

<style scoped>
.custom-filter-demo {
  width: 100%;
}
</style>

<style>
/* 自定义筛选组件样式 - 只定义必要的特殊样式 */
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

.custom-filter-tips {
  margin-top: 4px;
  display: flex;
  gap: 4px;
}
</style>
