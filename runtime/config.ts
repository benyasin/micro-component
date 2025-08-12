import { isMobile } from '@/utils/device'
import { getMenuList } from '@/services/header'

interface ComponentConfig {
  keepAlive: boolean
  appShow: boolean
  priority: number
  /** 预加载数据，在组件mounted前会调用此函数获取数据，组件里通过usePrefetchData获取 */
  prefetch?: () => Promise<any>
}

export const config = {
  components: {
    Header: {
      keepAlive: true,
      appShow: false,
      priority: 0,
      async prefetch() {
        if (isMobile()) return

        return new Promise(async (resolve) => {
          const { data } = await getMenuList({
            cache: {
              open: true,
              // 优先返回缓存，然后继续请求接口覆盖缓存
              override: true,
              hydrate: (cache) => {
                resolve({
                  menus: cache?.data?.data?.data || []
                })
              }
            }
          })
          resolve({
            menus: data || []
          })
        })
      }
    },
    Tabbar: {
      keepAlive: true,
      appShow: false,
      priority: 0
    },
    Footer: {
      keepAlive: true,
      appShow: false,
      priority: 1
    }
  }
}

export function getConfig(componentName: string): ComponentConfig {
  return (
    config.components[componentName] || {
      keepAlive: false,
      appShow: true,
      priority: 10
    }
  )
}
