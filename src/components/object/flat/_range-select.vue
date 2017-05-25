<template>
<section>
  <label class="typo__label">{{ title }}</label>
  <div class="row">
    <div class="col-sm-6 multiselect__range_from">
      <multiselect v-model="selected.from" :options="options"
                   :track-by="trackProp" :label="labelProp" :searchable="false" :close-on-select="true"
                   placeholder="От..." @input="checkRatio(), $emit('jsonChanged', jsonString)">
      </multiselect>
    </div>
    <div class="col-sm-6 multiselect__range_to">
      <multiselect v-model="selected.to" :options="options"
                   :track-by="trackProp" :label="labelProp" :searchable="false" :close-on-select="true"
                   placeholder="До..." @input="checkRatio(), $emit('jsonChanged', jsonString)">
      </multiselect>
    </div>
  </div>
</section>
</template>

<script>
  /**
   * Компонент фильтров вида "от" и "до"
   */
  export default {
    name: 'v-range-select',
    props: {
      attr: {
        type: String,
        default: ''
      },
      trackProp: {
        type: String,
        default: 'n'
      },
      labelProp: {
        type: String,
        default: 't'
      },
      title: {
        type: String,
        default: 'Выберите...'
      },
//      { options: [] },
      options: {
        type: Array,
        default () { return [] }
      },
      selected: {
        type: Object,
        default () { return {} }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {}
    },

    methods: {
      /**
       * Проверяет соотношение фильтра "от и до", и если "от" меньше, меняет их местами
       */
      checkRatio () {
        if (this.selected.from && this.selected.to) {
          if (this.selected.from[this.trackProp] > this.selected.to[this.trackProp]) {
            // Меняем местами
            let high = this.selected.from
            this.selected.from = this.selected.to
            this.selected.to = high
            console.log(this.selected)
          }
        }
      }
    },

    watch: {
      /**
       * @callback при изменении ввода отправляет событие с форматированной строкой
       */
      selected: function () {
        this.$emit('jsonChanged', this.jsonString)
      }
    },

    computed: {
      /**
       * Фоматирует выбранные пункты в строку JSON
       * @returns {string}
       */
      jsonString () {
        let from = global._.isEmpty(this.selected.from) ? 0 : this.selected.from[this.trackProp]
        let to = global._.isEmpty(this.selected.to) ? 0 : this.selected.to[[this.trackProp]]
        if (!(from || to)) return ''
        else return JSON.stringify({ f: from, t: to })
      }
    },

    created () {
    }
  }
</script>

<style>
  /**
   * Увеличиваем ширину выпадающего меню, т. к. обычно оно не вмещает содержимое по ширине
   */
  .multiselect__range_from {
    padding-right: 0.3ex
  }

  .multiselect__range_to {
    padding-left: 0.3ex
  }

  .multiselect__content {
    width: 110%;
    border: 1px solid #E8E8E8;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>
