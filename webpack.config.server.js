'use strict'
const { resolve } = require('path')
const webpack = require('webpack')
const pkgInfo = require('./package.json')
const sharedConf = require('./webpack.config.shared')

module.exports = (options = {}) => {
  const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'))

  return {
    entry: {
      server: './src/server-entry'
    },

    target: 'node',

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
      publicPath: config.publicPath,
      libraryTarget: 'commonjs2'
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                postcss: [require('autoprefixer')()],
                'css': 'vue-style-loader!css-loader',               
                'scss': 'vue-style-loader!css-loader!sass-loader',
                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
              }
            }
          ]
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },

        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },

    plugins: [
      // new webpack.DefinePlugin(Object.assign({
      new webpack.DefinePlugin({
        DEBUG: Boolean(options.dev),
        TARGET: '"node"',
        VERSION: JSON.stringify(pkgInfo.version),
        CONFIG: JSON.stringify(config.runtimeConfig),
      }),
      // }, sharedConf.env))
      new webpack.EnvironmentPlugin(sharedConf.env)
    ],

    resolveLoader: {
      alias: {
        // necessary to to make lang="scss" work in test when using vue-loader's ?inject option 
        // see discussion at https://github.com/vuejs/vue-loader/issues/724
        'scss-loader': 'sass-loader'
      }
    },

    resolve: sharedConf.resolve,

    externals: /^[a-z0-9].*$/,
    performance: { hints: false }
  }
}
