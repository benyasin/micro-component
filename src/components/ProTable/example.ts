import { h } from 'vue'
import type { Props, Column, FilterItem } from './types'

// 示例数据
export const mockData = [
  {
    id: '1',
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
    department: '技术部',
    status: '在职',
    createTime: '2023-01-15'
  },
  {
    id: '2',
    name: '李四',
    age: 30,
    email: 'lisi@example.com',
    department: '产品部',
    status: '在职',
    createTime: '2023-02-20'
  },
  {
    id: '3',
    name: '王五',
    age: 28,
    email: 'wangwu@example.com',
    department: '设计部',
    status: '离职',
    createTime: '2023-03-10'
  },
  {
    id: '4',
    name: '赵六',
    age: 32,
    email: 'zhaoliu@example.com',
    department: '技术部',
    status: '在职',
    createTime: '2023-04-05'
  },
  {
    id: '5',
    name: '钱七',
    age: 27,
    email: 'qianqi@example.com',
    department: '市场部',
    status: '在职',
    createTime: '2023-05-12'
  }
]

// 示例列配置
export const mockColumns: Column[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 200
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    width: 120
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    customRender: (text: string) => {
      const color = text === '在职' ? '#52c41a' : '#ff4d4f'
      return h('span', { style: { color } }, text)
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 120
  }
]

// 示例筛选配置
export const mockFilters: FilterItem[] = [
  {
    key: 'name',
    label: '姓名',
    component: 'input',
    placeholder: '请输入姓名'
  },
  {
    key: 'department',
    label: '部门',
    component: 'select',
    placeholder: '请选择部门',
    options: [
      { label: '技术部', value: '技术部' },
      { label: '产品部', value: '产品部' },
      { label: '设计部', value: '设计部' },
      { label: '市场部', value: '市场部' }
    ]
  },
  {
    key: 'status',
    label: '状态',
    component: 'select',
    placeholder: '请选择状态',
    options: [
      { label: '在职', value: '在职' },
      { label: '离职', value: '离职' }
    ]
  }
]

// 基础示例
export const basicExample: Props = {
  title: '员工列表',
  description: '这是一个基础的 ProTable 示例',
  columns: mockColumns,
  dataSource: mockData,
  showFilter: true,
  filters: mockFilters,
  showPagination: true,
  showOperation: true,
  showSelection: false,
  showSizeChanger: true,
  showFullScreen: true,
  showColumnConfig: true,
  pagination: {
    current: 1,
    pageSize: 10,
    total: mockData.length,
    showSizeChanger: true,
    showQuickJumper: true
  }
}

// 带选择的示例
export const selectionExample: Props = {
  ...basicExample,
  title: '员工列表（支持选择）',
  description: '这是一个支持行选择的 ProTable 示例',
  showSelection: true,
  rowSelection: {
    selectedRowKeys: [],
    onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
      console.log('选中的行:', selectedRowKeys, selectedRows)
    }
  }
}

// 自定义配置示例
export const customConfigExample: Props = {
  ...basicExample,
  title: '员工列表（自定义配置）',
  description: '这是一个自定义配置的 ProTable 示例',
  tableConfig: {
    ...basicExample.tableConfig,
    size: 'small',
    bordered: true
  }
}

// 简化示例（无筛选和分页）
export const simpleExample: Props = {
  title: '简单表格',
  description: '这是一个简化的 ProTable 示例',
  columns: mockColumns.slice(0, 4), // 只显示前4列
  dataSource: mockData,
  showFilter: false,
  showPagination: false,
  showOperation: false,
  showSelection: false,
  showSizeChanger: false,
  showFullScreen: false,
  showColumnConfig: false
}

// 事件处理示例
export const eventExample: Props = {
  ...basicExample,
  title: '员工列表（事件处理）',
  description: '这是一个演示事件处理的 ProTable 示例'
}

// 导出所有示例
export const examples = {
  basic: basicExample,
  selection: selectionExample,
  customConfig: customConfigExample,
  simple: simpleExample,
  event: eventExample
}
