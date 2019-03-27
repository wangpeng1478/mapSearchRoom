import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    mapData:{
      type:2,
      scale:11,
      speed:800,
      time:20,
      latitude:31.2363429624,
      longitude:121.4803295328,
      prcId:0,
      ceaId:0,
      villageId:0,
      isOverLay:false,    //显示覆盖物里的房源
      isInvFind:false,    //是否使用滑块改变scale
      findHouseRank:1          //1  区域找房       2 地铁找房
    },
    map:"",
    queryCityList:null,
    queryMapBaseData:null
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
