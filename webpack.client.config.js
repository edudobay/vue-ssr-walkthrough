const baseConfig = require('./webpack.base.config.js')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: {
    app: './entry-client.js',
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.runtime.js'
    }
  },

  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin(),
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
