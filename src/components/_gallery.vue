<template>
  <section>
    <div :class="{ 'modal__gallery': isInModal }">
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="url, index in images" :key="index"
                      :is-gallery="true"
                      :is-in-modal="true"
                      :style="`background-image: url(${url})`">
        </swiper-slide>
        <div class="swiper-button-next swiper-button-blue" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-blue" slot="button-prev"></div>
      </swiper>

      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="url, index in thumbs" :key="index"
                      :style="`background-image: url(${url})`">
        </swiper-slide>
      </swiper>
    </div>

    <div class="modal__contact-form" v-if="isInModal">
      <v-contact-form :phone="phone" :name="name"></v-contact-form>
    </div>
  </section>
</template>

<script>
  import VContactForm from '~components/_contact_form'

  export default {
    components: {VContactForm},
    props: {
      images: {
        type: Array,
        default: []
      },
      thumbs: {
        type: Array,
        default: []
      },
      isInModal: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String
      },
      name: {
        type: String
      }
    },
    data () {
      return {
        swiperOptionTop: {
          notNextTick: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10
        },
        swiperOptionThumbs: {
          notNextTick: true,
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        }
      }
    },
    mounted () {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.params.control = swiperThumbs
      swiperThumbs.params.control = swiperTop
    }
  }
</script>

<style lang="scss" scoped>
  section {
    height: inherit;

    > div {
      height: inherit;
    }

    .swiper-slide {
      cursor: pointer;
    }
  }

  .modal {
    &__gallery {
      width: 64%;
      height: 100%;
      padding: 20px;
      display: inline-block;
    }

    &__contact-form {
      width: 35%;
      display: inline-flex;
      vertical-align: top;
      align-items: center;
      justify-content: center;
    }
  }

  .swiper__section {
    cursor: pointer;
  }

  .swiper-container {
    background-color: #fff;
  }

  .swiper-slide {
    img {
      cursor: pointer;
    }
    background-size: cover;
    background-position: center;
  }

  .gallery-top {
    height: 80% !important;
    width: 100%;
  }

  .gallery-thumbs {
    height: 20% !important;
    box-sizing: border-box;
    padding: 5px 0px;
  }

  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100% !important;
    opacity: 0.4;
  }

  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>
