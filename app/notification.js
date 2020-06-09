// --------------------------
// Fire base configuration
// --------------------------
var firebase = require("nativescript-plugin-firebase");
export default {
  init() {
    firebase.init({
      onPushTokenReceivedCallback: function(token) {
        console.log("Firebase push token: " + token);
      },
      onMessageReceivedCallback: function(message) {
        console.log("Title: " + message.title);
        console.log("Body: " + message.body);
        console.log("Value of 'foo': " + JSON.stringify(message.data));
      }
    }).then(
        function () {
          console.log("firebase.init done");
        },
        function (error) {
          console.log("firebase.init error: " + error);
        }
    );
  }
};

