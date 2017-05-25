<template>
  <div class="row">
    <article class="flat col-md-12 hvr-fade">
      <div class="flat-gallery col-md-5">

        <v-actions
          :coords="flat.coords"
          :map-title="flat.streetTitle"
          :image-count="flat.photoCount"
          :flat-id="flat.id"
        >
        </v-actions>

        <swiper :options="swiperOptions">
          <swiper-slide v-for="url in flat.thumbUrls" :key="url">
            <img style="width: 100%" :data-src="url" class="swiper-lazy">
            <div class="flat-index__thumb-preloader swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

      <nuxt-link :to="`/object/flat/view?id=${flat.id}`" class="flats">

        <div class="flat-details col-md-7">
          <div class="flat-details-col col-md-12">
            <span class="flat-street">
              {{ 'ул. ' + flat.streetTitle + ' д. ' + flat.buildingNum }}
            </span>
            <span class="flat-price">
              <i class="fa fa-rub" aria-hidden="true"></i> {{ flat.price }}
            </span>
          </div>

          <div class="flat-details-col col-md-6">
            <p class="flat-roomAm">
              <strong>Комнат</strong>: {{ flat.roomAm }}
            </p>
            <p class="flat-stage">
              <strong>Этаж</strong>: {{ flat.stage + ' из ' + flat.buildingStg }}
            </p>
            <p class="flat-agent">
              <strong>Агент</strong>: {{ flat.agentName }}
            </p>
          </div>

          <div class="flat-details-col col-md-6">
            <p class="flat-roomAm"><strong>Площадь</strong>:
              {{ flat.roomAm }} 0 м²
            </p>
            <p class="flat-agent">
              <strong>Дата публикации</strong>: 26.03.2017
            </p>
          </div>

          <div class="flat-description col-md-12">
            {{ flat.shortDescr }}
          </div>

          <div class="flat-buttons col-md-12">
            <button type="button" name="button" class="btn btn-primary"
                    @click.prevent="openFModal({ name: flat.agentName, phone: flat.agentPhone })">
              Показать номер
            </button>
          </div>
        </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
  import VActions from '~components/object/flat/_actions'

  export default {
    components: {VActions},
    props: {
      flat: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        swiperOptions: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 30,
          effect: 'fade',
          // Disable preloading of all images
          preloadImages: false,
          // Enable lazy loading
          lazyLoading: true
        }
      }
    },
    methods: {
      openFModal (agent) {
        this.$events.$emit('open-f-modal', agent)
      }
    },
    mounted () {
      // console.log(this.flat)
    }
  }
</script>
