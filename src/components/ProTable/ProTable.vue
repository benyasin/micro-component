<template>
  <ConfigProvider>
    <div class="pro-table-container micro" :class="{ 'rtl': isRtl }">
      <!-- 标题区域 -->
      <div v-if="config?.title || config?.description" class="pro-table-title">
        <h3 v-if="config?.title" class="pro-table-title-text">
          {{ config.title }}
        </h3>
        <p v-if="config?.description" class="pro-table-description">
          {{ config.description }}
        </p>
      </div>

      <!-- 筛选区域 -->
      <div v-if="config?.showFilter && config?.filters?.length" class="pro-table-filter">
        <a-form layout="inline" :model="filterValues" @finish="handleSearch">
          <a-form-item
            v-for="filter in config.filters"
            :key="filter.key"
            :label="filter.label"
            :name="filter.key"
          >
            <!-- 输入框 -->
            <a-input
              v-if="filter.component === 'input'"
              v-model:value="filterValues[filter.key]"
              :placeholder="filter.placeholder"
              :allow-clear="filter.allowClear"
              style="width: 200px"
            />
            
            <!-- 选择框 -->
            <a-select
              v-else-if="filter.component === 'select'"
              v-model:value="filterValues[filter.key]"
              :placeholder="filter.placeholder"
              :allow-clear="filter.allowClear"
              style="width: 200px"
            >
              <a-select-option
                v-for="option in filter.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
            
            <!-- 自定义插槽 -->
            <slot v-else-if="filter.component === 'custom'" :name="`filter-${filter.key}`" />
          </a-form-item>
          
          <!-- 操作按钮 -->
          <a-form-item>
            <a-space>
              <a-button type="primary" html-type="submit">
                搜索
              </a-button>
              <a-button @click="handleReset">
                重置
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>

      <!-- 操作区域 -->
      <div v-if="config?.showOperation" class="pro-table-operation">
        <div class="pro-table-operation-left">
          <!-- 选择信息 -->
          <div v-if="config?.showSelection && selectedRowKeys.length > 0" class="pro-table-selection-info">
            已选择 {{ selectedRowKeys.length }} 项
          </div>
          
          <!-- 自定义操作插槽 -->
          <slot name="operation" />
        </div>
        
        <div class="pro-table-operation-right">
          <!-- 表格大小切换 -->
          <a-dropdown v-if="config?.showSizeChanger">
            <a-button type="link">
              <template #icon>
                <ColumnHeightOutlined />
              </template>
            </a-button>
            <template #overlay>
              <a-menu @click="handleTableSizeChange">
                <a-menu-item key="small">紧凑表格</a-menu-item>
                <a-menu-item key="middle">正常表格</a-menu-item>
                <a-menu-item key="large">宽松表格</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          
          <!-- 全屏按钮 -->
          <a-button
            v-if="config?.showFullScreen"
            type="link"
            @click="handleFullScreenClick"
          >
            <template #icon>
              <FullscreenOutlined v-if="!isFullScreen" />
              <FullscreenExitOutlined v-else />
            </template>
          </a-button>
          
          <!-- 列配置按钮 -->
          <a-button
            v-if="config?.showColumnConfig"
            type="link"
            @click="handleColumnConfigClick"
          >
            <template #icon>
              <SettingOutlined />
            </template>
          </a-button>
          
          <!-- 刷新按钮 -->
          <a-button type="link" @click="handleRefresh">
            <template #icon>
              <ReloadOutlined />
            </template>
          </a-button>
          
          <!-- 自定义右侧操作插槽 -->
          <slot name="operationRight" />
        </div>
      </div>

      <!-- 表格区域 -->
      <a-table
        ref="tableRef"
        :columns="tableColumns"
        :data-source="dataSource"
        :row-key="getRowKey"
        :loading="loading"
        :pagination="config?.showPagination ? paginationConfig : false"
        :row-selection="config?.showSelection ? rowSelectionConfig : undefined"
        :size="config?.tableConfig?.size || 'middle'"
        :bordered="config?.tableConfig?.bordered"
        :scroll="config?.tableConfig?.scroll"
        @change="handleTableChange"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDoubleClick"
      />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { createStore } from '../../utils/store'
import { dispatchReady } from '../../utils/component'
import { useProTable } from './useProTable'
import type { Props, ProTableExpose } from './types'
import {
  Button as AButton,
  Table as ATable,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Select as ASelect,
  SelectOption as ASelectOption,
  Space as ASpace,
  Dropdown as ADropdown,
  Menu as AMenu,
  MenuItem as AMenuItem,
  ConfigProvider
} from 'ant-design-vue'
import {
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ReloadOutlined,
  ColumnHeightOutlined
} from '@ant-design/icons-vue'

createStore()

const defaultProps = withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  showFilter: true,
  showPagination: true,
  showOperation: true,
  showSelection: false,
  showSizeChanger: true,
  showFullScreen: true,
  showColumnConfig: true
})

// 使用 ProTable Store
const {
  proTableProps,
  updateProps,
  config,
  tableRef,
  loading,
  dataSource,
  selectedRowKeys,
  selectedRows,
  filterValues,
  paginationState,
  handleTableChange,
  handleRowClick,
  handleRowDoubleClick,
  handleSearch,
  handleReset,
  handlePageChange,
  handleSelectionChange,
  handleRefresh,
  handleFullScreen,
  handleColumnConfig,
  refresh,
  reset,
  clearSelection,
  getSelectedRows,
  event,
  on
} = useProTable(defaultProps)

// 内部状态
const isFullScreen = ref(false)
const isRtl = ref(false)

// 计算属性
const paginationConfig = computed(() => {
  if (!config.value?.showPagination) return false
  
  return {
    current: paginationState.current || 1,
    pageSize: paginationState.pageSize || 10,
    total: paginationState.total || 0,
    showSizeChanger: config.value?.pagination?.showSizeChanger,
    showQuickJumper: config.value?.pagination?.showQuickJumper,
    showTotal: config.value?.pagination?.showTotal,
    onChange: handlePageChange,
    onShowSizeChange: handlePageChange
  }
})

const rowSelectionConfig = computed(() => {
  if (!config.value?.showSelection) return undefined
  
  return {
    selectedRowKeys: selectedRowKeys.value,
    onChange: handleSelectionChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.disabled
    })
  }
})

const tableColumns = computed(() => {
  return (config.value?.columns || []).map(column => {
    const newColumn = { ...column }
    
    if (column.customRender) {
      // 保持使用 customRender，但确保返回正确的 VNode
      newColumn.customRender = ({ text, record, index }: any) => {
        return column.customRender!(text, record, index)
      }
    }
    
    return newColumn
  })
})

// 方法
const getRowKey = (record: any) => {
  const rowKey = config.value?.tableConfig?.rowKey || 'id'
  return record[rowKey] || record.id || record.key
}

// 事件处理
const handleTableSizeChange = ({ key }: { key: string }) => {
  updateProps({
    tableConfig: {
      ...config.value?.tableConfig,
      size: key as 'small' | 'middle' | 'large'
    }
  })
}

const handleFullScreenClick = () => {
  isFullScreen.value = !isFullScreen.value
  handleFullScreen(isFullScreen.value)
}

const handleColumnConfigClick = () => {
  handleColumnConfig(config.value?.columns || [])
}

// 组件挂载后通知就绪
onMounted(() => {
  dispatchReady('ProTable')
})

// Expose
defineExpose<ProTableExpose>({
  tableRef,
  updateProps,
  props: proTableProps,
  event,
  refresh,
  reset,
  clearSelection,
  getSelectedRows
})
</script>

<style scoped>
.pro-table-container {
  background-color: var(--color-bg, #ffffff);
  border: 1px solid var(--color-line, #e5e5e5);
  border-radius: 8px;
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.pro-table-container.rtl {
  direction: rtl;
}

.pro-table-title {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-line, #e5e5e5);
}

.pro-table-title-text {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary-text, #1a1a1a);
}

.pro-table-description {
  margin: 0;
  font-size: 14px;
  color: var(--color-secondary-text, #666666);
}

.pro-table-filter {
  margin-bottom: 16px;
  padding: 16px;
  background-color: var(--color-card-bg, #f8f9fa);
  border: 1px solid var(--color-line, #e5e5e5);
  border-radius: 6px;
}

.pro-table-operation {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pro-table-operation-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pro-table-operation-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pro-table-selection-info {
  font-size: 14px;
  color: var(--color-secondary-text, #666666);
}
</style>
