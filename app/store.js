import Vue from 'vue';
import Vuex from 'vuex';

import menu from './config/menu.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu
  },
  mutations: {
    changeActiveMenu(state, indexParam) {
      state.menu = state.menu.map((item, index) => {
        item.active = index === indexParam;
        return item;
      });
    },
  },
  actions: {

  },
  getters: {
    indexItemCurrentlySelected: state => {
      let indexSelected = 0;
      state.menu.forEach((item, index) => {
        if (item.active === true) indexSelected = index;
      });
      return indexSelected;
    }
  }
});
