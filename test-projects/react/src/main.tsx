import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

let root: any = null

function render(props: any = {}) {
  const { container } = props
  const rootElement = container ? container.querySelector('#root') : document.getElementById('root')
  
  if (rootElement) {
    root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render()
}

// qiankun 生命周期函数
export async function bootstrap() {
  console.log('[react] react app bootstraped')
}

export async function mount(props: any) {
  console.log('[react] props from main framework', props)
  render(props)
}

export async function unmount() {
  if (root) {
    root.unmount()
    root = null
  }
}