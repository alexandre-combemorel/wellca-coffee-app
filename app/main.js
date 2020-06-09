import Vue from 'nativescript-vue'
import App from './components/App'
import { isAndroid, isIOS } from "tns-core-modules/platform";

import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

import store from './store/store'
Vue.prototype.$store = store

import ImageCacheIt from 'nativescript-image-cache-it/vue';
Vue.use(ImageCacheIt);

import DateTimePicker from "nativescript-datetimepicker/vue";
Vue.use(DateTimePicker);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

if (isIOS) {
    GMSServices.provideAPIKey('AIzaSyAgWBq60lfVikO1OxmVRJUOP8d0vkJI0oo');
}
Vue.registerElement('MapView', () => require('nativescript-google-maps-sdk').MapView);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()