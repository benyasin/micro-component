import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import Antd from 'ant-design-vue'
import { i18n } from '../runtime/i18n'
import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'
import '../runtime/index.less'
import '../playground/index.less'
// polyfill
import '../src/polyfill/event-target.js'
import '../src/polyfill/request-idle.js'

// 新增：为所有故事提供 ConfigProvider 包裹与 store 根作用域
import ConfigProvider from '../src/common/ConfigProvider/ConfigProvider.vue'
import { createStore } from '../src/utils/store'


// 安装 vue-i18n 到 Storybook 的 Vue 应用实例
setup((app) => {
  app.use(i18n)
  app.use(Antd)
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

// 全局装饰器：确保每个 Story 的根组件都会先调用 createStore()
export const decorators = [
  (story) => ({
    components: { Story: story(), ConfigProvider },
    setup() {
      // 为当前 Story 根组件创建 store 作用域
      createStore()
      return {}
    },
    template: '<ConfigProvider><Story /></ConfigProvider>'
  })
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      components: {
        // 将 MDX 中的 p 标签映射为 div，避免嵌套 p 标签的 HTML 验证警告
        p: 'div'
      }
    },
  },
}

export default preview