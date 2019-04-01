import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCity:{
      cityId:2,
      cityName:'上海',
      latitude: 31.2363429624,
      longitude: 121.4803295328,
      url: "https://www.qk365.com"
    },
    keywordsSearch:{},//搜索关键词
    region:{},//筛选区域
    regionTemp:{},//筛选区域缓存

    data:{
      type:2,
      scale:11,
      
    },
    data:{
      type:2,
      cityId:2,
      speed:800,
      time:30,
      // radius:0,
      latitude:31.2363429624,
      longitude:121.4803295328,
      scale:11,
      isOverLay:false,    //显示覆盖物里的房源
      isInvFind:false,    //是否使用滑块改变scale
    },
    map:"",
    cityList:null,
    mapScreen:null,
    screen:null, //筛选条件
    screenTemp:null,//筛选条件缓存
    mapBaseDataReady:false,
    coverDataList:[],
    metroList:[],
    priceList:[],
    provincialList:[],
    roomFeatureList:[],
    roomRentList:[],
    trafficSpeedList:[],
    roomTypeList:[]
  },
  mutations: {
    //state赋值公共方法
    assign(state,data){
      state[data.key] = data.value
    },
    mapBaseData(state,data){
      Object.keys(data).forEach((key)=>{
        state[key] = data[key]
      })
    }
  },
  actions: {
    assignAsync({commit},data){
      commit('assign',data)
    }
  },
  getters: {
    getMap:state => {
      return state.mapData;
    }
  },
})
