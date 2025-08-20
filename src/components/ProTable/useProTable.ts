import { ref, computed, watch, reactive } from 'vue'
import { useProps } from '@/compositions/useProps'
import { useEvent } from '@/compositions/useEvent'
import { proTableApi, initProTableMock } from '@/services/proTableMock'

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
    showColumnConfig: true,
    mockEnabled: true // 默认开启 Mock
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
  
  // Mock 相关状态
  const mockEnabled = ref(defaultProps?.mockEnabled ?? true)
  const mockLoading = ref(false)

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
      mockEnabled: source.mockEnabled,
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
      mockEnabled: target.mockEnabled,
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
        // 同步 Mock 状态
        if (config.value?.mockEnabled !== undefined) {
          mockEnabled.value = config.value.mockEnabled
        }
      }
    },
    { immediate: true, deep: true }
  )



  // 表格事件处理
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // 更新分页状态
    if (pagination) {
      paginationState.current = pagination.current
      paginationState.pageSize = pagination.pageSize
    }
    
    // 更新筛选值
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined) {
          filterValues[key] = filters[key]
        } else {
          delete filterValues[key]
        }
      })
    }
    
    // 更新排序参数
    if (sorter && sorter.field) {
      filterValues._sortField = sorter.field
      filterValues._sortOrder = sorter.order
    } else {
      delete filterValues._sortField
      delete filterValues._sortOrder
    }
    
    console.log('[ProTable] 表格变化事件:', { pagination, filters, sorter })
    console.log('[ProTable] 当前筛选值:', filterValues)
    
    // 如果启用 Mock，重新加载数据
    if (mockEnabled.value) {
      loadMockData()
    }
    
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
    
    // 重置到第一页
    paginationState.current = 1
    
    // 如果启用 Mock，重新加载数据
    if (mockEnabled.value) {
      loadMockData()
    }
    
    event.emit('search', values)
  }

  const handleReset = () => {
    Object.keys(filterValues).forEach(key => {
      delete filterValues[key]
    })
    
    // 重置到第一页
    paginationState.current = 1
    
    // 如果启用 Mock，重新加载数据
    if (mockEnabled.value) {
      loadMockData()
    }
    
    event.emit('reset')
  }
  
  // 更新筛选值的方法，供自定义插槽使用
  const updateFilterValue = (key: string, value: any) => {
    if (value !== null && value !== undefined && value !== '') {
      filterValues[key] = value
    } else {
      delete filterValues[key]
    }
  }

  // 分页事件处理
  const handlePageChange = (page: number, pageSize: number) => {
    paginationState.current = page
    paginationState.pageSize = pageSize
    
    // 如果启用 Mock，重新加载数据
    if (mockEnabled.value) {
      loadMockData()
    }
    
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
    // 如果启用 Mock，重新加载数据
    if (mockEnabled.value) {
      loadMockData()
    }
    
    event.emit('refresh')
  }

  const handleFullScreen = (isFullScreen: boolean) => {
    event.emit('fullScreen', isFullScreen)
  }

  const handleColumnConfig = (columns: Column[]) => {
    event.emit('columnConfig', columns)
  }
  
  // Mock 数据加载
  const loadMockData = async () => {
    if (!mockEnabled.value) return
    
    try {
      mockLoading.value = true
      loading.value = true
      console.log('[ProTable] 开始加载 Mock 数据...')
      
      // 将 reactive 对象转换为普通对象，避免 Proxy 问题
      const plainFilterValues = JSON.parse(JSON.stringify(filterValues))
      
      const params = {
        current: paginationState.current,
        pageSize: paginationState.pageSize,
        ...plainFilterValues
      }
      
      console.log('[ProTable] 请求参数 (转换后):', params)
      
      const response = await proTableApi.getTableData(params)
      if (response.code === 200) {
        dataSource.value = response.data.list
        paginationState.total = response.data.total
        paginationState.current = response.data.current
        paginationState.pageSize = response.data.pageSize
        
        console.log('[ProTable] Mock 数据加载成功:', response.data)
      } else {
        console.warn('[ProTable] Mock 数据加载失败:', response.message)
      }
    } catch (error: any) {
      // 忽略 AbortError，这是正常的请求取消
      if (error.name === 'AbortError') {
        console.log('[ProTable] Mock 数据请求被取消')
        return
      }
      console.error('[ProTable] Mock 数据加载错误:', error)
    } finally {
      mockLoading.value = false
      loading.value = false
    }
  }
  
  // 切换 Mock 模式
  const toggleMock = (enabled: boolean) => {
    mockEnabled.value = enabled
    if (enabled) {
      loadMockData()
    } else {
      // 恢复到默认数据
      if (config.value?.dataSource) {
        dataSource.value = config.value.dataSource
      }
    }
  }
  
  // 初始化 Mock
  const initMock = () => {
    initProTableMock()
    if (mockEnabled.value) {
      loadMockData()
    }
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
    mockEnabled,
    mockLoading,
    
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
    
    // Mock 相关方法
    loadMockData,
    toggleMock,
    initMock,
    
    // 筛选相关方法
    updateFilterValue,
    
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
