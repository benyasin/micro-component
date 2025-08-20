import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, h } from 'vue'
import ProTable from '../../src/components/ProTable/ProTable.vue'

// 样式已在 preview.ts 中全局导入

const meta: Meta<typeof ProTable> = {
  title: 'Components/ProTable',
  component: ProTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ProTable 是一个功能强大的表格组件，支持以下特性：

- 📊 数据展示：支持排序、筛选、分页
- 🔍 高级筛选：支持多种筛选组件和自定义筛选
- 📱 响应式：支持固定列、省略号、滚动
- 🎨 自定义渲染：支持自定义单元格渲染
- ⚙️ 列配置：支持列显示/隐藏、拖拽排序
- 🔄 操作栏：支持刷新、全屏、列配置等功能
- 📄 分页：支持多种分页模式和快速跳转
- ✅ 行选择：支持单选、多选、选择回调
        `
      }
    }
  },
  argTypes: {
    title: {
      description: '表格标题',
      control: 'text'
    },
    description: {
      description: '表格描述',
      control: 'text'
    },
    showFilter: {
      description: '是否显示筛选区域',
      control: 'boolean'
    },
    showPagination: {
      description: '是否显示分页',
      control: 'boolean'
    },
    showSelection: {
      description: '是否显示行选择',
      control: 'boolean'
    },
    showOperation: {
      description: '是否显示操作栏',
      control: 'boolean'
    },
    showFullScreen: {
      description: '是否显示全屏按钮',
      control: 'boolean'
    },
    showColumnConfig: {
      description: '是否显示列配置按钮',
      control: 'boolean'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// 基础用法
export const Basic: Story = {
  args: {
    title: '基础表格',
    description: '这是一个基础的 ProTable 示例',
    columns: [
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
        width: 100
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        age: 25,
        email: 'zhangsan@example.com',
        department: '技术部',
        status: '在职'
      },
      {
        id: '2',
        name: '李四',
        age: 30,
        email: 'lisi@example.com',
        department: '产品部',
        status: '在职'
      },
      {
        id: '3',
        name: '王五',
        age: 28,
        email: 'wangwu@example.com',
        department: '设计部',
        status: '离职'
      }
    ],
    showFilter: false,
    showPagination: true,
    showSelection: false,
    showOperation: false
  }
}



// 高级筛选示例
export const AdvancedFilter: Story = {
  args: {
    title: '员工管理系统',
    description: '这是一个全面的 ProTable 示例，展示了所有可用的功能和属性',
    columns: [
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
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: 120
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 120
      },
      {
        title: '薪资',
        dataIndex: 'salary',
        key: 'salary',
        width: 100,
        sorter: true
      },
      {
        title: '学历',
        dataIndex: 'education',
        key: 'education',
        width: 100
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        age: 25,
        department: '技术部',
        status: '在职',
        createTime: '2023-01-15',
        salary: 15000,
        education: '本科'
      },
      {
        id: '2',
        name: '李四',
        age: 30,
        department: '产品部',
        status: '在职',
        createTime: '2023-02-20',
        salary: 18000,
        education: '硕士'
      },
      {
        id: '3',
        name: '王五',
        age: 28,
        department: '设计部',
        status: '离职',
        createTime: '2023-03-10',
        salary: 12000,
        education: '本科'
      },
      {
        id: '4',
        name: '赵六',
        age: 32,
        department: '技术部',
        status: '在职',
        createTime: '2023-04-05',
        salary: 20000,
        education: '硕士'
      },
      {
        id: '5',
        name: '钱七',
        age: 27,
        department: '市场部',
        status: '在职',
        createTime: '2023-05-12',
        salary: 14000,
        education: '大专'
      },
      {
        id: '6',
        name: '孙八',
        age: 29,
        department: '技术部',
        status: '在职',
        createTime: '2023-06-18',
        salary: 16000,
        education: '本科'
      },
      {
        id: '7',
        name: '周九',
        age: 31,
        department: '产品部',
        status: '离职',
        createTime: '2023-07-22',
        salary: 22000,
        education: '硕士'
      }
    ],
    showFilter: true,
    needExpand: true,
    isExpand: false,
    labelWidth: '100%',
    formSize: 'middle',
    filters: [
      {
        key: 'name',
        label: '姓名',
        component: 'input',
        placeholder: '请输入姓名',
        span: 6,
        allowClear: true
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
      }
    ],
    showPagination: true,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 7,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      showTotal: (total: number, range: [number, number]) => 
        `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
    },
    showSelection: true,
    showOperation: true,
    showFullScreen: true,
    showColumnConfig: true,
    rowSelection: {
      selectedRowKeys: ['1'],
      onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
        console.log('选中的行:', selectedRowKeys, selectedRows)
      }
    },
    tableConfig: {
      rowKey: 'id',
      loading: false,
      bordered: true,
      size: 'middle',
      scroll: { x: 1000, y: 400 },
      showHeader: true,
      sticky: true
    }
  }
}

// 自定义渲染示例
export const CustomRender: Story = {
  args: {
    title: '自定义渲染示例',
    description: '展示各种自定义渲染功能（静态数据，无 Mock）',
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 120
      },

      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        customRender: (text: string) => {
          let color = '#52c41a'
          let bgColor = '#f6ffed'
          
          if (text === '离职') {
            color = '#ff4d4f'
            bgColor = '#fff2f0'
          } else if (text === '试用期') {
            color = '#faad14'
            bgColor = '#fffbe6'
          }
          
          return h('span', {
            style: {
              color,
              backgroundColor: bgColor,
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }
          }, text)
        }
      },
      {
        title: '进度',
        dataIndex: 'progress',
        key: 'progress',
        width: 150,
        customRender: (text: string) => {
          const progress = parseInt(text) || 0
          return h('div', { style: { width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' } }, [
            h('div', {
              style: {
                width: '100%',
                height: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }
            }, [
              h('div', {
                style: {
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#1890ff',
                  transition: 'width 0.3s',
                  borderRadius: '4px'
                }
              })
            ]),
            h('span', { 
              style: { 
                fontSize: '12px', 
                color: '#666',
                textAlign: 'center',
                lineHeight: '1'
              } 
            }, `${progress}%`)
          ])
        }
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        width: 200,
        customRender: (text: string) => {
          const tags = text ? text.split(',') : []
          return h('div', { 
            style: { 
              display: 'flex', 
              gap: '4px', 
              flexWrap: 'wrap',
              alignItems: 'center'
            } 
          }, 
            tags.map((tag, index) => h('span', {
              key: index,
              style: {
                backgroundColor: '#f0f0f0',
                color: '#666',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                border: '1px solid #d9d9d9'
              }
            }, tag.trim()))
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        customRender: (text: any, record: any) => {
          return h('div', { style: { display: 'flex', gap: '8px' } }, [
            h('a', { style: { color: '#1890ff' } }, '查看'),
            h('a', { style: { color: '#52c41a' } }, '编辑'),
            h('a', { style: { color: '#ff4d4f' } }, '删除')
          ])
        }
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        status: '在职',
        progress: '85',
        tags: '前端,Vue,React'
      },
      {
        id: '2',
        name: '李四',
        status: '在职',
        progress: '92',
        tags: '后端,Java,Spring'
      },
      {
        id: '3',
        name: '王五',
        status: '离职',
        progress: '45',
        tags: '设计,UI,UX'
      },
      {
        id: '4',
        name: '赵六',
        status: '试用期',
        progress: '30',
        tags: '测试,QA,自动化'
      },
      {
        id: '5',
        name: '钱七',
        status: '在职',
        progress: '78',
        tags: '运维,Linux,Docker'
      },
      {
        id: '6',
        name: '孙八',
        status: '在职',
        progress: '95',
        tags: '架构,微服务,云原生'
      }
    ],
    showFilter: false,
    showPagination: true,
    showSelection: false,
    showOperation: false,
    // 默认关闭 Mock，使用静态数据
    mockEnabled: false
  }
}



// 简化版本
export const Simple: Story = {
  args: {
    title: '简化表格',
    description: '只显示基础功能的简化版本',
    columns: [
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
          return h('span', { style: { color, fontWeight: 'bold' } }, text)
        }
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        age: 25,
        department: '技术部',
        status: '在职'
      },
      {
        id: '2',
        name: '李四',
        age: 30,
        department: '产品部',
        status: '在职'
      },
      {
        id: '3',
        name: '王五',
        age: 28,
        department: '设计部',
        status: '离职'
      }
    ],
    showFilter: false,
    showPagination: false,
    showSelection: false,
    showOperation: false,
    showFullScreen: false,
    showColumnConfig: false
  }
}

// 只读模式
export const ReadOnly: Story = {
  args: {
    title: '只读表格',
    description: '不显示操作按钮的只读模式',
    columns: [
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
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: 120
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        age: 25,
        department: '技术部',
        status: '在职'
      },
      {
        id: '2',
        name: '李四',
        age: 30,
        department: '产品部',
        status: '在职'
      },
      {
        id: '3',
        name: '王五',
        age: 28,
        department: '设计部',
        status: '离职'
      }
    ],
    showFilter: false,
    showPagination: true,
    showSelection: false,
    showOperation: false
  }
}

// 带筛选功能
export const WithFilter: Story = {
  args: {
    title: '带筛选功能',
    description: '展示基础的筛选功能',
    columns: [
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
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: 120
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 120
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        age: 25,
        department: '技术部',
        status: '在职',
        createTime: '2023-01-15'
      },
      {
        id: '2',
        name: '李四',
        age: 30,
        department: '产品部',
        status: '在职',
        createTime: '2023-02-20'
      },
      {
        id: '3',
        name: '王五',
        age: 28,
        department: '设计部',
        status: '离职',
        createTime: '2023-03-10'
      },
      {
        id: '4',
        name: '赵六',
        age: 32,
        department: '技术部',
        status: '在职',
        createTime: '2023-04-05'
      },
      {
        id: '5',
        name: '钱七',
        age: 27,
        department: '市场部',
        status: '在职',
        createTime: '2023-05-12'
      }
    ],
    showFilter: true,
    filters: [
      {
        key: 'name',
        label: '姓名',
        component: 'input',
        placeholder: '请输入姓名',
        span: 6
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
        ]
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
        ]
      },
      {
        key: 'age',
        label: '年龄',
        component: 'input',
        placeholder: '请输入年龄',
        span: 6,
        props: {
          type: 'number',
          min: 18,
          max: 65
        }
      }
    ],
    showPagination: true,
    showSelection: false,
    showOperation: true
  }
}

// 紧凑模式
export const Compact: Story = {
  args: {
    title: '紧凑表格',
    description: '使用紧凑尺寸的表格',
    columns: [
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
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: 120
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        age: 25,
        department: '技术部',
        status: '在职'
      },
      {
        id: '2',
        name: '李四',
        age: 30,
        department: '产品部',
        status: '在职'
      },
      {
        id: '3',
        name: '王五',
        age: 28,
        department: '设计部',
        status: '离职'
      }
    ],
    showFilter: false,
    showPagination: true,
    showSelection: false,
    showOperation: false,
    tableConfig: {
      size: 'small'
    }
  }
}
