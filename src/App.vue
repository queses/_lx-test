<template>
  <div id="app">
    <v-nav-bar/>
    <div class="main-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import './registerGlobals'
import Vue from 'vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'

import VNavBar from '~components/NavBar.vue'

Vue.use(Meta)

export default {
  router,
  store,
  metaInfo: {
    title: 'Default Title',
    titleTemplate: '%s - Company Name'
  },
  components: {
    'v-nav-bar': VNavBar
  }
}
</script>

<style src="~styles/vendor.scss" lang="scss"/>
<style src="~styles/style.scss" lang="scss"/>
