import { isMobile } from '@/utils/device'

interface ComponentConfig {
  keepAlive?: boolean
  appShow?: boolean
  priority: number
  prefetch?: () => Promise<any>
}

export const config = {
  components: {
    Footer: {
      keepAlive: true,
      appShow: false,
      priority: 1
    }
  }
}

export function getConfig(componentName: string): ComponentConfig {
  return config.components[componentName] || {
    keepAlive: false,
    appShow: true,
    priority: 2
  }
}
