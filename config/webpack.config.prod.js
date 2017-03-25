const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssNext = require('postcss-cssnext')
const { PATH_DIST, PATH_SRC } = require('./constants')

module.exports = {
  entry: {
    app: `${PATH_SRC}/app.js`,
    faq: `${PATH_SRC}/faq.js`
  },
  output: {
    path: PATH_DIST,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      // PostCss Loader
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
      },
      // Babel-Loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test Title Plugin',
      minify: {
        collapseWhitespace: true
      },
      excludeChunks: ['faq'],
      hash: true,
      template: `${PATH_SRC}/tpl.index.html`
    }),
    new HtmlWebpackPlugin({
      title: 'FAQ Page',
      minify: {
        collapseWhitespace: true
      },
      chunks: ['faq'],
      hash: true,
      filename: 'faq.html',
      template: `${PATH_SRC}/tpl.faq.html`
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ]
}
