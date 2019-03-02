const { devMode } = require('./env')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  devtool: !devMode
    ? false
    : '#cheap-module-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: devMode ? '[name].bundle.js' : '[name].[chunkhash].js',
  },

  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ],
}
