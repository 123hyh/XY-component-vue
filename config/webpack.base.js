const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
module.exports = {
  entry: {
    utils: path.resolve(__dirname, '../src/utils/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
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
        ],
      },
      { test: /.vue$/, use: 'vue-loader' },
      { test: /.js$/, use: [{ loader: 'babel-loader' }] },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'vue-style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.ts', '.vue', '.ts'],
  },
  plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()],
};
