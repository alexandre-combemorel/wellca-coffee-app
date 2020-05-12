import Vue from 'vue';
import Vuex from 'vuex';
import stores from './modules/stores'
import navigation from './modules/navigation'
import sliderBottom from './modules/sliderBottom'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stores,
    navigation,
    sliderBottom,
  }
});
