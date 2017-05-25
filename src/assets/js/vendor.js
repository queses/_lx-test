/**
 * Загружает сторонние модули, в том числе и переопределённые.
 * Часть модулей вынесены в другие файлы: например, vue.js;
 * другая часть определяется глобально - см. webpack.env.js.
 * Чистые CSS-модули, а также сторонние CSS-файлы определяются в vendor.scss
 */

/**
 * Стили
 */
// import "@styles/vendor.scss"
// import "@node/vue-multiselect/dist/vue-multiselect.min.css"

/**
* Скрипты с глобальными переменными
*/

// import Qs from 'qs'
// global.Qs = Qs

import _ from 'lodash/core'
global._ = _

/**
 * Скрипты
 */
// import 'babel-polyfill'
import 'pace-progress'

// import VueResource from 'vue-resource'
// Vue.use(VueResource)

// import VPulseLoader from 'vue-spinner/src/PulseLoader.vue'
// Vue.component('v-pulse-loader', VPulseLoader)

// import Multiselect from '@vendor/vue-multiselect/Multiselect'
// // import Multiselect from 'vue-multiselect'
// Vue.component('multiselect', Multiselect)

// import VueRouter from 'vue-router'
// Vue.use(VueRouter)


// import lazyLoad from 'vue-lazyload'
// import lazyPreloader from '@components/utils/_lazy-loader'
// Vue.use(lazyLoad, {
//   lazyComponent: lazyPreloader
// })

// import VueCarousel from 'vue-carousel'
// Vue.use(VueCarousel)

// import { Slider, SliderItem } from 'vue-easy-slider'
// Vue.component('v-slider', Slider)
// Vue.component('v-slider-item', SliderItem)

// import swiper from '@vendor/vue-awesome-swiper/swiper'
// import swiperSlide from '@vendor/vue-awesome-swiper/slide'
// Vue.component('swiper', swiper)
// Vue.component('swiper-slide', swiperSlide)
