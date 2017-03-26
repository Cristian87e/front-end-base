const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssNext = require('postcss-cssnext');
const { PATH_DIST, PATH_SRC } = require('./constants');

module.exports = {
  entry: {
    app: `${PATH_SRC}/app.jsx`,
  },
  output: {
    path: PATH_DIST,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // PostCss Loader
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                cssNext({
                  browsers: ['last 2 versions', 'IE > 10'],
                }),
              ]),
            },
          },
        ],
      },
      // Babel-Loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // Eslint-Loader
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  devServer: {
    contentBase: PATH_DIST,
    compress: true,
    port: 9000,
    stats: 'errors-only',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test Title Plugin',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: `${PATH_SRC}/tpl.index.html`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
  ],
};
