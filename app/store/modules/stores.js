const moduleStores = {
  namespaced: true,
  state: {
    stores: [],
    storeSelected: undefined,
  },
  mutations: {
    setStores(state, storesParam) {
      state.stores = storesParam;
    },
    setStoreSelected(state, store) {
      state.storeSelected = store;
    }
  },
  actions: {},
  getters: {
    isStoresLoaded: state => state.stores.length > 0,
    getStores: state => state.stores,
    getStoreSelected: state => state.storeSelected
  }
}
export default moduleStores;