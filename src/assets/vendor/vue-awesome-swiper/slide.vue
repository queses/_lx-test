<template>
  <div :class="slideClass" @click="openInModal">
    <slot></slot>
  </div>
</template>

<script>
  /* eslint-disable */
  
  export default {
    name: 'swiper-slide',
    props: {
      isGallery: {
        type: Boolean,
        default: false
      },
      isInModal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        slideClass: 'swiper-slide'
      }
    },
    ready() {
      this.update()
    },
    mounted() {
      this.update()
      if (this.$parent.options.slideClass) {
        this.slideClass = this.$parent.options.slideClass
      }
    },
    updated(){
      this.update()
    },
    attached(){
      this.update()
    },
    methods: {
      update() {
        if (this.$parent && this.$parent.swiper && this.$parent.swiper.update) {
          this.$parent.swiper.update(true)
          if (this.$parent.options.loop) {
            this.$parent.swiper.reLoop()
          }
        }
      },
      openInModal() {
        if (this.isGallery && this.isInModal) {
          this.$events.$emit('open-g-modal')
        }
      }
    }
  }
</script>
