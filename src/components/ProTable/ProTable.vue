<template>
  <ConfigProvider :locale="zhCN">
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
              <a-menu @click="(info) => handleTableSizeChange({ key: info.key as string })">
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
            @click="showColumnConfigModal"
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
    
    <!-- 列配置模态框 -->
    <a-modal
      v-model:open="columnConfigVisible"
      title="列配置"
      :width="modalWidth"
      @ok="handleColumnConfigConfirm"
      @cancel="handleColumnConfigCancel"
    >
      <div class="column-config-container">
        <draggable
          v-model="localColumns"
          item-key="dataIndex"
          handle=".column-drag-handle"
          ghost-class="ghost-class"
          drag-class="drag-class"
          chosen-class="chosen-class"
          :disabled="!canDrag"
          :move="checkCanDrag"
          class="column-list"
          @end="handleDragEnd"
        >
          <template #item="{ element: column, index }">
            <div 
              class="column-item"
              :class="{ 'column-item-disabled': column.disabled }"
            >
              <div class="column-item-number">{{ index + 1 }}.</div>
              <div class="column-item-content">
                <a-checkbox
                  v-model:checked="column.checked"
                  :disabled="column.disabled"
                  @change="handleColumnChange(column)"
                >
                  <span class="column-title">{{ column.title }}</span>
                </a-checkbox>
                <div class="column-drag-handle" v-if="!column.disabled && column.checked">
                  <HolderOutlined />
                </div>
              </div>
            </div>
          </template>
        </draggable>
        
        <div class="column-config-footer">
          <a-checkbox
            :checked="allChecked"
            :indeterminate="indeterminate"
            @change="(e) => handleSelectAll(e.target.checked)"
          >
            全选
          </a-checkbox>
        </div>
      </div>
    </a-modal>

  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h, watch, toRaw } from 'vue'
import draggable from 'vuedraggable'
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
  ConfigProvider,
  Modal as AModal,
  Checkbox as ACheckbox
} from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import {
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  HolderOutlined
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
const columnConfigVisible = ref(false)

// 列配置相关props
const columnConfigProps = {
  tableKey: proTableProps.value.tableKey || 'default',
  prefix: 'table_columns_',
  onConfirm: proTableProps.value.onColumnConfirm
}

// 列配置本地数据
const localColumns = ref<Array<{
  dataIndex: string
  title: string
  checked: boolean
  disabled?: boolean
}>>([])



// 从localStorage读取列配置
const loadColumnsFromStorage = () => {
  try {
    const storageKey = `${columnConfigProps.prefix}${columnConfigProps.tableKey}`
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      const storedColumns = JSON.parse(stored)
      return new Map(storedColumns.map((item: any) => [item.key, item.visible]))
    }
  } catch (error) {
    console.warn('Failed to load column config from localStorage:', error)
  }
  return new Map()
}

// 保存列配置到localStorage
const saveColumnsToStorage = () => {
  try {
    const storageKey = `${columnConfigProps.prefix}${columnConfigProps.tableKey}`
    const rawLocalColumns = toRaw(localColumns.value) || []
    const columnsToSave = rawLocalColumns.map(col => ({
      key: col.dataIndex,
      visible: col.checked
    }))
    localStorage.setItem(storageKey, JSON.stringify(columnsToSave))
  } catch (error) {
    console.warn('Failed to save column config to localStorage:', error)
  }
}

// 初始化本地列数据
const initLocalColumns = () => {
  const storedVisibility = loadColumnsFromStorage()
  
  // 安全检查 config.value?.columns 是否为数组
  const columns = config.value?.columns
  if (!Array.isArray(columns)) {
    console.warn('config.value?.columns is not an array:', columns)
    localColumns.value = []
    return
  }
  
  // 更新 config.value.columns 的 __visible 属性
  const updatedColumns = columns.map(col => {
    const dataIndex = col.dataIndex || col.key || ''
    const storedVisible = storedVisibility.get(dataIndex)
    const isVisible = storedVisible !== undefined ? storedVisible : (col.__visible !== false)
    
    return {
      ...col,
      __visible: isVisible
    }
  })
  
  // 更新配置
  updateProps({
    columns: updatedColumns
  })
  
  // 初始化 localColumns
  localColumns.value = updatedColumns.map(col => {
    const dataIndex = col.dataIndex || col.key || ''
    const storedVisible = storedVisibility.get(dataIndex)
    
    return {
      dataIndex,
      title: col.title,
      checked: storedVisible !== undefined ? storedVisible : (col.__visible !== false),
      disabled: false
    }
  })
}

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
  return (config.value?.columns || [])
    .filter(column => column.__visible !== false) // 过滤隐藏的列
    .map(column => {
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
  
  // 实现真正的全屏功能
  const container = document.querySelector('.pro-table-container') as HTMLElement
  if (container) {
    if (isFullScreen.value) {
      // 进入全屏
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen()
      } else if ((container as any).mozRequestFullScreen) {
        (container as any).mozRequestFullScreen()
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen()
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen()
      }
    }
  }
  
  handleFullScreen(isFullScreen.value)
}

// 列配置相关计算属性
const allChecked = computed(() => {
  const rawLocalColumns = toRaw(localColumns.value)
  if (!Array.isArray(rawLocalColumns)) return false
  const enabledColumns = rawLocalColumns.filter(col => !col.disabled)
  return enabledColumns.length > 0 && enabledColumns.every(col => col.checked)
})

const indeterminate = computed(() => {
  const rawLocalColumns = toRaw(localColumns.value)
  if (!Array.isArray(rawLocalColumns)) return false
  const enabledColumns = rawLocalColumns.filter(col => !col.disabled)
  const checkedCount = enabledColumns.filter(col => col.checked).length
  return checkedCount > 0 && checkedCount < enabledColumns.length
})

// 是否可以拖拽（至少有两个可拖拽项）
const canDrag = computed(() => {
  const rawLocalColumns = toRaw(localColumns.value)
  if (!Array.isArray(rawLocalColumns)) return false
  return rawLocalColumns.filter(col => !col.disabled && col.checked).length > 1
})

// 模态框宽度计算
const modalWidth = computed(() => {
  const rawLocalColumns = toRaw(localColumns.value)
  const count = rawLocalColumns?.length || 0
  if (count <= 20) return '480px'
  return '710px'
})

// 列配置相关方法
const showColumnConfigModal = () => {
  initLocalColumns()
  columnConfigVisible.value = true
}

const handleColumnChange = (currentElement: any) => {
  // 使用 toRaw 获取原始数据
  const rawLocalColumns = toRaw(localColumns.value)
  
  // 安全检查 localColumns.value 是否为数组
  if (!Array.isArray(rawLocalColumns)) {
    console.warn('localColumns.value is not an array in handleColumnChange:', rawLocalColumns)
    return
  }
  
  // 创建一个新的数组来触发响应式更新
  const newColumns = JSON.parse(JSON.stringify(rawLocalColumns))
  const elementIndex = newColumns.findIndex((col) => col.dataIndex === currentElement.dataIndex)

  if (elementIndex !== -1) {
    // 更新选中状态 - 使用传入的 currentElement 的 checked 值
    const updatedElement = {
      ...newColumns[elementIndex],
      checked: currentElement.checked,
    }

    // 从数组中移除当前元素
    newColumns.splice(elementIndex, 1)

    if (updatedElement.checked) {
      // 找到最后一个选中的元素的索引
      const lastCheckedIndex = newColumns.reduce((lastIndex, col, idx) => {
        return col.checked ? idx : lastIndex
      }, -1)

      // 插入到最后一个选中元素后面
      newColumns.splice(lastCheckedIndex + 1, 0, updatedElement)
    } else {
      // 找到第一个未选中的元素的索引
      const firstUncheckedIndex = newColumns.findIndex((col) => !col.checked)

      if (firstUncheckedIndex === -1) {
        // 如果没有未选中的元素，添加到末尾
        newColumns.push(updatedElement)
      } else {
        // 插入到第一个未选中元素的位置
        newColumns.splice(firstUncheckedIndex, 0, updatedElement)
      }
    }

    // 更新本地列数据
    localColumns.value = newColumns
  }
}

const checkCanDrag = ({ relatedContext: { element, index } }: any) => {
  if (element && element.dataIndex) {
    return !!element.checked
  }
  return true
}

const handleDragEnd = () => {
  // 拖拽结束后保存到localStorage
  saveColumnsToStorage()
}

const handleSelectAll = (checked: boolean) => {
  // 获取原始数据
  const rawLocalColumns = toRaw(localColumns.value)
  
  if (!Array.isArray(rawLocalColumns)) {
    console.warn('localColumns.value is not an array in handleSelectAll:', rawLocalColumns)
    return
  }
  
  // 更新所有列的选中状态
  rawLocalColumns.forEach(col => {
    if (!col.disabled) {
      col.checked = checked
    }
  })
  
  // 触发响应式更新
  localColumns.value = [...rawLocalColumns]
}

const handleColumnConfigConfirm = async () => {
  // 直接使用原始数组，避免所有响应式问题
  let currentLocalColumns: any[] = []
  
  try {
    // 强制转换为数组
    if (localColumns.value && typeof localColumns.value === 'object') {
      currentLocalColumns = Array.from(localColumns.value as any)
    }
  } catch (error) {
    console.warn('Failed to convert localColumns to array:', error)
    columnConfigVisible.value = false
    return
  }
  
  // 最终安全检查
  if (!Array.isArray(currentLocalColumns) || currentLocalColumns.length === 0) {
    console.warn('currentLocalColumns is not a valid array:', currentLocalColumns)
    columnConfigVisible.value = false
    return
  }
  
  // 保存到localStorage或调用onConfirm回调
  if (columnConfigProps.onConfirm) {
    await columnConfigProps.onConfirm()
  } else {
    saveColumnsToStorage()
  }
  
  // 根据拖拽后的顺序重新排列列配置
  const newColumns: any[] = []
  
  // 按照 localColumns 的顺序重新排列 - 使用 for...of 循环避免 forEach 问题
  for (const localCol of currentLocalColumns) {
    const originalCol = (config.value?.columns || []).find(col => 
      (col.dataIndex || col.key) === localCol.dataIndex
    )
    if (originalCol) {
      newColumns.push({
        ...originalCol,
        __visible: localCol.checked
      })
    }
  }
  
  // 添加未在 localColumns 中的列（如果有的话）
  (config.value?.columns || []).forEach(col => {
    const exists = newColumns.some(newCol => 
      (newCol.dataIndex || newCol.key) === (col.dataIndex || col.key)
    )
    if (!exists) {
      newColumns.push({
        ...col,
        __visible: col.__visible !== false
      })
    }
  })
  
  updateProps({
    columns: newColumns
  })
  
  handleColumnConfig(newColumns)
  columnConfigVisible.value = false
}

const handleColumnConfigCancel = () => {
  columnConfigVisible.value = false
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
  const isFullscreen = !!(document.fullscreenElement || 
    (document as any).webkitFullscreenElement || 
    (document as any).mozFullScreenElement || 
    (document as any).msFullscreenElement)
  
  if (isFullscreen !== isFullScreen.value) {
    isFullScreen.value = isFullscreen
    handleFullScreen(isFullscreen)
  }
}

  // 组件挂载后通知就绪
  onMounted(() => {
    dispatchReady('ProTable')
    
    // 初始化列配置
    initLocalColumns()
    
    // 添加全屏状态监听
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
  })
  
  // 组件卸载时清理事件监听
  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
    document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
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

/* 列配置模态框样式 */
.column-config-container {
  max-height: 400px;
  overflow-y: auto;
}

.column-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

.column-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid var(--color-line, #e5e5e5);
  border-radius: 6px;
  background-color: var(--color-bg, #ffffff);
  transition: all 0.2s;
}

.column-item:hover {
  background-color: var(--color-card-bg, #f8f9fa);
}

.column-item-disabled {
  opacity: 0.6;
  background-color: var(--color-card-bg, #f8f9fa);
}

.column-item-number {
  width: 30px;
  text-align: right;
  margin-right: 12px;
  font-size: 12px;
  color: var(--color-secondary-text, #666666);
}

.column-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
}

.column-title {
  font-size: 14px;
  color: var(--color-primary-text, #1a1a1a);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.column-drag-handle {
  margin-left: 8px;
  color: var(--color-secondary-text, #666666);
  cursor: grab;
  opacity: 0.7;
}

.column-drag-handle:hover {
  opacity: 1;
}

.column-config-footer {
  padding-top: 16px;
  border-top: 1px solid var(--color-line, #e5e5e5);
}

/* 拖拽样式 */
.drag-class {
  opacity: 0.5;
  transform: rotate(5deg);
}

.ghost-class {
  opacity: 0.3;
  background-color: var(--color-primary, #1890ff) !important;
  border: 2px dashed var(--color-primary, #1890ff) !important;
}

.chosen-class {
  background-color: var(--color-card-bg, #f8f9fa) !important;
  border-color: var(--color-primary, #1890ff) !important;
}
</style>
