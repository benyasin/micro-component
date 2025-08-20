import { Mock, createMockData, createApiResponse, mockApiCall, mockConfig } from './mock'

// Footer 相关的 Mock 数据模板
const footerDataTemplate = {
  // 品牌信息
  brand: {
    name: '@ctitle(3, 8)',
    slogan: '@csentence(10, 20)',
    copyright: '@ctitle(10, 30)'
  },
  
  // 链接数据
  links: {
    product: [
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' }
    ],
    support: [
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' }
    ],
    company: [
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' },
      { title: '@ctitle(2, 6)', url: '@url', target: '@pick(["_blank", "_self"])' }
    ],
    social: [
      { name: '@pick(["twitter", "github", "discord", "linkedin"])', title: '@ctitle(5, 15)', url: '@url', icon: '@pick(["🐦", "📚", "💬", "🔗"])' },
      { name: '@pick(["twitter", "github", "discord", "linkedin"])', title: '@ctitle(5, 15)', url: '@url', icon: '@pick(["🐦", "📚", "💬", "🔗"])' },
      { name: '@pick(["twitter", "github", "discord", "linkedin"])', title: '@ctitle(5, 15)', url: '@url', icon: '@pick(["🐦", "📚", "💬", "🔗"])' }
    ]
  },
  
  // 语言配置
  languages: [
    { locale: 'en', languageKey: 'en_US', languageType: 0, languageName: 'English' },
    { locale: 'zh-CN', languageKey: 'zh_CN', languageType: 1, languageName: '简体中文' },
    { locale: 'ja', languageKey: 'ja_JP', languageType: 2, languageName: '日本語' }
  ],
  
  // 用户信息
  userInfo: {
    id: '@id',
    name: '@cname',
    email: '@email',
    avatar: '@image("100x100")',
    role: '@pick(["admin", "user", "guest"])'
  }
}

// 生成 Footer 配置数据
export const generateFooterConfig = () => {
  return Mock.mock({
    brandName: footerDataTemplate.brand.name,
    slogan: footerDataTemplate.brand.slogan,
    copyright: footerDataTemplate.brand.copyright,
    productLinks: footerDataTemplate.links.product,
    supportLinks: footerDataTemplate.links.support,
    companyLinks: footerDataTemplate.links.company,
    socialLinks: footerDataTemplate.links.social,
    languages: footerDataTemplate.languages,
    userInfo: footerDataTemplate.userInfo
  })
}

// Footer API 接口
export const footerApi = {
  // 获取 Footer 配置
  getFooterConfig: async () => {
    const data = generateFooterConfig()
    return await mockApiCall(data)
  },
  
  // 更新 Footer 配置
  updateFooterConfig: async (config: any) => {
    const data = { ...generateFooterConfig(), ...config }
    return await mockApiCall(data)
  },
  
  // 获取用户信息
  getUserInfo: async () => {
    const data = footerDataTemplate.userInfo
    return await mockApiCall(data)
  },
  
  // 更新用户信息
  updateUserInfo: async (userInfo: any) => {
    const data = { ...footerDataTemplate.userInfo, ...userInfo }
    return await mockApiCall(data)
  },
  
  // 获取语言列表
  getLanguages: async () => {
    const data = footerDataTemplate.languages
    return await mockApiCall(data)
  },
  
  // 切换语言
  changeLanguage: async (locale: string) => {
    const data = { currentLocale: locale, success: true }
    return await mockApiCall(data)
  }
}

// 初始化 Footer Mock 接口
export const initFooterMock = () => {
  // 模拟 API 接口
  Mock.mock(`${mockConfig.baseURL}/footer/config`, 'get', () => {
    return createApiResponse(generateFooterConfig())
  })
  
  Mock.mock(`${mockConfig.baseURL}/footer/config`, 'post', (options: any) => {
    const config = JSON.parse(options.body)
    return createApiResponse({ ...generateFooterConfig(), ...config })
  })
  
  Mock.mock(`${mockConfig.baseURL}/footer/user`, 'get', () => {
    return createApiResponse(footerDataTemplate.userInfo)
  })
  
  Mock.mock(`${mockConfig.baseURL}/footer/languages`, 'get', () => {
    return createApiResponse(footerDataTemplate.languages)
  })
  
  Mock.mock(`${mockConfig.baseURL}/footer/language`, 'post', (options: any) => {
    const { locale } = JSON.parse(options.body)
    return createApiResponse({ currentLocale: locale, success: true })
  })
  
  console.log('[Footer Mock] Footer Mock 接口已初始化')
}
