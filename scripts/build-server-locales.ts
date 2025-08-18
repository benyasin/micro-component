import path from 'path'
import fs from 'fs/promises'
import { glob } from 'glob'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createI18n } from 'vue-i18n/dist/vue-i18n.runtime.mjs'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'
import UnoCss from 'unocss/vite'
// import BitDesign from 'unplugin-bit-design-vue3/vite'
import prefixer from 'postcss-prefix-selector'
// import rtlPostcss from '@bit/postcss-dir'
import replacePostcss from './postcss-replace'
import messages from '../locales/index'
import { defaultLanguageList } from '../src/utils/config'
import { setCurrentLocale, getLanguageKey } from '../src/utils/locale'
import { excludeCompoents, rm } from './utils'
import terser from '@rollup/plugin-terser'

const i18nMessages = {}
defaultLanguageList.forEach((item) => {
  const languageKey = getLanguageKey(item)
  i18nMessages[item.locale] = messages[languageKey]
})

async function getApp(componentPath: string, locale: string) {
  const component = (await import(componentPath)).default
  const i18n = createI18n({
    locale,
    fallbackLocale: 'en',
    legacy: false,
    messages: i18nMessages,
    silentFallbackWarn: true,
    silentTranslationWarn: true,
    globalInjection: true
  })
  const app = createSSRApp(component, { locale })
  app.use(i18n)
  setCurrentLocale(locale)
  return { app, i18n }
}

async function buildComponent(name: string) {
  const entry = await createEntryFile(name)
  // const entry = `./src/components/${name}/${name}.vue`
  const outDir = `dist/server-app/${name}`

  // Shim Vue and vue-i18n compile-time constants for Node SSR execution context
  ;(globalThis as any).__VUE_OPTIONS_API__ = true
  ;(globalThis as any).__VUE_PROD_DEVTOOLS__ = false
  ;(globalThis as any).__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false
  ;(globalThis as any).__VUE_I18N_LEGACY_API__ = false
  ;(globalThis as any).__VUE_I18N_FULL_INSTALL__ = true
  await build({
    base: '/micro-runtime/',
    publicDir: path.resolve('./src/public'),
    ssr: {
      noExternal: ['vue-i18n']
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.mjs'
      }
    },
    define: {
      'process.client': false,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    build: {
      ssr: true,
      outDir,
      assetsInlineLimit: 0,
      lib: {
        entry,
        formats: ['es']
      },
      rollupOptions: {
        input: entry,
        external: ['vue', 'vue3-text-clamp'],
        plugins: [terser()],
        output: {
          // assetFileNames: (chunkInfo) => {
          //   console.log('chunkInfo', chunkInfo.name)
          //   return chunkInfo.name
          //   // return 'assets/[name].[ext]'
          // }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/element.scss" as *;`
        }
      },
      postcss: {
        plugins: [
          prefixer({
            prefix: '.micro',
            transform(prefix, selector, prefixedSelector, filePath, rule) {
              if (!filePath.includes('js-unocss-hash.css') && !filePath.includes('/style.css'))
                return selector
              if (selector.includes('data-v-')) return selector
              if (selector.includes('mi-')) return selector
              if (selector.startsWith('.micro-light') || selector.startsWith('.micro-dark'))
                return selector
              if (selector.match(/^(html|body)/)) {
                return selector.replace(/^([^\s]*)/, `$1 ${prefix}`)
              }

              return prefixedSelector
            }
          }),
          // rtlPostcss({
          //   selectorBlackList: ['.bit-tabs__active-bar', '.mi-tabs__active-bar']
          // }),
          replacePostcss({
            rule: {
              '$1mi-': /(\.|=)bit-/g
            },
            decl: {
              '--mi-': /--bit-/g
            }
          })
        ]
      }
    },
    plugins: [vue(), svg({ svgo: false }), UnoCss(path.resolve('./unocss.config.ts'))]
  })

  // 生成组件各语言HTML
  for await (const localeInfo of defaultLanguageList) {
    const { app } = await getApp(`../${outDir}/${name}.js`, localeInfo.locale)
    const html = (await renderToString(app)).replace(/`/g, '\\`')
    const out = `dist/server-locales/${name}`
    const moduleOut = `dist/server-locale-modules/${name}`
    await fs.mkdir(out, { recursive: true })
    await fs.mkdir(moduleOut, { recursive: true })
    await fs.writeFile(`${out}/${localeInfo.locale}.js`, html, 'utf8')
    await fs.writeFile(`${moduleOut}/${localeInfo.locale}.js`, `export default \`${html}\``, 'utf8')
    await fs.writeFile(
      `${moduleOut}/${localeInfo.locale}.cjs`,
      `module.exports = \`${html}\``,
      'utf8'
    )
  }
}

async function createEntryFile(name: string) {
  const filename = `temp/${name}.ts`
  await fs.writeFile(
    filename,
    `
    import 'virtual:uno.css'
    import Component from '../src/components/${name}/${name}.vue'
    export default Component
  `
  )
  return filename
}

async function run() {
  await rm('temp')
  await fs.mkdir('temp')
  for (const path of await glob('src/components/*/')) {
    const name = path.replace('src/components/', '')
    if (!excludeCompoents.includes(name)) {
      await buildComponent(name)
    }
  }
  await rm('temp')
}

run()
