import axios from 'axios'
import API from '@/utils/api'
import store from '@/store'
import  ComplexOverlay  from '@/utils/prototype.js'
var {mapData,screen,currentCity,keywordsSearch} = store.state
export default{ //很关键
    paintCircle(point,distance){
        return new BMap.Circle(point,distance,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    },
    getMapPoint(stateName){
        return new BMap.Point(store.state[stateName].longitude,store.state[[stateName]].latitude);
    },
    locationSuccess:function(obj){
        var that = this;
        
        obj.addEventListener("locationSuccess", function(e){
            let map = store.state.map;
            // 定位成功事件
            mapData.latitude = e.point.lat;
            mapData.longitude = e.point.lng;
            
            mapData.scale = store.state.map.getZoom();
            var json = {};
            json.cityId = currentCity.cityId;
            json.levelType = 4;
            Object.assign(json,screen);
            that.showHouse(json)

            let metroPoint = that.getMapPoint('mapData')
            let metroCircle = that.paintCircle(metroPoint,2000)
            map.addOverlay(metroCircle); //增加圆
        });
    },
    //拖动事件
    movingEvent:function(obj){
        var that = this;
        obj.addEventListener("moving", function(){
            let map = store.state.map;
            var json = {};
            if(!mapData.isOverLay){
                var cp = map.getCenter();
                mapData.latitude = cp.lat;
                mapData.longitude = cp.lng;
                mapData.scale = store.state.map.getZoom();
                json.cityId = currentCity.cityId;
                json.levelType = that.toLevelType(mapData.scale);
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
                
                
            }else{
                var cp = obj.getCenter();
                mapData.latitude = cp.lat;
                mapData.longitude = cp.lng;
                mapData.scale = store.state.map.getZoom();
                json.latitude = mapData.latitude;
                json.longitude = mapData.longitude;
                json.levelType = that.toLevelType(mapData.scale);
                mapData.levelType = json.levelType;
                json.radius = mapData.radius;
                Object.assign(json,screen)
                that.showCoverByCoordinate(json);
            }
            
        });
    },
    //层级改变 缩放事件
    zoomendEvent:function(obj){
        var that = this;
        obj.addEventListener("zoomend", function(e){
            let zoom = e.currentTarget.getZoom();
            mapData.scale =  zoom;
            var json = {},cp;
            if(mapData.isOverLay){
                if( !mapData.isClickZoom){
                    cp = obj.getCenter();
                    mapData.latitude = cp.lat;
                    mapData.longitude = cp.lng;
                    
                    json.latitude = store.state.pointSearch.lat;
                    json.longitude = store.state.pointSearch.lng;
                    json.levelType = that.toLevelType(zoom);
                    mapData.levelType = json.levelType;
                    // json.radius = store.state.mapScreen.radius;
                    json.radius = mapData.radius;
                    Object.assign(json,screen)
                    that.showCoverHouse(json);
                }
            }else{
                if(!mapData.isClickZoom){
                    
                    cp = obj.getCenter();
                    mapData.latitude = cp.lat;
                    mapData.longitude = cp.lng;
                    json.cityId = currentCity.cityId;
                    Object.assign(json,screen);
                    if(json.ceaId){
                        delete json["ceaId"];
                    }
                    if(json.prcId){
                        delete json["prcId"];
                    }
                    if(keywordsSearch.tableId){
                        switch(keywordsSearch.typeId){
                            case 1:
                                mapData.levelType = 4;
                              break;
                            case 2:
                            mapData.levelType = 6;
                              json.metroId  = keywordsSearch.parentId;
                              json.stationId = keywordsSearch.tableId;
                              break;
                            case 3:
                              mapData.levelType = 5;
                              json.metroId  = keywordsSearch.tableId;
                              break;
                            case 4:
                              //公交站点
                              mapData.levelType = 7;
                              break;
                            case 6:
                            mapData.levelType = 3;
                              json.ceaId  = keywordsSearch.tableId;
                              json.prcId  = keywordsSearch.parentId;
                              break;
                            case 7:
                            mapData.levelType = 2;
                              json.prcId  = keywordsSearch.tableId;
                              break;
                        }
                    }
                    json.levelType = that.toLevelType(zoom);
                    mapData.levelType = json.levelType;
                    that.showHouse(json);
                }
            }
            
            mapData.isClickZoom = false;
        });
    },
    //显示房源
    showHouse:function(mpdata){
        let map = store.state.map;
        let isClickZoom = mapData.isClickZoom;
        
        var mJson = {};
        for (const key in mpdata) {
            mJson[key] = mpdata[key];
        }
        if(mJson.levelType == 7){
            mJson.levelType = 4;
        }
        axios.post(API["queryMapCoverData"], mJson).then(res => {
            if (res.data.code == 0) {
                res = res.data.data;
                //去掉圆
                if(store.state.circleObj){
                    map.removeOverlay(store.state.circleObj);
                    store.state.circleObj = null;
                }

                //公交站 缩放 显示圈
                if(mpdata.levelType!=7&&keywordsSearch.levelType==7){
                    let busPoint;
                    busPoint = this.getMapPoint('keywordsSearch')
                    let busCircle = this.paintCircle(busPoint,1500)
                    store.state.circleObj = busCircle;
                    map.addOverlay(busCircle); //增加圆
                }
                switch (mpdata.levelType) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    
                        store.state.coverDataList = res;
                        this.showAreaHouse(mpdata);
                        break;
                    case 5:
                        store.state.coverDataList = res.mapResultDtos;
                        this.showMetroHouse(mpdata);
                        break;
                    case 6:
                    case 7:
                        store.state.coverDataList = res;
                        let metroPoint;
                        var distance ;
                        if(mpdata.levelType==6){
                            distance = 2000;
                        }else{
                            distance = 1000;
                        }
                        //重新画圆
                        if(isClickZoom){
                            
                            if(keywordsSearch.typeId == 2 || keywordsSearch.typeId == 4){
                                metroPoint = this.getMapPoint('keywordsSearch')
                            }else if(screen && screen.levelType == 6){
                                metroPoint = this.getMapPoint('screen')
                            }else{
                                metroPoint = this.getMapPoint('mapData')
                            }
                            let metroCircle = this.paintCircle(metroPoint,distance)
                            store.state.circleObj = metroCircle;
                            map.addOverlay(metroCircle); //增加圆
                        }else{
                            if( keywordsSearch.tableId && (keywordsSearch.typeId == 2 || keywordsSearch.typeId == 4)){
                                metroPoint = this.getMapPoint('keywordsSearch')
                            }else if(screen &&(screen.levelType == 6 || screen.levelType == 7)){
                                metroPoint = this.getMapPoint('screen')
                            }else{
                                metroPoint = this.getMapPoint('mapData')
                            }
                            let metroCircle = this.paintCircle(metroPoint,distance)
                            
                            store.state.circleObj = metroCircle;
                            map.addOverlay(metroCircle); //增加圆
                        }
                        this.showAreaHouse(mpdata);
                        break;
                }
            }
        });
    },
    //搜索后显示房源
    showSearchHouse:function(mpdata){
        let map = store.state.map;
        mapData.levelType = mpdata.levelType;
        var mJson = {};
        for (const key in mpdata) {
            mJson[key] = mpdata[key];
        }
        if(mJson.levelType == 7){
            mJson.levelType = 4;
        }
        axios.post(API["queryMapCoverData"], mJson).then(res => {
            if (res.data.code == 0) {
                res = res.data.data;
                mapData.scale=this.toScale(mpdata.levelType);
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
                    case 7:
                        var distance ;
                        if(mpdata.levelType==6){
                            distance = 2000;
                        }else{
                            distance = 1000;
                        }
                        store.state.coverDataList = res;
                        var metroPoint = this.getMapPoint('mapData')
                        var metroCircle = this.paintCircle(metroPoint,distance)
                        store.state.circleObj = metroCircle;
                        map.addOverlay(metroCircle); //增加圆
                        this.showAreaHouse(mpdata);
                        break;
                }
            }
        });
    },
    //个性找房 
    showCoverHouse:function(data){
        let _state = store.state;
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
    //显示 区域房源
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
        
        let point = this.getMapPoint('mapData')
        // 创建点坐标 
        if(!mapData.isOverLay){
            map.centerAndZoom(point,mapData.scale);
        }
        
        let bounds = map.getBounds();
        if(_state.coverDataList){
            _state.coverDataList.map((val)=>{
                if(
                    (bounds.He < val.lng||bounds.He < val.villageLongitude)&&
                    (val.lng < bounds.Ce||val.villageLongitude < bounds.Ce) &&
                    (bounds.Rd < val.lat)||(bounds.Rd < val.villageLatitude)&&
                    (val.lat < bounds.Pd)||(val.villageLatitude < bounds.Pd)
                ){
                    var price,txt,mouseoverTxt;
                    if(data.levelType==6){
                        price = val.minShowPrice;txt = val.villageName;mouseoverTxt = val.roomCount + "间";
                        myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.villageLongitude,val.villageLatitude),val.villageId,price, txt,mouseoverTxt,"ComplexOverlay");
                    }else{
                        price = val.minPrice;txt = val.value;mouseoverTxt = val.count + "间";
                        var myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.lng,val.lat),val.key,price, txt,mouseoverTxt,"ComplexOverlay");
                    }
                    map.addOverlay(myCompOverlay);
                    
                    //覆盖物添加点击事件+
                    myCompOverlay._div.addEventListener('touchstart',function(){
                        map.disableDragging()//禁用地图拖拽功能
                    });
    
                    switch (data.levelType) {
                        case 1:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,2);
                                mapData.scale = 10;
                            }
                            ,false);
                            break;
                        case 2:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,3);
                                mapData.scale = 14;
                            }
                            ,false);
                            break;
                        case 3:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,4);
                                mapData.scale = 15;
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
                                mapData.scale = 16;
                                mapData.villageId = target.getAttribute("key");
                                mapData.showRoomList = true;
                            }
                            ,false);
                            break;
                        case 5:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,6);
                                mapData.scale = 12;
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
                                mapData.scale = 14;
                                mapData.villageId = target.getAttribute("key");
                                mapData.showRoomList = true;
    
                               
                            }
                            ,false);
                            break;
                        case 7:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,7,true);
                                var target = e.target;
                                if(!target.getAttribute("key")){
                                    target = target.parentNode;
                                }
                                mapData.scale = 16;
                                mapData.villageId = target.getAttribute("key");
                                mapData.showRoomList = true;
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
            mapData.levelType = levelType;
            mapData.latitude = target.getAttribute("lat");
            mapData.longitude = target.getAttribute("lng");
            Object.assign(json,screen);
            json.levelType = levelType;
            if(!flag){
                that.showHouse(json);
                mapData.isClickZoom = true;
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
    //地图层级 转 层级类型
    toLevelType:function(scale){
        var levelType;
        let _state = store.state;
        if(_state.mapData.levelType==5||_state.mapData.levelType==6){
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
                if(mapData.levelType==7){
                    levelType = 7;
                }else{
                    levelType = 4;
                }
                    
                    break;
            }
        }
    
        
        return levelType;
    },
    //层级类型 转 地图层级
    toScale:function(levelType){
        var scale = 12;
        switch (levelType) {
            case 1:
                scale = 9;
                break;
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
                break;
            case 7:
            scale = 16;
                break;
            default:break;
        }
        
        return scale;
    },
    // 地铁线路房源
    showMetroHouse:function(){
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
        let point = this.getMapPoint('mapData')
        // mapData.scale = 12;
        map.centerAndZoom(point,mapData.scale);

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
        _state.coverDataList.map((val)=>{
          var txt = val.value, mouseoverTxt = val.count + "间";
          var myCompOverlay = new ComplexOverlay.ComplexMetroStationOverlay(new BMap.Point(val.lng,val.lat),val.key, txt,mouseoverTxt,"ComplexOverlay");
          map.addOverlay(myCompOverlay);
          //覆盖物添加点击事件+
          
          myCompOverlay._div.addEventListener('touchstart',function(){
           map.disableDragging() //禁用地图拖拽功能
          });
          myCompOverlay._div.addEventListener("click", function (e) {
              var json = {};
              var target = e.target;
                if(!target.getAttribute("key")){
                    target = target.parentNode;
                }
              mapData.levelType =  6;
              mapData.latitude = target.getAttribute("lat");
              mapData.longitude = target.getAttribute("lng");
              mapData.scale = 14;
              Object.assign(json,screen);

              json.stationId = target.getAttribute("key");
              json.levelType = 6;
              if(screen&&screen.metroId){
                json.metroId = screen.metroId;
              }else{
                  if(keywordsSearch.typeId == 2){
                    json.metroId  = keywordsSearch.parentId;
                  }else if(keywordsSearch.typeId == 3){
                    json.metroId  = keywordsSearch.tableId;
                  }
              }
              
            //   store.state.mapScreen = json;
              mapData.isClickZoom = true;
              that.showHouse(json);
              
            
          });
          return;
        })
    },
    //个性找房房源
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
        let point = this.getMapPoint('mapData')
        // 创建点坐标 
            map.centerAndZoom(point,mapData.scale);
        
        let bounds = map.getBounds();
        if(_state.coverDataList.length > 0){


            _state.coverDataList.map((val)=>{
                if(
                    (bounds.He < parseFloat(val.lng)||bounds.He < parseFloat(val.villageLongitude)||bounds.He < parseFloat(val.longitude))&&
                    (parseFloat(val.lng) < bounds.Ce||parseFloat(val.villageLongitude) < bounds.Ce||parseFloat(val.longitude) < bounds.Ce) &&
                    (bounds.Rd < parseFloat(val.lat)||bounds.Rd < parseFloat(val.villageLatitude)||bounds.Rd < parseFloat(val.latitude))&&
                    (parseFloat(val.lat) < bounds.Pd||parseFloat(val.villageLatitude) < bounds.Pd||parseFloat(val.latitude) < bounds.Pd)
                ){
                    var price,myCompOverlay,txt,mouseoverTxt;
                    if(data.levelType==6){
                        price = val.minShowPrice, txt = val.villageName, mouseoverTxt = val.roomCount + "间";
                        myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.villageLongitude,val.villageLatitude),val.villageId,price, txt,mouseoverTxt,"ComplexOverlay");
                    }else{
                        price = val.minPrice, txt = val.value, mouseoverTxt = val.count + "间";
                        myCompOverlay = new ComplexOverlay.ComplexAreaOverlay(new BMap.Point(val.lng,val.lat),val.key,price, txt,mouseoverTxt,"ComplexOverlay");
                    }
                    map.addOverlay(myCompOverlay);
                    
                    //覆盖物添加点击事件+
                    myCompOverlay._div.addEventListener('touchstart',function(){
                        map.disableDragging(); //禁用地图拖拽功能
                    });
    
                    switch (data.levelType) {
                        case 1:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,2);
                                mapData.scale = 10;
                            }
                            ,false);
                            break;
                        case 2:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,3);
                                mapData.scale = 14;
                            }
                            ,false);
                            break;
                        case 3:
                            myCompOverlay._div.addEventListener("click", 
                            function (e) {
                                fuzhi(e,4);
                                mapData.scale = 15;
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
                                mapData.scale = 16;
                                mapData.villageId = target.getAttribute("key");
                                mapData.showRoomList = true;
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
            mapData.latitude = target.getAttribute("lat");
            mapData.longitude = target.getAttribute("lng");
            // json.radius = mapData.speed * mapData.time;
            json.radius = mapData.radius;
            Object.assign(json,screen);
            json.levelType = levelType;
            if(!flag){
                that.showCoverHouse(json);
                mapData.isClickZoom = true;
            }
            return json;
        }
    },
}
