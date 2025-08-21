import 'virtual:uno.css'  // 添加UnoCSS样式
import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../index.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)