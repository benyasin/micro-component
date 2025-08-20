<template>
  <div class="p-20px">
    <!-- 全面示例 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold mb-4">全面功能示例</h2>
      <p class="text-gray-600 mb-4">这个示例展示了 ProTable 的所有功能和属性，包括：</p>
      <ul class="text-gray-600 font-size-4 mb-6 list-disc list-inside space-y-1">
        <li>表格基础功能：排序、筛选、固定列、省略号</li>
        <li>自定义渲染：状态颜色、操作按钮</li>
        <li>筛选功能：输入框、下拉选择、数字输入</li>
        <li>分页功能：页码、每页条数、快速跳转、总数显示</li>
        <li>行选择：多选、选择回调</li>
        <li>操作栏：刷新、全屏、列配置、尺寸切换</li>
        <li>表格配置：边框、尺寸、滚动、粘性表头</li>
        <li>请求配置：模拟 API 调用</li>
      </ul>
      <ProTable v-bind="comprehensiveExample">
        <!-- 自定义筛选插槽 -->
        <template #custom-filter>
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
