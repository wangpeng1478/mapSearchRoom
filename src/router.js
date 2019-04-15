import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Map from './views/Map.vue'
import {getPageInfo,recordPage} from '@/utils/record'
Vue.use(Router)
Vue.use(Meta)
 const router = new Router({
  mode:'hash',
  routes: [
    {
      path: '/:cityPY/map',
      name: 'Map',
      component: Map ,
      meta: {
        keepAlive: true, //此组件需要被缓存
      }
    },{
      path:'/:cityPY/map/address',
      name:'Address',
      component: () => import('./views/Address.vue'),
      meta: {
        keepAlive: true, //此组件需要被缓存
      }
    },{
      path:'/:cityPY/map/search',
      name:'Search',
      component: () => import('./views/Search.vue'),
      meta: {
        keepAlive: true, //此组件需要被缓存
      }
    },
    { 
      path: '*', 
      name: 'Map',
      redirect:'/sh/map',
      meta: {
        keepAlive: true, //此组件需要被缓存
      }
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