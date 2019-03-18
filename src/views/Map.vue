
<template>
  <div id="map">
    <router-link to="/Address">上海</router-link>
    <div class="baidumap" id="allmap"></div>
    <div class="mate" v-if="!showMate" @click="showMateFun">个性找房</div>
    <Mate v-if="showMate" :showMate="showMate" @hiddenMate="hiddenMateFun"/>
    <RoomList/>
  </div>
</template>


<script>
  import Mate from '@/components/Mate.vue'
  import RoomList from '@/components/RoomList'
  export default {
    name: 'Map',
    data () {
      return{
        showMate: false,
      }
    },
    components:{Mate,RoomList},
    props: {
      msg: String,
    },
    mounted : function () {
      this.$nextTick(function(){
        this.baiduMap();
      })
    },
    methods : {

      showMateFun:function(){
        this.showMate = true;
        var elements = document.querySelectorAll(".BMap_noprint.anchorBL")[0];
        elements.className = "BMap_noprint anchorBL bottom48"; 
      },
      hiddenMateFun: function(msg){
        this.showMate = msg;
      },
      baiduMap: function () {
        var map = new BMap.Map("allmap");
        // 创建地图实例  
        var point = new BMap.Point(116.3964,39.9093);
        // 创建点坐标  
        map.centerAndZoom(point, 15);
        // 初始化地图，设置中心点坐标和地图级别 
        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.GeolocationControl());   
        //定位图标
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画


        // 复杂的自定义覆盖物
        function ComplexCustomOverlay(point, text, mouseoverText){
          this._point = point;
          this._text = text;
          this._overText = mouseoverText;
          console.log(this)
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
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
            
        var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.407845,39.914101), "银湖海岸城",mouseoverTxt);

        map.addOverlay(myCompOverlay);

          //定位
        // var geolocation = new BMap.Geolocation();
        // geolocation.enableSDKLocation();
        // geolocation.getCurrentPosition(function(r){
        //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //     var mk = new BMap.Marker(r.point);
        //     map.addOverlay(mk);
        //     map.panTo(r.point);
        //     alert('您的位置：'+r.point.lng+','+r.point.lat);
        //   }
        //   else {
        //     alert('failed'+this.getStatus());
        //   }        
        // });
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
a {
  color: #42b983;
}


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

