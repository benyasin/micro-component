import { prefetchData } from '../runtime/runtime'
import { i18n } from './i18n'
import { createRouter, createWebHashHistory } from 'vue-router'

const pages = import.meta.glob<{ default: any }>(`./pages/*.vue`, {
  eager: true
})

export const routes = Object.keys(pages).map((filepath) => {
  const name = filepath.replace('./pages/', '').replace('.vue', '')
  return {
    name: name,
    path: `/${name}`,
    component: async () => (await pages[filepath]).default
  }
})

export const router = createRouter({ history: createWebHashHistory(), routes })

// 模拟runtime预渲染
router.beforeEach(async (to) => {
  try {
    await prefetchData(to.name as string)
  } catch(e) {
    console.error(e)
  }
})
