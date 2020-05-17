const baseConfig = require('./webpack.base');
const meger = require('merge');
const webpack = require('webpack');
const path = require('path');

module.exports = meger(baseConfig, {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },
  mode: 'production',
});
