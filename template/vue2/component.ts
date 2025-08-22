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

const type = '{{type}}'

let serverHTML = ''

export default {
  inheritAttrs: false,
  data() {
    // 使用更可靠的唯一ID生成方式
    const microId =
      this.$attrs.microId || `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 为每个组件实例生成唯一的instanceId
    const instanceId =
      this.$attrs.instanceId || `instance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      component: null,
      microId,
      instanceId,
      styleId: `micro-style-${microId}`
    }
  },
  methods: {
    log(text, ...args) {
      if (isDebug) {
        console.log(`[MicroComponent ${type}]`, ...args)
      }
    },
    async createComponent() {
      this.log('create component')

      // 注入样式
      this.injectStyles()

      const microRuntime = await getMicroRutime()
      const comp = await microRuntime.createComponent({
        microId: this.microId,
        instanceId: this.instanceId,
        type,
        props: this.$attrs,
        el: this.$el
      })
      if (comp) {
        comp.event?.clearEvents()
        comp.event?.on('event', (eventName, ...args) => {
          this.log('event emit', eventName, ...args)
          const vueEventName = 'on' + eventName.replace(/^([a-zA-Z]{1})/, ($) => $.toUpperCase())
          this.$attrs[vueEventName] && this.$attrs[vueEventName](...args)
        })
        comp?.updateProps(this.$attrs)
      }
      this.component = comp
      this.log('create component complete')
    },
    injectStyles() {
      // 检查是否已经注入过样式
      if (document.getElementById(this.styleId)) {
        return
      }

      const style = document.createElement('style')
      style.id = this.styleId

      // 微组件样式隔离
      style.textContent = `
        .micro[data-micro-type="${type}"] {
          all: initial;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif !important;
          font-size: 14px !important;
          line-height: 1.5715 !important;
        }
        
        .micro[data-micro-type="${type}"] * {
          box-sizing: border-box !important;
        }
      `

      document.head.appendChild(style)
      this.log('styles injected')
    },
    removeStyles() {
      const style = document.getElementById(this.styleId)
      if (style) {
        style.remove()
        this.log('Styles removed from head')
      }
    }
  },
  created() {
    this.serverHTML = ''

    if (this.$attrs.serverLocale) {
      this.serverHTML = serverHTML = this.$attrs.serverLocale
    } else if (serverHTML) {
      this.serverHTML = serverHTML
    } else if (isClient) {
      this.serverHTML = serverHTML = document.querySelector(
        `[data-micro-type="${type}"]`
      )?.innerHTML
    }

    if (!this.serverHTML) {
      this.serverHTML = '<div></div>'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createComponent()
    })
  },
  beforeDestroy() {
    this.log('beforeDestroy')
    this.component?.event?.clearEvents()
    this.component = null
    this.removeStyles()
  },
  render: function (createElement) {
    this.log('render')

    if (this.component) {
      this.log('update props', this.$attrs)
      this.component?.updateProps(this.$attrs)
    }

    const themeClass = this.$attrs.theme ? `micro-${this.$attrs.theme}` : ''

    return createElement('div', {
      key: this.microId,
      class: {
        micro: true,
        [themeClass]: true
      },
      attrs: {
        'data-micro-type': type
      }
    })
  }
}
