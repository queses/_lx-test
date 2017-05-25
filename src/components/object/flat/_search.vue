<template>
  <section id="object-search">
    <div class="row">
      <div class="form-group">
        <span class="inline">
          <v-popup-select title="Улица" :selected="selected.street"
              @removed="removeElement('street', $event)" @activated="activateField('street')">
            <v-multiselect-inner slot="input" @input="getBuildings" ref="street"
                v-model="selected.street" :options="options.street" :multiple="true"
                :close-on-select="true" :clear-on-select="false" :hide-selected="true"
                :loading="selectLoading.street"
                placeholder="Начните вводить" label="title" track-by="id"
            />
          </v-popup-select>
        </span>
        <span class="inline">
          <div data-balloon="Сначала выберите улицу" data-balloon-pos="down"
              :data-balloon-hidden="options.building.length ? 'true' : 'false'">
            <v-popup-select title="Дом" :selected="selected.building" label="number" 
                custom-label="streetWithBuildingNum" 
                @removed="removeElement('building', $event)" @activated="activateField('street')">
              <v-multiselect-inner slot="input" ref="building"
                  v-model="selected.building" :options="options.building" :multiple="true"
                  group-label="street" group-values="buildings" :disabled="options.building.length === 0"
                  :close-on-select="true" :clear-on-select="false" :hide-selected="true"
                  :loading="selectLoading.building"
                  placeholder="Начните вводить" label="number" track-by="id"
              />
            </v-popup-select>
            <!--             <multiselect v-model="selected.building" :options="options.building" :multiple="true"
                                   group-label="street" group-values="buildings" :disabled="options.building.length === 0"
                                   :close-on-select="true" :clear-on-select="false" :hide-selected="true"
                                   :custom-label="streetWithBuildingNum" :loading="selectLoading.building"
                                   :placeholder="'Дом'" label="number" track-by="id"
                      ></multiselect>
            -->
          </div>
        </span>
        <span class="inline">
          <v-popup-select :selected="selected.room" title="Комнаты" track-by="n" label="t"
              @removed="removeElement('room', $event)" @activated="activateField('room')">
            <v-multiselect-inner slot="input" ref="room"
                v-model="selected.room" :options="options.room" :multiple="true"
                :close-on-select="true" :clear-on-select="false" :hide-selected="false"
                placeholder="Комнаты..." :searchable="false"
                label="t" track-by="n"
            ></v-multiselect-inner>
          </v-popup-select>
        </span>
        <div class="out-range">
          <button class="open-range" :meta-selected="formFields.price ? true : false"
                  @click="showPrice = !showPrice; showStage = false; showSquare = false">Цена
          </button>
          <v-range-select
            title="Цена" :options="options.price" :selected="selected.price"
            @jsonChanged="formFields.price = $event" v-if="showPrice"
          />
        </div>
        <div class="out-range">
          <button class="open-range" :meta-selected="formFields.stage ? true : false"
                  @click="showStage = !showStage; showPrice = false; showSquare = false">Этаж
          </button>
          <v-range-select
            title="Этаж" :options="options.stage" :selected="selected.stage"
            @jsonChanged="formFields.stage = $event" v-if="showStage"
          />
        </div>
        <div class="out-range">
          <button class="open-range" :meta-selected="formFields.area ? true : false"
                  @click="showSquare = !showSquare; showStage = false; showPrice = false">Площадь
          </button>
          <v-range-select
            title="Площадь" :options="options.area" :selected="selected.area"
            @jsonChanged="formFields.area = $event" v-if="showSquare"
          />
        </div>
        <form action="/object/flat/">
          <input type="hidden" v-if="selected.street.length" :name="formName + `[street_ids]`" v-model="fieldStreet"/>
          <input type="hidden" v-if="selected.building.length" :name="formName + `[building_ids]`"
                 v-model="fieldBuilding"/>
          <input type="hidden" v-if="selected.room.length" :name="formName + `[room_am]`" v-model="fieldRoom"/>
          <input type="hidden" v-if="formFields.price" :name="formName + `[price_range]`" v-model="formFields.price"/>
          <input type="hidden" v-if="formFields.stage" :name="formName + `[stage_range]`" v-model="formFields.stage"/>
          <input type="hidden" v-if="formFields.area" :name="formName + `[area_range]`" v-model="formFields.area"/>

          <div class="input-group text-right">
            <div class="input-group-btn">
              <button type="submit" @click.prevent="applyFilters" class="btn btn-primary pj-flat">Поиск</button>
            </div>
            <div class="input-group-btn">
              <button type="reset" @click="clearFields" class="btn btn-default">Сброс</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>


<script>
  import VRangeSelect from './_range-select'
  import VPopupSelect from '~components/_popup-select'
  import VMultiselectInner from '@assets/vendor/vue-multiselect/MultiselectInner'

  export default {
    name: 'v-object-flat-search',
    components: {
      VRangeSelect,
      VPopupSelect,
      VMultiselectInner
    },
    props: [
      'type',
      'formName'
    ],
    data () {
      return {
        showPrice: false,
        showStage: false,
        showSquare: false,
        urls: {
          street: '/geo/street/ajax-list',
          building: '/geo/building/ajax-list'
        },
        formFields: {
          price: '',
          stage: '',
          area: ''
        },
        options: {
          street: [],
          building: [],
          room: [
            {n: 1, t: '1 к.'},
            {n: 2, t: '2 к.'},
            {n: 3, t: '3 к.'},
            {n: 4, t: '4 к.'},
            {n: -1, t: '5+ к.'}
          ],
          price: [
            {n: 500000, t: '500 т.'},
            {n: 1000000, t: '1 млн'},
            {n: 2000000, t: '2 млн'},
            {n: 3000000, t: '3 млн'},
            {n: 4000000, t: '4 млн'},
            {n: 5000000, t: '5 млн'},
            {n: 7000000, t: '7 млн'},
            {n: 8000000, t: '8 млн'},
            {n: 10000000, t: '10 млн'},
            {n: 13000000, t: '13 млн'},
            {n: 16000000, t: '16 млн'},
            {n: 19000000, t: '19 млн'},
            {n: 21000000, t: '21 млн'},
            {n: 25000000, t: '25 млн'},
            {n: 30000000, t: '30 млн'}
          ],
          stage: [
            {n: 1, t: '1'},
            {n: 2, t: '2'},
            {n: 3, t: '3'},
            {n: 4, t: '4'},
            {n: 5, t: '5'},
            {n: 6, t: '6'},
            {n: 7, t: '7'},
            {n: 8, t: '8'},
            {n: 9, t: '9'},
            {n: 10, t: '10'},
            {n: 12, t: '12'},
            {n: 14, t: '14'},
            {n: 16, t: '16'},
            {n: 18, t: '18'},
            {n: 20, t: '20'},
            {n: 22, t: '22'},
            {n: 24, t: '24'},
            {n: 26, t: '26'},
            {n: 28, t: '28'},
            {n: 30, t: '30'}
          ],
          area: [
            {n: 20, t: '20 м²'},
            {n: 25, t: '25 м²'},
            {n: 30, t: '30 м²'},
            {n: 35, t: '35 м²'},
            {n: 40, t: '40 м²'},
            {n: 45, t: '45 м²'},
            {n: 50, t: '50 м²'},
            {n: 55, t: '55 м²'},
            {n: 60, t: '60 м²'},
            {n: 65, t: '65 м²'},
            {n: 70, t: '70 м²'},
            {n: 75, t: '75 м²'},
            {n: 80, t: '80 м²'},
            {n: 90, t: '90 м²'},
            {n: 100, t: '100 м²'},
            {n: 125, t: '125 м²'},
            {n: 150, t: '150 м²'},
            {n: 200, t: '200 м²'},
            {n: 250, t: '250 м²'},
            {n: 300, t: '300 м²'},
            {n: 400, t: '400 м²'},
            {n: 500, t: '500 м²'}
          ]
        },
        selected: {
          street: [],
          building: [],
          room: [],
          price: {from: null, to: null},
          stage: {from: null, to: null},
          area: {from: null, to: null}
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
      async getData (context) {
        /* Street */
        this.selectLoading.street = true
        let streetRes = await global.axios.get(this.urls.street)
        console.log(streetRes)
        this.options.street = streetRes.data
        this.setSelected('street', 'street_ids', this.$route.query)
        this.selectLoading.street = false
        // console.log(this.options.street)
        /* Building */
        if (this.selected.street.length) this.getBuildings(true)
        /* Room */
        this.setSelected('room', 'room_am', this.$route.query)
      },

      /**
       * Получает здания по AJAX, основываясь на данных фильтров
       */
      async getBuildings (isOnLoad = false) {
        console.log('getting buildins')
        this.selectLoading.building = true
        let buildingRes = await global.axios.get(this.urls.building, { params: {
          'street_ids': this.fieldStreet
        }})
        console.log(buildingRes)
        this.options.building = buildingRes.data
        this.selectLoading.building = false
        if (isOnLoad) this.setSelected('building', 'building_ids', this.$route.query)
      },

      /**
       * Устанавливает фильтры согласно адресной строке
       */
      setSelected: function (attr, fieldName, query) {
        // console.log(query, this.$route)
        let queryValue = query[`${this.formName}[${fieldName}]`]
        if (queryValue) {
          let selected = JSON.parse(queryValue)
          if (global._.isEmpty(selected)) return
          // else:
          if (attr === 'street') {
            this.selected[attr] = this.options[attr].filter(function (v, i) {
              return selected.includes(String(v['id']))
            })
          } else if (attr === 'building') {
            this._setSelectedBuilding(selected, attr)
            // Range-поля:
          } else if (attr === 'price' || attr === 'stage' || attr === 'area') {
            this._setSelectedRange(selected, attr)
          } else {
            this.selected[attr] = selected
          }
        }
      },

      removeElement (attr, { elem, trackBy }) {
        this.selected[attr] = this.selected[attr].filter(function (v) {
          return (v[trackBy] !== elem)
        })
      },

      activateField (attr) {
        if (this.$refs[attr]) this.$refs[attr].activate()
      },

      /**
       * Очищает строку параметров и фильтров
       * @TODO сделать другой способ, так как здесь так же сбрасывается пагинация
       */
      clearFields: function () {
        window.location.search = ''
        // console.log(this.$route)
        // this.$router.push(this.$route.path, { query: '' })
      },

      applyFilters () {
        // let fn = this.formName
        let createQuery = (formName, value, fieldName = '') => {
          if (!value || value === '[]' || value === '{}') return ''
          // else
          if (fieldName) fieldName = `[${fieldName}]`
          return `&${formName}${fieldName}=${value}`
        }
        // Street:
        let query = createQuery(this.formName, this.fieldStreet, 'street_ids')
        // Building:
        query += createQuery(this.formName, this.fieldBuilding, 'building_ids')
        // Room
        query += createQuery(this.formName, this.fieldRoom, 'room_am')
        // Price
        query += createQuery(this.formName, this.formFields.price, 'price_range')
        // Stage
        query += createQuery(this.formName, this.formFields.stage, 'stage_range')
        // Area
        query += createQuery(this.formName, this.formFields.area, 'area_range')
        this.$emit('filters-applied', query)
        // console.log(option)
      },

      streetWithBuildingNum: function ({street_id, number}) {
        return this.mappedStreets[street_id] + ', ' + number
      },

      log (message) {
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
        if (selected.f) {
          this.selected[attr].from = global._.find(this.options[attr], {'n': selected.f})
        }
        if (selected.t) {
          this.selected[attr].to = global._.find(this.options[attr], {'n': selected.t})
        }
        this.formFields[attr] = JSON.stringify(selected)
      }

    },

    watch: {
      jsonStreet: 'parseStreet'
    },

    computed: {
      /**
       * Значения с названием, начинающимся на field... вычисляют значения для скрытых полей формы
       */
      fieldStreet () {
        return JSON.stringify(this._extractColumn(this.selected.street, 'id'))
      },
      fieldBuilding () {
        return JSON.stringify(this._extractColumn(this.selected.building, 'id'))
      },
      fieldRoom () {
        return JSON.stringify(this._extractColumn(this.selected.room, 'n'))
      },

      /**
       * Возвращает "плоский" массив улиц вида id: название
       * @returns {{}}
       */
      mappedStreets () {
        let result = {}
        this.options.street.forEach(function (v) {
          result[v['id']] = v['title']
        })
        return result
      }
    },

    async beforeMount () {
      await this.getData()
      // this.setSelected('street', 'street_ids')
      // Получаем здания:
      // this.getBuildings()
      // this.setSelected('room', 'room_am')
      // this.setSelected('price', 'price_range')
      // this.setSelected('stage', 'stage_range')
      // this.setSelected('area', 'area_range')
      // console.log(env)
    }

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

  label {
    display: none;
  }

  .open-range {
    display: inline-block;
    margin: 0;
    min-height: 40px;
    padding: 0 20px;
    border-radius: 5px;
    border: 1px solid #E8E8E8;
    background: #fff;
    margin: 0 2px;
    color: #35495E;
  }

  .inline {
    display: inline-block;
  }

  .open-range[meta-selected=true] {
    font-weight: 600;
  }

  .out-range {
    display: inline-block;
  }

  .out-range section {
    min-width: 320px;
    position: absolute;
    background: #fafafa;
    border: 1px solid #eee;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-top: 4px;
    padding: 6px;
    border-radius: 4px;
  }
</style>
