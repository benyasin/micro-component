import { getCurrentInstance } from 'vue'
import { EventEmitter } from 'events'

/**
 * 这个hook返回事件监听和触发的函数
 * 并且会根据传入的泛型自动解析类型
 */
export const useEvent = <Events extends Record<string | number | symbol, (...args) => any>>() => {
  const { proxy } = getCurrentInstance()
  const event = new EventEmitter()
  
  // 设置最大监听器数量，避免 MaxListenersExceededWarning
  // 默认是10个，组件复用时可能超过此限制
  event.setMaxListeners(50)
  
  const eventEmit = event.emit
  const eventOn = event.on

  let isReady = false
  let waitQueue = []

  /** 触发等待队列的事件 */
  const flushWaitQueue = function () {
    if (isReady) return
    isReady = true
    while(waitQueue.length) {
      waitQueue[0]()
      waitQueue.splice(0, 1)
    }
  }

  const on = <Key extends keyof Events, Event extends Events>(eventName: Key, cb: Event[Key]) => {
    const result = eventOn.call(event, eventName as string, cb)
    // 初始化组件时，将等待队列里的事件全部触发一遍
    if (eventName === 'event') {
      flushWaitQueue()
    }
    return result
  }

  // 重写event emit
  // 在emit时顺便触发vue事件
  const emit = <Key extends keyof Events, Event extends Events>(
    eventName: Key,
    ...args: Parameters<Event[Key]>
  ) => {
    if (import.meta.env.DEV) {
      console.log(`[Event] ${eventName.toString()}`, args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg))
      // playground emit
      proxy.$emit(eventName as string, ...args)
    }
    const emitEvent = () => {
      // 额外触发一个event事件，以便通过on('event')监听到所有事件
      eventEmit.call(event, 'event', eventName, ...args)
      eventEmit.call(event, eventName, ...args)
    }
    emitEvent()
    // 未初始化完成时，先将事件放进等待队列
    // 等待初始化完成后重新触发
    if (!isReady) {
      waitQueue.push(emitEvent)
    }
  }

  const hasEvent = (eventName: string) => {
    return event.listeners(eventName).length > 0
  }

  const clearEvents = () => {
    isReady = false
    return event.removeAllListeners()
  }

  return {
    event,
    on,
    emit,
    hasEvent,
    clearEvents
  }
}
