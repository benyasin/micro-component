import path from 'path'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'
import postcssRtlcss from 'postcss-rtlcss'
import { copyTemplate, rm } from './utils.js'
import terser from '@rollup/plugin-terser'

async function buildComponents() {
  const templateFiles = await copyTemplate('vue', 'temp')

  // 构建 ESM 版本（保持向后兼容）
  await build({
    define: {
      'process.client': 'process.client'
    },
    build: {
      emptyOutDir: false,
      outDir: 'dist/components/vue/',
      cssCodeSplit: true,
      lib: {
        entry: templateFiles.map((item) => path.resolve(item)),
        fileName: (format, entryName) => entryName.replace('temp/', '') + '.js',
        formats: ['es']
      },
      rollupOptions: {
        external: ['vue'],
        plugins: [terser()],
        output: {
          assetFileNames: (chunkInfo) => {
            return '[name].[ext]'
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
        plugins: []
      }
    },
    plugins: [vue(), svg({ svgo: false })]
  })

  // 构建 UMD 版本（用于浏览器直接引入）
  await build({
    define: {
      'process.client': 'true',
      'process.browser': 'true'
    },
    build: {
      emptyOutDir: false,
      outDir: 'dist/components/vue/',
      cssCodeSplit: true,
      lib: {
        entry: path.resolve('temp/index.ts'),
        name: 'MicroComponentsVue',
        fileName: (format, entryName) => entryName.replace('temp/', '') + '.umd.js',
        formats: ['umd']
      },
      rollupOptions: {
        external: ['vue'],
        plugins: [terser()],
        output: {
          globals: {
            vue: 'Vue'
          },
          assetFileNames: (chunkInfo) => {
            return '[name].[ext]'
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
        plugins: []
      }
    },
    plugins: [vue(), svg({ svgo: false })]
  })

  await rm('temp')
}

buildComponents()
