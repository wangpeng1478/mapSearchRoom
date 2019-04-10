import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import store from '@/store'
Vue.use(Router)

 const router = new Router({
  mode:'hash',
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

  next()
})

export default router;