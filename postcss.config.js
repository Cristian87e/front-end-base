module.exports = {
  plugins: {
    'postcss-import': {
      path: ['src/assets/styles'],
    },
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};
