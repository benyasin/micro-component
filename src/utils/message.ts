import { h, createApp, getCurrentInstance, AppContext } from 'vue'
import { isClient } from './index'
import { message as antMessage } from 'ant-design-vue'
type MessageOptions = Parameters<typeof antMessage.success>[0]
import ConfigProvider from '@/common/ConfigProvider/ConfigProvider.vue'

let createdPromise: Promise<AppContext>

function createContext() {
  createdPromise = new Promise((resolve) => {
    const el = document.createElement('div')
    const app = createApp({
      setup() {
        const vm = getCurrentInstance()!
        resolve(vm.appContext)
      },
      render() {
        return h(ConfigProvider)
      }
    })
    app.mount(el)
  })
}

/**
 * 弹出全局 message
 */
export function message(options: MessageOptions, context?: AppContext) {
  if (!isClient) return
  if (!createdPromise) {
    createContext()
  }
  createdPromise.then((appContext) => {
    //antMessage.success(options)
    console.log(options)
  })
}
