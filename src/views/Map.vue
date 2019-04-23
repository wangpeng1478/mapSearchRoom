
<template>
  <div id="map">
    <div class="baidumap" id="allmap"></div>
    <p class="currentcity iconfont icon-dingwei" @click="handleAddress"><i/>{{currentCity.cityName}}</p>
    <transition name="top-bar">
    <div class="top-bar" v-if="!mapData.isOverLay">
      <a :href="currentCity.url + '/list'" target="_blank" class="iconfont icon-liebiao list" @click="handelList">列表</a>
      <router-link to="search" append class="search" @click="recordButton('地图页面点击搜索')">{{keywordsSearch.keyWords ? keywordsSearch.keyWords : '请输入您想入住的地址或区域'}}</router-link>
      <i v-show="keywordsSearch.keyWords" class="iconfont icon-guanbi" @click="handleClearSearh"></i>
      <button class="screen-btn" @click="handleComponentView('showScreen')">筛选</button>
    </div>
    </transition>
    <div class="mate" v-if="!mapData.isOverLay" @click="showMateFun">个性找房</div>
    <Mate :showScreen="showView.showScreen"  v-if="mapData.isOverLay" @mateScreen="mateScreenFun" @hiddenMate="hiddenMateFun"/>
    <transition name="roomlist">
    <RoomList @roomListDestroy ='roomListDestroy' :villageId="mapData.villageId" v-if="showRoomList"/>
    </transition>
    <transition name="screen">
      <Screen ref="screen" v-if="showView.showScreen" @selectionArea="selectionArea" @screen='mapScreen'/>
    </transition>
    <transition name="screen">
    <RegionAndMetro v-if="showView.showRegionAndMetro" @hiddenRegion="hiddenRegion"/>
    </transition>
    <div class="mask" v-if="showView.showMask" @click="viewSetDefault"></div>
  </div>
</template>


<script>
  import Mate from '@/components/Mate.vue'
  import Swiper from 'swiper'
  import RoomList from '@/components/RoomList'
  import Screen from '@/components/Screen'
  import RegionAndMetro from '@/components/RegionAndMetro'
  import {mapState,mapMutations} from 'vuex'
  import {recordButton} from '@/utils/record'
  export default {
    name: 'Map',
    data () {
      return{
        showView:{},
        geolocationControl:null
      }
    },
    components:{
      Mate,
      RoomList,
      Screen,
      RegionAndMetro,
     
    },
    computed:{
      ...mapState(['currentCity','keywordsSearch','mapData','cityList','pointSearch','screen','mapBaseDataReady','map','circleObj','fixSite','houseState']),
      showRoomList(){
        return this.mapData.showRoomList;
      },
      cityId(){
        return this.currentCity.cityId;
      }
    },
    watch:{
      cityId(){
        this.baiduMap();
      }
    },
    beforeMount : function () {
      this.viewSetDefault()
      this.$nextTick(function(){
        this.baiduMap();
      })
    },
    mounted:function() {
      new Swiper ('.baner', {
                  direction: 'horizontal', // 垂直切换选项
                  loop: true, // 循环模式选项
                  autoplay: true,
                })
    },
    methods : {
      ...mapMutations(['assign','clearSearh','assignMapData','clearScreen']),
      handelList(){
        recordButton('地图页面点击列表')
      },
      handleAddress(){
        recordButton('地图页面清空搜索')
        this.$router.push('/'+this.currentCity.cityPinyin+'/map/address')
      },
      mapScreen(){
        //地图条件搜索
        console.log("queding")
        let _this = this;
        let map = this.map;
        var json = {};
        this.showView.showMask=false;
        this.showView.showScreen=false;
        if(this.screen.villageId){
          this.assign({houseState:[this.screen.villageId,[]]})
        }
        if(this.mapData.isOverLay){
          Object.assign(json,this.screen);
          json.longitude = this.mapData.longitude;
          json.latitude = this.mapData.latitude;
          json.levelType = this.mapData.levelType;
          json.radius = this.mapData.radius;
          this.$.showCoverHouse(json);
        }else{
          
          //去除圆形阴影
          if(this.circleObj){
              map.removeOverlay(_this.circleObj);
              this.assign({circleObj:null})
          }
          Object.assign(json,this.screen);
          delete json["latitude"];
          delete json["longitude"];
          this.assignMapData({
            levelType:json.levelType,
            scale:_this.$.toScale(json.levelType),
            isClickZoom:true
          })
          if(json.ceaId){
            delete json["ceaId"];
          }
          if(json.prcId){
            delete json["prcId"];
          }
          this.$.showHouse(json);
         this.assign({fixSite:{}})
        }
      },
      handleClearSearh(){
        recordButton('地图页面清空搜索')
        this.clearSearh()
        var json = {
          cityId:this.currentCity.cityId,
          levelType:2
        };
        Object.assign(json,this.screen)
        this.$.showHouse(json);
        this.assign({fixSite:{}})
      },
      showMateFun:function(){
        //个性找房
        recordButton('地图页面点击个性找房')
        //筛选条件置空
        this.clearScreen()
        this.assignMapData({
          isOverLay:true,
          isClickZoom:true
        })
        this.assign({keywordsSearch:{}})
        this.geolocationControl.setOffset(new BMap.Size(10,180))
        this.assign({fixSite:{}})
      },
      hiddenMateFun: function(msg){
        this.assignMapData({
          isOverLay:msg
        })
        this.geolocationControl.setOffset(new BMap.Size(10,30));

        var json = {};
        json.cityId = this.currentCity.cityId;
        json.levelType = 2;
        Object.assign(json,this.screen)
        this.$.showHouse(json);
      },
      baiduMap: function () {
        this.assignMapData({
          isClickZoom:true,
          showRoomList:false
        })
        //模拟数据
        let map = new BMap.Map("allmap");
        let _this = this;
        // 创建地图实例 
        let point = this.$.getMapPoint('mapData')
        // 创建点坐标  
        map.centerAndZoom(point,_this.mapData.scale);
        // 初始化地图，设置中心点坐标和地图级别 
        map.enableScrollWheelZoom(true);
        map.addEventListener("touchmove", function () {
          map.enableDragging();
        });
        let geolocationControl= new BMap.GeolocationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,offset:new BMap.Size(10,30)});
        this.geolocationControl = geolocationControl;
        map.addControl(geolocationControl); 
        //监听定位控件
        this.$.locationSuccess(geolocationControl,this);
        //监听拖拽事件
        this.$.movingEvent(map);
        //监听缩放事件
        this.$.zoomendEvent(map);

        //定位图标
        let marker = new BMap.Marker(point);  // 创建标注
        marker.disableMassClear();
        map.addOverlay(marker);               // 将标注添加到地图中
        this.assign({map})
        var json = {};
        json.cityId = this.currentCity.cityId;
        json.levelType = 2;
        Object.assign(json,_this.screen)
        if(this.mapData.isOverLay){
          map.clearOverlays();
            this.mapData.latitude = this.pointSearch.lat;
            this.mapData.longitude = this.pointSearch.lng;
          this.showMateFun();
        }else{
          if(this.keywordsSearch.tableId){
            
            switch(this.keywordsSearch.typeId){
              case 1:
                this.assign({houseState:[this.keywordsSearch.tableId,[]]})
                json.levelType = 4;
                break;
              case 2:
                json.levelType = 6;
                json.metroId  = this.keywordsSearch.metroId;
                json.stationId = this.keywordsSearch.tableId;
                break;
              case 3:
                json.levelType = 5;
                json.metroId  = this.keywordsSearch.tableId;
                break;
              case 4:
                //公交站点
                json.levelType = 7;
                break;
              case 6:
                json.levelType = 3;
                break;
              case 7:
                json.levelType = 2;
                break;
            }
            this.assignMapData({levelType:json.levelType})
            this.$.showSearchHouse(json)
          }else{
            this.assignMapData({
              scale:11
            })
            this.$.showHouse(json);
          }
        }
          //定位
        // var geolocation = new BMap.Geolocation();
        // geolocation.enableSDKLocation();
        // geolocation.getCurrentPosition(function(r){
        //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //     // var mk = new BMap.Marker(r.point);
        //     // map.addOverlay(mk);
        //     map.panTo(r.point);
        //     // alert('您的位置：'+r.point.lng+','+r.point.lat);
        //   }
        //   else {
        //     alert('failed'+this.getStatus());
        //   }        
        // });
      },
      mateScreenFun:function(msg){
        this.handleComponentView(msg)
      },
      handleComponentView(component){
        if(component=='showScreen') recordButton('地图页面点击筛选')
        this.showView[component] = true;
        this.showView.showMask=true;
        this.roomListDestroy();
      },
      viewSetDefault(){
          if(this.mapData.isOverLay){
            this.showView = {
              showScreen:false,
              showRegionAndMetro:false,
              showMask:false,
              showModel:false
            }
        }else{
          this.showView = {
            showScreen:false,
            showRegionAndMetro:false,
            showMask:false,
            showModel:false
          }
        }
      },
      selectionArea(){
        this.showView.showRegionAndMetro=true;
        // 
      },
      hiddenRegion(){
        this.showView.showRegionAndMetro=false;
      },
      roomListDestroy(){
        this.assignMapData({
          showRoomList:false
        })
      }
    }
  }
</script>

<style scoped>

#map{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.baidumap{
  height: 100%;
  width: 100%;
}

.mate{
  position: fixed;
  right: -5vw;
  bottom: 20vw;
  width: 24vw;
  height: 9vw;
  line-height: 9vw;
  padding-left: 5vw;
	background-color: #ff9900;
  border-radius: 5vw;
  
  font-size: 4vw;
	letter-spacing: 0vw;
	color: #ffffff;
}
.currentcity{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 18vw;
  margin: auto;
  height: 8vw;
  background-color:rgba(255, 255, 255, 0.8);
  border-radius: 0 0 1vw 1vw;
  font-size: 3.733vw;
  text-align: center;
  line-height: 8vw;
  color: #00ac84;
}
  .top-bar{
    position: fixed;
    top:10vw;
    left: 0;
    right: 0;
    width: 92vw;
    height: 12vw;
    background: #ffffff;
    border-radius: 1.067vw;
    box-shadow: 0.28vw 0.28vw 0.667vw 0vw 
		rgba(0, 11, 10, 0.2);
    margin:auto;
  }
  .top-bar .search{
    display: block;
    width: 56.2vw;
    height: 12vw;
    display: block;
    overflow: hidden;
    line-height: 12vw;
    text-indent: 2.6vw;
    float: left;
    color: #666;
    font-size: 3.2vw;
    position: relative;
  }
  .top-bar .icon-guanbi{
    display: block;
    position: absolute;
    color: #666;
    width: 8vw;
    height: 12vw;
    right: 17vw;
    top: 0;
    font-size: 4vw;
    line-height: 12vw;
    font-weight: bold;
    text-align: center;
  }
  .top-bar .search::before,.top-bar .search::after{
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 6.1vw;
    top: 3vw;
    background: #bfbfbf;
  }
  .top-bar .search::before{
    left: 0;
  }
  .top-bar .search::after{
    right: 0;
  }
  .screen-btn{
    padding: 0;
    width: 16vw;
    height: 12vw;
    float: right;
    text-align: center;
    font-size: 4vw;
    line-height: 4vw;
  }
  .list{
    float: left;
    width: 19vw;
    line-height: 12vw;
    text-align: center;
    color: #303030;
    font-size: 4vw;
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 5;
    background: rgba(0, 0, 0, 0.5);
  }


  .shadow{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 95vw;
    height: 95vw;
    border-radius: 100%;
    background-color: #78e9fe;
    opacity: 0.35;
    z-index: 10;
    margin: auto;
  }

  .find-house{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 24vw;
    height: 21vw;
    z-index: 20;
    margin: auto;
  }

  .find-house p{
    position: relative;
    width: 24vw;
    height: 7vw;
    text-align: center;
    line-height: 7vw;
    background-color: #ffffff;
    border-radius: 1vw;
    font-size: 4vw;
    letter-spacing: 0vw;
    color: #272727;
    box-shadow: 0vw 0vw 1vw 0vw 
		rgba(0, 11, 10, 0.2);
  }
  .find-house p::before{
    content: "";
    position: absolute;
    top:5.5vw;
    left: 9.5vw;
    border-width: 3vw;
    border-style: solid;
    border-color: #ffffff transparent transparent;
  }

  .site-pin{
    width: 6vw;
    height: 12vw;
    background-size: 100%;
    margin-left: 9.5vw;
    margin-top: 2vw;
  }

  /*过渡动画*/
  .screen-enter-active,.screen-leave-active {
  transition: all .3s linear;
}
.screen-enter, .screen-leave-to{
  transform: translateX(40vw);
  opacity: 0;
}
.top-bar-enter-active,.top-bar-leave-active {
  transition: all .3s linear;
}
.top-bar-enter, .top-bar-leave-to{
  transform: translateY(-10vw);
  opacity: 0;
}
.roomlist-enter-active,.roomlist-leave-active {
  transition: all .3s linear;
}
.roomlist-enter, .roomlist-leave-to{
  bottom: -70vh;
}
</style>

<style>

html,body,#app{
  height: 100%;
  width: 100%;
}
.location_label{
    position : absolute;
    color : white;
    line-height : 4vw;
    white-space : nowrap;
    -moz-user-select : none;
    font-size : 2.8vw;
}

.label_arrow{
    position : relative;
    overflow : hidden;
    width: 0vw;
    height: 0vw;
}

.label_area_name,.label_area_cea_name{
  position : absolute;
  left: 50%;
  min-width:7vw;
  height : 5vw;
  line-height : 5vw;
  padding : 0vw 2vw;
  background : #ff9900;
  border-radius : 1vw;
  text-align : center;
  transform : translate(-50%)
}

.location_site_label{
  position : absolute;
  white-space : nowrap;
  -moz-user-select : none;
  font-size : 16px;
  z-index: 10000;
}
.label_site_img{
  position : absolute;
  top: 43px;
  left: 0;
  width: 22px;
  height: 27px;
  background:url("../assets/images/icon/site2.png") no-repeat;
  background-size:100% 100%;
  margin-left:-11px;
}
.location_site_write{
  width : 14px;
  height : 16px;
  display : inline-block;
  margin : 0px;
  background : url('../assets/images/icon/write.png') no-repeat;
  background-size : 100% 100%;
  margin-left: 8px;
  vertical-align: middle;
}
.label_site_arrow{
  position : absolute;
  width : 0px;
  height : 0px;
  top: 32px;
  left : 0;
  overflow : hidden;
  margin-left: -9px;
}

.location_metro_label{
    position : absolute;
    background : #0fb896;
    color : white;
    padding : 1vw;
    line-height : 3vw;
    white-space : nowrap;
    -moz-user-select : none;
    font-size : 12px;
    z-index: 100;
    text-align:center;
    box-shadow: 5px 5px 5px #888888;
  }

  .label_metro_arrow{
    position : absolute;
    width : 0px;
    height : 0px;
    top : 4vw;
    left : 50%;
    margin-left: -3vw;
    overflow : hidden;
}

  .label_metro_circle{
    position: relative;
    display: inline-block;
    width: 3vw;
    height: 3vw;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #39AC6A;
    margin-top: 2vw;
  }


.location_label_active{
  background: red !important;
}

.location_label_arrow_active{
  border-top-color: red !important;
}


.location_label_rest{
  background: #eaeaea !important;
}

.location_label_arrow_rest{
  border-top-color: #eaeaea !important;
}
</style>


