import {includes} from 'lodash'

export const getFavorites = ({commit}) => {
  const ids = localStorage.getItem('favorites')
  if (ids) {
    commit('getFavorites', ids)
  }
}

export const addToFavorites = ({commit, state}, id) => {
  if (!includes(state.favorites, id)) {
    commit('addToFavorites', id)
    return Promise.resolve()
  }
  commit('removeFavorites', id)
}
