const { resolve } = require('path')

const CONSTANTS = {
  NODE_ENV: process.env.NODE_ENV,
  PATH_DIST: resolve(__dirname, '../dist'),
  PATH_SRC: resolve(__dirname, '../src')
}

module.exports = CONSTANTS
