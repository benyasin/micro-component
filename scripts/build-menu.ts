import path from 'path'
import menus from '../default-menus.js'
import fs from 'fs/promises'

// 要保留的key
const keepKeys = [
  'category',
  'children',
  'colLength',
  'daytimeIcon',
  'menuId',
  'nightIcon',
  'openLink',
  'title',
  'subTitle',
  'toggle',
  'hotTradeType',
  'showLocation',
  'picture'
]

function filterMenu(menu: any) {
  if (menu.children?.length) {
    menu.children.forEach((item) => filterMenu(item))
  }
  Object.keys(menu).forEach((key) => {
    if (!keepKeys.includes(key)) {
      delete menu[key]
    }
  })
}

function generateFile(menus) {
  const code = `
    /** 
     * 这是一个自动生成的文件，请不要手动修改他 
     * pnpm run build:menu
     **/
    import { readonly } from 'vue'
    export const defaultMenus = readonly(${JSON.stringify(menus, null, 2)})
  `
  const filepath = path.resolve('src/components/Header/config.ts')
  fs.writeFile(filepath, code)
}

function bootstrap() {
  menus.forEach((item) => filterMenu(item))
  generateFile(menus)
}

bootstrap()
