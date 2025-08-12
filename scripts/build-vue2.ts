import path from 'path'
import { build } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import postcssRtlcss from 'postcss-rtlcss'
import { copyTemplate, rm } from './utils.js'
import { terser } from '@rollup/plugin-terser'

async function buildComponents() {
  const templateFiles = await copyTemplate('vue2', 'temp')

  await build({
    define: {
      'process.client': 'process.client'
    },
    build: {
      emptyOutDir: false,
      outDir: 'dist/components/vue2/',
      cssCodeSplit: true,
      lib: {
        entry: templateFiles.map((item) => path.resolve(item)),
        fileName: (format, entryName) => entryName.replace('temp/', '') + '.cjs',
        formats: ['cjs']
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
      postcss: {
        plugins: []
      }
    },
    plugins: [createVuePlugin()]
  })

  await rm('temp')
}

buildComponents()
