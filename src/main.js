// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import VueFeather from 'vue-feather'
import VuePikaday from '@enrian/vue-pikaday'
import Notifications from 'vue-notification'
import moment from 'moment'
import lodash from 'lodash'
import router from './router'
import API from './utils/api'

// https://github.com/alexurquhart/vue-bootstrap-typeahead

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VeeValidate)
Vue.use(VuePikaday)

Vue.component(VueFeather.name, VueFeather)

Vue.prototype.$moment = moment
Vue.prototype.$lodash = lodash
Vue.prototype.$API = API

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
