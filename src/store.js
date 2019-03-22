import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapData:{
      type:2,
      sliderLeft:0,
      scale:11,
      speed:800,
      time:20,
      latitude:31.2363429624,
      longitude:121.4803295328,
      prcId:0,
      ceaId:0,
      villageId:0,
      isOverLay:false,
      isInvFind:false,
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
