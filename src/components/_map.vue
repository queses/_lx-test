<template>
  <div>
    <div class="tgismap__title" v-if="isInModal">
      <strong>{{ title }}</strong>
    </div>
    <div id="2GisMap" :style="styles"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      center: {
        type: Array,
        default: []
      },
      marker: {
        type: Array,
        default: []
      },
      zoom: {
        type: Number,
        default: 13
      },
      styles: {
        type: Object,
        default: () => {
          return {width: '400px', height: '400px'}
        }
      },
      isInModal: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      init () {
        let map
        global.gMap.then(() => {
          map = global.DG.map('2GisMap', {
            'center': this.center,
            'zoom': this.zoom
          })
          global.DG.marker(this.marker).addTo(map)
        })
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss">
  .tgismap {

    &__title {
      padding: 20px;
      font-size: 16px;
    }
  }
</style>
