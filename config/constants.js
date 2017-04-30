const { resolve } = require('path');

const BASE_PATH = process.env.PWD;

const CONSTANTS = {
  NODE_ENV: process.env.NODE_ENV,
  NODE_MODULES: resolve(BASE_PATH, 'node_modules'),
  PATH_DIST: resolve(BASE_PATH, 'dist'),
  PATH_SRC: resolve(BASE_PATH, 'src'),
};

module.exports = CONSTANTS;
