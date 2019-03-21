import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapData:{
      type:2,
      sliderLeft:0,
      scale:11,
      speed:1000,
      time:20,
      site:{
        lat: 31.2363429624,
        lng: 121.4803295328
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
