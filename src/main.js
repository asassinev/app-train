import Vue from 'vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'

import App from './App.vue'

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAUQpr-MpswzQEE9JjYLbJhzKf88Lyv2o4',
      authDomain: 'app-ads-3671b.firebaseapp.com',
      projectId: 'app-ads-3671b',
      storageBucket: 'app-ads-3671b.appspot.com',
      messagingSenderId: '1031949799924',
      appId: '1:1031949799924:web:bad6895a339c8835d229a1',
      measurementId: 'G-K9SV9VSX3'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
