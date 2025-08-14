import Vue from 'vue'
import App from './App.vue'
import './style.css'
import 'micro-components/dist/runtime/runtime.js'
import 'micro-components/dist/runtime/runtime.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')