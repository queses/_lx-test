module.exports = {
  runtimeConfig: {
    settingFoo: true,
    settingBar: false
  },

  ssrPort: 3000,

  publicPath: '/assets/',
  serveStaticMountPath: '/assets'

  /*
  Serve assets using CDN and Nginx:

  publicPath: 'http://cdn.example.com/assets/',
  serveStaticMountPath: undefined
  */
}
