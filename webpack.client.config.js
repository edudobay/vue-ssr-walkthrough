const baseConfig = require('./webpack.base.config.js')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: './entry-client.js',

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.runtime.js'
    }
  },

  plugins: [
    new VueSSRClientPlugin()
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'manifest',
          minChunks: Infinity
        }
      }
    }
  }
})
