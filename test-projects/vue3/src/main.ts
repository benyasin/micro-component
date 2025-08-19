import 'virtual:uno.css'  // 添加UnoCSS样式
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '../index.less'

const app = createApp(App)

app.mount('#app')