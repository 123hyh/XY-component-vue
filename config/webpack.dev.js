const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const entryPublicPath = path.join(__dirname, '../example');

const conf = merge(baseConfig, {
  output: {
    path: path.join(__dirname, '../example/__build__'),
    publicPath: '/__build__/',
  },
  entry: fs.readdirSync(entryPublicPath).reduce((entries, dir) => {
    const fullPath = path.join(entryPublicPath, dir);

    const entryPath = path.join(fullPath, 'app.js');
    // 如果是文件夹
    const isDir = fs.statSync(fullPath).isDirectory();
    // 如果存在路径
    const isExists = fs.existsSync(entryPath);
    if (isDir && isExists) {
      entries[dir] = ['webpack-hot-middleware/client', entryPath];
    }
    return entries;
  }, {}),
  resolve: {
    alias: {
      'vue-component': path.resolve(__dirname, '../src/index.js'),
    },
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
debugger;
module.exports = conf;
