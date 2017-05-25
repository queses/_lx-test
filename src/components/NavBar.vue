<template>
<nav id="site-nav" role="navigation" class="navbar-inverse navbar-fixed-top navbar">
  <div class="container">
    <div class="navbar-header">
      <button type="button" data-toggle="collapse" data-target="#site-nav-collapse" class="navbar-toggle collapsed" aria-expanded="false">
        <span class="sr-only">Показать меню</span>
      </button>
      <router-link class="navbar-brand" to="/">
        <img src="~@assets/img/logos/logo-dark.png" class="pull-left">
      </router-link>
    </div>
    <div id="site-nav-collapse" class="collapse navbar-collapse" aria-expanded="false" style="height: 1px;">
      <ul id="site-menu" class="navbar-nav nav">
        <router-link tag="li" v-for="(title, link) in links" :key="link" :to="link" :exact="link === '/'">
          <a>{{ title }}</a>
        </router-link>
      </ul>
    </div>
  </div>
</nav>
</template>

<script type="text/javascript">

export default {
  name: 'nav-bar',
  data () {
    return {
      links: {
        '/': 'ГЛАВНАЯ',
        '/object/flat': 'КВАРТИРЫ',
        '/agent': 'СПЕЦИАЛИСТЫ',
        '/about': 'О КОМПАНИИ'
      }
    }
  }
}

</script>

<style lang="scss">
@import '~assets/scss/variables';

.navbar-nav {
  li {
    transition: font-size 0.1s ease 0s;
    transition: background-color 0.3s ease 0s;
  }
  li:hover {
    font-size: 16px;
    background-color: darken($lux-blue, 5%);
  }
}
</style>
