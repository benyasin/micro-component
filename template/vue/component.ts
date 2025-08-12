import { defineComponent, h } from 'vue'
import './server-app/{{type}}/style.css'

const isClient = process.client
const isDebug = isClient && Boolean(localStorage?.getItem('MICRO_COMPONENT:DEBUG'))
const type = '{{type}}'

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

let serverHTML = ''

export default defineComponent({
  inheritAttrs: false,
  data() {
    return {
      component: null,
      microId:
        this.$attrs.microId ||
        Math.floor(Date.now() * Math.random())
          .toString()
          .substr(4)
    }
  },
  methods: {
    log(text, ...args) {
      if (this.$attrs.logger || isDebug) {
        console.log(`[MicroComponent] ${type}: ${text}`, ...args)
      }
    },
    async createComponent() {
      this.log('create component')

      const microRuntime = await getMicroRutime()
      const comp = await microRuntime.createComponent({
        microId: this.microId,
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
  },
  render() {
    this.log('render')

    if (this.component) {
      this.log('update props', this.$attrs)
      this.component.updateProps(this.$attrs)
    }

    const themeClass = this.$attrs.theme ? `micro-${this.$attrs.theme}` : ''

    return h('div', {
      innerHTML: serverHTML,
      key: this.microId,
      class: {
        micro: true,
        [themeClass]: true
      },
      'data-micro-type': type
    })
  }
})
