<template>
  <section id="land-object-search">
    <div class="row">
      <div class="form-group">
        <div class="col-sm-2">
          <div>
            <label class="typo__label">Улица</label>
            <multiselect v-model="selected.street" :options="options.street" :multiple="true"
                         :close-on-select="true" :clear-on-select="false" :hide-selected="true"
                         :loading="selectLoading.street" @input="getBuildings"
                         placeholder="Улица..." label="title" track-by="id">
            </multiselect>
          </div>
        </div>
        <div class="col-sm-2">
          <div>
            <label data-balloon="Сначала выберите улицу" data-balloon-pos="up" class="typo__label">Номер дома</label>
            <multiselect v-model="selected.building" :options="options.building" :multiple="true"
                         group-label="street" group-values="buildings" :disabled="options.building.length === 0"
                         :close-on-select="true" :clear-on-select="false" :hide-selected="true"
                         :custom-label="streetWithBuildingNum" :loading="selectLoading.building"
                         :placeholder="(selected.street.length) ? 'Выберите дом' : 'Нужна улица'"
                         label="number" track-by="id"
            ></multiselect>
          </div>
        </div>
        <div class="col-sm-2">
          <div>
            <label class="typo__label">Количество комнат</label>
            <multiselect v-model="selected.room" :options="options.room" :multiple="true"
                         :close-on-select="true" :clear-on-select="false" :hide-selected="false"
                         placeholder="Комнаты..." :searchable="false"
                         label="t" track-by="n"
            ></multiselect>
          </div>
        </div>
        <div class="col-sm-3">
          <v-range-select
            title="Цена" :options="options.price" :selected="selected.price"
            @jsonChanged="fields.price = $event"
          />
        </div>
        <form class="col-sm-2">
          <input type="hidden" v-if="selected.street.length" :name="formName + `[street_ids]`" v-model="fieldStreet"/>
          <input type="hidden" v-if="selected.building.length" :name="formName + `[building_ids]`" v-model="fieldBuilding"/>
          <input type="hidden" v-if="selected.room.length" :name="formName + `[room_ams]`" v-model="fieldRoom"/>
          <input type="hidden" v-if="fields.price" :name="formName + `[price_range]`" v-model="fields.price"/>
          <input type="hidden" v-if="fields.stage" :name="formName + `[stage_range]`" v-model="fields.stage"/>
          <input type="hidden" v-if="fields.area" :name="formName + `[area_range]`" v-model="fields.area"/>

          <br>

          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary pj-flat">Поиск</button>
            <button type="reset" @click="clearFields" class="btn btn-default">Сброс</button>
          </div>

        </form>
      </div>
    </div>

  </section>
</template>

<script>
  import VRangeSelect from './_range-select'

  export default {
    name: 'v-object-flat-search',
    components: {
      VRangeSelect
    },
    props: [
      'type',
      'formName',
      'jsonStreet'
    ],
    data() {
      return {
        urls: {
          street: '/geo/street/ajax-list',
          building: '/geo/building/ajax-list'
        },
        fields: {
          price: '',
          stage: '',
          area: ''
        },
        options: {
          street: [],
          building: [],
          room: [
            { n: 1, t: '1 к.' },
            { n: 2, t: '2 к.' },
            { n: 3, t: '3 к.' },
            { n: 4, t: '4 к.' },
            { n: -1, t: '5+ к.' },
          ],
          price: [
            { n: 500000, t: '₽500 т.' },
            { n: 1000000, t: '₽1 млн' },
            { n: 2000000, t: '₽2 млн' },
            { n: 3000000, t: '₽3 млн' },
            { n: 4000000, t: '₽4 млн' },
            { n: 5000000, t: '₽5 млн' },
            { n: 7000000, t: '₽7 млн' },
            { n: 8000000, t: '₽8 млн' },
            { n: 10000000, t: '₽10 млн' },
            { n: 13000000, t: '₽13 млн' },
            { n: 16000000, t: '₽16 млн' },
            { n: 19000000, t: '₽19 млн' },
            { n: 21000000, t: '₽21 млн' },
            { n: 25000000, t: '₽25 млн' },
            { n: 30000000, t: '₽30 млн' }
          ],
          stage: [
            { n: 1, t: '1' },
            { n: 2, t: '2' },
            { n: 3, t: '3' },
            { n: 4, t: '4' },
            { n: 5, t: '5' },
            { n: 6, t: '6' },
            { n: 7, t: '7' },
            { n: 8, t: '8' },
            { n: 9, t: '9' },
            { n: 10, t: '10' },
            { n: 12, t: '12' },
            { n: 14, t: '14' },
            { n: 16, t: '16' },
            { n: 18, t: '18' },
            { n: 20, t: '20' },
            { n: 22, t: '22' },
            { n: 24, t: '24' },
            { n: 26, t: '26' },
            { n: 28, t: '28' },
            { n: 30, t: '30' },
          ],
          area: [
            { n: 20, t: '20 м²' },
            { n: 25, t: '25 м²' },
            { n: 30, t: '30 м²' },
            { n: 35, t: '35 м²' },
            { n: 40, t: '40 м²' },
            { n: 45, t: '45 м²' },
            { n: 50, t: '50 м²' },
            { n: 55, t: '55 м²' },
            { n: 60, t: '60 м²' },
            { n: 65, t: '65 м²' },
            { n: 70, t: '70 м²' },
            { n: 75, t: '75 м²' },
            { n: 80, t: '80 м²' },
            { n: 90, t: '90 м²' },
            { n: 100, t: '100 м²' },
            { n: 125, t: '125 м²' },
            { n: 150, t: '150 м²' },
            { n: 200, t: '200 м²' },
            { n: 250, t: '250 м²' },
            { n: 300, t: '300 м²' },
            { n: 400, t: '400 м²' },
            { n: 500, t: '500 м²' },
          ]
        },
        selected: {
          street: [],
          building: [],
          room: [],
          price: { from: null, to: null },
          stage: { from: null, to: null },
          area: { from: null, to: null }
        },
        selectLoading: {
          street: false,
          bulding: false
        }
      }
    },
    methods: {
      /**
       * Получает данные из фильтров по AJAX
       */
      getData: function () {
        /* Street */
        this.selectLoading.street = true
        this.$http.get(this.urls.street).then(function (data) {
          this.options.street = data.body
          this.setSelected('street', 'street_ids')
          this.selectLoading.street = false
        })
      },

      /**
       * Получает здания по AJAX, основываясь на данных фильтров
       */
      getBuildings: function () {
        this.selectLoading.building = true
        this.$http.get(this.urls.building, {
          params: {
            'street_ids': this.fieldStreet
          }
        }).then(function (data) {
          // console.log(data.body)
          this.options.building = data.body
          this.setSelected('building', 'building_ids')
          this.selectLoading.building = false
        })
      },

      /**
       * Устанавливает фильтры согласно адресной строке
       */
      setSelected: function (attr, fieldName) {
        let parsed = Qs.search()[this.formName]
        if (parsed && (!$.isEmptyObject(parsed)) && parsed.hasOwnProperty(fieldName)) {
          // Устанавливаем строки
          parsed = parsed[fieldName]
          let selected = JSON.parse(parsed)
          if (_.isEmpty(selected)) return
          // Else:
          // Для зданий особый случай
          if (attr === 'building') {
            this._setSelectedBuilding(selected, attr)
          } else if (attr === 'price' || attr === 'stage' || attr === 'area') {
            this._setSelectedRange(selected, attr)
          } else {
            this.selected[attr] = this.options[attr].filter(function (v, i) {
              return selected.includes(String(v['id']))
            })
          }
//          console.log('Selected: ', this.selected[attr])
        }
      },

      /**
       * Очищает строку параметров и фильтров
       * @TODO сделать другой способ, так как здесь так же сбрасывается пагинация
       */
      clearFields: function () {
        window.location.search = ''
      },

      streetWithBuildingNum: function ({ street_id, number }) {
        return this.mappedStreets[street_id] + ', ' + number
      },

      /**
       * Парсим JSON строки, полученные от родителя
       */
      parseStreet() {
        this.options.street = JSON.parse(this.jsonStreet)
      },

      log(message) {
        console.log(message)
      },

      /**
       * Извлекает столбец column из объекта obj
       * @TODO вынести в отдельный файл
       * @param obj
       * @param column
       * @private
       */
      _extractColumn: function (obj, column) {
        return obj.map(function (v, i) {
          return v[column]
        })
      },

      /**
       * Методы, начинающиеся на _setSeleted устанавливает поле "selected" для конкретного аттрибута
       */
      _setSelectedBuilding (selected, attr) {
        let result = []
        this.options[attr].forEach(function (v, i) {
          result = result.concat(v[attr + 's'].filter(function (vv, ii) {
            return selected.includes(String(vv['id']))
          }))
        })
        this.selected[attr] = result
      },

      _setSelectedRange (selected, attr) {
        if (selected.f)
          this.selected[attr].from = _.find(this.options.price, { 'n': selected.f })
        if (selected.t)
          this.selected[attr].to = _.find(this.options.price, { 'n': selected.t })
      }

    },

    watch: {
      jsonStreet: 'parseStreet'
    },

    computed: {
      /**
       * Значения с названием, начинающимся на field... вычисляют значения для скрытых полей формы
       */
      fieldStreet() {
        return JSON.stringify(this._extractColumn(this.selected.street, 'id'))
      },
      fieldBuilding() {
        return JSON.stringify(this._extractColumn(this.selected.building, 'id'))
      },
      fieldRoom() {
        return JSON.stringify(this._extractColumn(this.selected.building, 'n'))
      },

      /**
       * Возвращает "плоский" массив улиц вида id: название
       * @returns {{}}
       */
      mappedStreets() {
        let result = {}
        this.options.street.forEach(function (v) {
          result[v['id']] = v['title']
        })
        return result
      }
    },

    created() {
      if (!this.jsonStreet) {
        this.getData()
      } else {
        this.parseStreet()
        this.setSelected('street', 'street_ids')
      }
      this.setSelected('price', 'price_range')
      this.setSelected('stage', 'stage_range')
      this.setSelected('area', 'area_range')
//      console.log(env)
    },

  }
</script>

<style>
  .btn-multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 100%;
    min-height: 40px;
    text-align: left;
    color: #35495E;
  }

  .multiselect--disabled {
    border-radius: 10px;
  }
</style>
