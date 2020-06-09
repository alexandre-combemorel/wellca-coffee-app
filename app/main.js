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


// --------------------------
// Fire base configuration
// --------------------------
var firebase = require("nativescript-plugin-firebase");

firebase.init({
  onMessageReceivedCallback: function(message) {
    console.log("Title: " + message.title);
    console.log("Body: " + message.body);
    // if your server passed a custom property called 'foo', then do this:
    console.log("Value of 'foo': " + message.data.foo);
  }
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function () {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);
