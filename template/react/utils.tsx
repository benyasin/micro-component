import React, { useEffect, useRef } from 'react'

const isClient = process.client
const isDebug = isClient && Boolean(localStorage?.getItem('MICRO_HEADER:DEBUG'))

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

export function getComponent({ elementId, type }) {
  let _serverHTML

  return function Comp(props = {}) {
    const el = useRef()
    const propsRef = useRef(props)
    const component = useRef()
    const isCreating = useRef(false)
    const serverHTML = useRef('')
    const microId = useRef(
      props.microId ||
        Math.floor(Date.now() * Math.random())
          .toString()
          .substr(4)
    )

    const log = (text, ...args) => {
      if (propsRef.current?.logger || isDebug) {
        console.log(`[MicroComponent] ${type}: ${text}`, ...args)
      }
    }

    async function createComponent() {
      log('create component', propsRef.current)

      const microRuntime = await getMicroRutime()

      // 创建component
      component.current = await microRuntime.createComponent({
        elementId,
        type,
        props: propsRef.current,
        microId: microId.current,
        el: el.current
      })
      if (component.current) {
        component.current?.event?.clearEvents()
        component.current?.on?.('event', (eventName, ...args) => {
          log('event emit', eventName, ...args)
          propsRef.current[eventName] && propsRef.current[eventName](...args)
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

    propsRef.current = props
    updateProps()

    if (!serverHTML.current) {
      if (propsRef.current.serverLocale) {
        serverHTML.current = _serverHTML = propsRef.current.serverLocale
      } else if (_serverHTML) {
        serverHTML.current = _serverHTML
      } else if (isClient) {
        serverHTML.current = _serverHTML = document.querySelector(
          `[data-micro-type="${type}"]`
        )?.innerHTML
      }
      if (!serverHTML.current) {
        serverHTML.current = '<div></div>'
      }
    }

    const themeClass = propsRef.current.theme ? `micro-${propsRef.current.theme}` : ''

    return (
      <div
        key={microId.current}
        ref={el}
        className={`micro ${themeClass} ${propsRef.current.className || ''}`.trim()}
        dangerouslySetInnerHTML={{ __html: serverHTML.current }}
        data-micro-type={type}
      ></div>
    )
  }
}
