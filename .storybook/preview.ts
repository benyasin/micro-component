import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { Spin } from 'ant-design-vue'
import { i18n } from '../runtime/i18n'
import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'
import '../runtime/index.less'
import '../playground/index.less'
// polyfill
import '../src/polyfill/event-target.js'
import '../src/polyfill/request-idle.js'

// 加载 micro-runtime
if (typeof window !== 'undefined') {
  const script = document.createElement('script')
  script.src = '/micro-runtime.js'
  script.async = true
  document.head.appendChild(script)
}

// 安装 vue-i18n 到 Storybook 的 Vue 应用实例
setup((app) => {
  app.use(i18n)
  app.use(Spin)
  // @ts-ignore
  app.config.globalProperties.$i18n = i18n
  if (typeof window !== 'undefined') {
    ;(window as any).MicroRuntime = {
      app,
      i18n
    }
  }
})

// 添加必要的样式基础类
if (typeof document !== 'undefined') {
  document.body.classList.add('global-theme', 'white')
  document.documentElement.classList.add('micro')
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview