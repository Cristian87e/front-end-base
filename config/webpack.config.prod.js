const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssNext = require('postcss-cssnext');
const { PATH_DIST, PATH_SRC } = require('./constants');

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
              options: {
                plugins: () => ([
                  cssNext({
                    browsers: ['last 2 versions', 'IE > 10'],
                  }),
                ]),
              },
            },
          ],
        }),
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
