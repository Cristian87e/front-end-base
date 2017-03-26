const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssNext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const postcssImport = require('postcss-import');
const fontMagician = require('postcss-font-magician');
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
    alias: {
      modules: 'src/modules',
      //   npm: 'node_modules',
      //   fonts: 'src/assets/fonts',
      //   img: 'src/assets/images',
      styles: 'src/assets/styles',
      components: 'src/components',
      containers: 'src/containers',
      //   routes: 'src/routes',
      //   state: 'src/state'
    },
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
                postcssImport({
                  addDependencyTo: webpack,
                }),
                fontMagician({
                  variants: {
                    'Roboto Condensed': {
                      300: [],
                      400: [],
                      700: [],
                    },
                  },
                  foundries: ['google'],
                }),
                cssNext({
                  browsers: ['last 2 versions', 'IE > 10'],
                }),
                postcssReporter({
                  clearMessages: true,
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
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader',
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
