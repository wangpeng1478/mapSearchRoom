
<template>
  <div id="map">
    <div class="baidumap" id="allmap"></div>
    <router-link class="currentcity iconfont icon-dingwei" to="/address"><i class=""/>上海</router-link>
    <div class="top-bar">
      <router-link to="/" target="_blank" class="iconfont icon-liebiao list">列表</router-link>
      <p class="search">请输入小区/区域/地铁<i class="iconfont icon-guanbi"></i></p>
      <button class="screen-btn" @click="handleComponentView('showScreen')">筛选</button>
    </div>
    <div class="mate" v-if="!showView.showMate" @click="showMateFun">个性找房</div>
    <Mate v-if="showView.showMate" :showMate="showView.showMate" @hiddenMate="hiddenMateFun"/>
    <RoomList v-if="showView.showRoomList"/>
    <Screen v-if="showView.showScreen"/>
    <RegionAndMetro v-if="showView.showRegionAndMetro"/>
    <div class="mask" v-if="showView.showMask" @click="viewSetDefault"></div>
  </div>
</template>


<script>
  import Mate from '@/components/Mate.vue'
  import RoomList from '@/components/RoomList'
  import Screen from '@/components/Screen'
  import RegionAndMetro from '@/components/RegionAndMetro'
  import store from '@/store'
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    name: 'Map',
    data () {
      return{
        showView:{}
      }
    },
    components:{Mate,RoomList,Screen,RegionAndMetro},
    props: {
      msg: String,
    },
    mounted : function () {
      this.viewSetDefault()
      this.$nextTick(function(){
        this.baiduMap();
      })
    },
    methods : {
      aa(){
        alert("aa")
      },
      showMateFun:function(){
        this.showView.showMate = true;
        var elements = document.querySelectorAll(".BMap_noprint.anchorBL")[0];
        elements.className = "BMap_noprint anchorBL bottom48"; 
        let _state = store.state.mapData;
        let map = store.state.map;
        let point = new BMap.Point(_state.site.lng,_state.site.lat);
        // let marker = new BMap.Marker(_state.site.lng,_state.site.lat);
        // map.panTo(_state.site.lng,_state.site.lat)
        // console.log(_state.site.lat,_state.site.lng)
        // map.addOverlay(marker);
        map.centerAndZoom(point, store.state.mapData.scale);
        let circle = new BMap.Circle(point,store.state.mapData.distance,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
        
        map.addOverlay(circle); //增加圆
      },
      hiddenMateFun: function(msg){
        this.showView.showMate = msg;
      },
      baiduMap: function () {
        let map = new BMap.Map("allmap");
        let _state = this.$store.state;
        _state.map = map;
        // 创建地图实例 
        let point = new BMap.Point(_state.mapData.site.lng,_state.mapData.site.lat);
        // 创建点坐标  
        map.centerAndZoom(point,_state.mapData.scale);
        // 初始化地图，设置中心点坐标和地图级别 
        map.enableScrollWheelZoom(true);
        let geolocationControl = new BMap.GeolocationControl();
        map.addControl(geolocationControl); 

        //监听定位控件
        this.$.locationSuccess(geolocationControl);

        //定位图标
        // let marker = new BMap.Marker(point);  // 创建标注
        // marker.disableMassClear();
        // map.addOverlay(marker);               // 将标注添加到地图中
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

        // 复杂的自定义覆盖物
        function ComplexCustomOverlay(point, text, mouseoverText){
          this._point = point;
          this._text = text;
          this._overText = mouseoverText;
        }
        ComplexCustomOverlay.prototype = new BMap.Marker();
        ComplexCustomOverlay.prototype.initialize = function(map){ 
          this._map = map;
          var div = this._div = document.createElement("div");
          div.className = "location_label";
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          div.style.width = "14vw";
          div.style.height = "8vw";

          var p = this._p = document.createElement("p");
          p.style.margin = "0px";
          div.appendChild(p);
          p.appendChild(document.createTextNode("¥1500+"));
          var p2 = this._p = document.createElement("p");
          p2.style.margin = "0px";
          div.appendChild(p2);
          p2.appendChild(document.createTextNode("1000间"));

          var arrow = this._arrow = document.createElement("div");
          arrow.className = "label_arrow";
          arrow.style.border = "8vw solid transparent";
          arrow.style.borderTop = "3vw solid #0fb896";
          div.appendChild(arrow);

          var p3 = this.p3 = document.createElement("p");
          p3.className = "label_area_name";
          div.appendChild(p3);
          p3.appendChild(document.createTextNode("银湖海岸城"));
        

          map.getPanes().labelPane.appendChild(div);
          
          return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
          var map = this._map;
          var pixel = map.pointToOverlayPixel(this._point);
          this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
          this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
        }
        var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
            
        var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.407845,39.914101), "银湖海岸城");

        myCompOverlay.disableMassClear();
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
        map.addOverlay(myCompOverlay);

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
        this.showView[component] = true;
        this.showView.showMask=true;
      },
      viewSetDefault(){
        this.showView = {
          showMate: false,
          showScreen:false,
          showRoomList:false,
          showRegionAndMetro:false,
          showMask:false
        }
      }
    }
  }
</script>





<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
/* a {
  color: #42b983;
} */


.baidumap{
  height: 100vh;
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
    top:0;
    left: 0;
    right: 0;
    width: 92vw;
    height: 12vw;
    background: #ffffff;
    border-radius: 1.067vw;
    box-shadow: 0.28vw 0.28vw 0.667vw 0vw 
		rgba(0, 11, 10, 0.2);
    margin: 10vw auto 0;
  }
  .top-bar .search{
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
  .top-bar .search i{
    display: block;
    position: absolute;
    color: #666;
    width: 8vw;
    height: 12vw;
    right: 0;
    top: 0;
    font-size: 3vw;
    line-height: 12vw;
    font-weight: bold;
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
</style>

<style>
.location_label{
    position : absolute;
    background : #0fb896;
    color : white;
    padding : 1vw;
    line-height : 4vw;
    white-space : nowrap;
    -moz-user-select : none;
    font-size : 4vw;
}

.label_arrow{
    position : absolute;
    width : 0px;
    height : 0px;
    top : 10vw;
    left : 0px;
    overflow : hidden;
}

.label_area_name{
  position : absolute;
  margin : 0px;
  height : 5vw;
  line-height : 5vw;
  padding : 0vw 2vw;
  background : #ff9900;
  border-radius : 1vw;
  margin-left : -5vw;
  margin-top : 4vw;
  text-align : center;
}
  .BMap_noprint.anchorBL{
    left: auto !important;
    right: 10px !important;
  }
</style>

