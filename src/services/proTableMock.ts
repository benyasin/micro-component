import { Mock, createMockData, createApiResponse, mockApiCall, mockConfig } from './mock'

// ProTable 相关的 Mock 数据模板
const proTableDataTemplate = {
  // 表格数据模板
  tableData: {
    id: '@id',
    name: '@cname',
    age: '@integer(18, 65)',
    email: '@email',
    phone: /^1[3-9]\d{9}$/,
    address: '@county(true)',
    department: '@pick(["技术部", "产品部", "设计部", "运营部", "市场部", "人事部"])',
    position: '@pick(["工程师", "产品经理", "设计师", "运营专员", "市场专员", "HR专员"])',
    salary: '@integer(5000, 50000)',
    status: '@pick(["在职", "离职", "试用期"])',
    joinDate: '@date("yyyy-MM-dd")',
    education: '@pick(["本科", "硕士", "博士", "大专", "高中"])',
    experience: '@pick(["应届生", "1-3年", "3-5年", "5-10年", "10年以上"])',
    avatar: '@image("100x100")',
    'createTime|1': ['@datetime("yyyy-MM-dd HH:mm:ss")'],
    'updateTime|1': ['@datetime("yyyy-MM-dd HH:mm:ss")']
  },
  
  // 筛选选项模板
  filterOptions: {
    department: [
      { label: '技术部', value: '技术部' },
      { label: '产品部', value: '产品部' },
      { label: '设计部', value: '设计部' },
      { label: '运营部', value: '运营部' },
      { label: '市场部', value: '市场部' },
      { label: '人事部', value: '人事部' }
    ],
    status: [
      { label: '在职', value: '在职' },
      { label: '离职', value: '离职' },
      { label: '试用期', value: '试用期' }
    ],
    education: [
      { label: '高中', value: '高中' },
      { label: '大专', value: '大专' },
      { label: '本科', value: '本科' },
      { label: '硕士', value: '硕士' },
      { label: '博士', value: '博士' }
    ],
    experience: [
      { label: '应届生', value: '应届生' },
      { label: '1-3年', value: '1-3年' },
      { label: '3-5年', value: '3-5年' },
      { label: '5-10年', value: '5-10年' },
      { label: '10年以上', value: '10年以上' }
    ]
  },
  
  // 地区级联数据
  regionOptions: [
    {
      label: '北京市',
      value: 'beijing',
      children: [
        { label: '朝阳区', value: 'chaoyang' },
        { label: '海淀区', value: 'haidian' },
        { label: '西城区', value: 'xicheng' }
      ]
    },
    {
      label: '上海市',
      value: 'shanghai',
      children: [
        { label: '浦东新区', value: 'pudong' },
        { label: '黄浦区', value: 'huangpu' },
        { label: '静安区', value: 'jingan' }
      ]
    },
    {
      label: '深圳市',
      value: 'shenzhen',
      children: [
        { label: '南山区', value: 'nanshan' },
        { label: '福田区', value: 'futian' },
        { label: '罗湖区', value: 'luohu' }
      ]
    }
  ]
}

// 生成 ProTable 数据
export const generateProTableData = (count: number = 10) => {
  return Mock.mock({
    [`list|${count}`]: [proTableDataTemplate.tableData]
  }).list
}

// 生成分页数据
export const generatePaginationData = (page: number = 1, pageSize: number = 10, total: number = 100) => {
  const data = generateProTableData(pageSize)
  return {
    code: 200,
    message: 'success',
    data: {
      list: data,
      total,
      pageSize,
      current: page
    }
  }
}

// ProTable API 接口
export const proTableApi = {
  // 获取表格数据
  getTableData: async (params: any = {}) => {
    const { current = 1, pageSize = 10, _sortField, _sortOrder, ...filters } = params
    const total = 156 // 模拟总数据量
    
    // 生成所有数据用于筛选
    const allData = generateProTableData(total)
    
    // 模拟筛选逻辑
    let filteredData = [...allData]
    
    console.log('[ProTable Mock] 原始数据量:', allData.length)
    console.log('[ProTable Mock] 筛选参数:', filters)
    
    if (filters.name) {
      filteredData = filteredData.filter((item: any) => 
        item.name.includes(filters.name)
      )
      console.log('[ProTable Mock] 姓名筛选后数据量:', filteredData.length)
    }
    if (filters.department) {
      // 处理数组形式的部门筛选
      const departments = Array.isArray(filters.department) ? filters.department : [filters.department]
      filteredData = filteredData.filter((item: any) => 
        departments.includes(item.department)
      )
      console.log('[ProTable Mock] 部门筛选后数据量:', filteredData.length, '筛选部门:', departments)
    }
    if (filters.status) {
      // 处理数组形式的状态筛选
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status]
      filteredData = filteredData.filter((item: any) => 
        statuses.includes(item.status)
      )
      console.log('[ProTable Mock] 状态筛选后数据量:', filteredData.length, '筛选状态:', statuses)
    }
    if (filters.age) {
      filteredData = filteredData.filter((item: any) => 
        item.age >= parseInt(filters.age)
      )
      console.log('[ProTable Mock] 年龄筛选后数据量:', filteredData.length)
    }
    
    // 模拟排序逻辑
    if (_sortField && _sortOrder) {
      filteredData.sort((a: any, b: any) => {
        const aValue = a[_sortField]
        const bValue = b[_sortField]
        
        if (_sortOrder === 'ascend') {
          if (typeof aValue === 'string') {
            return aValue.localeCompare(bValue)
          }
          return aValue - bValue
        } else if (_sortOrder === 'descend') {
          if (typeof aValue === 'string') {
            return bValue.localeCompare(aValue)
          }
          return bValue - aValue
        }
        return 0
      })
      
      console.log('[ProTable Mock] 排序字段:', _sortField, '排序方向:', _sortOrder)
    }
    
    // 计算分页
    const startIndex = (current - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredData.slice(startIndex, endIndex)
    
    const result = {
      list: paginatedData,
      total: filteredData.length,
      pageSize,
      current
    }
    
    console.log('[ProTable Mock] 请求参数:', params)
    console.log('[ProTable Mock] 筛选后数据量:', filteredData.length)
    console.log('[ProTable Mock] 返回数据:', result)
    
    return await mockApiCall(result)
  },
  
  // 获取筛选选项
  getFilterOptions: async () => {
    const data = {
      department: proTableDataTemplate.filterOptions.department,
      status: proTableDataTemplate.filterOptions.status,
      education: proTableDataTemplate.filterOptions.education,
      experience: proTableDataTemplate.filterOptions.experience,
      region: proTableDataTemplate.regionOptions
    }
    return await mockApiCall(data)
  },
  
  // 删除数据
  deleteData: async (id: string) => {
    const data = { success: true, message: '删除成功' }
    return await mockApiCall(data)
  },
  
  // 批量删除
  batchDelete: async (ids: string[]) => {
    const data = { success: true, message: `成功删除 ${ids.length} 条数据` }
    return await mockApiCall(data)
  },
  
  // 更新数据
  updateData: async (id: string, data: any) => {
    const result = { success: true, message: '更新成功', data: { id, ...data } }
    return await mockApiCall(result)
  },
  
  // 新增数据
  createData: async (data: any) => {
    const result = { success: true, message: '创建成功', data: { id: Mock.mock('@id'), ...data } }
    return await mockApiCall(result)
  }
}

// 初始化 ProTable Mock 接口
export const initProTableMock = () => {
  // 模拟表格数据接口
  Mock.mock(new RegExp(`${mockConfig.baseURL}/protable/data.*`), 'get', (options: any) => {
    const url = new URL(options.url, 'http://localhost')
    const params = Object.fromEntries(url.searchParams.entries())
    return createApiResponse(generatePaginationData(
      parseInt(params.current) || 1,
      parseInt(params.pageSize) || 10,
      156
    ).data)
  })
  
  // 模拟筛选选项接口
  Mock.mock(`${mockConfig.baseURL}/protable/options`, 'get', () => {
    return createApiResponse({
      department: proTableDataTemplate.filterOptions.department,
      status: proTableDataTemplate.filterOptions.status,
      education: proTableDataTemplate.filterOptions.education,
      experience: proTableDataTemplate.filterOptions.experience,
      region: proTableDataTemplate.regionOptions
    })
  })
  
  // 模拟删除接口
  Mock.mock(new RegExp(`${mockConfig.baseURL}/protable/data/.*`), 'delete', () => {
    return createApiResponse({ success: true, message: '删除成功' })
  })
  
  // 模拟批量删除接口
  Mock.mock(`${mockConfig.baseURL}/protable/data/batch`, 'delete', (options: any) => {
    const { ids } = JSON.parse(options.body)
    return createApiResponse({ success: true, message: `成功删除 ${ids.length} 条数据` })
  })
  
  // 模拟更新接口
  Mock.mock(new RegExp(`${mockConfig.baseURL}/protable/data/.*`), 'put', (options: any) => {
    const data = JSON.parse(options.body)
    return createApiResponse({ success: true, message: '更新成功', data })
  })
  
  // 模拟新增接口
  Mock.mock(`${mockConfig.baseURL}/protable/data`, 'post', (options: any) => {
    const data = JSON.parse(options.body)
    return createApiResponse({ success: true, message: '创建成功', data: { id: Mock.mock('@id'), ...data } })
  })
  
  console.log('[ProTable Mock] ProTable Mock 接口已初始化')
}
