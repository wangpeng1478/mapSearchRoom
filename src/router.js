import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import {getPageInfo,recordPage} from '@/utils/record'
import store from '@/store'
Vue.use(Router)

 const router = new Router({
  mode:'hash',
  routes: [
    {
      path: '/:cityPY/map',
      name: 'Map',
      component: Map ,
    },{
      path:'/:cityPY/map/address',
      name:'Address',
      component: () => import('./views/Address.vue')
    },{
      path:'/:cityPY/map/search',
      name:'Search',
      component: () => import('./views/Search.vue')
    },
    { 
      path: '*', 
      name: 'Map',
      redirect:'/sh/map'
    }
  ]
})

router.beforeEach((to,from,next)=>{
  getPageInfo({
    currentPage:to.name,
    prevPage:from.name
  })
  recordPage()
  next()
})

export default router;