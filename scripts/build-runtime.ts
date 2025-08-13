import { readFile, appendFile, access } from 'fs/promises'
import * as path from 'path'
import { build } from 'vite'
import { glob } from 'glob'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import svg from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import prefixer from 'postcss-prefix-selector'
import postcssRtlcss from 'postcss-rtlcss'
import replacePostcss from './postcss-replace.js'
import { visualizer } from 'rollup-plugin-visualizer'
import { rm } from './utils.js'
import terser from '@rollup/plugin-terser'
// import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

async function loadManifest() {
  const candidates = ['dist/manifest.json', 'dist/.vite/manifest.json']
  for (const p of candidates) {
    try {
      const buf = await readFile(p)
      return JSON.parse(buf.toString())
    } catch (e) {
      // try next
    }
  }
  throw new Error('manifest.json not found in dist')
}

async function buildEntry() {
  const manifest = await loadManifest()

  const styleCode = `
    const link = document.createElement("link");
    link.id = 'MicroCSS'
    link.setAttribute('rel', 'stylesheet')
    link.href = \`/micro-runtime/${manifest['style.css'].file}\`
    link.onload = function () {
      window.dispatchEvent(new Event('MicroRuntime:cssReady'))
    }
    document.head.appendChild(link);
  `
  const scriptCode = `
    import('/micro-runtime/${manifest['index.ts'].file}')
  `

  const code = `
    ;(function(){
      ${scriptCode}
      ${styleCode}
    })();
  `

  const entry = path.resolve(`dist/micro-runtime.js`)
  await appendFile(entry, code, 'utf-8')
}

async function getSplitChunks() {
  const makeRegexp = (...names) => [new RegExp(`\/node_modules\/(${names.join('|')})`)]

  const chunks = {
    // 将vite的辅助函数打包到一起，避免循环依赖
    vite: [/plugin-vue:export-helper/, /vite/, /___commonjsHelpers__/],
    vue: ['vue', 'vue-i18n'],
    axios: makeRegexp('axios'),
    'ant-design-vue': makeRegexp('ant-design-vue'),
    lodash: makeRegexp('lodash-es'),
    qrcode: makeRegexp('qrcode'),
    swiper: makeRegexp('swiper'),
    bitkeep: [/\/src\/utils\/bitkeep.js/],
    polyfill: [/\/src\/polyfill/],
    vendor: [/\/node_modules\//],
    common: [/\/src\/(common|services|types|utils|compositions)/, /\/src\/public\/images/]
  }

  // 每个组件生成一份chunk
  const components = await glob('src/components/*/')
  components
    .map((path) => path.replace('src/components/', ''))
    .forEach((component) => {
      chunks[component] = [new RegExp(`src\/components\/${component}`)]
    })

  return chunks
}

async function buildRuntime() {
  rm('dist')

  await build({
    root: 'runtime',
    base: '/micro-runtime/',
    publicDir: path.resolve('./src/public'),
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },
    define: {
      'process.env.NODE_ENV': "'production'",
      'process.client': 'true',
      'process.locale': 'false'
    },
    build: {
      emptyOutDir: true,
      outDir: '../dist',
      cssCodeSplit: false,
      manifest: true,
      assetsInlineLimit: 0,
      rollupOptions: {
        input: 'runtime/index.ts',
        plugins: [terser()],
        output: {
          assetFileNames: (chunkInfo) => {
            return 'assets/[name].[hash].[ext]'
          }
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
              if (
                !filePath.includes('js-unocss-hash') &&
                !filePath.includes('assets/style') &&
                !filePath.includes('swiper')
              )
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
          postcssRtlcss({
            // @ts-ignore
            selectorBlackList: ['.bit-tabs__active-bar', '.mi-tabs__active-bar']
          }),
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
    plugins: [
      vue(),
      svg({ svgo: false }),
      UnoCss(),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false })]
      }),
      visualizer({ gzipSize: true }),
      // chunkSplitPlugin({
      //   customSplitting: await getSplitChunks()
      // })
    ].filter(Boolean)
  })

  await buildEntry()
}

buildRuntime()
