import Mock from 'mockjs'

// Mock 配置
export const mockConfig = {
  // 是否启用 Mock
  enabled: true,
  // 延迟时间
  timeout: 200,
  // 基础 URL
  baseURL: '/api'
}

// 初始化 Mock
export const initMock = () => {
  if (!mockConfig.enabled) return
  
  // 设置全局配置
  Mock.setup({
    timeout: mockConfig.timeout
  })
  
  console.log('[Mock] MockJS 已初始化')
}

// 创建 Mock 数据生成器
export const createMockData = (template: any, count: number = 10) => {
  return Mock.mock({
    [`list|${count}`]: [template]
  }).list
}

// 创建分页数据
export const createPaginationData = (template: any, total: number = 100, pageSize: number = 10) => {
  return Mock.mock({
    code: 200,
    message: 'success',
    data: {
      [`list|${pageSize}`]: [template],
      total,
      pageSize,
      current: 1
    }
  })
}

// 通用 API 响应格式
export const createApiResponse = (data: any, message: string = 'success', code: number = 200) => {
  return {
    code,
    message,
    data,
    timestamp: Date.now()
  }
}

// 模拟网络延迟
export const mockDelay = (delay: number = mockConfig.timeout) => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

// 模拟 API 调用
export const mockApiCall = async (data: any, delay: number = mockConfig.timeout, signal?: AbortSignal) => {
  try {
    // 检查是否被取消
    if (signal?.aborted) {
      const abortError = new DOMException('Request aborted', 'AbortError')
      throw abortError
    }
    
    await mockDelay(delay)
    
    // 再次检查是否被取消
    if (signal?.aborted) {
      const abortError = new DOMException('Request aborted', 'AbortError')
      throw abortError
    }
    
    return createApiResponse(data)
  } catch (error) {
    // 确保 AbortError 被正确抛出
    if (signal?.aborted) {
      const abortError = new DOMException('Request aborted', 'AbortError')
      throw abortError
    }
    throw error
  }
}

// 模拟错误响应
export const mockErrorResponse = (message: string = '请求失败', code: number = 500) => {
  return createApiResponse(null, message, code)
}

// 导出 Mock 实例
export { Mock }
