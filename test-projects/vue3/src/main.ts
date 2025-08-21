import 'virtual:uno.css'  // 添加UnoCSS样式
import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import './style.css'
import '../index.less'

const app = createApp(App)
app.use(Antd)
app.mount('#app')