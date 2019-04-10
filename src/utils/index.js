import axios from 'axios'
import API from '@/utils/api'
import store from '@/store'
import  http  from "@/utils/data.js"
import  ComplexOverlay  from '@/utils/prototype.js'
import  Map  from '@/views/Map.vue'
export default{ //很关键

    locationSuccess:function(obj){
        var that = this;
        
        obj.addEventListener("locationSuccess", function(e){
            let map = store.state.map;
            // 定位成功事件
            store.state.mapData.latitude = e.point.lat;
            store.state.mapData.longitude = e.point.lng;
            
            store.state.mapData.scale = store.state.map.getZoom();
            var json = {};
            json.cityId = store.state.currentCity.cityId;
            json.levelType = 4;
            Object.assign(json,store.state.screen);
            that.showHouse(json)

            console.log("locationSuccess  success---------------")
            let metroPoint = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
            let metroCircle = new BMap.Circle(metroPoint,3000,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
            localStorage.setItem("circle",metroCircle); 
            map.addOverlay(metroCircle); //增加圆
        });
    },
    movingEvent:function(obj){
        var that = this;
        obj.addEventListener("moving", function(e){
            let map = store.state.map;
            let _state = store.state;
            let mapData = store.state.mapData;

            console.log("getZoom",store.state.map.getZoom());
            if(mapData.isOverLay){

            }else{
                var cp = map.getCenter();
                store.state.mapData.latitude = cp.lat;
                store.state.mapData.longitude = cp.lng;
                store.state.mapData.scale = store.state.map.getZoom();
                var json = {};
                json.cityId = store.state.currentCity.cityId;
                json.levelType = that.toLevelType(store.state.mapData.scale);
                console.log("moving",json.levelType)
                switch (json.levelType) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
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
            let map = store.state.map;
            let mapData = store.state.mapData;
            console.log("isClickZoom",store.state.mapData.isClickZoom)
            if(store.state.mapData.isOverLay){
                if( !store.state.mapData.isClickZoom){
                    var cp = obj.getCenter();
                    var json = {};
                    json.latitude = store.state.mapData.latitude;
                    json.longitude = store.state.mapData.longitude;
                    json.levelType = that.toLevelType(zoom);
                    mapData.levelType = json.levelType;
                    json.radius = store.state.mapScreen.radius;
                    Object.assign(json,this.$store.state.screen)
                    that.showCoverHouse(json);
                }
            }else{
                if(!store.state.mapData.isClickZoom){
                    
                    var cp = obj.getCenter();
                    store.state.mapData.latitude = cp.lat;
                    store.state.mapData.longitude = cp.lng;
                    
                    var json = {};
                    json.cityId = store.state.currentCity.cityId;
                    
                    console.log("scale",mapData.scale)
                    
                    
                    Object.assign(json,store.state.screen);
                    if(store.state.keywordsSearch.tableId){
                        switch(store.state.keywordsSearch.typeId){
                            case 1:
                                store.state.mapData.levelType = 4;
                              break;
                            case 2:
                            store.state.mapData.levelType = 6;
                              json.metroId  = store.state.keywordsSearch.parentId;
                              json.stationId = store.state.keywordsSearch.tableId;
                              break;
                            case 3:
                              jstore.state.mapDatason.levelType = 5;
                              json.metroId  = store.state.keywordsSearch.tableId;
                              break;
                            case 4:
                              //公交站点
                              store.state.mapData.levelType = 4;
                              break;
                            case 6:
                            store.state.mapData.levelType = 3;
                              json.ceaId  = store.state.keywordsSearch.tableId;
                              json.prcId  = store.state.keywordsSearch.parentId;
                              break;
                            case 7:
                            store.state.mapData.levelType = 2;
                              json.prcId  = store.state.keywordsSearch.tableId;
                              break;
                        }
                    }
                    json.levelType = that.toLevelType(zoom);
                    mapData.levelType = json.levelType;
                    console.log(store.state.keywordsSearch)
                    console.log("levelType",json.levelType)
                    that.showHouse(json);
                }
            }
            
            store.state.mapData.isClickZoom = false;
        });
    },

    showHouse:function(mpdata){
        let map = store.state.map;
        let isClickZoom = store.state.mapData.isClickZoom;
        console.log("isClickZoom",isClickZoom)
        axios.post(API["queryMapCoverData"], mpdata).then(res => {
            if (res.data.code == 0) {
                res = res.data.data;
                //去掉圆
                if(store.state.circleObj){
                    map.removeOverlay(store.state.circleObj);
                    store.state.circleObj = null;
                }
                switch (mpdata.levelType) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 7:
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 5:
                        store.state.coverDataList = res.mapResultDtos;
                        console.log("showMetroHouse")
                        this.showMetroHouse(mpdata);
                        break;
                    case 6:
                        store.state.coverDataList = res;
                        let metroPoint;
                        //重新画圆
                        if(isClickZoom){
                            
                            if(store.state.keywordsSearch.typeId == 2 || store.state.keywordsSearch.typeId == 4){

                                console.log("keywordsSearch")
                                metroPoint = new BMap.Point(store.state.keywordsSearch.longitude,store.state.keywordsSearch.latitude);
                            }else if(store.state.screen.levelType == 6){
                                metroPoint = new BMap.Point(store.state.screen.longitude,store.state.screen.latitude);
                            }else{
                                metroPoint = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
                            }
                            let metroCircle = new BMap.Circle(metroPoint,3000,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
                            store.state.circleObj = metroCircle;
                            map.addOverlay(metroCircle); //增加圆
                        }else{
                            if(store.state.screen && store.state.screen.levelType == 6){
                                if(store.state.keywordsSearch.typeId == 2 || store.state.keywordsSearch.typeId == 4){

                                    metroPoint = new BMap.Point(store.state.keywordsSearch.longitude,store.state.keywordsSearch.latitude);
                                }else if(store.state.screen.levelType == 6){
                                    metroPoint = new BMap.Point(store.state.screen.longitude,store.state.screen.latitude);
                                }else{
                                    metroPoint = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
                                }
                                let metroCircle = new BMap.Circle(metroPoint,3000,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
                                store.state.circleObj = metroCircle;
                                map.addOverlay(metroCircle); //增加圆
                            }
                        }
                        
                        this.showAreaHouse(mpdata);
                        break;
                }
            }
        });
    },
    //搜索后显示房源
    showSearchHouse:function(mpdata){
        console.log("showSearchHouse")
        let map = store.state.map;
        
        axios.post(API["queryMapCoverData"], mpdata).then(res => {
            if (res.data.code == 0) {
                res = res.data.data;
                console.log("mpdata.levelType",mpdata.levelType)
                store.state.mapData.scale=this.toScale(mpdata.levelType);
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
                        let metroPoint = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
                        let metroCircle = new BMap.Circle(metroPoint,3000,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
                        store.state.circleObj = metroCircle;
                        map.addOverlay(metroCircle); //增加圆
                        this.showAreaHouse(mpdata);
                        break;
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
                        store.state.mapData.scale = 14;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 3:
                        store.state.mapData.scale = 16;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 4:
                        store.state.mapData.scale = 17;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 5:
                        store.state.mapData.scale = 14;
                        store.state.coverDataList = res.mapResultDtos;
                        this.showMetroHouse(mpdata);
                        break;
                    case 6:
                        store.state.mapData.scale = 17;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 7:
                        store.state.mapData.scale = 17;
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                }
            }
        });
    },
    //个性找房
    showCoverHouse:function(data){
        let _state = store.state;
        console.log("showCoverHouse")
        if(_state.mapData.isOverLay){
            var json = data;
            axios.post(API["queryMapCoverByCoordinate"], json).then(res => {
                if (res.data.code == 0) {
                    res = res.data.data;
                    store.state.coverDataList = res;
                    this.showCoverByCoordinate(json);
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
        console.log("showAreaHouse")
        if(_state.coverDataList){
            _state.coverDataList.map((val,index)=>{
                console.log(bounds.He < val.lng)
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
                                store.state.mapData.scale = 10;
                            }
                            ,false);
                            break;
                        case 2:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,3);
                                store.state.mapData.scale = 14;
                            }
                            ,false);
                            break;
                        case 3:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,4);
                                store.state.mapData.scale = 15;
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
                                store.state.mapData.scale = 16;
                                store.state.mapData.villageId = target.getAttribute("key");
                                store.state.mapData.showRoomList = true;
                            }
                            ,false);
                            break;
                        case 5:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,6);
                                store.state.mapData.scale = 12;
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
                                store.state.mapData.scale = 14;
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
        }else{
            store.state.toast = "暂未找到符合条件的房源"
        }
        


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
            json.levelType = levelType;
            if(!flag){
                that.showHouse(json);
                store.state.mapData.isClickZoom = true;
            }
            return json;
        }
    },
    //tyepId 转 层级类型
    typeIdToLevelType:function(typeId){
        var levelType = 2;
        switch(typeId){
            case 1: 
                levelType = 4;
            break;
            case 2: 
            levelType = 6;
            break;
            case 3: 
            levelType = 5;
            break;
            case 4: 
            levelType = 7;
            break;
            case 6: 
            levelType = 3;
            break;
            case 7: 
            levelType = 2;
            break;
        }
        return levelType;
    },
    
    toLevelType:function(scale){
        var levelType;
        let _state = store.state;
        if(_state.mapData.levelType==5||_state.mapData.levelType==6){
            console.log("metro")
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
                case 10:
                case 11:
                case 12:
                case 13:
                    levelType = 5;
                    break;
                default:
                    levelType = 6;
                    break;
            }
        }else{
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
                case 10:
                levelType = 1;
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                    levelType = 2;
                    break;
                case 15:
                levelType = 3;
                    break;
                default:
                    levelType = 4;
                    break;
            }
        }
    
        
        return levelType;
    },
    toScale:function(levelType){
        var scale = 12;
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
            scale = 16;
                break;
            case 5:
            scale = 12;
                break;
            case 6:
            scale = 14;
            case 7:
            scale = 14;
                break;
            default:break;
        }
        return scale;
    },
    
    // showVillageHouse:function(data){
    //     let map = store.state.map;
    //     map.getOverlays().map((val)=>{
    //         if(val._type=="ComplexOverlay"){
    //            map.removeOverlay(val)
    //         }
    //         return;
    //     })
    //     let point = new BMap.Point(data.longitude,data.latitude);
    //     store.state.mapData.latitude = data.latitude;
    //     store.state.mapData.longitude = data.longitude;
    //     store.state.mapData.scale = 17;
    //     // 创建点坐标  
    //     let mapData = store.state.mapData; 
    //     if(!mapData.isOverLay){
    //         map.centerAndZoom(point,store.state.mapData.scale);
    //     }
    //     let bounds = map.getBounds();

    //     store.state.coverDataList.map((val,index)=>{
    //         if(val.ceaId == store.state.mapData.ceaId){
    //             if(bounds.He < val.lng&&val.lng < bounds.Ce && bounds.Rd < val.lat&&val.lat < bounds.Pd){
    //                 var txt = val.value, mouseoverTxt = val.count + "间";
    //                 var myCompOverlay = new ComplexOverlay.ComplexCeaOverlay(new BMap.Point(val.lng,val.lat), txt,mouseoverTxt,"ComplexOverlay");
    //                 map.addOverlay(myCompOverlay);
    //                 //覆盖物添加点击事件+
    //                 myCompOverlay._div.addEventListener('touchstart',function(){
    //                 map.disableDragging();  //禁用地图拖拽功能
    //                 });
    //                 myCompOverlay._div.addEventListener("click", function () {
    //                     store.state.mapData.showRoomList = true;
    //                 });
    //             }
    //         }
    //         return;
    //     })
    // },
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
        // store.state.mapData.scale = 12;

        console.log("showMetroHouse")
        console.log(point)
        map.centerAndZoom(point,store.state.mapData.scale);
        console.log("centerAndZoom",store.state.mapData.scale)
        let bounds = map.getBounds();


        //标出 地铁线路
        // var transit = new BMap.TransitRoute(map, { 
        //     renderOptions: { 
        //         map: map, 
        //         autoViewport: false
                
        //     },
        //     // 配置跨城公交的交通方式策略为地铁优先
        //     transitTypePolicy: BMAP_TRANSIT_POLICY_FIRST_SUBWAYS
        // });
        // var start = new BMap.Point(121.30768, 31.19531);
        // var end = new BMap.Point(121.81360, 31.15518);
        // transit.search(start, end);
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
              store.state.mapData.levelType =  6;
              store.state.mapData.latitude = target.getAttribute("lat");
              store.state.mapData.longitude = target.getAttribute("lng");
              store.state.mapData.scale = 14;
              Object.assign(json,store.state.screen);

              json.stationId = target.getAttribute("key");
              json.levelType = 6;
              if(store.state.screen&&store.state.screen.metroId){
                json.metroId = store.state.screen.metroId;
              }else{
                  if(store.state.keywordsSearch.typeId == 2){
                    json.metroId  = store.state.keywordsSearch.parentId;
                  }else if(store.state.keywordsSearch.typeId == 3){
                    json.metroId  = store.state.keywordsSearch.tableId;
                  }
              }
              
              store.state.mapScreen = json;
              store.state.mapData.isClickZoom = true;
              that.showHouse(json);
              
            
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
        console.log("mapData.scale",mapData.scale)
        if(!mapData.isOverLay){
            map.centerAndZoom(point,store.state.mapData.scale);
        }
        
        let bounds = map.getBounds();
        console.log(bounds)
        
        if(_state.coverDataList.length > 0){


            _state.coverDataList.map((val,index)=>{
                console.log(bounds.He , parseFloat(val.lng))
                console.log(bounds.He < parseFloat(val.lng))


                
                if(
                    (bounds.He < parseFloat(val.lng)||bounds.He < parseFloat(val.villageLongitude)||bounds.He < parseFloat(val.longitude))&&
                    (parseFloat(val.lng) < bounds.Ce||parseFloat(val.villageLongitude) < bounds.Ce||parseFloat(val.longitude) < bounds.Ce) &&
                    (bounds.Rd < parseFloat(val.lat)||bounds.Rd < parseFloat(val.villageLatitude)||bounds.Rd < parseFloat(val.latitude))&&
                    (parseFloat(val.lat) < bounds.Pd||parseFloat(val.villageLatitude) < bounds.Pd||parseFloat(val.latitude) < bounds.Pd)
                ){
                    console.log("coverDataList")
                    if(data.levelType==6){
                        var price = val.minShowPrice, txt = val.villageName, mouseoverTxt = val.roomCount + "间";
                        var myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.villageLongitude,val.villageLatitude),val.villageId,price, txt,mouseoverTxt,"ComplexOverlay");
                        map.addOverlay(myCompOverlay);
                    }else{
                        console.log(val)
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
                                store.state.mapData.scale = 10;
                            }
                            ,false);
                            break;
                        case 2:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,3);
                                store.state.mapData.scale = 14;
                            }
                            ,false);
                            break;
                        case 3:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,4);
                                store.state.mapData.scale = 15;
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
                                store.state.mapData.scale = 16;
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
        }else{
            store.state.toast = "暂未找到符合条件的房源"
        }
        


        function fuzhi(e,levelType,flag){
            var json = data;
            var target = e.target;
            if(!target.getAttribute("key")){
                target = target.parentNode;
            }
            json.latitude = target.getAttribute("lat");
            json.longitude = target.getAttribute("lng");
            store.state.mapData.latitude = target.getAttribute("lat");
            store.state.mapData.longitude = target.getAttribute("lng");
            json.radius = store.state.mapData.speed * store.state.mapData.time;
            Object.assign(json,store.state.screen);
            json.levelType = levelType;
            if(!flag){
                that.showCoverHouse(json);
                store.state.mapData.isClickZoom = true;
            }
            return json;
        }
    },
    // showCoverByCoordinate:function(data){
    //     let map = store.state.map;
    //     let _state = store.state;
    //     let that = this;
    //     map.getOverlays().map((val)=>{
    //         if(val._type=="ComplexOverlay"){
    //            map.removeOverlay(val)
    //         }
    //         return;
    //     })
    //     let point = new BMap.Point(store.state.mapData.longitude,store.state.mapData.latitude);
    //     // 创建点坐标 
    //     let mapData = store.state.mapData;
    //     if(!mapData.isOverLay){
    //         map.centerAndZoom(point,store.state.mapData.scale);
    //     }
    //     let bounds = map.getBounds();
    //     _state.coverDataList.map((val,index)=>{
    //         if(
    //             (bounds.He < val.lng)&&
    //             (val.lng < bounds.Ce) &&
    //             (bounds.Rd < val.lat)&&
    //             (val.lat < bounds.Pd)
    //         ){
    //             var price = val.minPrice, txt = val.value, mouseoverTxt = val.count + "间";
    //             var myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.lng,val.lat),val.key,price, txt,mouseoverTxt,"ComplexOverlay");
    //             map.addOverlay(myCompOverlay);
                
                
    //             //覆盖物添加点击事件+
    //             myCompOverlay._div.addEventListener('touchstart',function(){
    //                 map.disableDragging();  //禁用地图拖拽功能
    //             });

    //             myCompOverlay._div.addEventListener("click", 
    //             function (e) {
    //                 store.state.mapData.showRoomList = true;
    //                 var target = e.target;
    //                 if(!target.getAttribute("key")){
    //                     target = target.parentNode;
    //                 }
                   
    //                 store.state.mapData.villageId = target.getAttribute("key");
    //             }
    //             ,false);
    //         }
            
    //         return;
    //     })
    // }
}
