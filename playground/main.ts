import 'virtual:uno.css'
// import '@bit/styles/bit-colors.css' // 私有包，已注释
// import '@bit/styles/index.css' // 私有包，已注释
import 'ant-design-vue/dist/reset.css'
// import './index.less'
// polyfill
import '@/polyfill/event-target'
import '@/polyfill/request-idle'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Spin } from 'ant-design-vue'
import { router } from './router'
import { i18n } from './i18n'
import App from './App.vue'
// import '@bit-design/vue3/theme-chalk/dark/css-vars.css' // 私有包，已注释
// import '@bit-design/vue3/theme-chalk/index.css' // 私有包，已注释

function run() {
  const app = createApp(App)
  app.use(router)
  app.use(i18n)
  app.use(Spin)
  app.mount('#app')
  // @ts-ignore
  window.MicroRuntime = {
    app
  }
}

run()
