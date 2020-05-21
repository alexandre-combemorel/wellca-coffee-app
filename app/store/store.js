import Vue from 'vue';
import Vuex from 'vuex';
import stores from './modules/stores'
import navigation from './modules/navigation'
import sliderBottom from './modules/sliderBottom'
import boisson from './modules/boisson'
import cafe_grain from './modules/cafe_grain'
import app from './modules/app'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stores,
    navigation,
    sliderBottom,
    boisson,
    cafe_grain,
    app
  }
});
