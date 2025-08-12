import path from 'path'
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import postcssRtlcss from 'postcss-rtlcss'
import { copyTemplate, rm } from './utils.js'
import { terser } from '@rollup/plugin-terser'

async function buildComponents() {
  const templateFiles = await copyTemplate('react', 'temp')

  await build({
    define: {
      'process.client': 'process.browser'
    },
    build: {
      emptyOutDir: false,
      outDir: 'dist/components/react',
      cssCodeSplit: true,
      assetsDir: './',
      lib: {
        entry: templateFiles.map((item) => path.resolve(item)),
        fileName: (format, entryName) => entryName.replace('temp/', '') + '.js',
        formats: ['es']
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
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
    plugins: [react()]
  })

  await rm('temp')
}

buildComponents()
