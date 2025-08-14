import path from 'path'
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import postcssRtlcss from 'postcss-rtlcss'
import { copyTemplate, rm } from './utils.js'
import terser from '@rollup/plugin-terser'

async function buildComponents() {
  const templateFiles = await copyTemplate('react', 'temp')

  // 构建 ESM 版本（保持向后兼容）
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

  // 构建 UMD 版本（用于浏览器直接引入）
  await build({
    define: {
      'process.client': 'true',
      'process.browser': 'true'
    },
    build: {
      emptyOutDir: false,
      outDir: 'dist/components/react',
      cssCodeSplit: true,
      assetsDir: './',
      lib: {
        entry: path.resolve('temp/index.ts'),
        name: 'MicroComponentsReact',
        fileName: (format, entryName) => entryName.replace('temp/', '') + '.umd.js',
        formats: ['umd']
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        plugins: [terser()],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
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
