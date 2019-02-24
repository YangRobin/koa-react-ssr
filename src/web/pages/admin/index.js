

import "../../common/common.css"

import Vue from 'vue';
import App from './app.vue'
import router from './router'

// Vue.use(router)

new Vue({
  el: "#root",
  router,
  components: {
    App,
  },
  template: '<App />',
}).$mount()