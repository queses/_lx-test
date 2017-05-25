import Vuex from 'vuex'

import state from './state'
// import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default () => {
  return new Vuex.Store({
    state,
    getters: {
      favorites: (state) => state.favorites
    },
    mutations,
    actions
  })
}
