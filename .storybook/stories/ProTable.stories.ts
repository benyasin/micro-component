import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, h } from 'vue'
import ProTable from '../../src/components/ProTable/ProTable.vue'
import { Input as AInput, Select as ASelect, SelectOption as ASelectOption, InputGroup as AInputGroup } from 'ant-design-vue'

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
    showOperation: true
  }
}

// 高级筛选示例
export const AdvancedFilter: Story = {
  render: () => ({
    components: { ProTable, AInput, ASelect, ASelectOption, AInputGroup },
    setup() {
      const customFilterType = ref('name')
      const customFilterValue = ref('')
      
      const handleCustomFilterChange = () => {
        console.log('[Storybook] 自定义筛选变化:', customFilterType.value, customFilterValue.value)
      }
      
      return {
        customFilterType,
        customFilterValue,
        handleCustomFilterChange
      }
    },
    template: `
      <ProTable 
        title="员工管理系统"
        description="这是一个全面的 ProTable 示例，展示了所有可用的功能和属性"
        :columns="[
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
        ]"
        :dataSource="[
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
        ]"
        :showFilter="true"
        :needExpand="true"
        :isExpand="false"
        :labelWidth="'100%'"
        :formSize="'middle'"
        :filters="[
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
        ]"
        :showPagination="true"
        :pagination="{
          current: 1,
          pageSize: 10,
          total: 7,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total, range) => '第 ' + range[0] + '-' + range[1] + ' 条，共 ' + total + ' 条记录'
        }"
        :showSelection="true"
        :showOperation="true"
        :showFullScreen="true"
        :showColumnConfig="true"
        :rowSelection="{
          selectedRowKeys: ['1'],
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('选中的行:', selectedRowKeys, selectedRows)
          }
        }"
        :tableConfig="{
          rowKey: 'id',
          loading: false,
          bordered: true,
          size: 'middle',
          scroll: { x: 1000, y: 400 },
          showHeader: true,
          sticky: true
        }"
      >
      </ProTable>
    `
  })
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
        name: '潘超',
        age: 28,
        department: '技术部',
        status: '在职',
        createTime: '2023-01-15'
      },
      {
        id: '2',
        name: '张三',
        age: 32,
        department: '产品部',
        status: '在职',
        createTime: '2022-06-01'
      },
      {
        id: '3',
        name: '李四',
        age: 25,
        department: '设计部',
        status: '离职',
        createTime: '2023-03-10'
      }
    ],
    showFilter: true,
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
          { label: '设计部', value: '设计部' }
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
                fontSize: '12px'
              }
            }, tag))
          )
        }
      }
    ],
    dataSource: [
      {
        id: '1',
        name: '张三',
        status: '在职',
        progress: '85',
        tags: 'Vue,React,TypeScript'
      },
      {
        id: '2',
        name: '李四',
        status: '离职',
        progress: '60',
        tags: 'JavaScript,Node.js'
      },
      {
        id: '3',
        name: '王五',
        status: '试用期',
        progress: '30',
        tags: 'Python,Java'
      }
    ],
    showFilter: false,
    showPagination: true,
    showSelection: false,
    showOperation: true,
    mockEnabled: false
  }
}


// 只读模式
export const ReadOnly: Story = {
  args: {
    title: '只读表格',
    description: '展示只读模式的表格',
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
    showPagination: false,
    showSelection: false,
    showOperation: false
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

// 自定义筛选 - 配置方式（inputGroup）
export const CustomFilterConfig: Story = {
  render: () => ({
    components: { ProTable },
    setup() {
      const handleCustomFilterChange = (key: string, value: any) => {
        console.log('[Storybook] 自定义筛选配置变化:', key, value)
      }
      
      return {
        handleCustomFilterChange
      }
    },
    template: `
      <ProTable 
        title="自定义筛选 - 配置方式"
        description="使用 customFilterRender 配置方式实现自定义筛选，支持多个字段"
        :columns="[
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
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 200
          },
          {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            width: 120
          }
        ]"
        :dataSource="[
          {
            id: '1',
            name: '张三',
            age: 25,
            department: '技术部',
            status: '在职',
            email: 'zhangsan@example.com',
            phone: '13800138001'
          },
          {
            id: '2',
            name: '李四',
            age: 30,
            department: '产品部',
            status: '在职',
            email: 'lisi@example.com',
            phone: '13800138002'
          },
          {
            id: '3',
            name: '王五',
            age: 28,
            department: '设计部',
            status: '离职',
            email: 'wangwu@example.com',
            phone: '13800138003'
          }
        ]"
        :showFilter="true"
        :showPagination="true"
        :showSelection="false"
        :showOperation="true"
        :filters="[
          {
            key: 'custom1',
            label: '自定义筛选1',
            component: 'custom'
          },
        ]"
        :customFilterRender="{
          type: 'inputGroup',
          inputGroup: {
            selectConfig: {
              placeholder: '选择筛选字段',
              size: 'middle',
              options: [
                { label: '姓名', value: 'name' },
                { label: '邮箱', value: 'email' },
                { label: '电话', value: 'phone' },
                { label: '部门', value: 'department' },
                { label: '状态', value: 'status' }
              ]
            },
            inputConfig: {
              placeholder: '请输入搜索内容',
              size: 'middle',
              allowClear: true
            },
            selectWidth: '30%',
            inputWidth: '70%'
          }
        }"
        :onCustomFilterChange="handleCustomFilterChange"
      />
    `
  })
}



// 自定义筛选 - 多字段配置
export const CustomFilterMultiField: Story = {
  render: () => ({
    components: { ProTable },
    setup() {
      const handleCustomFilterChange = (key: string, value: any) => {
        console.log('[Storybook] 自定义筛选多字段变化:', key, value)
      }
      
      return {
        handleCustomFilterChange
      }
    },
    template: `
      <ProTable 
        title="自定义筛选 - 多字段配置"
        description="展示如何为不同的自定义筛选字段配置不同的渲染方式"
        :columns="[
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
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 200
          },
          {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            width: 120
          }
        ]"
        :dataSource="[
          {
            id: '1',
            name: '张三',
            age: 25,
            department: '技术部',
            status: '在职',
            email: 'zhangsan@example.com',
            phone: '13800138001'
          },
          {
            id: '2',
            name: '李四',
            age: 30,
            department: '产品部',
            status: '在职',
            email: 'lisi@example.com',
            phone: '13800138002'
          },
          {
            id: '3',
            name: '王五',
            age: 28,
            department: '设计部',
            status: '离职',
            email: 'wangwu@example.com',
            phone: '13800138003'
          }
        ]"
        :showFilter="true"
        :showPagination="true"
        :showSelection="false"
        :showOperation="true"
        :filters="[
          {
            key: 'nameFilter',
            label: '姓名筛选',
            component: 'custom'
          },
          {
            key: 'departmentFilter',
            label: '部门筛选',
            component: 'custom'
          },
          {
            key: 'statusFilter',
            label: '状态筛选',
            component: 'custom'
          }
        ]"
        :customFilterRender="{
          type: 'inputGroup',
          inputGroup: {
            selectConfig: {
              placeholder: '选择筛选字段',
              size: 'middle',
              options: [
                { label: '姓名', value: 'name' },
                { label: '邮箱', value: 'email' },
                { label: '电话', value: 'phone' },
                { label: '部门', value: 'department' },
                { label: '状态', value: 'status' }
              ]
            },
            inputConfig: {
              placeholder: '请输入搜索内容',
              size: 'middle',
              allowClear: true
            },
            selectWidth: '30%',
            inputWidth: '70%'
          }
        }"
        :onCustomFilterChange="handleCustomFilterChange"
      />
    `
  })
}
