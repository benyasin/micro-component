import React, { useEffect, useRef } from 'react'

const isClient = typeof window !== 'undefined'
const isDebug = isClient && Boolean(localStorage?.getItem('MICRO_COMPONENT:DEBUG'))

async function getMicroRutime() {
  if ((window as any).MicroRuntime) {
    return (window as any).MicroRuntime
  }
  return new Promise((resolve) => {
    window.addEventListener('MicroRuntime:ready', () => {
      resolve((window as any).MicroRuntime)
    })
  })
}

// ID生成工具函数
function generateUniqueId(prefix: string = 'id'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  const counter = Math.floor(Math.random() * 10000)
  return `${prefix}_${timestamp}_${counter}_${random}`
}

function generateComponentInstanceId(type: string, elementId: string): string {
  return generateUniqueId(`${type}_${elementId}`)
}

function generateReactKey(microId: string, instanceId: string): string {
  return `${microId}_${instanceId}`
}

export function getComponent({ elementId, type }: { elementId: string; type: string }) {
  let _serverHTML: string

  return React.forwardRef(function Comp(props: any = {}, ref) {
    const el = useRef<HTMLDivElement>(null)
    const propsRef = useRef<any>(props)
    const component = useRef<any>(null)
    const isCreating = useRef(false)
    const serverHTML = useRef('')
    
    // 使用更可靠的唯一ID生成方式
    const microId = useRef(
      (props as any).microId || 
      generateUniqueId(`${type}_${elementId}`)
    )
    
    // 为每个组件实例生成唯一的instanceId
    const instanceId = useRef(
      (props as any).instanceId || 
      generateComponentInstanceId(type, elementId)
    )

    const log = (text: string, ...args: any[]) => {
      if ((propsRef.current as any)?.logger || isDebug) {
        console.log(`[MicroComponent] ${type}: ${text}`, args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg))
      }
    }

    // 事件处理函数
    const handleEvent = (eventName: string, ...args: any[]) => {
      log('event emit', eventName, ...args)
      // 直接使用当前的props，而不是propsRef.current
      const currentProps = propsRef.current
      if (currentProps && typeof currentProps[eventName] === 'function') {
        currentProps[eventName](...args)
      } else {
        log('event handler not found', eventName, currentProps)
      }
    }

    async function createComponent() {
      log('create component', propsRef.current)

      const microRuntime = await getMicroRutime()

      // 创建component，传入instanceId确保唯一性
      component.current = await microRuntime.createComponent({
        elementId,
        type,
        props: propsRef.current,
        microId: microId.current,
        instanceId: instanceId.current,
        el: el.current
      })
      
      if (component.current) {
        component.current?.event?.clearEvents()
        // 监听所有事件
        component.current?.on?.('event', handleEvent)
        
        // 也可以直接监听click事件
        component.current?.on?.('click', (...args: any[]) => {
          handleEvent('click', ...args)
        })
      }

      log('create component complete')
    }

    function updateProps() {
      if (component.current) {
        log('update props', propsRef.current)
        component.current?.updateProps(propsRef.current)
      }
    }

    useEffect(() => {
      if (typeof window !== 'undefined' && !component.current && !isCreating.current) {
        isCreating.current = true
        createComponent().then(() => {
          updateProps()
        })
      }
    }, [])

    useEffect(() => {
      return () => {
        if (component.current) {
          component.current.event?.clearEvents()
        }
      }
    }, [])

    // 更新propsRef并重新设置事件监听
    useEffect(() => {
      propsRef.current = props
      updateProps()
      
      // 如果组件已经创建，重新设置事件监听
      if (component.current) {
        component.current?.event?.clearEvents()
        component.current?.on?.('event', handleEvent)
        component.current?.on?.('click', (...args: any[]) => {
          handleEvent('click', ...args)
        })
      }
    }, [props])

    if (!serverHTML.current) {
      if ((propsRef.current as any).serverLocale) {
        serverHTML.current = _serverHTML = (propsRef.current as any).serverLocale
      } else if (_serverHTML) {
        serverHTML.current = _serverHTML
      } else if (isClient) {
        serverHTML.current = _serverHTML = document.querySelector(
          `[data-micro-type="${type}"]`
        )?.innerHTML || ''
      }
      if (!serverHTML.current) {
        serverHTML.current = '<div></div>'
      }
    }

    const themeClass = (propsRef.current as any).theme ? `micro-${(propsRef.current as any).theme}` : ''

    return (
      <div
        key={generateReactKey(microId.current, instanceId.current)}
        ref={el}
        className={`micro ${themeClass} ${(propsRef.current as any).className || ''}`.trim()}
        dangerouslySetInnerHTML={{ __html: serverHTML.current }}
        data-micro-type={type}
        data-micro-instance-id={instanceId.current}
      ></div>
    )
  })
}
