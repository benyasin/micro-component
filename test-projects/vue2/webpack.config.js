const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const fs = require('fs')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.cjs'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 优先精确映射 vue2 产物目录
      'micro-components/vue2': path.resolve(__dirname, '../../dist/components/vue2'),
      // 退回到包根以使用 package.json exports
      'micro-components': path.resolve(__dirname, '../..')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.client': 'true',
      'process.browser': 'true'
    })
  ],
  devServer: {
    port: 5172,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    onBeforeSetupMiddleware(devServer) {
      // 统一处理 /micro-runtime/* 静态资源
      devServer.app.use((req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/micro-runtime/')) return next()

        const filename = url.replace('/micro-runtime/', '')
        const filePath = path.resolve(__dirname, '../../dist', filename)

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.status(404).send(`${filename} not found`)
            return
          }
          const ext = filename.split('.').pop()?.toLowerCase()
          const contentTypes = {
            js: 'application/javascript',
            css: 'text/css',
            json: 'application/json',
            svg: 'image/svg+xml',
            map: 'application/json'
          }
          res.setHeader('Content-Type', contentTypes[ext || 'js'] || 'text/plain')
          res.send(data)
        })
      })
    }
  }
}