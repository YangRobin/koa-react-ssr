

import "../../common/common.css"

import Vue from 'vue';
import App from './app.vue'
import router from './router'
require("../../common/common.css")
// Vue.use(router)

new Vue({
  el: "#root",
  router,
  components: {
    App,
  },
  template: '<App />',
}).$mount()