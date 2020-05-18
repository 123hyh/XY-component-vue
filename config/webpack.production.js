const baseConfig = require('./webpack.base');
const meger = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const prodConf = meger(baseConfig, {
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
      library:"cyjh_soft",
      libraryTarget:"var",
  },
  mode: 'production',
  // 生成esModule 文件
  plugins:[new EsmWebpackPlugin()]
});
module.exports = prodConf;
