import { ref, computed, watch, reactive } from 'vue'
import { useProps } from '@/compositions/useProps'
import { useEvent } from '@/compositions/useEvent'

import type { Props, Config, Events, FilterItem, Column, Pagination } from './types'

// 默认配置
const getDefaultConfig = (): Config => {
  return {
    columns: [],
    dataSource: [],
    tableConfig: {
      rowKey: 'id',
      loading: false,
      bordered: true,
      size: 'middle',
      showHeader: true
    },
    filters: [],
    showFilter: true,
    needExpand: false, // 默认不启用展开收起功能
    isExpand: false, // 默认收起
    labelWidth: '100%',
    formSize: 'middle',
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true
    },
    showPagination: true,
    showOperation: true,
    showSelection: false,
    showSizeChanger: true,
    showFullScreen: true,
    showColumnConfig: true
  }
}

export const useProTable = (defaultProps?: Props) => {
  const { props: proTableProps, updateProps } = useProps(defaultProps)
  const event = useEvent<Events>()
  const config = ref<Config>()

  // 内部状态
  const tableRef = ref<any>(null)
  const loading = ref(false)
  const dataSource = ref<any[]>([])
  const selectedRowKeys = ref<string[]>([])
  const selectedRows = ref<any[]>([])
  const filterValues = reactive<Record<string, any>>({})
  const paginationState = reactive<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0
  })

  // 合并配置
  const mergeConfig = (source: Partial<Props>, target: Partial<Props>) => {
    const defaultConfig = getDefaultConfig()
    
    // 提取 Config 相关属性
    const sourceConfig: Partial<Config> = {
      columns: source.columns,
      dataSource: source.dataSource,
      tableConfig: source.tableConfig,
      filters: source.filters,
      showFilter: source.showFilter,
      needExpand: source.needExpand,
      isExpand: source.isExpand,
      labelWidth: source.labelWidth,
      formSize: source.formSize,
      pagination: source.pagination,
      showPagination: source.showPagination,
      request: source.request,
      showOperation: source.showOperation,
      showSelection: source.showSelection,
      showSizeChanger: source.showSizeChanger,
      showFullScreen: source.showFullScreen,
      showColumnConfig: source.showColumnConfig,
      title: source.title,
      description: source.description,
      rowSelection: source.rowSelection
    }
    
    const targetConfig: Partial<Config> = {
      columns: target.columns,
      dataSource: target.dataSource,
      tableConfig: target.tableConfig,
      filters: target.filters,
      showFilter: target.showFilter,
      needExpand: target.needExpand,
      isExpand: target.isExpand,
      labelWidth: target.labelWidth,
      formSize: target.formSize,
      pagination: target.pagination,
      showPagination: target.showPagination,
      request: target.request,
      showOperation: target.showOperation,
      showSelection: target.showSelection,
      showSizeChanger: target.showSizeChanger,
      showFullScreen: target.showFullScreen,
      showColumnConfig: target.showColumnConfig,
      title: target.title,
      description: target.description,
      rowSelection: target.rowSelection
    }
    
    config.value = {
      ...defaultConfig,
      ...sourceConfig,
      ...targetConfig,
      // 合并嵌套对象
      tableConfig: {
        ...defaultConfig.tableConfig,
        ...sourceConfig.tableConfig,
        ...targetConfig.tableConfig
      },
      pagination: {
        ...defaultConfig.pagination,
        ...sourceConfig.pagination,
        ...targetConfig.pagination
      }
    }
  }

  const initConfig = () => {
    mergeConfig(defaultProps || {}, proTableProps.value)
  }

  // 监听 props 变化
  watch(
    [() => proTableProps.value],
    () => {
      if (typeof window !== 'undefined') {
        initConfig()
        // 同步数据源
        if (config.value?.dataSource) {
          dataSource.value = config.value.dataSource
        }
        // 同步分页状态
        if (config.value?.pagination) {
          Object.assign(paginationState, config.value.pagination)
        }
      }
    },
    { immediate: true, deep: true }
  )



  // 表格事件处理
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    event.emit('change', pagination, filters, sorter)
  }

  const handleRowClick = (record: any, index: number, event: MouseEvent) => {
    event.emit('rowClick', record, index, event)
  }

  const handleRowDoubleClick = (record: any, index: number, event: MouseEvent) => {
    event.emit('rowDoubleClick', record, index, event)
  }

  // 筛选事件处理
  const handleSearch = (values: any) => {
    Object.assign(filterValues, values)
    event.emit('search', values)
  }

  const handleReset = () => {
    Object.keys(filterValues).forEach(key => {
      delete filterValues[key]
    })
    event.emit('reset')
  }

  // 分页事件处理
  const handlePageChange = (page: number, pageSize: number) => {
    paginationState.current = page
    paginationState.pageSize = pageSize
    event.emit('pageChange', page, pageSize)
  }

  // 选择事件处理
  const handleSelectionChange = (keys: string[], rows: any[]) => {
    selectedRowKeys.value = keys
    selectedRows.value = rows
    event.emit('selectionChange', keys, rows)
    
    // 调用外部选择回调
    if (config.value?.rowSelection?.onChange) {
      config.value.rowSelection.onChange(keys, rows)
    }
  }

  // 操作事件处理
  const handleRefresh = () => {
    event.emit('refresh')
  }

  const handleFullScreen = (isFullScreen: boolean) => {
    event.emit('fullScreen', isFullScreen)
  }

  const handleColumnConfig = (columns: Column[]) => {
    event.emit('columnConfig', columns)
  }

  // 表格方法
  const refresh = () => {
    handleRefresh()
  }

  const reset = () => {
    handleReset()
    selectedRowKeys.value = []
    selectedRows.value = []
  }

  const clearSelection = () => {
    selectedRowKeys.value = []
    selectedRows.value = []
  }

  const getSelectedRows = () => {
    return selectedRows.value
  }

  return {
    // 状态
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
    

    
    // 事件处理
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
    
    // 表格方法
    refresh,
    reset,
    clearSelection,
    getSelectedRows,
    
    // 事件系统
    event,
    on: event.on
  }
}
