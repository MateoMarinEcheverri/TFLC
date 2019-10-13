import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'

require("firebase/firestore")

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBueN9BxIB50vcZVHLb8OLMa0kInxnXD08",
  authDomain: "webdevusers-935d5.firebaseapp.com",
  databaseURL: "https://webdevusers-935d5.firebaseio.com",
  projectId: "webdevusers-935d5",
  storageBucket: "webdevusers-935d5.appspot.com",
  messagingSenderId: "11945396987",
  appId: "1:11945396987:web:3b9abe8b2ece73aac8fe5e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
