import Vue from 'vue'
import App from './App.vue'

// import Bootstrap from './assets/scss/custom.scss'
import VueRouter from 'vue-router'
import Toasted from 'vue-toasted'
import VueApexCharts from 'vue-apexcharts'

import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'
import router from './router.js'


import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Modal from '../src/components/Modal.vue'



Vue.config.productionTip = false
Vue.use(Bootstrap)
Vue.use(VueRouter)
Vue.use(Toasted, {
  timeout: 5000,
  theme: 'bubble',
  position: 'bottom-right',
  duration: 5000,
  keepOnHover: true
})
Vue.use(VueApexCharts)
Vue.component('modal', Modal)
Vue.component('apexchart', VueApexCharts)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
