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
      if (this.$attrs.logger || isDebug) {
        console.log(
          `[MicroComponent] ${type}: ${text}`,
          args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg))
        )
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

      // 创建样式元素
      const style = document.createElement('style')
      style.id = this.styleId

      // 注入强制样式覆盖
      style.textContent = `
        /* Vue2 ProTable 强制样式覆盖 */
        .micro[data-micro-type="${type}"] .ant-input {
          border-radius: 6px !important;
          border: 1px solid #d9d9d9 !important;
          background-color: #fff !important;
          transition: all 0.2s !important;
          padding: 4px 11px !important;
          height: 32px !important;
          line-height: 1.5715 !important;
          font-size: 14px !important;
          outline: none !important;
          display: inline-block !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-input:hover {
          border-color: #40a9ff !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-input:focus {
          border-color: #1890ff !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
        
                 .micro[data-micro-type="${type}"] .ant-input-affix-wrapper {
           border-radius: 6px !important;
           border: 1px solid #d9d9d9 !important;
           background-color: #fff !important;
           transition: all 0.2s !important;
           padding: 0 !important;
           height: 32px !important;
           position: relative !important;
           display: inline-block !important;
           width: 100% !important;
           text-align: start !important;
           box-sizing: border-box !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-input-affix-wrapper::before {
           width: 0 !important;
           visibility: hidden !important;
           content: "\a0" !important;
           display: none !important;
         }
        
        .micro[data-micro-type="${type}"] .ant-input-affix-wrapper:hover {
          border-color: #40a9ff !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-input-affix-wrapper:focus-within {
          border-color: #1890ff !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-input-affix-wrapper > .ant-input {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          padding: 4px 11px !important;
          height: 30px !important;
          line-height: 1.5715 !important;
          font-size: inherit !important;
          outline: none !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-select {
          width: 100% !important;
          display: inline-block !important;
          position: relative !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-select .ant-select-selector {
          border-radius: 6px !important;
          border: 1px solid #d9d9d9 !important;
          background-color: #fff !important;
          transition: all 0.2s !important;
          padding: 0 11px !important;
          height: 32px !important;
          line-height: 30px !important;
          display: flex !important;
          align-items: center !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-select:hover .ant-select-selector {
          border-color: #40a9ff !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-select-focused .ant-select-selector {
          border-color: #1890ff !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
        
                 .micro[data-micro-type="${type}"] .ant-btn {
           border-radius: 6px !important;
           border: 1px solid #d9d9d9 !important;
           background-color: #fff !important;
           color: rgba(0, 0, 0, 0.65) !important;
           transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
           padding: 4px 15px !important;
           height: 32px !important;
           line-height: 1.5715 !important;
           font-size: 14px !important;
           font-weight: 400 !important;
           cursor: pointer !important;
           display: inline-block !important;
           text-align: center !important;
           white-space: nowrap !important;
           user-select: none !important;
           box-sizing: border-box !important;
           outline: 0 !important;
           position: relative !important;
           text-decoration: none !important;
           vertical-align: middle !important;
           touch-action: manipulation !important;
         }
        
        .micro[data-micro-type="${type}"] .ant-btn:hover {
          border-color: #40a9ff !important;
          color: #40a9ff !important;
          background-color: #fff !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn:focus {
          border-color: #40a9ff !important;
          color: #40a9ff !important;
          outline: 0 !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn:active {
          border-color: #096dd9 !important;
          color: #096dd9 !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-primary {
          background-color: #1890ff !important;
          border-color: #1890ff !important;
          color: #fff !important;
          text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12) !important;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045) !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-primary:hover {
          background-color: #40a9ff !important;
          border-color: #40a9ff !important;
          color: #fff !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-primary:focus {
          background-color: #40a9ff !important;
          border-color: #40a9ff !important;
          color: #fff !important;
          outline: 0 !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-primary:active {
          background-color: #096dd9 !important;
          border-color: #096dd9 !important;
          color: #fff !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-link {
          border-color: transparent !important;
          background: transparent !important;
          color: #1890ff !important;
          box-shadow: none !important;
          padding: 4px 0 !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-link:hover {
          border-color: transparent !important;
          background: transparent !important;
          color: #40a9ff !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-link:focus {
          border-color: transparent !important;
          background: transparent !important;
          color: #40a9ff !important;
          box-shadow: none !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-btn-link:active {
          border-color: transparent !important;
          background: transparent !important;
          color: #096dd9 !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-table {
          border-radius: 6px !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-table-thead > tr > th {
          border-radius: 6px !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-table-tbody > tr > td {
          border-radius: 6px !important;
        }
        
        .micro[data-micro-type="${type}"] .ant-pagination-item {
          border-radius: 6px !important;
        }
        
                 .micro[data-micro-type="${type}"] .ant-pagination-prev,
         .micro[data-micro-type="${type}"] .ant-pagination-next {
           border-radius: 6px !important;
         }
         
         /* 处理所有可能影响布局的伪元素 */
         .micro[data-micro-type="${type}"] .ant-input-affix-wrapper::after {
           display: none !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-select::before,
         .micro[data-micro-type="${type}"] .ant-select::after {
           display: none !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-btn::before,
         .micro[data-micro-type="${type}"] .ant-btn::after {
           display: none !important;
         }
      `

      // 插入到head中
      document.head.appendChild(style)
      this.log('Styles injected to head')
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
