import axios from 'axios'
import API from '@/utils/api'
import store from '@/store'
import  http  from "@/utils/data.js"
import  ComplexOverlay  from '@/utils/prototype.js'
export default{ //很关键
    hasClass:(ele, cls) =>  {
        return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    },
    //为指定的dom元素添加样式
    addClass:(ele, cls) => {
        if (!this.hasClass(ele, cls)) ele.className += " " + cls;
    },
    //删除指定dom元素的样式
    removeClass:(ele, cls) => {
        if (this.hasClass(ele, cls)) {
         var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
         ele.className = ele.className.replace(reg, " ");
        }
    },
    //如果存在(不存在)，就删除(添加)一个样式
    toggleClass:(ele,cls) => { 
        if(this.hasClass(ele,cls)){ 
          this.removeClass(ele, cls); 
        }else{ 
            this.addClass(ele, cls); 
        } 
    },
    locationSuccess:function(obj){
        var that = this;
        obj.addEventListener("locationSuccess", function(e){
            // 定位成功事件
            store.state.mapData.latitude = e.point.lat;
            store.state.mapData.longitude = e.point.lng;
            var json = {};
            json = store.state.mapData;
            that.showHouse(json)
        });
    },
    movingEvent:function(obj){
        var that = this;
        obj.addEventListener("moving", function(e){
            let map = store.state.map;
            let mapData = store.state.mapData;
            if(mapData.isOverLay){
                var json = {};
                json = store.state.mapData;
                that.showHouse(json)
            }else{
                var cp = map.getCenter();
                store.state.mapData.latitude = cp.lat;
                store.state.mapData.longitude = cp.lng;
                var json = {};
                json = store.state.mapData;
                that.showHouse(json)
            }
            
        });
    },
    zoomendEvent:function(obj){
        var that = this;
        obj.addEventListener("zoomend", function(e){
            let map = store.state.map;
            let mapData = store.state.mapData;
            if(mapData.isOverLay){
                var json = {};
                json = store.state.mapData;
                that.showHouse(json)
            }else{
                let zoom = e.currentTarget.getZoom();
                var cp = obj.getCenter();
                store.state.mapData.latitude = cp.lat;
                store.state.mapData.longitude = cp.lng;
                store.state.mapData.scale =  zoom;
                var json = {};
                json = store.state.mapData;
                that.showHouse(json)
            }
            
        });
    },
    showHouse:function(data){
        if(data.findHouseRank == 1){
            switch (data.scale) {
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    this.showPrcHouse();
                    break;
                case 10:
                case 11:
                case 12:
                    this.showPrcHouse();
                    break;
                case 13:
                case 14:
                    this.showCeaHouse(data);
                    break
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                    this.showVillageHouse(data)
                    break;
            
                default:
                    break;
            }
        }else if(data.findHouseRank == 2){
            switch (data.scale) {

                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                    this.showMetroStationHouse(data);
                    break
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                    this.showVillageHouse(data)
                    break;
            
                default:
                    break;
            }
        }
        
        
    },
    showPrcHouse:function(){
        let map = store.state.map;
        let httpData = store.state.mapBaseData;
        let that = this;
        // map.enableMassClear();
        map.getOverlays().map((val)=>{
            if(val._type=="ComplexOverlay"){
               map.removeOverlay(val)
            }else{}
            return;
        })
        let point = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
        // 创建点坐标 
        let mapData = store.state.mapData; 
        if(!mapData.isOverLay){
            map.centerAndZoom(point,store.state.mapData.scale);
        }
        httpData.provincialList.map((val,index)=>{
            
            var txt = val.prcName, mouseoverTxt = val.roomCount + "间";
            var myCompOverlay = new ComplexOverlay.ComplexPrcOverlay(new BMap.Point(val.longitude,val.latitude), txt,mouseoverTxt,"ComplexOverlay");
            map.addOverlay(myCompOverlay);
            //覆盖物添加点击事件+
            myCompOverlay._div.addEventListener('touchstart',function(){
                map.disableDragging();  //禁用地图拖拽功能
            });
            myCompOverlay._div.addEventListener("click", function () {
                that.showCeaHouse(val);
            });
            return;
        })
    },
    showCeaHouse:function(data){
        let map = store.state.map;
        let mapData = store.state.mapData;
        let httpData = store.state.mapBaseData;
        let that = this;
        let bounds = map.getBounds();
        // map.enableMassClear();
        map.getOverlays().map((val)=>{
            if(val._type=="ComplexOverlay"){
               map.removeOverlay(val)
            }else{}
            return;
        })
        let point = new BMap.Point(data.longitude,data.latitude);
        store.state.mapData.latitude = data.latitude;
        store.state.mapData.longitude = data.longitude;
        store.state.mapData.scale = 14
        // 创建点坐标  
        if(!mapData.isOverLay){
            map.centerAndZoom(point,store.state.mapData.scale);
        }
        let overlays = map.getOverlays();
        if(store.state.mapData.prcId){
            httpData.ceaList.map((val,index)=>{
                if(val.prcId == store.state.mapData.prcId){
                    
                    var txt = val.ceaName, mouseoverTxt = val.roomCount + "间";
                    var myCompOverlay = new ComplexOverlay.ComplexCeaOverlay(new BMap.Point(val.longitude,val.latitude), txt,mouseoverTxt,"ComplexOverlay");
                    map.addOverlay(myCompOverlay);
                    //覆盖物添加点击事件+
                    myCompOverlay._div.addEventListener('touchstart',function(){
                        map.disableDragging();  //禁用地图拖拽功能
                    });
                    myCompOverlay._div.addEventListener("click", function () {
                        store.state.mapData.scale = 15;
                        val.isSlider = data.isSlider;
                        that.showVillageHouse(val);
                    });
                }
                return;
            })
        }else{
            
            httpData.ceaList.map((val,index)=>{
                var txt = val.ceaName, mouseoverTxt = val.roomCount + "间";
                var myCompOverlay = new ComplexOverlay.ComplexCeaOverlay(new BMap.Point(val.longitude,val.latitude), txt,mouseoverTxt,"ComplexOverlay");
                map.addOverlay(myCompOverlay);
                //覆盖物添加点击事件+
                myCompOverlay._div.addEventListener('touchstart',function(){
                    map.disableDragging();  //禁用地图拖拽功能
                });
                myCompOverlay._div.addEventListener("click", function () {
                    store.state.mapData.scale = 15;
                    val.isSlider = data.isSlider;
                    that.showVillageHouse(val);
                });
                return;
            })
        }
    },
    showVillageHouse:function(data){
        let map = store.state.map;
        
        let httpData = store.state.mapBaseData;
        map.getOverlays().map((val)=>{
            if(val._type=="ComplexOverlay"){
               map.removeOverlay(val)
            }else{}
            return;
        })
        let point = new BMap.Point(data.longitude,data.latitude);
        store.state.mapData.latitude = data.latitude;
        store.state.mapData.longitude = data.longitude;
        store.state.mapData.scale = 15;
        // 创建点坐标  
        let mapData = store.state.mapData; 
        if(!mapData.isOverLay){
            map.centerAndZoom(point,store.state.mapData.scale);
        }
        let bounds = map.getBounds();
        if(store.state.mapData.ceaId){
            httpData.villageList.map((val,index)=>{
                if(val.ceaId == store.state.mapData.ceaId){
                    if(bounds.He < val.longitude&&val.longitude < bounds.Ce && bounds.Rd < val.latitude&&val.latitude < bounds.Pd){
                        var txt = val.villageName, mouseoverTxt = val.roomCount + "间";
                        var myCompOverlay = new ComplexOverlay.ComplexCeaOverlay(new BMap.Point(val.longitude,val.latitude), txt,mouseoverTxt,"ComplexOverlay");
                        map.addOverlay(myCompOverlay);
                        //覆盖物添加点击事件+
                        myCompOverlay._div.addEventListener('touchstart',function(){
                        map.disableDragging();  //禁用地图拖拽功能
                        });
                        myCompOverlay._div.addEventListener("click", function () {
                        // that.clickCea(val);
                        alert(val.villageId,val.villageName)
                        });
                    }
                }
                return;
                })
        }else{
            httpData.villageList.map((val,index)=>{
                if(bounds.He < val.longitude&&val.longitude < bounds.Ce && bounds.Rd < val.latitude&&val.latitude < bounds.Pd){
                    var txt = val.villageName, mouseoverTxt = val.roomCount + "间";
                    var myCompOverlay = new ComplexOverlay.ComplexCeaOverlay(new BMap.Point(val.longitude,val.latitude), txt,mouseoverTxt,"ComplexOverlay");
                    map.addOverlay(myCompOverlay);
                    //覆盖物添加点击事件+
                    myCompOverlay._div.addEventListener('touchstart',function(){
                    map.disableDragging();  //禁用地图拖拽功能
                    });
                    myCompOverlay._div.addEventListener("click", function () {
                    // that.clickCea(val);
                    alert(val.villageId,val.villageName)
                    });
                }
            return;
            })
        }
        
        
    },
    showMetroStationHouse:function(data){
        //地铁房源
        let map = store.state.map;

        let httpMetroStationData = http.queryMetroStationMapData.data;
        let that = this;
        map.getOverlays().map((val)=>{
            if(val._type=="ComplexOverlay"){
               map.removeOverlay(val)
            }else{}
            return;
        })
        let point = new BMap.Point(data.longitude,data.latitude);
        store.state.mapData.latitude = data.latitude;
        store.state.mapData.longitude = data.longitude;
        store.state.mapData.scale = 12;
        // 创建点坐标  
        let mapData = store.state.mapData; 
        if(!mapData.isOverLay){
            map.centerAndZoom(point,store.state.mapData.scale);
        }
        let bounds = map.getBounds();
        httpMetroStationData.metroStationList.map((val,index)=>{
          var txt = val.stationName, mouseoverTxt = val.roomCount + "间";
          var myCompOverlay = new ComplexOverlay.ComplexMetroStationOverlay(new BMap.Point(val.longitude,val.latitude), txt,mouseoverTxt,"ComplexOverlay");
        //   myCompOverlay.disableMassClear();
          map.addOverlay(myCompOverlay);
          //覆盖物添加点击事件+
          
          myCompOverlay._div.addEventListener('touchstart',function(){
           map.disableDragging();  //禁用地图拖拽功能
          });
          myCompOverlay._div.addEventListener("click", function () {
            that.showVillageHouse(val);
          });
          return;
        })
    }
}
