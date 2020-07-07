/*
 * @Author: huangyuhui
 * @since: 2020-05-18 08:52:42
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 14:25:09
 * @message: 
 * @FilePath: \XY-component-vue\config\webpack.production.js
 */
const baseConfig = require('./webpack.base');
const meger = require('webpack-merge');
const path = require('path');
const fs = require('fs')
const argv = require('yargs').argv
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

// 打包更新版本号
const [VersionIndex] = [
  argv.Patch && 2,
  argv.Minor && 1,
  argv.Major && 0
].filter(item => item !== undefined)

const prodConf = meger(baseConfig, {
  entry: {
    index: path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    library: "cyjh_soft",
    libraryTarget: "var",
  },
  mode: 'production',
  // 生成esModule 文件
  plugins: [
    new EsmWebpackPlugin(),
    function () {
      // 修改package.json中的版本号
      this.plugin('done', function () {
        const pkgPath = path.join(process.cwd(), './package.json')
        let pkg = fs.readFileSync(pkgPath)
        pkg = JSON.parse(pkg)
        let { version } = pkg || '1.0.0'
        version = version.split('.')
        version[VersionIndex] = Number(version[VersionIndex]) + 1
        pkg.version = version.join('.')
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
      });
    },]
});
module.exports = prodConf;
