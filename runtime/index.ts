import 'virtual:uno.css'
import '@/polyfill/event-target'
import '@/polyfill/request-idle'

import { createApp } from 'vue'
import { createElement } from '@/utils'
import { i18n } from './i18n'
import runtime from './runtime'
import Runtime from './Runtime.vue'
import './index.less'
import { Spin } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

function injectToGlobal(app) {
  // @ts-ignore
  window.MicroRuntime = { ...runtime, app }
  window.dispatchEvent(new Event('MicroRuntime:ready'))
}

function createRuntime() {
  const el = createElement('MicroRuntime')
  const app = createApp(Runtime)

  app.use(i18n)
  app.use(Spin)
  app.mount(el)

  injectToGlobal(app)
}

if (document.body) {
  createRuntime()
} else {
  window.addEventListener('DOMContentLoaded', () => {
    createRuntime()
  })
}
