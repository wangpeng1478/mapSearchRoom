import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  $  from "./utils/index.js"
import  http  from "./utils/data.js"
import console from './utils/console';
// console()
Vue.prototype.$ = $
Vue.prototype.http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
