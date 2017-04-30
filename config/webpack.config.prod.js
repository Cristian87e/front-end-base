const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { PATH_DIST, PATH_SRC, NODE_MODULES } = require('./constants');

module.exports = {
  entry: {
    index: `${PATH_SRC}/index.jsx`,
  },
  output: {
    path: PATH_DIST,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [NODE_MODULES, PATH_SRC],
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
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: /\.(svg|jpe?g|png)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
        },
      },
      // Babel-Loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
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
    new ExtractTextPlugin({
      filename: 'styles.css',
    }),
  ],
};
