import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'  // 首先加载Ant Design样式
import Antd from 'ant-design-vue'
import App from './App.vue'
import './uno.css'  // 添加UnoCSS样式
import '../index.less'
import './style.css'  // 最后加载自定义样式，确保可以覆盖

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')