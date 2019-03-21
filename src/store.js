import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapData:{
      type:2,
      sliderLeft:0,
      scale:15,
      speed:1000,
      time:20,
      site:{
        lat: 39.9093,
        lng: 116.3964
      },
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
