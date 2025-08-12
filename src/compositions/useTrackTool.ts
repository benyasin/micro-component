import { Ref, unref } from 'vue'
import { BaseProps } from '../types/component'

let logEvent

function logNullError(type: 'logEvent' | 'twq' | 'gtag', ...args) {
  console.warn(
    `[Micro] Failed to report the buried point, please confirm the ${type} prop is provided`,
    ...args
  )
}

/**
 * 返回埋点上报的方法，这些方法从组件props解析出来
 */
export const useTrackTool = (baseProp: Ref<BaseProps> | BaseProps) => {
  const getLogEvent = () => {
    logEvent = unref(baseProp)?.logEvent || logEvent
    return logEvent
  }

  const expose = (...args) => {
    try {
      getLogEvent()?.expose(...args)
    } catch (e) {
      console.error(`[Micro] logEvent failed, ${e}`)
    }
  }

  const registerExposeEvent = (...args) => {
    try {
      getLogEvent()?.registerExposeEvent(...args)
    } catch (e) {
      console.error(`[Micro] logEvent failed, ${e}`)
    }
  }

  const click = (...args) => {
    try {
      getLogEvent()?.click(...args)
    } catch (e) {
      console.error(`[Micro] logEvent failed, ${e}`)
    }
  }

  const gtag = (...args) => {
    try {
      unref(baseProp)?.gtag?.(...args)
    } catch (e) {
      console.error(`[Micro] gtag failed, ${e}`)
    }
  }

  const twq = (...args) => {
    try {
      unref(baseProp)?.twq?.(...args)
    } catch (e) {
      console.error(`[Micro] twq failed, ${e}`)
    }
  }

  if (process.client && !getLogEvent()) {
    logNullError('logEvent')
  }

  return {
    expose,
    click,
    registerExposeEvent,
    twq,
    gtag
  }
}
