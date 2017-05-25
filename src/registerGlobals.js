// Register global mixins, components, etc only once

import Vue from 'vue'
import ssrMixin from './shared/ssrMixin'

if (!Vue.globalsRegistered) {
  Vue.globalsRegistered = true
  Vue.mixin(ssrMixin)
}

// import KeenUI from 'keen-ui'
// Vue.use(KeenUI)

import axios from 'axios'
let options = {}
options.baseURL = process.env.API_HOST
global.axios = axios.create(options)

import lodash from 'lodash'
global._ = lodash

if (TARGET === 'web') {
  const jQuery = require('jquery')
  global.jQuery = jQuery
  global.$ = jQuery
}

global.Vue = Vue
