const baseConfig = require('./webpack.base');
const meger = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const prodConf = meger(baseConfig, {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },
  mode: 'production',
});
module.exports = prodConf;
