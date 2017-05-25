<template>
  <section>
    <p>{{ jsonParsed }}</p>
  </section>
</template>

<script>
  export default {
    props: [
      'json'
    ],
    data () {
      return {
      }
    },
    computed: {
      'jsonParsed': function () {
        return JSON.parse(this.json)
      }
    }
  }
</script>

<style>
</style>
