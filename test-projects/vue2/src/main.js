import Vue from 'vue'
import App from './App.vue'
import './uno.css'  // 添加UnoCSS样式
import './style.css'
import '../index.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')