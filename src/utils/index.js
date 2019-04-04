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
            
            store.state.mapData.scale = store.state.map.getZoom();
            var json = {};
            json.cityId = store.state.currentCity.cityId;
            json.levelType = that.toLevelType(store.state.mapData.scale);
            Object.assign(json,store.state.screen);
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

            }else{
                var cp = map.getCenter();
                store.state.mapData.latitude = cp.lat;
                store.state.mapData.longitude = cp.lng;
                store.state.mapData.scale = store.state.map.getZoom();
                var json = {};
                json.cityId = store.state.currentCity.cityId;
                json.levelType = that.toLevelType(store.state.mapData.scale);
                Object.assign(json,store.state.screen);
                // if(store.state.screen){
                //     json.levelType = that.toLevelType(store.state.mapData.scale);
                // }
                switch (json.levelType) {
                    case 1:
                    case 2:
                    case 3:
                    case 6:
                    case 7:
                        that.showAreaHouse(json);
                        break;
                    case 5:
                        that.showMetroHouse(json);
                        break;
                }
                
                
            }
            
        });
    },
    zoomendEvent:function(obj){
        var that = this;
        obj.addEventListener("zoomend", function(e){
            let zoom = e.currentTarget.getZoom();
            store.state.mapData.scale =  zoom;
            if(!store.state.mapData.isClickZoom){
                let map = store.state.map;
                let mapData = store.state.mapData;
                if(mapData.isOverLay){
                    var json = {};
                    json = store.state.mapData;
                }else{
                    
                    var cp = obj.getCenter();
                    store.state.mapData.latitude = cp.lat;
                    store.state.mapData.longitude = cp.lng;
                    
                    var json = {};
                    json.cityId = store.state.currentCity.cityId;
                    json.levelType = that.toLevelType(mapData.scale);
                    
                    Object.assign(json,store.state.screen)
    
                    that.showHouse(json)
                }
                store.state.mapData.isClickZoom = false;
            }
        });
    },
    showHouse:function(mpdata){
        axios.post(API["queryMapCoverData"], mpdata).then(res => {
            if (res.data.code == 0) {
                res = res.data.data;
                switch (mpdata.levelType) {
                    case 1:
                    case 2:
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 3:
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 4:
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 5:
                        store.state.coverDataList = res.mapResultDtos;
                        this.showMetroHouse(mpdata);
                        break;
                    case 6:
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                    case 7:
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                }
            }
        });
    },
    showScreenHouse:function(mpdata){
        axios.post(API["queryMapCoverData"], mpdata).then(res => {
            
            if (res.data.code == 0) {
                res = res.data.data;
                
                switch (mpdata.levelType) {
                    case 1:
                    case 2:
                        store.state.mapData.scale = 11;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 3:
                        store.state.mapData.scale = 14;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 4:
                        store.state.mapData.scale = 15;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 5:
                        store.state.mapData.scale = 12;
                        store.state.coverDataList = res.mapResultDtos;
                        this.showMetroHouse(mpdata);
                        break;
                    case 6:
                        store.state.mapData.scale = 15;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                    case 7:
                }
            }
        });
    },
    showCoverHouse:function(data){
        let _state = store.state;
        if(_state.mapData.isOverLay){
            var json = data;
            Object.assign(json,_state.screen);
             
            axios.post(API["queryMapCoverByCoordinate"], json).then(res => {
                if (res.data.code == 0) {
                    res = res.data.data;
                    store.state.coverDataList = res;
                    this.showCoverByCoordinate();
                }
            });
        }
        
    },
    showAreaHouse:function(data){
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
        if(data.levelType==6||data.levelType==7){
            console.log("metroPoint")
            let metroPoint = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
            let metroCircle = new BMap.Circle(metroPoint,3000,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
            map.addOverlay(circle); //增加圆
        }
        _state.coverDataList.map((val,index)=>{
            if(
                (bounds.He < val.lng||bounds.He < val.villageLongitude)&&
                (val.lng < bounds.Ce||val.villageLongitude < bounds.Ce) &&
                (bounds.Rd < val.lat)||(bounds.Rd < val.villageLatitude)&&
                (val.lat < bounds.Pd)||(val.villageLatitude < bounds.Pd)
            ){
                if(data.levelType==6){
                    var price = val.minShowPrice, txt = val.villageName, mouseoverTxt = val.roomCount + "间";
                    var myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.villageLongitude,val.villageLatitude),val.villageId,price, txt,mouseoverTxt,"ComplexOverlay");
                    map.addOverlay(myCompOverlay);
                }else{
                    var price = val.minPrice, txt = val.value, mouseoverTxt = val.count + "间";
                    var myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.lng,val.lat),val.key,price, txt,mouseoverTxt,"ComplexOverlay");
                    map.addOverlay(myCompOverlay);
                }
                
                
                //覆盖物添加点击事件+
                myCompOverlay._div.addEventListener('touchstart',function(){
                    map.disableDragging();  //禁用地图拖拽功能
                });

                switch (data.levelType) {
                    case 1:
                        myCompOverlay._div.addEventListener("click", 
                        function (e) {
                            fuzhi(e,2);
                            store.state.mapData.scale = 9;
                        }
                        ,false);
                        break;
                    case 2:
                        myCompOverlay._div.addEventListener("click", 
                        function (e) {
                            fuzhi(e,3);
                            store.state.mapData.scale = 11;
                        }
                        ,false);
                        break;
                    case 3:
                        myCompOverlay._div.addEventListener("click", 
                        function (e) {
                            fuzhi(e,4);
                            store.state.mapData.scale = 14;
                        }
                        ,false);
                        break;
                    case 4:
                        myCompOverlay._div.addEventListener("click", 
                        function (e) {
                            fuzhi(e,4,true);
                            var target = e.target;
                            if(!target.getAttribute("key")){
                                target = target.parentNode;
                            }
                            store.state.mapData.scale = 15;
                            store.state.mapData.villageId = target.getAttribute("key");
                            store.state.mapData.showRoomList = true;
                        }
                        ,false);
                        break;
                    case 5:
                        myCompOverlay._div.addEventListener("click", 
                        function (e) {
                            fuzhi(e,6);
                            store.state.mapData.scale = 15;
                        }
                        ,false);
                        break;
                    case 6:
                         
                        myCompOverlay._div.addEventListener("click", 
                        function (e) {
                            fuzhi(e,6);
                            var target = e.target;
                            if(!target.getAttribute("key")){
                                target = target.parentNode;
                            }
                            store.state.mapData.scale = 15;
                            store.state.mapData.villageId = target.getAttribute("key");
                            store.state.mapData.showRoomList = true;

                           
                        }
                        ,false);
                        break;
                    default:
                        break;
                }
            }
            
            return;
        })


        function fuzhi(e,levelType,flag){
            var json = data;
            var target = e.target;
            if(!target.getAttribute("key")){
                target = target.parentNode;
            }
            json.latitude = target.getAttribute("lat");
            json.longitude = target.getAttribute("lng");
            store.state.mapScreen.levelType = levelType;
            store.state.mapScreen.latitude = target.getAttribute("lat");
            store.state.mapScreen.longitude = target.getAttribute("lng");
            store.state.mapData.latitude = target.getAttribute("lat");
            store.state.mapData.longitude = target.getAttribute("lng");
            Object.assign(json,store.state.screen);

            console.log("click",store.state.mapData)
            json.levelType = levelType;
            if(!flag){
                that.showHouse(json);
                store.state.mapData.isClickZoom = true;
            }
            return json;
        }
    },
    toLevelType:function(scale){
        var levelType = 2;
        switch (scale) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                levelType = 1;
                break;
            case 10:
            case 11:
            case 12:
                levelType = 2;
                break;
            case 13:
            case 14:
                levelType = 3;
                break;
            default:
                levelType = 4;
                break;
        }
        if(store.state.screen){
            if(store.state.screen.levelType == 5||store.state.screen.levelType ==6){
                switch (scale) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        levelType = 1;
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                        levelType = 5;
                        break;
                    default:
                        levelType = 6;
                        break;
                }
            }
        }
        return levelType;
    },
    toScale:function(levelType){
        var scale = 11;
        switch (levelType) {
            case 1:
            scale = 9;
            case 2:
            scale = 11;
                break;
            case 3:
            scale = 14;
                break;
            case 4:
            scale = 15;
                break;
            case 5:
            scale = 12;
                break;
            case 6:
            scale = 15;
            case 7:
                break;
            default:break;
        }
        return scale;
    },
    
    showVillageHouse:function(data){
        let map = store.state.map;
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

        store.state.coverDataList.map((val,index)=>{
            if(val.ceaId == store.state.mapData.ceaId){
                if(bounds.He < val.lng&&val.lng < bounds.Ce && bounds.Rd < val.lat&&val.lat < bounds.Pd){
                    var txt = val.value, mouseoverTxt = val.count + "间";
                    var myCompOverlay = new ComplexOverlay.ComplexCeaOverlay(new BMap.Point(val.lng,val.lat), txt,mouseoverTxt,"ComplexOverlay");
                    map.addOverlay(myCompOverlay);
                    //覆盖物添加点击事件+
                    myCompOverlay._div.addEventListener('touchstart',function(){
                    map.disableDragging();  //禁用地图拖拽功能
                    });
                    myCompOverlay._div.addEventListener("click", function () {
                        store.state.mapData.showRoomList = true;
                    });
                }
            }
            return;
        })
    },
    showMetroHouse:function(data){
        //地铁房源
        let map = store.state.map;
        let _state = store.state;
        let that = this;
        map.getOverlays().map((val)=>{
            if(val._type=="ComplexOverlay"){
               map.removeOverlay(val)
            }
            return;
        })
        let point = new BMap.Point(_state.mapData.longitude,_state.mapData.latitude);
        store.state.mapData.scale = 12;
        // 创建点坐标  
        // let mapData = store.state.mapData; 
        // if(!mapData.isOverLay){
        //     map.centerAndZoom(point,store.state.mapData.scale);
        // }
        map.centerAndZoom(point,store.state.mapData.scale);
        let bounds = map.getBounds();
        _state.coverDataList.map((val,index)=>{
          var txt = val.value, mouseoverTxt = val.count + "间";
          var myCompOverlay = new ComplexOverlay.ComplexMetroStationOverlay(new BMap.Point(val.lng,val.lat),val.key, txt,mouseoverTxt,"ComplexOverlay");
        //   myCompOverlay.disableMassClear();
          map.addOverlay(myCompOverlay);
          //覆盖物添加点击事件+
          
          myCompOverlay._div.addEventListener('touchstart',function(){
           map.disableDragging();  //禁用地图拖拽功能
          });
          myCompOverlay._div.addEventListener("click", function (e) {
              var json = {};
              var target = e.target;
                if(!target.getAttribute("key")){
                    target = target.parentNode;
                }
              store.state.mapScreen.levelType =  6;
              store.state.mapScreen.latitude = target.getAttribute("lat");
              store.state.mapScreen.longitude = target.getAttribute("lng");
              store.state.mapData.latitude = target.getAttribute("lat");
              store.state.mapData.longitude = target.getAttribute("lng");
              store.state.mapData.scale = 15;
              Object.assign(json,store.state.screen);
              json.metroStationId = target.getAttribute("key");
              json.levelType = 6;
              that.showHouse(json);
              store.state.mapData.isClickZoom = true;
              

              
            // that.showVillageHouse(val);
          });
          return;
        })
    },
    showCoverByCoordinate:function(data){
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
            if(
                (bounds.He < val.lng)&&
                (val.lng < bounds.Ce) &&
                (bounds.Rd < val.lat)&&
                (val.lat < bounds.Pd)
            ){
                var price = val.minPrice, txt = val.value, mouseoverTxt = val.count + "间";
                var myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.lng,val.lat),val.key,price, txt,mouseoverTxt,"ComplexOverlay");
                map.addOverlay(myCompOverlay);
                
                
                //覆盖物添加点击事件+
                myCompOverlay._div.addEventListener('touchstart',function(){
                    map.disableDragging();  //禁用地图拖拽功能
                });

                myCompOverlay._div.addEventListener("click", 
                function (e) {
                    store.state.mapData.showRoomList = true;
                    var target = e.target;
                    if(!target.getAttribute("key")){
                        target = target.parentNode;
                    }
                   
                    store.state.mapData.villageId = target.getAttribute("key");
                }
                ,false);
            }
            
            return;
        })
    }
}
