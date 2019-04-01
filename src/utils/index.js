import axios from 'axios'
import API from '@/utils/api'
import store from '@/store'
import  http  from "@/utils/data.js"
import  ComplexOverlay  from '@/utils/prototype.js'
import  Map  from '@/views/Map.vue'
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
            let _state = store.state;
            let mapData = store.state.mapData;
            if(mapData.isOverLay){
                var json = {};
                json = store.state.mapData;
                // that.showHouse(json)
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
    showHouse:function(callback,obj){
        let _state = store.state;
        if(_state.mapData.isOverLay){
            callback();
        }else{
            if(!_state.mapScreen){
                var json = {};
                json.cityId = _state.currentCity.cityId;
                json.levelType = 2;
                _state.mapScreen = Object.assign(json,_state.mapScreen)
            }
            axios.post(API["queryMapCoverData"], _state.mapScreen).then(res => {
            if (res.data.code == 0) {
                let data = res.data.data;
                store.state.coverDataList = data;
                switch (_state.mapScreen.levelType) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        this.showAreaHouse(obj);
                        break
                    case 5:
                        this.showMetroHouse(obj);
                        break
                    case 6:
                    case 7:
                }
            }
            });
        }
        
        
    },
    showCoverHouse:function(data){
        let _state = store.state;
        console.log("isOverLay",_state.mapData)
        if(_state.mapData.isOverLay){
            var json = {};
            json.longitude = _state.mapData.longitude;
            json.latitude = _state.mapData.latitude;
            Object.assign(_state.mapScreen,json);
             
            axios.post(API["queryMapCoverByCoordinate"], _state.mapScreen).then(res => {
                if (res.data.code == 0) {
                    let data = res.data.data;
                    store.state.coverDataList = data;
                    this.showAreaHouse();
                    // switch (_state.mapScreen.levelType) {
                    //     case 1:
                    //     case 2:
                    //     case 3:
                    //     case 4:
                    //         this.showAreaHouse();
                    //         break
                    //     case 5:
                    //         this.showMetroHouse();
                    //         break
                    //     case 6:
                    //     case 7:
                    // }
                }
            });
        }
        
    },
    showAreaHouse:function(obj){
        let map = store.state.map;
        let _state = store.state;
        let that = this;
        map.getOverlays().map((val)=>{
            if(val._type=="ComplexOverlay"){
               map.removeOverlay(val)
            }
            return;
        })
        let point = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
        // 创建点坐标 
        let mapData = store.state.mapData;
        if(!mapData.isOverLay){
            map.centerAndZoom(point,store.state.mapData.scale);
        }
        let bounds = map.getBounds();
        _state.coverDataList.map((val,index)=>{
            if(bounds.He < val.lng&&val.lng < bounds.Ce && bounds.Rd < val.lat&&val.lat < bounds.Pd){
                var price = val.minPrice, txt = val.value, mouseoverTxt = val.count + "间";
                var myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.lng,val.lat),val.key,price, txt,mouseoverTxt,"ComplexOverlay");
                map.addOverlay(myCompOverlay);
                //覆盖物添加点击事件+
                myCompOverlay._div.addEventListener('touchstart',function(){
                    map.disableDragging();  //禁用地图拖拽功能
                });
                let objVue = obj;
                if(_state.mapScreen.levelType==4||_state.mapScreen.levelType==6||_state.mapScreen.levelType==7){
                    myCompOverlay._div.addEventListener("click", 
                    function (e) {
                        // function fn(objVue){
                        //     console.log(objVue)
                        // }
                        // fn();
                        store.state.mapScreen.latitude = e.target.parentNode.getAttribute("lat");
                        store.state.mapScreen.longitude = e.target.parentNode.getAttribute("lng");
                        store.state.mapData.latitude = e.target.parentNode.getAttribute("lat");
                        store.state.mapData.longitude = e.target.parentNode.getAttribute("lng");
                        store.state.mapData.villageId = e.target.parentNode.getAttribute("key");
                        store.state.mapData.showRoomList = true;
                        // var json = {showRoomList:true};
                        // Map.data.showView = json;
                        
                        // that.showHouse();
                    }
                    ,false);
                }else{
                    myCompOverlay._div.addEventListener("click", 
                    function (e) {
                        store.state.mapScreen.levelType = _state.mapScreen.levelType+1;
                        store.state.mapScreen.latitude = e.target.parentNode.getAttribute("lat");
                        store.state.mapScreen.longitude = e.target.parentNode.getAttribute("lng");
                        store.state.mapData.latitude = e.target.parentNode.getAttribute("lat");
                        store.state.mapData.longitude = e.target.parentNode.getAttribute("lng");
                        switch (store.state.mapScreen.levelType) {
                            case 1:
                            case 2:
                                store.state.mapData.scale = 11;
                                break;
                            case 3:
                                store.state.mapData.scale = 14;
                                break;
                            case 4:
                                store.state.mapData.scale = 15;
                                break;
                            case 5:
                                store.state.mapData.scale = 12;
                                break;
                            case 6:
                                store.state.mapData.scale = 15;
                                break;
                            case 7:
                            default:
                                break;
                        }
                        that.showHouse();
                    }
                    ,false);
                }
                
            }
            
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
            }
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
                        that.showHouse(val);
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
            }
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
            }
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
    },
    showCoverByCoordinate:function(data){
        
        //根据经纬度坐标和半径距离查询房源
        let map = store.state.map;

        let httpMetroStationData = http.queryMetroStationMapData.data;
        let that = this;
        map.getOverlays().map((val)=>{
            if(val._type=="ComplexOverlay"){
               map.removeOverlay(val)
            }
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
        axios.post(API["queryMapCoverByCoordinate"],data).then(res=>{
            if(res.data.code==0){
                let data = res.data.data
                data.map((val,index)=>{
                    var txt = val.value, mouseoverTxt = val.count + "间";
                    var myCompOverlay = new ComplexOverlay.ComplexVillageOverlay(new BMap.Point(val.lng,val.lat), txt,mouseoverTxt,"ComplexOverlay");
                    map.addOverlay(myCompOverlay);
                    myCompOverlay._div.addEventListener('touchstart',function(){
                    map.disableDragging();  //禁用地图拖拽功能
                    });
                    myCompOverlay._div.addEventListener("click", function () {
                        alert(txt)
                    });
                    return;
                })
            }
            
        })
    }
}
