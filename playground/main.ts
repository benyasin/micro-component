import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'
import './index.less'
// polyfill
import '@/polyfill/event-target'
import '@/polyfill/request-idle'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Antd from 'ant-design-vue'
import { router } from './router'
import { i18n } from './i18n'
import App from './App.vue'

function run() {
  const app = createApp(App)
  app.use(router)
  app.use(i18n)
  app.use(Antd)
  app.mount('#app')
  // @ts-ignore
  app.config.globalProperties.$i18n = i18n
  // @ts-ignore
  window.MicroRuntime = {
    app,
    i18n
  }
}

run()
