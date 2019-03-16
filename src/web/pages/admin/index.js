

import "../../common/common.css"

import Vue from 'vue';
import App from './app.vue'
import router from './router'
require("../../common/common.css")
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.use(router)

new Vue({
  el: "#root",
  router,
  components: {
    App,
  },
  template: '<App />',
}).$mount()