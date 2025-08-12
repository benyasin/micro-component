/** 用来将多语言里的某一个key扁平化，以便翻译团队一次性添加所有文案 */

import fs from 'fs/promises'
import { glob } from 'glob'

function flat(obj, prefix) {
  const data = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      Object.assign(data, flat(value, `${prefix}.${key}`))
    } else {
      data[`${prefix}.${key}`] = value
    }
  }
  return data
}

async function bootstrap(key) {
  try {
    await fs.mkdir('./locales/flat-locales')
  } catch {}

  const enKeys = (await import(`../locales/js/en_US.js`)).default
  const enFlatKeys = flat(enKeys[key], key)

  for (const path of await glob('./locales/js/*.js')) {
    const locale = path.replace('locales/js/', '').replace('.js', '')
    const localeKeys = (await import(`../locales/js/${locale}.js`)).default

    if (locale === 'bg') continue
    if (!localeKeys[key]) {
      console.log(`在 ${locale} 里找不到 ${key}`)
      continue
    }

    const flatKeys = flat(localeKeys[key], key)

    // 补全EN有但其他语言没有的key
    if (locale !== 'en_US') {
      Object.keys(enFlatKeys).forEach((key) => {
        if (!flatKeys[key]) {
          flatKeys[key] = enFlatKeys[key]
        }
      })
    }

    await fs.writeFile(`./locales/flat-locales/${locale}.json`, JSON.stringify(flatKeys, null, 2))
  }
}

bootstrap('common_header')
