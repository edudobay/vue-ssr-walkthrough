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
        // extract vendor chunks for better caching
        vendors: {
          name: 'vendor',
          test(module, chunks) {
            // a module is extracted into the vendor chunk if...
            return (
              // it's inside node_modules
              /node_modules/.test(module.context) &&
              // and not a CSS file (due to extract-text-webpack-plugin limitation)
              !/\.css$/.test(module.request)
            )
          },
          chunks: 'initial',
          priority: -10,
        },
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        commons: {
          name: 'manifest',
          minChunks: Infinity,
          priority: -20,
        }
      }
    }
  }
})
