import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import record from '@/utils/record'
import store from '@/store'
Vue.use(Router)

 const router = new Router({
  mode:'history',
  base:'/map',
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
      component: Map ,
    }
  ]
})

router.beforeEach((to,from,next)=>{
  let currentCity = store.state.currentCity;
  record(1,{
    to:to.name,
    from:from.name,
    cityId:currentCity.cityId,
    cityName:currentCity.cityName
  })
  next()
})

export default router;