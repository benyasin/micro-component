interface ComponentConfig {
  keepAlive?: boolean
  appShow?: boolean
  priority: number // 0: 立即加载, 其他值: 正常加载
  prefetch?: () => Promise<any>
}

export const config = {
  components: {
    Footer: {
      keepAlive: true,
      appShow: false,
      priority: 1 // 正常加载
    },
    Button: {
      keepAlive: true,
      appShow: false,
      priority: 1 // 正常加载
    }
  }
}

export function getConfig(componentName: string): ComponentConfig {
  return config.components[componentName] || {
    keepAlive: false,
    appShow: true,
    priority: 1 // 默认正常加载
  }
}
