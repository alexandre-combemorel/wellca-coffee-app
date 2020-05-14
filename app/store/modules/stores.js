const moduleStores = {
  namespaced: true,
  state: {
    stores: [],
  },
  mutations: {
    setStores(state, storesParam) {
      state.stores = storesParam;
    },
  },
  actions: {},
  getters: {
    isStoresLoaded: state => state.stores.length > 0,
    getStores: state => state.stores
  }
}
export default moduleStores;