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
      cityPinyin:'sh',
      url: "https://www.qk365.com"
    },
    keywordsSearch:{},//搜索关键词
    region:{},//筛选区域
    regionTemp:{},//筛选区域缓存
    pointSearch:null,
    fixSite:{},
    mapData:{
      type:1,
      cityId:2,
      radius:0,
      villageId:null,
      showRoomList:false,
      latitude:31.2363429624,
      longitude:121.4803295328,
      scale:11,
      levelType:2,
      isOverLay:false,    //显示覆盖物里的房源
      isInvFind:false,    //是否使用滑块改变scale
      isClickZoom:false,      //是否点击缩放
    },
    map:"",     //map对象
    circleObj:null,     //阴影圆对象
    cityList:null,
    screen:null, //筛选条件
    screenTemp:null,//筛选条件缓存
    mapBaseDataReady:false,
    metroStationData:{},      // 上一次的地铁站点
    coverDataList:[],
    metroList:[],
    priceList:[],
    provincialList:[],
    roomFeatureList:[],
    roomRentList:[],
    trafficSpeedList:[],
    roomTypeList:[],
    toast:null,
    banners:[]
  },
  mutations: {
    //state赋值公共方法
    assign(state,data){
      let keys = Object.keys(data)
      for(let i=0;i<keys.length;i++){
        state[keys[i]] = data[keys[i]]
      }
    },
    clearSearh(state){
      state.keywordsSearch={};
      let mapDataAss = {
        latitude:state.currentCity.latitude,
        longitude:state.currentCity.longitude,
        levelType:2,
        scale:11,
        showRoomList:false
      }
      Object.assign(state.mapData,mapDataAss)
    },
    clearScreen(state){ //搜索后青客筛选条件
      state.screen = null;
      state.screenTemp = null;
      state.region = {};
      state.regionTemp = {};
    },
    assignMapData(state,data){
      Object.assign(state.mapData,data)
    },
    showToast(state,msg){
      state.toast = msg
    },
    currentCityChange(state,index){
      let currentCity = state.cityList[index];
      localStorage.setItem("currentCity", JSON.stringify(currentCity));
      currentCity.confirm = true;
      state.currentCity = currentCity;
      this.commit('mapDataChangelatitudeAndLongitude',{
        latitude:currentCity.latitude,
        longitude:currentCity.longitude
      })
    },
    currentCityAddConfirm(state){
      state.currentCity.confirm = true;
      let currentCity = state.currentCity;
      this.commit('mapDataChangelatitudeAndLongitude',{
        latitude:currentCity.latitude,
        longitude:currentCity.longitude
      })
    },
    mapDataChangelatitudeAndLongitude(state,data){
      state.mapData.latitude = data.latitude;
      state.mapData.longitude = data.longitude;
    },
    mapBaseData(state,data){
      Object.keys(data).forEach((key)=>{
        state[key] = data[key]
      })
    },
    searchCompelet(state,data){
      if(data.typeId!=3){
        //地铁线没有经纬度
        state.mapData.latitude = data.latitude;
        state.mapData.longitude = data.longitude;
      }
      let levelType;
      switch (data.typeId){
        case 1:
        levelType = 4
        break;
        case 2:
        levelType = 6
        break;
        case 3:
        levelType = 5
        break;
        case 4:
        levelType = 7
        break;
        case 6:
        levelType = 3
        break;
        case 7:
        levelType = 2
        break;
      }
      data.levelType = levelType
      state.keywordsSearch = data;
    },
    resetAllState(state){
      state.keywordsSearch = {};
      state.region = {};
      state.regionTemp = {};
      state.pointSearch = null;
      state.screen = null;
      state.screenTemp = null;
      state.mapData.isOverLay=false;
      state.mapData.type = 1;
      state.mapData.radius = 0;
      state.mapData.villageId = null;
      state.mapData.scale = 11;
      state.mapData.levelType = 2;
      state.mapData.showRoomList = false;
      state.mapData.isInvFind = false;
      state.mapData.isClickZoom = false;
      state.fixSite = {};
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
