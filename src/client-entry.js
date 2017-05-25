import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

if (window.__INITIAL_VUEX_STATE__) store.replaceState(window.__INITIAL_VUEX_STATE__)

import $ from 'jquery'
global.$ = $
global.jQuery = $

const app = new Vue(App)
router.onReady(() => app.$mount('#app'))
