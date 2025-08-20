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
  // 先生成一些固定的测试数据，基于筛选条件创建匹配的数据
  const fixedData = [
    {
      id: '1',
      name: '潘超',
      age: 28,
      email: 'panchao@example.com',
      phone: '13800138001',
      address: '北京市朝阳区',
      department: '技术部',
      position: '工程师',
      salary: 15000,
      status: '在职',
      joinDate: '2023-01-15',
      education: '本科',
      experience: '3-5年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2023-01-15',
      updateTime: '2024-01-15 10:30:00'
    },
    {
      id: '2',
      name: '张三',
      age: 32,
      email: 'zhangsan@example.com',
      phone: '13800138002',
      address: '上海市浦东新区',
      department: '产品部',
      position: '产品经理',
      salary: 20000,
      status: '在职',
      joinDate: '2022-06-01',
      education: '硕士',
      experience: '5-10年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2022-06-01',
      updateTime: '2024-01-10 14:20:00'
    },
    {
      id: '3',
      name: '李四',
      age: 25,
      email: 'lisi@example.com',
      phone: '13800138003',
      address: '深圳市南山区',
      department: '设计部',
      position: '设计师',
      salary: 12000,
      status: '试用期',
      joinDate: '2024-01-01',
      education: '本科',
      experience: '1-3年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2024-01-01',
      updateTime: '2024-01-15 16:45:00'
    },
    // 基于筛选条件添加匹配的数据
    {
      id: '4',
      name: '王小明',
      age: 26,
      email: 'wangxiaoming@example.com',
      phone: '13800138004',
      address: '北京市朝阳区',
      department: '技术部',
      position: '前端工程师',
      salary: 10000,
      status: '在职',
      joinDate: '2023-03-15',
      education: '大专',
      experience: '1-3年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2023-03-15',
      updateTime: '2024-01-12 09:15:00'
    },
    {
      id: '5',
      name: '刘小红',
      age: 29,
      email: 'liuxiaohong@example.com',
      phone: '13800138005',
      address: '北京市朝阳区',
      department: '产品部',
      position: '产品专员',
      salary: 12000,
      status: '在职',
      joinDate: '2023-05-20',
      education: '大专',
      experience: '1-3年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2023-05-20',
      updateTime: '2024-01-08 16:45:00'
    },
    {
      id: '6',
      name: '陈小华',
      age: 31,
      email: 'chenxiaohua@example.com',
      phone: '13800138006',
      address: '北京市朝阳区',
      department: '设计部',
      position: 'UI设计师',
      salary: 11000,
      status: '在职',
      joinDate: '2023-07-10',
      education: '大专',
      experience: '1-3年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2023-07-10',
      updateTime: '2024-01-05 13:20:00'
    },
    {
      id: '7',
      name: '赵小强',
      age: 27,
      email: 'zhaoxiaoqiang@example.com',
      phone: '13800138007',
      address: '北京市朝阳区',
      department: '市场部',
      position: '市场专员',
      salary: 9500,
      status: '在职',
      joinDate: '2023-09-05',
      education: '大专',
      experience: '1-3年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2023-09-05',
      updateTime: '2024-01-03 11:30:00'
    },
    {
      id: '8',
      name: '孙小美',
      age: 24,
      email: 'sunxiaomei@example.com',
      phone: '13800138008',
      address: '北京市朝阳区',
      department: '人事部',
      position: 'HR专员',
      salary: 9000,
      status: '在职',
      joinDate: '2023-11-12',
      education: '大专',
      experience: '1-3年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2023-11-12',
      updateTime: '2024-01-01 14:15:00'
    },
    // 添加更多数据以确保有足够的字段覆盖
    {
      id: '9',
      name: '吴小军',
      age: 33,
      email: 'wuxiaojun@example.com',
      phone: '13800138009',
      address: '北京市海淀区',
      department: '技术部',
      position: '后端工程师',
      salary: 18000,
      status: '在职',
      joinDate: '2022-08-15',
      education: '本科',
      experience: '5-10年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2022-08-15',
      updateTime: '2024-01-20 10:30:00'
    },
    {
      id: '10',
      name: '周小丽',
      age: 28,
      email: 'zhouxiaoli@example.com',
      phone: '13800138010',
      address: '上海市浦东新区',
      department: '产品部',
      position: '产品经理',
      salary: 22000,
      status: '在职',
      joinDate: '2022-12-01',
      education: '硕士',
      experience: '3-5年',
      avatar: 'https://via.placeholder.com/100x100',
      createTime: '2022-12-01',
      updateTime: '2024-01-18 14:25:00'
    }
  ]
  
  // 如果需要的数量少于固定数据，直接返回固定数据
  if (count <= fixedData.length) {
    return fixedData.slice(0, count)
  }
  
  // 否则先添加固定数据，再生成随机数据
  const randomCount = count - fixedData.length
  const randomData = Mock.mock({
    [`list|${randomCount}`]: [proTableDataTemplate.tableData]
  }).list
  
  return [...fixedData, ...randomData]
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
  getTableData: async (params: any = {}, signal?: AbortSignal) => {
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
    if (filters.email) {
      filteredData = filteredData.filter((item: any) => 
        item.email.includes(filters.email)
      )
      console.log('[ProTable Mock] 邮箱筛选后数据量:', filteredData.length)
    }
    if (filters.phone) {
      filteredData = filteredData.filter((item: any) => 
        item.phone.includes(filters.phone)
      )
      console.log('[ProTable Mock] 电话筛选后数据量:', filteredData.length)
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
    if (filters.salary) {
      filteredData = filteredData.filter((item: any) => 
        item.salary >= parseInt(filters.salary)
      )
      console.log('[ProTable Mock] 薪资筛选后数据量:', filteredData.length)
    }
    if (filters.education) {
      // 处理数组形式的教育筛选
      const educations = Array.isArray(filters.education) ? filters.education : [filters.education]
      filteredData = filteredData.filter((item: any) => 
        educations.includes(item.education)
      )
      console.log('[ProTable Mock] 学历筛选后数据量:', filteredData.length, '筛选学历:', educations)
    }
    if (filters.experience) {
      // 处理数组形式的经验筛选
      const experiences = Array.isArray(filters.experience) ? filters.experience : [filters.experience]
      filteredData = filteredData.filter((item: any) => 
        experiences.includes(item.experience)
      )
      console.log('[ProTable Mock] 经验筛选后数据量:', filteredData.length, '筛选经验:', experiences)
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
    
    // 检查是否被取消
    if (signal?.aborted) {
      const abortError = new DOMException('Request aborted', 'AbortError')
      throw abortError
    }
    
    try {
      return await mockApiCall(result, mockConfig.timeout, signal)
    } catch (error) {
      // 确保 AbortError 被正确抛出
      if (signal?.aborted) {
        const abortError = new DOMException('Request aborted', 'AbortError')
        throw abortError
      }
      throw error
    }
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
