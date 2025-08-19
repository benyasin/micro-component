import { EventEmitter } from 'events'
import { defineStore } from '@/utils/store'

export const useGlobalEvent = defineStore(
  () => {
    const event = new EventEmitter()
    
    // 设置全局事件总线的最大监听器数量
    event.setMaxListeners(100)

    return {
      globalEvent: event
    }
  },
  { global: true }
)
