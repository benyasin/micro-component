import { BaseProps } from '@/types/component'

// 表格筛选项
export interface FilterItem {
  key: string
  label?: string
  component?: 'input' | 'select' | 'date' | 'custom'
  placeholder?: string
  width?: string
  options?: { label: string; value: any }[]
  props?: Record<string, any>
  defaultValue?: any
  allowClear?: boolean
}

// 表格列定义
export interface Column {
  title: string
  dataIndex: string
  key?: string
  width?: number
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  customRender?: (text: string, record: any, index: number) => any
  sorter?: boolean | ((a: any, b: any) => number)
  filters?: { text: string; value: any }[]
}

// 分页配置
export interface Pagination {
  current?: number
  pageSize?: number
  total?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => string
}

// 表格配置
export interface TableConfig {
  rowKey?: string
  loading?: boolean
  bordered?: boolean
  size?: 'small' | 'middle' | 'large'
  scroll?: { x?: number | string; y?: number | string }
  showHeader?: boolean
  sticky?: boolean
}

// 请求配置
export interface RequestConfig {
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: Record<string, any>
  data?: Record<string, any>
  headers?: Record<string, string>
  beforeRequest?: (params: any) => any
  afterRequest?: (response: any) => any
}

// ProTable 配置
export interface Config {
  // 表格配置
  columns: Column[]
  dataSource?: any[]
  tableConfig?: TableConfig
  
  // 筛选配置
  filters?: FilterItem[]
  showFilter?: boolean
  
  // 分页配置
  pagination?: Pagination
  showPagination?: boolean
  
  // 请求配置
  request?: RequestConfig
  
  // 操作配置
  showOperation?: boolean
  showSelection?: boolean
  showSizeChanger?: boolean
  showFullScreen?: boolean
  showColumnConfig?: boolean
  
  // 样式配置（已移除，使用 CSS 变量）
  
  // 其他配置
  title?: string
  description?: string
  rowSelection?: {
    selectedRowKeys?: string[]
    onChange?: (selectedRowKeys: string[], selectedRows: any[]) => void
  }
}

// Props 接口
export interface Props extends BaseProps, Config {}

// 事件定义
export interface Events {
  // 表格事件
  change: (pagination: any, filters: any, sorter: any) => void
  rowClick: (record: any, index: number, event: MouseEvent) => void
  rowDoubleClick: (record: any, index: number, event: MouseEvent) => void
  
  // 筛选事件
  search: (values: any) => void
  reset: () => void
  
  // 分页事件
  pageChange: (page: number, pageSize: number) => void
  
  // 选择事件
  selectionChange: (selectedRowKeys: string[], selectedRows: any[]) => void
  
  // 操作事件
  refresh: () => void
  fullScreen: (isFullScreen: boolean) => void
  columnConfig: (columns: Column[]) => void
  
  // 索引签名
  [key: string]: (...args: any[]) => void
}

// 组件暴露的接口
export interface ProTableExpose {
  // 表格实例
  tableRef: any
  // 更新属性
  updateProps: (props: Partial<Props>) => void
  // 属性对象
  props: Props
  // 事件对象
  event: any
  // 表格方法
  refresh: () => void
  reset: () => void
  clearSelection: () => void
  getSelectedRows: () => any[]
}
