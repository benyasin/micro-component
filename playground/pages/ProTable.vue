<template>
  <div class="p-20px">
    <h1 class="text-2xl font-bold mb-8">ProTable 组件测试</h1>
    
    <!-- 基础示例 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold mb-4">基础示例</h2>
      <ProTable v-bind="basicExample" />
    </div>
    
    <!-- 带选择示例 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold mb-4">带选择示例</h2>
      <ProTable v-bind="selectionExample" />
    </div>
    
    <!-- 自定义配置示例 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold mb-4">自定义配置示例</h2>
      <ProTable v-bind="customConfigExample" />
    </div>
    
    <!-- 简化示例 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold mb-4">简化示例</h2>
      <ProTable v-bind="simpleExample" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProTable from '@/components/ProTable/ProTable.vue'
import { basicExample, selectionExample, customConfigExample, simpleExample } from '@/components/ProTable/example'
</script>
