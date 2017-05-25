<template>
  <div class="object-flat-index">
    <!-- Phone modal -->
    <v-modal :show="fModal" @close="fModal = false" :width="500" :height="450">
      <v-contact-form :phone="agent.phone" :name="agent.name"></v-contact-form>
    </v-modal>

    <!-- Map Modal -->
    <v-modal :show="mModal" @close="mModal = false" :width="500" :height="463" measure="px">
      <v-map
        v-if="mModal"
        :is-in-modal="true"
        :title="mapTitle"
        :zoom="16"
        :center="mapCenter"
        :marker="mapCenter"
        :styles="{ width: '100%', height: '400px', 'border-radius': '0 4px 4px' }"
      ></v-map>
    </v-modal>

    <v-search
      :type="searchType"
      form-name="ObjectFlatSearch"
      @filters-applied="onFiltersApplied"
    ></v-search>

    <!--        <h4 class="text-center">Не найдено ни одного объекта. Пожалуйста, измените запрос</h4>-->
    <flat v-for="flat in models.data" :flat="flat" :key="flat.id"></flat>

    <div class="text-center">
      <mx-pagination
        :total="models.total"
        :per-page="models['per-page']"
        :current="models.current"
        @page-changed="mxOnPageChanged">
        >
      </mx-pagination>
    </div>

  </div>
</template>

<script>
  import VSearch from '~components/object/flat/_search'
  import VTest from '~components/_test'
  import VModal from '~components/_modal'
  import VMap from '~components/_map'
  import VContactForm from '~components/_contact_form'
  import Flat from '~components/object/flat/_flat'
  // import Pagination from '~components/_pagination'
  import paginatedMixin from '~assets/mixins/paginated'

  export default {
    mixins: [ paginatedMixin ],

    props: {
      startPage: {
        type: Object,
        required: false
      },
      searchType: {},
      searchStreets: {}
    },

    components: {
      VSearch,
      VTest,
      VModal,
      VMap,
      VContactForm,
      Flat
      // Pagination
    },
    data () {
      return {
        mModal: false,
        fModal: false,
        mapCenter: [54.9827, 82.8958],
        mapTitle: '',
        agent: {},
        resUrl: '/object/flat/json-page-data'
      }
    },
    methods: {
      onFiltersApplied (payload) {
        this.mxUpdateQuery(global.utils.query.parse(payload))
      }
    },
    mounted () {
      this.$events.$on('open-m-modal', (payload) => {
        this.mapTitle = payload.mapTitle
        this.mapCenter = payload.coords
        this.mModal = true
      })

      this.$events.$on('open-f-modal', (payload) => {
        this.agent = payload
        this.fModal = true
      })
    }
  }
</script>
