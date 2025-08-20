import { h } from 'vue'
import type { Props, Column, FilterItem } from './types'

// 示例数据
export const mockData = [
  {
    id: '1',
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
    phone: '13800138001',
    department: '技术部',
    status: '在职',
    salary: 15000,
    education: '本科',
    experience: '3-5年',
    createTime: '2023-01-15'
  },
  {
    id: '2',
    name: '李四',
    age: 30,
    email: 'lisi@example.com',
    phone: '13800138002',
    department: '产品部',
    status: '在职',
    salary: 18000,
    education: '硕士',
    experience: '5-10年',
    createTime: '2023-02-20'
  },
  {
    id: '3',
    name: '王五',
    age: 28,
    email: 'wangwu@example.com',
    phone: '13800138003',
    department: '设计部',
    status: '离职',
    salary: 12000,
    education: '本科',
    experience: '3-5年',
    createTime: '2023-03-10'
  },
  {
    id: '4',
    name: '赵六',
    age: 32,
    email: 'zhaoliu@example.com',
    phone: '13800138004',
    department: '技术部',
    status: '在职',
    salary: 20000,
    education: '硕士',
    experience: '5-10年',
    createTime: '2023-04-05'
  },
  {
    id: '5',
    name: '钱七',
    age: 27,
    email: 'qianqi@example.com',
    phone: '13800138005',
    department: '市场部',
    status: '在职',
    salary: 14000,
    education: '大专',
    experience: '1-3年',
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
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
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
      title: '薪资',
      dataIndex: 'salary',
      key: 'salary',
      width: 100,
      sorter: true,
      customRender: (text: string) => {
        const numValue = parseInt(text) || 0
        return h('span', { style: { color: '#1890ff', fontWeight: 'bold' } }, `¥${numValue.toLocaleString()}`)
      }
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      width: 100,
      filters: [
        { text: '高中', value: '高中' },
        { text: '大专', value: '大专' },
        { text: '本科', value: '本科' },
        { text: '硕士', value: '硕士' },
        { text: '博士', value: '博士' }
      ]
    },
    {
      title: '工作经验',
      dataIndex: 'experience',
      key: 'experience',
      width: 120,
      filters: [
        { text: '应届生', value: '应届生' },
        { text: '1-3年', value: '1-3年' },
        { text: '3-5年', value: '3-5年' },
        { text: '5-10年', value: '5-10年' },
        { text: '10年以上', value: '10年以上' }
      ]
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
      phone: '13800138006',
      department: '技术部',
      status: '在职',
      salary: 16000,
      education: '本科',
      experience: '3-5年',
      createTime: '2023-06-18'
    },
    {
      id: '7',
      name: '周九',
      age: 31,
      email: 'zhoujiu@example.com',
      phone: '13800138007',
      department: '产品部',
      status: '离职',
      salary: 22000,
      education: '硕士',
      experience: '5-10年',
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
  needExpand: true, // 启用展开收起功能
  isExpand: false, // 默认收起
  labelWidth: '100%',
  formSize: 'middle',
  filters: [
    {
      key: 'name',
      label: '姓名',
      component: 'input',
      placeholder: '请输入姓名',
      span: 6,
      allowClear: true,
      defaultValue: '',
      rules: [{ required: false, message: '请输入姓名' }]
    },
    {
      key: 'department',
      label: '部门',
      component: 'select',
      placeholder: '请选择部门',
      span: 6,
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
      span: 6,
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
      span: 6,
      props: {
        type: 'number',
        min: 18,
        max: 65
      }
    },
    {
      key: 'createTime',
      label: '创建时间',
      component: 'datePicker',
      placeholder: '请选择日期',
      span: 6,
      allowClear: true
    },
    {
      key: 'region',
      label: '地区',
      component: 'cascader',
      placeholder: '请选择地区',
      span: 6,
      options: [
        {
          label: '北京',
          value: 'beijing',
          children: [
            { label: '朝阳区', value: 'chaoyang' },
            { label: '海淀区', value: 'haidian' }
          ]
        },
        {
          label: '上海',
          value: 'shanghai',
          children: [
            { label: '浦东新区', value: 'pudong' },
            { label: '黄浦区', value: 'huangpu' }
          ]
        }
      ],
      allowClear: true
    },
    {
      key: 'custom',
      label: '自定义',
      component: 'custom',
      span: 6,
      slotName: 'custom-filter'
    },
    {
      key: 'salary',
      label: '薪资范围',
      component: 'input',
      placeholder: '请输入薪资',
      span: 6,
      props: {
        type: 'number',
        min: 0
      }
    },
    {
      key: 'education',
      label: '学历',
      component: 'select',
      placeholder: '请选择学历',
      span: 6,
      options: [
        { label: '高中', value: '高中' },
        { label: '大专', value: '大专' },
        { label: '本科', value: '本科' },
        { label: '硕士', value: '硕士' },
        { label: '博士', value: '博士' }
      ],
      allowClear: true
    },
    {
      key: 'experience',
      label: '工作经验',
      component: 'select',
      placeholder: '请选择经验',
      span: 6,
      options: [
        { label: '1年以下', value: '1年以下' },
        { label: '1-3年', value: '1-3年' },
        { label: '3-5年', value: '3-5年' },
        { label: '5-10年', value: '5-10年' },
        { label: '10年以上', value: '10年以上' }
      ],
      allowClear: true
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
    pageSizeOptions: ['10', '20', '50', '100'],
    style: 'text-align: right; margin-top: 16px;',
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
