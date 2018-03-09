import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '../services/api.service'

Vue.use(Vuex)

const state = {
  catalogs: [],
  selectedCatalog: null,
  searchQuery: '',
  products: []
}

const mutations = {
  setCatalogs (state, payload) {
    state.catalogs = payload
  },
  sortTable (state, { property, order }) {
    state.catalogs.sort((a, b) => {
      if (a[property] < b[property]) {
        return order === 'ASC' ? -1 : 1
      }
      if (a[property] > b[property]) {
        return order === 'ASC' ? 1 : -1
      }
      return 0
    })
  },
  setProducts (state, payload) {
    state.products = payload
  }
}

const actions = {
  async setCatalogs (state, { catalogId, siteId }) {
    const { mappingList } = await ApiService.getCatalogMapping(
      catalogId,
      siteId
    )
    state.commit('setCatalogs', mappingList)
    state.commit('setProducts', [])
  },

  setSort (state, params) {
    state.commit('sortTable', params)
  },
  async fetchProducs (state, { categoryId, siteID }) {
    const response = await ApiService.getCatalogProducts(categoryId, siteID)
    const formatted = response
      .split('\n')
      .filter(p => !!p)
      .map(product => {
        const details = product.trim().split('\t')
        return {
          id: details[0].trim(),
          image: details[1].trim(),
          title: details[2].trim()
        }
      })
    state.commit('setProducts', formatted)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
