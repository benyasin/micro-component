import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, h } from 'vue'
import ProTable from '../../src/components/ProTable/ProTable.vue'
import { comprehensiveExample } from '../../src/components/ProTable/example'

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
  },
  parameters: {
    docs: {
      description: {
        story: '一个简化的 ProTable 示例，只显示基础的数据展示功能。'
      }
    }
  }
}

// 带筛选的表格
export const WithFilter: Story = {
  args: {
    title: '带筛选的表格',
    description: '展示筛选功能的表格',
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
          { label: '设计部', value: '设计部' }
        ]
      }
    ],
    showPagination: true,
    showSelection: false,
    showOperation: true
  },
  parameters: {
    docs: {
      description: {
        story: '展示筛选功能的 ProTable 示例。'
      }
    }
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
  },
  parameters: {
    docs: {
      description: {
        story: '只读模式的 ProTable，适合数据展示场景。'
      }
    }
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
  },
  parameters: {
    docs: {
      description: {
        story: '紧凑模式的 ProTable，适合在有限空间内显示更多数据。'
      }
    }
  }
}
