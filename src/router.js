import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import address from './views/Address.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    },{
      path:'/address',
      name:'address',
      component: Map
    }
  ]
})