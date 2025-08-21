import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import './uno.css'  // 添加UnoCSS样式
import './style.css'
import '../index.less'

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')