import mxPagination from '~components/_pagination'

export default {
  components: { mxPagination },
  props: {
    startPage: {
      type: Object,
      required: false
    }
  },
  /*
  // Пример получения данных при рендеринге
  async asyncData (context) {
    console.log(context)
    let queryString = global.utils.query.stringify(context.query)
    let dataRes = await global.axios.get('/some/example/url' + queryString)
    return {
      models: dataRes.data
    }
  },
   */
  data () {
    return {
      current: '',
      models: {},
      resUrl: 'some/example/url'
    }
  },
  methods: {
    async mxFetchData () {
      console.log('fetching')
      let queryString = global.utils.query.stringify(this.$route.query)
      console.log(queryString)
      let dataRes = await global.axios.get(this.resUrl + queryString)
      this.models = dataRes.data
      this.current = dataRes.data.current
    },
    mxUpdateQuery (query) {
      this.$router.replace({ query: query })
    },
    /* Изменения в объекте this.$route.query настолько незначительны, что router не меняет url, следует
     * поступать следующим образом:
     */
    mxOnPageChanged (page) {
      let q = Object.assign({}, this.$route.query)
      q.page = page
      this.mxUpdateQuery(q)
    }
  },
  created () {
    // Если встроенный объект
    // console.log('paginated: created')
    // console.log(this.models)
    if (global._.isEmpty(this.models)) this.models = this.startPage
  },
  beforeMount () {
    console.log('paginated: beforeMount')
    // Если рендерится на стороне клиента:
    if (global._.isEmpty(this.models)) this.mxFetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'mxFetchData'
  }
}
