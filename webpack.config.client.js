'use strict'
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkgInfo = require('./package.json')
const url = require('url')
const sharedConf = require('./webpack.config.shared')

/**
 * Defined loaders
 */
const cssLoader = {
  loader: "css-loader",
  options: {
    importLoaders: 1,
    minimize: process.env.NODE_ENV === 'production'
  }
}

/**
 * Defined plugins
 */
const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  // disable: process.env.NODE_ENV === "development"
})

module.exports = (options = {}) => {
  const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'))

  return {
    entry: {
      vendor: './src/vendor',
      client: './src/client-entry'
    },

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
      publicPath: config.publicPath
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
            },
            'eslint-loader'
          ]
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },

        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                root: resolve(__dirname, 'src'),
                attrs: ['img:src', 'link:href']
              }
            }
          ]
        },

        {
          test: /\.css$/,
          loader: extractSass.extract({
            use: [
              cssLoader,
            ],
            // use style-loader in development
            fallback: "style-loader"
          })
        },
        {
          test: /\.scss$/,
          loader: extractSass.extract({
            use: [
              cssLoader,
              // {loader: 'postcss-loader'},
              {loader: "resolve-url-loader"},
              {loader: "sass-loader"}
            ],
            // use style-loader in development
            fallback: "style-loader"
          })
        },

        {
          test: /favicon\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]'
              }
            }
          ]
        },

        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
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

    resolveLoader: {
      alias: {
        // necessary to to make lang="scss" work in test when using vue-loader's ?inject option 
        // see discussion at https://github.com/vuejs/vue-loader/issues/724
        'scss-loader': 'sass-loader'
      }
    },

    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery'
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),

      new WriteFilePlugin(),

      new ExtractTextPlugin({
        filename: '[name].css?[contenthash]',
        allChunks: true,
        disable: options.dev
      }),

      // new webpack.DefinePlugin(Object.assign({
      new webpack.DefinePlugin({
        DEBUG: Boolean(options.dev),
        TARGET: '"web"',
        VERSION: JSON.stringify(pkgInfo.version),
        CONFIG: JSON.stringify(config.runtimeConfig),
      }),
      // }, ))
      new webpack.EnvironmentPlugin(sharedConf.env)
    ],

    // resolve: {
    //   alias: sharedConf.resolve.alias
    // },
    resolve: sharedConf.resolve,

    devServer: config.devServer ? {
      host: '0.0.0.0',
      port: config.devServer.port,
      proxy: config.devServer.proxy,
      historyApiFallback: {
        index: url.parse(config.publicPath).pathname,
        disableDotRule: true
      }
    } : undefined,

    performance: {
      hints: options.dev ? false : 'warning'
    }
  }
}
