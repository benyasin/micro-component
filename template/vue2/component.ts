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
         /* 重置所有可能的继承样式 */
         .micro[data-micro-type="${type}"] {
           all: initial;
           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif !important;
           font-size: 14px !important;
           line-height: 1.5715 !important;
         }
         
         .micro[data-micro-type="${type}"] * {
           box-sizing: border-box !important;
         }
         
         /* 强制表格样式重置 */
         .micro[data-micro-type="${type}"] .ant-table {
           font-size: 14px !important;
           line-height: 1.5715 !important;
           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-table * {
           font-size: 14px !important;
           line-height: 1.5715 !important;
         }
         
         /* 强制checkbox样式 */
         .micro[data-micro-type="${type}"] .ant-checkbox-wrapper {
           display: flex !important;
           align-items: center !important;
           justify-content: center !important;
           height: 100% !important;
           margin: 0 !important;
           padding: 0 !important;
           font-size: 14px !important;
           line-height: 1.5715 !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-checkbox {
           margin: 0 !important;
           padding: 0 !important;
           top: 0 !important;
           left: 0 !important;
           position: relative !important;
           transform: none !important;
           font-size: 14px !important;
           line-height: 1.5715 !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-checkbox-inner {
           margin: 0 !important;
           padding: 0 !important;
           top: 0 !important;
           left: 0 !important;
           position: relative !important;
           transform: none !important;
           font-size: 14px !important;
           line-height: 1.5715 !important;
         }
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
            overflow: hidden !important;
            background-color: #fff !important;
            border: 1px solid #f0f0f0 !important;
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
         
                   .micro[data-micro-type="${type}"] .ant-table-thead > tr > th {
            background-color: #fafafa !important;
            border-bottom: 1px solid #f0f0f0 !important;
            padding: 12px 16px !important;
            font-weight: 500 !important;
            color: rgba(0, 0, 0, 0.85) !important;
            text-align: left !important;
            position: relative !important;
            transition: background 0.3s ease !important;
            vertical-align: middle !important;
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-table-tbody > tr > td {
            padding: 12px 16px !important;
            border-bottom: 1px solid #f0f0f0 !important;
            transition: background 0.3s ease !important;
            vertical-align: middle !important;
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
         
         .micro[data-micro-type="${type}"] .ant-table-tbody > tr:hover > td {
           background-color: #f5f5f5 !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-table-tbody > tr:last-child > td {
           border-bottom: none !important;
         }
         
                   .micro[data-micro-type="${type}"] .ant-pagination {
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            margin-top: 16px !important;
            flex-wrap: nowrap !important;
            white-space: nowrap !important;
            gap: 8px !important;
          }
         
                   .micro[data-micro-type="${type}"] .ant-pagination-item {
            border-radius: 6px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            margin: 0 4px !important;
            min-width: 32px !important;
            height: 32px !important;
            line-height: 30px !important;
            text-align: center !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            display: inline-block !important;
            box-sizing: border-box !important;
            font-size: 14px !important;
            color: rgba(0, 0, 0, 0.65) !important;
          }
         
         .micro[data-micro-type="${type}"] .ant-pagination-item:hover {
           border-color: #40a9ff !important;
           color: #40a9ff !important;
         }
         
                   .micro[data-micro-type="${type}"] .ant-pagination-item-active {
            border-color: #1890ff !important;
            background-color: #1890ff !important;
            color: #fff !important;
            font-weight: 500 !important;
          }
         
                   .micro[data-micro-type="${type}"] .ant-pagination-prev,
          .micro[data-micro-type="${type}"] .ant-pagination-next {
            border-radius: 6px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            margin: 0 4px !important;
            min-width: 32px !important;
            height: 32px !important;
            line-height: 30px !important;
            text-align: center !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            display: inline-block !important;
            box-sizing: border-box !important;
            font-size: 14px !important;
            color: rgba(0, 0, 0, 0.65) !important;
          }
         
         .micro[data-micro-type="${type}"] .ant-pagination-prev:hover,
         .micro[data-micro-type="${type}"] .ant-pagination-next:hover {
           border-color: #40a9ff !important;
           color: #40a9ff !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-pagination-prev:disabled,
         .micro[data-micro-type="${type}"] .ant-pagination-next:disabled {
           border-color: #f0f0f0 !important;
           color: rgba(0, 0, 0, 0.25) !important;
           cursor: not-allowed !important;
         }
         
                   .micro[data-micro-type="${type}"] .ant-pagination-jump-prev,
          .micro[data-micro-type="${type}"] .ant-pagination-jump-next {
            border-radius: 6px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            margin: 0 4px !important;
            min-width: 32px !important;
            height: 32px !important;
            line-height: 30px !important;
            text-align: center !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            display: inline-block !important;
            box-sizing: border-box !important;
            font-size: 14px !important;
            color: rgba(0, 0, 0, 0.65) !important;
          }
         
                   .micro[data-micro-type="${type}"] .ant-pagination-options {
            display: flex !important;
            align-items: center !important;
            flex-wrap: nowrap !important;
            white-space: nowrap !important;
            gap: 8px !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-pagination-options-quick-jumper {
            display: inline-flex !important;
            align-items: center !important;
            white-space: nowrap !important;
            gap: 4px !important;
          }
         
                   .micro[data-micro-type="${type}"] .ant-pagination-options-quick-jumper input {
            border-radius: 6px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            padding: 4px 8px !important;
            height: 32px !important;
            line-height: 1.5715 !important;
            font-size: 14px !important;
            outline: none !important;
            width: 40px !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
         
         .micro[data-micro-type="${type}"] .ant-pagination-options-quick-jumper input:hover {
           border-color: #40a9ff !important;
         }
         
         .micro[data-micro-type="${type}"] .ant-pagination-options-quick-jumper input:focus {
           border-color: #1890ff !important;
           box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
         }
         
                   .micro[data-micro-type="${type}"] .ant-pagination-total-text {
            color: rgba(0, 0, 0, 0.65) !important;
            font-size: 14px !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-tag {
            border-radius: 4px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fafafa !important;
            color: rgba(0, 0, 0, 0.65) !important;
            padding: 0 7px !important;
            font-size: 12px !important;
            line-height: 20px !important;
            white-space: nowrap !important;
            display: inline-block !important;
            box-sizing: border-box !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-tag-green {
            background-color: #f6ffed !important;
            border-color: #b7eb8f !important;
            color: #52c41a !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-tag-blue {
            background-color: #e6f7ff !important;
            border-color: #91d5ff !important;
            color: #1890ff !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-tag-red {
            background-color: #fff2f0 !important;
            border-color: #ffccc7 !important;
            color: #ff4d4f !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-checkbox {
            border-radius: 2px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            width: 16px !important;
            height: 16px !important;
            display: inline-block !important;
            position: relative !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
            margin: 0 !important;
            top: 0 !important;
            left: 0 !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #1890ff !important;
            border-color: #1890ff !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-checkbox-inner {
            width: 16px !important;
            height: 16px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            border-radius: 2px !important;
            transition: all 0.2s !important;
            position: relative !important;
            display: block !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
            margin: 0 !important;
            top: 0 !important;
            left: 0 !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-checkbox-inner::after {
            content: "" !important;
            position: absolute !important;
            top: 2px !important;
            left: 5px !important;
            width: 4px !important;
            height: 8px !important;
            border: 2px solid #fff !important;
            border-top: 0 !important;
            border-left: 0 !important;
            transform: rotate(45deg) !important;
            opacity: 0 !important;
            transition: all 0.2s !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-checkbox-checked .ant-checkbox-inner::after {
            opacity: 1 !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-checkbox:hover .ant-checkbox-inner {
            border-color: #40a9ff !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-checkbox-checked:hover .ant-checkbox-inner {
            border-color: #40a9ff !important;
            background-color: #40a9ff !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio {
            border-radius: 50% !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            width: 16px !important;
            height: 16px !important;
            display: inline-block !important;
            position: relative !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            box-sizing: border-box !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio-checked .ant-radio-inner {
            border-color: #1890ff !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio-inner {
            width: 16px !important;
            height: 16px !important;
            border: 1px solid #d9d9d9 !important;
            background-color: #fff !important;
            border-radius: 50% !important;
            transition: all 0.2s !important;
            position: relative !important;
            display: block !important;
            box-sizing: border-box !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio-inner::after {
            content: "" !important;
            position: absolute !important;
            top: 3px !important;
            left: 3px !important;
            width: 8px !important;
            height: 8px !important;
            background-color: #1890ff !important;
            border-radius: 50% !important;
            opacity: 0 !important;
            transition: all 0.2s !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio-checked .ant-radio-inner::after {
            opacity: 1 !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio:hover .ant-radio-inner {
            border-color: #40a9ff !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio-checked:hover .ant-radio-inner {
            border-color: #40a9ff !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-radio-checked:hover .ant-radio-inner::after {
            background-color: #40a9ff !important;
          }
          
          /* 表格容器样式 */
          .micro[data-micro-type="${type}"] .ant-table-container {
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
          
          /* 表格内容区域 */
          .micro[data-micro-type="${type}"] .ant-table-content {
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
          
          /* 表格行样式 */
          .micro[data-micro-type="${type}"] .ant-table-tbody > tr {
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
          
          /* 表格头部行样式 */
          .micro[data-micro-type="${type}"] .ant-table-thead > tr {
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
          
          /* 强制覆盖所有表格相关字体 */
          .micro[data-micro-type="${type}"] .ant-table * {
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
          
          /* 更强制的方式覆盖字体 */
          .micro[data-micro-type="${type}"] .ant-table,
          .micro[data-micro-type="${type}"] .ant-table *,
          .micro[data-micro-type="${type}"] .ant-table-thead,
          .micro[data-micro-type="${type}"] .ant-table-tbody,
          .micro[data-micro-type="${type}"] .ant-table tr,
          .micro[data-micro-type="${type}"] .ant-table th,
          .micro[data-micro-type="${type}"] .ant-table td {
            font-size: 14px !important;
            line-height: 1.5715 !important;
          }
          
          /* 确保checkbox在表格中的对齐 */
          .micro[data-micro-type="${type}"] .ant-table .ant-checkbox-wrapper {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .micro[data-micro-type="${type}"] .ant-table .ant-checkbox-wrapper .ant-checkbox {
            margin: 0 !important;
            top: 0 !important;
            left: 0 !important;
            position: relative !important;
            transform: none !important;
          }
          
          /* 强制覆盖checkbox相关样式 */
          .micro[data-micro-type="${type}"] .ant-table .ant-checkbox-wrapper,
          .micro[data-micro-type="${type}"] .ant-table .ant-checkbox,
          .micro[data-micro-type="${type}"] .ant-table .ant-checkbox-inner {
            font-size: 14px !important;
            line-height: 1.5715 !important;
            vertical-align: middle !important;
            margin: 0 !important;
            padding: 0 !important;
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
