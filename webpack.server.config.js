const baseConfig = require('./webpack.base.config.js')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  entry: './entry-server.js',

  target: 'node',

  devtool: 'source-map',

  output: {
    libraryTarget: 'commonjs2',
  },

  externals: nodeExternals({
    whitelist: [/\.css$/, /\.vue$/]
  }),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueSSRServerPlugin(),
  ],
})
