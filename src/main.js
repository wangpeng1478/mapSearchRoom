import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  $  from "./utils/index.js"
import 'url-search-params-polyfill'
import './assets/images/iconfont/iconfont.css'
Vue.prototype.$ = $
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
