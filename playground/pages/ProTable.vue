<template>
  <div class="p-20px">
    <!-- 全面示例 -->
    <div class="mb-12">
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
      <ProTable v-bind="comprehensiveExample" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProTable from '@/components/ProTable/ProTable.vue'
import { comprehensiveExample } from '@/components/ProTable/example'
</script>
