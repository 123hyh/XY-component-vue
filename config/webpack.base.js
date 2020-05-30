const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const yargs = require('yargs').argv;

function resolve(dir) {
  return path.resolve(__dirname, dir);
}
// eslint-loader
const eslintLoader = yargs.development  &&  {
  loader: 'eslint-loader',
  options:{
    fix: true
  }
}
module.exports = {
  entry: {
    // 工具函数
    utils: resolve('../src/utils/index.ts'),
    // vue 指令集合
    directive: resolve('../src/directive/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              transpileOnly: true,
            },
          },
          eslintLoader
        ].filter(Boolean),
      },
      { test: /.vue$/, use: 'vue-loader' },
      { test: /.js$/, use: [{ loader: 'babel-loader' },eslintLoader].filter(Boolean) },
      {
        test: /\.css$/i,
        use: [
         /*  yargs.production ? MiniCssExtractPlugin.loader :  */'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          /* yargs.production ? MiniCssExtractPlugin.loader : */ 'vue-style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          {
            loader: 'file-loader',
          }
        ]
      }
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.ts','.tsx', '.vue', '.ts'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
   /*  yargs.production &&
      new MiniCssExtractPlugin({
        filename: `[name].css`,
        chunkFilename: '[id].css',
      }), */
  ].filter(Boolean),
};
