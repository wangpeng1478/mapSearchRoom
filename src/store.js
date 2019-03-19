import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapData:{
      type:2,
      sliderLeft:0,
    },
    map:"",
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getMap:state => {
      return state.mapData;
    }
  },
})
