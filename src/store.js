import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    currentCity:{
      cityId:2,
      cityName:'上海',
      latitude: 31.2363429624,
      longitude: 121.4803295328,
      url: "https://www.qk365.com"
    },
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
    cityList:null,

    //mapBaseData
    metroList:[],
    priceList:[],
    provincialList:[],
    roomFeatureList:[],
    roomRentList:[],
    trafficSpeedList:[]
  },
  mutations: {
    //state赋值公共方法
    assign(state,data){
      state[data.key] = data.value
    }
  },
  actions: {
    assignAsync(context,key,data){
      context.commit('assign',key,data)
    }
  },
  getters: {
    getMap:state => {
      return state.mapData;
    }
  },
})
