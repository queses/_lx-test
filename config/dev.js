module.exports = {
  runtimeConfig: {
    settingFoo: true,
    settingBar: false
  },

  ssrPort: 3000,

  publicPath: '/tmp/',
  serveStaticMountPath: '/tmp',

  devServer: {
    port: 3100,
    proxy: {
      '/api/auth/': {
        target: 'http://api.example.dev',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },

      '/api/pay/': {
        target: 'http://pay.example.dev',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
