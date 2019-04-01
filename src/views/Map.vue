
<template>
  <div id="map">
    <div class="baidumap" id="allmap"></div>
    <router-link class="currentcity iconfont icon-dingwei" to="/address"><i class=""/>{{currentCity.cityName}}</router-link>
    <transition name="top-bar">
    <div class="top-bar" v-if="showView.showTopBar">
      <a :href="currentCity.url + '/list'" target="_blank" class="iconfont icon-liebiao list" @click="handelList">列表</a>
      <router-link to="/search" class="search">{{keywordsSearch.keyWords ? keywordsSearch.keyWords : '请输入小区/区域/地铁'}}</router-link>
      <i class="iconfont icon-guanbi" @click="handelClearSearh"></i>
      <button class="screen-btn" @click="handleComponentView('showScreen')">筛选</button>
    </div>
    </transition>
    <div class="mate" v-if="!showView.showMate" @click="showMateFun">个性找房</div>
    <Mate v-if="showView.showMate" :showMate="showView.showMate" @hiddenMate="hiddenMateFun"/>
    <transition name="roomlist">
    <RoomList @roomListDestroy ='roomListDestroy' v-if="showView.showRoomList"/>
    </transition>
    <transition name="screen">
      <Screen v-if="showView.showScreen" @selectionArea="selectionArea" @screen='mapScreen'/>
    </transition>
    <transition name="screen">
    <RegionAndMetro v-if="showView.showRegionAndMetro" @hiddenRegion="hiddenRegion"/>
    </transition>
    <div class="mask" v-if="showView.showMask" @click="viewSetDefault"></div>
  </div>
</template>


<script>
  import axios from 'axios'
  import API from '@/utils/api'
  import Mate from '@/components/Mate.vue'
  import RoomList from '@/components/RoomList'
  import Screen from '@/components/Screen'
  import RegionAndMetro from '@/components/RegionAndMetro'
  import store from '@/store'
  import  ComplexOverlay  from '@/utils/prototype.js'
  import {mapState,mapMutations} from 'vuex'
  import record from '@/utils/record'
  export default {
    name: 'Map',
    data () {
      return{
        showView:{},
        isFind:true,
        geolocationControl:null,
      }
    },
    components:{
      Mate,
      RoomList,
      Screen,
      RegionAndMetro,
    },
    props: {
      msg: String,
    },
    computed:{
      ...mapState(['currentCity','keywordsSearch']),
      mapBaseDataReady(){
        return this.$store.state.mapBaseDataReady;
      }
    },
    mounted : function () {
      this.viewSetDefault()
      this.$nextTick(function(){
        this.baiduMap();
      })
    },
    methods : {
      ...mapMutations(['assign']),
      mapScreen(){
        //地图条件搜索
        this.showView.showMask=false;
        this.showView.showScreen=false;
        console.log('缺少筛选后的函数');
      },
      handelClearSearh(){
        this.assign({
          key:'keywordsSearch',
          value:{}
        })
      },
      handelList(){
        record(2,'地图找房页面列表按钮')
      },
      findHouse:function(){
        let map = store.state.map;
        let _state = store.state.mapData;
        let center = map.getCenter();
        map.clearOverlays();
        let point = new BMap.Point(_state.longitude,_state.latitude);
        let distance = _state.speed * _state.time;
        map.centerAndZoom(point, _state.scale);
        let circle = new BMap.Circle(point,distance,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
        
        map.addOverlay(circle); //增加圆
        store.state.mapData.isOverLay = true;
      },
      showMateFun:function(){
        record(2,'地图找房页面个性找房按钮')
        console.log("showMateFun")
        let map = this.$store.state.map;
        let _this = this;
        this.isFind = false;
        this.showView.showMate = true;
        // var elements = document.querySelectorAll(".BMap_noprint.anchorBL")[0];
        // elements.className = "BMap_noprint anchorBL bottom48";
        console.log(this.geolocationControl)
        map.removeControl(_this.geolocationControl);
        
        this.geolocationControl = new BMap.GeolocationControl({
          anchor:BMAP_ANCHOR_BOTTOM_RIGHT,
          offset:new BMap.Size(0,190)
        });
        map.addControl(geolocationControl);
        // var geoc = new BMap.Geocoder();
        // geoc.getLocation(point, function(rs){
        //   var addComp = rs.addressComponents;
        //   console.log(rs)
        // }); 
        // var content='<div class="alarmDiv">';
        // content+='<table style="width:100%;height:100%;" border="1" cellpadding="0" cellspacing="0">';
        // content+='<tr><td rowspan="4" style="width:80px;"><img src="/css/images/alarmLamp.gif" class="alarmPic"/></td>';
        // content+='<td class="tabLabel">姓名</td><td class="tabText">李二狗</td></tr><tr><td class="tabLabel">身份证号</td>';
        //     '<tr><td align="center"><img src="/css/images/testPerson.jpg"/></td><td align="center">' +
        //     '<img src="/css/images/testPerson.jpg"/></td></tr></table></td></tr></table></div>';
        // var opt = {
        //   setWidth:500,
        //   setHeight:500,
        //   setContent:'marker'
        // }
        // var InfoWindow = new BMap.InfoWindow(content,opt)
        // marker.openInfoWindow(InfoWindow);
        // store.state.mapData.isOverLay = true;
        // store.state.mapData.radius = distance;

        // this.$.showCoverByCoordinate(store.state.mapData);
      },
      hiddenMateFun: function(msg){
        this.showView.showMate = msg;
        this.isFind = true;
      },
      baiduMap: function () {
        //模拟数据
        let that = this;
        // let httpData = this.$store.state.coverDataList;
        let map = new BMap.Map("allmap");
        let _state = this.$store.state;
        _state.map = map;
        // 创建地图实例 
        let point = new BMap.Point(_state.mapData.longitude,_state.mapData.latitude);
        // 创建点坐标  
        map.centerAndZoom(point,_state.mapData.scale);
        // 初始化地图，设置中心点坐标和地图级别 
        map.enableScrollWheelZoom(true);
        map.addEventListener("touchmove", function () {
          map.enableDragging();
        });


        this.geolocationControl= new BMap.GeolocationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT});
        map.addControl(that.geolocationControl); 
         console.log("geolocationControl",this.geolocationControl)
        //监听定位控件
        this.$.locationSuccess(that.geolocationControl);
        //监听拖拽事件
        this.$.movingEvent(map);
        //监听缩放事件
        this.$.zoomendEvent(map);

        //定位图标
        let marker = new BMap.Marker(point);  // 创建标注
        marker.disableMassClear();
        map.addOverlay(marker);               // 将标注添加到地图中

        this.$.showHouse(that.showMateFun);
      
        
        // this.$.showMetroStationHouse(_state.mapData);

        




        
        // showOver();
        // var canvasLayer = new BMap.CanvasLayer({
        //         update: update
        //     });
        // function update() {
        //         var ctx = this.canvas.getContext("2d");

        //         if (!ctx) {
        //             return;
        //         }

        //         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        //         var temp = {};
        //         ctx.fillStyle = "rgba(50, 50, 255, 0.7)";
        //         ctx.beginPath();
        //         var data = [
        //             new BMap.Point(116.3964,39.9093),
        //         ];

        //         for (var i = 0, len = data.length; i < len; i++) {
        //             var pixel = map.pointToPixel(data[i]);
        //             ctx.fillRect(pixel.x, pixel.y, 30, 30);
        //         }
        //     }

        // mp.addOverlay(canvasLayer);

        // var overlay=[canvasLayer,myCompOverlay];
        

          //定位
        // var geolocation = new BMap.Geolocation();
        // geolocation.enableSDKLocation();
        // geolocation.getCurrentPosition(function(r){
        //   console.log(r)
        //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //     var mk = new BMap.Marker(r.point);
        //     map.addOverlay(mk);
        //     map.panTo(r.point);
        //     // alert('您的位置：'+r.point.lng+','+r.point.lat);
        //   }
        //   else {
        //     // alert('failed'+this.getStatus());
        //   }        
        // });
      },
      handleComponentView(component){
        record(2,'地图页面筛选')
        this.showView[component] = true;
        this.showView.showMask=true;
      },
      viewSetDefault(){
        this.showView = {
          showMate: false,
          showScreen:false,
          showRoomList:false,
          showRegionAndMetro:false,
          showTopBar:true,
          showMask:false
        }
      },
      selectionArea(){
        this.showView.showRegionAndMetro=true;
      },
      hiddenRegion(msg){
        this.showView.showRegionAndMetro=false;
      },
      roomListDestroy(){
        this.showView.showRoomList=false;
      }
    }
  }
</script>





<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#map{
  height: 100%;
  width: 100%;
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
    font-size: 3vw;
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
    background: url(../assets/images/icon/sitepin.png) no-repeat;
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
  top: 100vh;
}

</style>

<style>

html,body,#app{
  height: 100%;
  width: 100%;
}



.location_label,.location_cea_label{
    position : absolute;
    background : #0fb896;
    color : white;
    padding : 1vw;
    line-height : 4vw;
    white-space : nowrap;
    -moz-user-select : none;
    font-size : 4vw;
}

.label_arrow,.label_cea_arrow{
    position : absolute;
    width : 0px;
    height : 0px;
    top : 10vw;
    left : 0px;
    overflow : hidden;
}

.label_area_name,.label_area_cea_name{
  position : absolute;
  margin : 0px;
  width: 19vw;
  height : 5vw;
  line-height : 5vw;
  padding : 0vw 2vw;
  background : #ff9900;
  border-radius : 1vw;
  margin-left : -5vw;
  margin-top : 4vw;
  text-align : center;
}

.location_site_label{
  position : absolute;
  white-space : nowrap;
  -moz-user-select : none;
  font-size : 4vw;
  z-index: 10000;
}
.label_site_img{
  position : absolute;
  top:11vw;
  left: 50%;
  width: 5vw;
  height : 6vw;
  border-radius : 1vw;
  background:url("../assets/images/icon/site2.png") no-repeat;
  background-size:100% 100%;
  margin-left:-2.5vw;
}
.location_site_write{
  width : 3vw;
  height : 4vw;
  display : inline-block;
  margin : 0px;
  background : url('../assets/images/icon/write.png') no-repeat;
  background-size : 100% 100%;
  margin-left: 3vw;
  vertical-align: middle;
}
.label_site_arrow{
  position : absolute;
  width : 0px;
  height : 0px;
  top : 9vw;
  left : 50%;
  overflow : hidden;
  margin-left:-2vw;
}



  .location_metro_label{
    position : absolute;
    background : #0fb896;
    color : white;
    padding : 1vw;
    line-height : 4vw;
    white-space : nowrap;
    -moz-user-select : none;
    font-size : 4vw;
    z-index: 100;
  }

  .label_metro_arrow{
    position : absolute;
    width : 0px;
    height : 0px;
    top : 5vw;
    left : 5vw;
    overflow : hidden;
}
</style>


