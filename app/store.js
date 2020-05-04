import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: [],
    stores: [],
  },
  mutations: {
    setStores(state, storesParam) {
      state.stores = storesParam;
    },
    setMenu(state, menuParam){
      state.menu = menuParam;
    },
    changeActiveMenu(state, indexParam) {
      state.menu = state.menu.map((item, index) => {
        item.active = index === indexParam;
        return item;
      });
    },
    changeSelectedMenu(state, indexParam) {
      state.menu = state.menu.map((item, index) => {
        item.selected = index === indexParam;
        item.active = index === indexParam;
        return item;
      });
    },
  },
  actions: {},
  getters: {
    isStoresLoaded: state => {
      return state.stores.length > 0;
    },
    isMenuLoaded: state => {
      return state.menu.length > 0;
    },
    indexItemCurrentlyActive: state => {
      let indexActive = 0;
      state.menu.forEach((item, index) => {
        if (item.active === true) indexActive = index;
      });
      return indexActive;
    },
    indexItemCurrentlySelected: state => {
      let indexSelected = 0;
      state.menu.forEach((item, index) => {
        if (item.selected === true) indexSelected = index;
      });
      return indexSelected;
    }
  }
});
