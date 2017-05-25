<!--<lazy-component @show="handler">-->
  <!--<h1>ЗОГРУЖАЮСЬ))</h1>-->
  <!--&lt;!&ndash;<img class="mini-cover" :src="img.src" width="100%" height="400">&ndash;&gt;-->
<!--</lazy-component>-->
<template>
  <h1>ЗОГРУЖАЮСЬ</h1>
</template>

<script>
  export default {
    name: 'lazy-component',

    data() {
      return {
        loading: true,
        color: '#393939'
      }
    },

    methods: {
      handler(component) {
        console.log('this component is showing')
      }
    }
  }
</script>

<style>
</style>
