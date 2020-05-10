const moduleStores = {
  state: {
    stores: [],
  },
  mutations: {
    setStores(state, storesParam) {
      state.stores = storesParam;
      console.log("stores set");
    },
  },
  actions: {},
  getters: {
    isStoresLoaded: state => {
      console.log("check store loaded");
      return state.stores.length > 0;
    },
    getStores: state => state.stores
  }
}
export default moduleStores;