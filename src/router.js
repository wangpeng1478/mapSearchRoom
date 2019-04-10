import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import store from '@/store'
import {getPageInfo,recordPage} from '@/utils/record'
Vue.use(Router)

 const router = new Router({
  mode:'hash',
  base:"/sh/map",
  routes: [
    
    {
      path: '/',
      name: 'Map',
      component: Map ,
    },{
      path:'/address',
      name:'Address',
      component: () => import('./views/Address.vue')
    },{
      path:'/search',
      name:'Search',
      component: () => import('./views/Search.vue')
    },
    { 
      path: '*', 
      name: 'Map',
      redirect:'/'
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