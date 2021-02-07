import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/sass/app.sass'

import axios from 'axios'

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  data: {
    publicPath: process.env.BASE_URL
  },
  store,
  render: h => h(App)
}).$mount('#app')
