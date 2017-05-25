import {remove} from 'lodash'

export const getFavorites = (state, ids) => {
  state.favorites = ids.split(',').map(Number)
}

export const addToFavorites = (state, id) => {
  state.favorites.push(id)
  localStorage.setItem('favorites', state.favorites)
}

export const removeFavorites = (state, id) => {
  remove(state.favorites, (favorite) => favorite === id)
  localStorage.setItem('favorites', state.favorites)
}
