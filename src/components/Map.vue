


<template>
  <div id="map">
    <div class="baidumap" id="allmap"></div>
  </div>
</template>


<script>

export default {
  name: 'Map',
  props: {
    msg: String
  },
  mounted : function () {
    this.$nextTick(function(){
      this.baiduMap();
    })
  },
  methods : {
    baiduMap: function () {
      var map = new BMap.Map("allmap");
      // 创建地图实例  
      var point = new BMap.Point(116.3964,39.9093);
      // 创建点坐标  
      map.centerAndZoom(point, 15);
      // 初始化地图，设置中心点坐标和地图级别 
      map.enableScrollWheelZoom(true);
      map.addControl(new BMap.GeolocationControl());   


// 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){ 
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#0fb896";
      div.style.color = "white";
      div.style.width = "60px";
      div.style.height = "18px";
      div.style.padding = "2px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "0px";
      arrow.style.height = "0px";
      arrow.style.border = "30px solid transparent";
      arrow.style.borderTop = "15px solid #0fb896";
      arrow.style.top = "22px";
      arrow.style.left = "0px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);
     
      div.onmouseover = function(){
        this.style.backgroundColor = "#6BADCA";
        this.style.borderColor = "#0000ff";
        this.getElementsByTagName("span")[0].innerHTML = that._overText;
        arrow.style.backgroundPosition = "0px -20px";
      }

      div.onmouseout = function(){
        this.style.backgroundColor = "#EE5D5B";
        this.style.borderColor = "#BC3B3A";
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "0px 0px";
      }

      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 30 + "px";
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
  height: 600px;
  width: 100%;
}
</style>
