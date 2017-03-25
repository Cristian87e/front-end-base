const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssNext = require('postcss-cssnext')
const { resolve } = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
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
      }
    ]
  },
  devServer: {
      contentBase: resolve(__dirname, 'dist'),
      compress: true,
      port: 9000,
      stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test Title Plugin',
      minify: {
        collapseWhitespace: true
      },
      template: './src/tpl.index.html'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ]
}
