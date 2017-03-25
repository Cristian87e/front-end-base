const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const cssNext = require('postcss-cssnext')
const { resolve } = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const cssDev = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: function () {
        return [
          cssNext({
            browsers: ['last 2 versions', 'IE > 10'],
          })
        ]
      }
    }
  }
]
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [
            cssNext({
              browsers: ['last 2 versions', 'IE > 10'],
            })
          ]
        }
      }
    }
  ]
})
const cssConfig = isProduction ? cssProd : cssDev

module.exports = {
  entry: {
    app: './src/app.js',
    faq: './src/faq.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      // PostCss Loader
      {
        test: /\.css$/,
        use: cssConfig
      },
      // Babel-Loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
      contentBase: resolve(__dirname, 'dist'),
      compress: true,
      port: 9000,
      stats: 'errors-only',
      hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test Title Plugin',
      minify: {
        collapseWhitespace: true
      },
      excludeChunks: ['faq'],
      hash: true,
      template: './src/tpl.index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'FAQ Page',
      minify: {
        collapseWhitespace: true
      },
      chunks: ['faq'],
      hash: true,
      filename: 'faq.html',
      template: './src/tpl.faq.html'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
  ]
}
