// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import VueSession from 'vue-session'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'



Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueSession,{persist: true});
Vue.use(Toaster, {timeout: 5000});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
