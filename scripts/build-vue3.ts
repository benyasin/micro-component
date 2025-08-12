import path from 'path'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'
import postcssRtlcss from 'postcss-rtlcss'
import { copyTemplate, rm } from './utils.js'
import { terser } from '@rollup/plugin-terser'

async function buildComponents() {
  const templateFiles = await copyTemplate('vue', 'temp')

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

  await rm('temp')
}

buildComponents()
