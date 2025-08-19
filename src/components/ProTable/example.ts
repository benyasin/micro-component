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

// 全面示例 - 涵盖所有属性
export const comprehensiveExample: Props = {
  // 基础信息
  title: '员工管理系统',
  description: '这是一个全面的 ProTable 示例，展示了所有可用的功能和属性',
  
  // 表格配置
  columns: [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      fixed: 'left' as const,
      ellipsis: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      sorter: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
      filters: [
        { text: '技术部', value: '技术部' },
        { text: '产品部', value: '产品部' },
        { text: '设计部', value: '设计部' },
        { text: '市场部', value: '市场部' }
      ]
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      customRender: (text: string) => {
        const color = text === '在职' ? '#52c41a' : '#ff4d4f'
        return h('span', { style: { color, fontWeight: 'bold' } }, text)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      customRender: (text: any, record: any) => {
        return h('div', { style: { display: 'flex', gap: '8px' } }, [
          h('a', { style: { color: '#1890ff' } }, '编辑'),
          h('a', { style: { color: '#ff4d4f' } }, '删除')
        ])
      }
    }
  ],
  
  // 数据源
  dataSource: [
    ...mockData,
    {
      id: '6',
      name: '孙八',
      age: 29,
      email: 'sunba@example.com',
      department: '技术部',
      status: '在职',
      createTime: '2023-06-18'
    },
    {
      id: '7',
      name: '周九',
      age: 31,
      email: 'zhoujiu@example.com',
      department: '产品部',
      status: '离职',
      createTime: '2023-07-22'
    }
  ],
  
  // 表格配置
  tableConfig: {
    rowKey: 'id',
    loading: false,
    bordered: true,
    size: 'middle' as const,
    scroll: { x: 1000, y: 400 },
    showHeader: true,
    sticky: true
  },
  
  // 筛选配置
  showFilter: true,
  filters: [
    {
      key: 'name',
      label: '姓名',
      component: 'input',
      placeholder: '请输入姓名',
      width: '200px',
      allowClear: true
    },
    {
      key: 'department',
      label: '部门',
      component: 'select',
      placeholder: '请选择部门',
      width: '150px',
      options: [
        { label: '技术部', value: '技术部' },
        { label: '产品部', value: '产品部' },
        { label: '设计部', value: '设计部' },
        { label: '市场部', value: '市场部' }
      ],
      allowClear: true
    },
    {
      key: 'status',
      label: '状态',
      component: 'select',
      placeholder: '请选择状态',
      width: '120px',
      options: [
        { label: '在职', value: '在职' },
        { label: '离职', value: '离职' }
      ],
      allowClear: true
    },
    {
      key: 'age',
      label: '年龄范围',
      component: 'input',
      placeholder: '请输入年龄',
      width: '120px',
      props: {
        type: 'number',
        min: 18,
        max: 65
      }
    }
  ],
  
  // 分页配置
  showPagination: true,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 7,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) => 
      `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
  },
  
  // 操作配置
  showOperation: true,
  showSelection: true,
  showSizeChanger: true,
  showFullScreen: true,
  showColumnConfig: true,
  
  // 选择配置
  rowSelection: {
    selectedRowKeys: ['1', '3'],
    onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
      console.log('选中的行:', selectedRowKeys, selectedRows)
    }
  },
  
  // 请求配置（模拟）
  request: {
    url: '/api/employees',
    method: 'POST',
    params: { page: 1, size: 10 },
    headers: { 'Content-Type': 'application/json' },
    beforeRequest: (params: any) => {
      console.log('请求参数:', params)
      return params
    },
    afterRequest: (response: any) => {
      console.log('响应数据:', response)
      return response
    }
  }
}

// 导出示例
export const examples = {
  comprehensive: comprehensiveExample
}
