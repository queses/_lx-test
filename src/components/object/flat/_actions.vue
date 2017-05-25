<template>
  <div class="flat-actions">
    <span class="flat-open-gallery" href="#">{{ imageCount }} фото</span>
    <div class="flat-btn-group">
      <button type="button" name="button" @click="$events.$emit('open-m-modal', { coords, mapTitle })"
              data-balloon="Показать объект на карте" data-balloon-pos="up">
        <!-- <span class="glyphicon glyphicon-map-marker"></span> -->
        <i class="fa fa-map-o" aria-hidden="true"></i>
        <span class="sr-only">Карта</span>
      </button>
      <button type="button" name="button" @click="favour"
              data-balloon="Добавить объект в избранные" data-balloon-pos="up">
        <!-- <span class="glyphicon glyphicon-heart" :class="{ 'is-favorited': isFavorited }"></span> -->
        <i class="fa fa-heart-o" aria-hidden="true" :class="{ 'is-favorited': isFavorited }"></i>
        <span class="sr-only">Добавить</span>
      </button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {includes} from 'lodash'

  export default {
    data () {
      return {
        isFavorited: false
      }
    },
    props: {
      imageCount: {
        type: String,
        required: true
      },
      flatId: {
        type: String,
        required: true
      },
      coords: {
        type: Array,
        required: true
      },
      mapTitle: {
        type: String
      }
    },
    methods: {
      ...mapActions({
        addToFavorites: 'addToFavorites',
        getFavorites: 'getFavorites'
      }),
      favour () {
        this.addToFavorites(this.flatId).then(() => {
          this.isFavorited = !this.isFavorited
        })
      }
    },
    computed: {
      ...mapGetters({
        favorites: 'favorites'
      })
    },
    mounted () {
      this.getFavorites()
      this.isFavorited = includes(this.favorites, parseInt(this.flatId))
    }
  }
</script>
