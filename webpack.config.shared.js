const { resolve } = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      // '~components': resolve(__dirname, 'src/components'),
      // '~vendor': resolve(__dirname, 'src/vendor'),
      // '~styles': resolve(__dirname, 'src/styles')
      'vue$': 'vue/dist/vue.common.js',
      '@': resolve('src'),
      '~': resolve('src'),
      '@assets': resolve('src/assets'),
      'assets': resolve(__dirname, 'src/assets'),
      'components': resolve('src/components'),
      '~components': resolve('src/components'),
      '@components': resolve('src/components'),
      'vendor': resolve('src/assets/vendor'),
      '@vendor': resolve('src/assets/vendor'),
      'styles': resolve('src/assets/scss'),
      '~styles': resolve('src/assets/scss'),
      '@styles': resolve('src/assets/scss'),
      'img': resolve('src/assets/img'),
      '@img': resolve('src/assets/img')
    }
  },

  env: {
    API_HOST: 'http://luxemburg.dev'
  }
}