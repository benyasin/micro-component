import { BaseProps } from '@/types/component'

// 表格筛选项
export interface FilterItem {
  key: string
  label?: string
  component?: 'input' | 'select' | 'cascader' | 'datePicker' | 'rangePicker' | 'custom'
  placeholder?: string
  width?: string
  span?: number // 动态布局支持
  options?: Array<{ label: string; value: any; children?: Array<{ label: string; value: any }> }> | (() => Array<{ label: string; value: any; children?: Array<{ label: string; value: any }> }>)
  props?: Record<string, any>
  defaultValue?: any
  clearDefaultValue?: boolean // 重置时是否清除默认值
  allowClear?: boolean
  rules?: any[] // 表单验证规则
  slotName?: string // 自定义插槽名称
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
  __visible?: boolean // 列可见性控制
}

// 分页配置
export interface Pagination {
  current?: number
  pageSize?: number
  total?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => string
  pageSizeOptions?: string[] // 每页条数选项
  style?: string // 自定义样式
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
  needExpand?: boolean // 是否需要展开收起功能
  isExpand?: boolean // 默认是否展开
  labelWidth?: string // 标签宽度
  formSize?: 'small' | 'middle' | 'large' // 表单尺寸
  
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
  mockEnabled?: boolean // Mock 数据开关
  rowSelection?: {
    selectedRowKeys?: string[]
    onChange?: (selectedRowKeys: string[], selectedRows: any[]) => void
  }
}

// 自定义筛选渲染配置
export interface CustomFilterRenderConfig {
  type: 'select' | 'input' | 'cascader' | 'dateRange' | 'inputGroup'
  placeholder?: string
  style?: Record<string, any>
  options?: Array<{label: string, value: any, children?: Array<{label: string, value: any}>}>
  allowClear?: boolean
  size?: 'small' | 'middle' | 'large'
  // 输入组合配置（用于类型选择 + 输入框的组合）
  inputGroup?: {
    selectConfig: Omit<CustomFilterRenderConfig, 'inputGroup'>
    inputConfig: Omit<CustomFilterRenderConfig, 'inputGroup'>
    selectWidth?: string
    inputWidth?: string
  }
}

// Props 接口
export interface Props extends BaseProps, Config {
  // 列配置相关
  tableKey?: string
  onColumnConfirm?: () => Promise<void> | void
  // 自定义插槽组件（保留兼容性）
  customSlot?: any
  // 自定义筛选渲染配置（新方案）
  customFilterRender?: CustomFilterRenderConfig
  // 自定义筛选值变化回调
  onCustomFilterChange?: (key: string, value: any) => void
}

// 事件定义
export interface Events extends Record<string | number | symbol, (...args: any[]) => void> {
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
