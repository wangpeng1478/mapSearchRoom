<template>
    <div id="iMate">
        <div class="back" @click="backFun"></div>
        <div class="mapShadow"></div>
        <div class="imate"></div>
        <div class="individuality_mate">
            <div class="mate_icon">
                <span class="iconfont icon-gongjiao" :class="mapData.type == 1?'active':''" @click="choose(1)"></span>
                <span class="iconfont icon-chuzuche" :class="mapData.type == 2?'active':''" @click="choose(2)"></span>
                <span class="iconfont icon-paobuqihang" :class="mapData.type == 3?'active':''" @click="choose(3)"></span>
                <span class="iconfont icon-buhang" :class="mapData.type == 4?'active':''" @click="choose(4)"></span>
            </div>
            
            <sliderComponent
                sliderMin='0'  
                sliderMax='4' 
                step='4'
                value=1
                @moveStep = "checkTime"
            ></sliderComponent>
            <div class="mate_time">
                <span>20分</span>
                <span>30分</span>
                <span>40分</span>
                <span>50分</span>
                <span>60分</span>
            </div>
        </div>
    </div>
</template>

<script>

import sliderComponent from '@/components/sliderComponent.vue'
import  ComplexOverlay  from '@/utils/prototype.js'
import store from '@/store'
import record from '@/utils/record'
export default {
    name: 'iMate',
    data () {
        return{
        }
    },
    store,
    components:{sliderComponent},
    props: ['showMate'],
    computed:{
       mapData(){
        return this.$store.state.mapData;
      }
    },
    watch:{
    },
    mounted:function(){
        this.$nextTick(function(){
            let map = store.state.map;
            let _state = store.state;
            let _this = this;
            let distance = 0;
            this.$store.state.trafficSpeedList.map((val)=>{
                if(val.type == _state.mapData.type){
                    _state.mapData.speed = val.speed
                }
            })
            
            if(_state.mapScreen.radius){
                distance = _state.mapScreen.radius;
            }else{
                distance = _state.mapData.speed *_state.mapData.time ; //默认出行方式
            }
            let point = new BMap.Point(_state.mapData.longitude,_state.mapData.latitude);
            let scale = _state.mapData.scale;
            map.centerAndZoom(point, scale);
            let circle = new BMap.Circle(point,distance,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
            map.addOverlay(circle); //增加圆
            
            
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs){
                var myCompOverlay = new ComplexOverlay.ComplexSiteOverlay(point, rs.addressComponents.street,"ComplexOverlay",
                function(){
                    _this.$router.push("/search");
                });
                map.addOverlay(myCompOverlay);
            }); 
            _state.mapScreen.radius = distance;
            _state.mapData.isOverLay = true;
            var json = {};
            json.longitude = _state.mapData.longitude;
            json.latitude = _state.mapData.latitude;
            Object.assign(json,_state.mapScreen,_state.screen)
            console.log("json",json)
            this.$.showCoverHouse(json);
        })
    },
    methods:{
        filter:function(){
            if(this.speed!=0){
                var mp = store.state.map;
                let _state = store.state;
                let _mapData = store.state.mapData;
                let point = new BMap.Point(_mapData.longitude,_mapData.latitude);
                let distance = this.$store.state.mapScreen.radius;
                let scale = store.state.mapData.scale;
                if(this.$store.state.mapData.isInvFind){
                    scale = Math.round(Math.log(80000000 / distance) / Math.log(2))-1;
                }
                
                store.state.mapData.scale = scale;
                mp.centerAndZoom(point, scale);
                var circle = new BMap.Circle(point,distance,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
                mp.getOverlays().map((val)=>{
                    if(val._type=="ComplexOverlay"){
                    }else{
                        mp.removeOverlay(val)
                    }
                    return;
                })
                mp.addOverlay(circle); //增加圆

                var geoc = new BMap.Geocoder();
                geoc.getLocation(point, function(rs){
                    // console.log(rs)
                    var myCompOverlay = new ComplexOverlay.ComplexSiteOverlay(point, rs.addressComponents.street,"ComplexOverlay",
                    function(){
                        _this.$router.push("/search");
                    });
                    mp.addOverlay(myCompOverlay);
                }); 
                store.state.mapData.isOverLay = true;
                this.$store.state.mapData.isInvFind = false;
                var json = {};
                json.longitude = _state.mapData.longitude;
                json.latitude = _state.mapData.latitude;
                Object.assign(json,_state.mapScreen,_state.screen)
                console.log("json",json)
                this.$.showCoverHouse(json);
            }
        },
        checkTime : function (params) {
            if(this.time !== (20+10*params)){
                this.$store.state.mapData.time = (20+10*params);
                this.$store.state.mapScreen.radius = (20+10*params)*this.$store.state.mapData.speed;
                this.filter();
            }
        },
        backFun : function (){
            var mp = store.state.map;
            var hiddenMate = false;
            var elements = document.querySelectorAll(".BMap_noprint.anchorBL")[0];
                elements.className = "BMap_noprint anchorBL "; 
            mp.getOverlays().map((val)=>{
                if(val._type=="ComplexOverlay"){
                
                }else{
                    mp.removeOverlay(val)
                }
                return;
            })
            store.state.mapData.isOverLay = false;
            this.$emit("hiddenMate",hiddenMate)
        },
        choose :function (res) {
            let _this = this;
            this.$store.state.mapData.isInvFind = true;
            this.$store.state.mapData.type = res;
            this.$store.state.trafficSpeedList.map((val)=>{
                if(val.type == res){
                    store.state.mapData.speed = val.speed;
                    record(2,'切换交通公交'+val.typeName)
                }
            })
            this.$store.state.mapScreen.radius =this.$store.state.mapData.speed*this.$store.state.mapData.time;
            this.filter();
        }
    }
}
</script>

<style scoped>
.back{
    position: fixed;
    top: 4vw;
    left: 4vw;
    width: 5vw;
    height: 5vw;
    background: url(../assets/images/icon/back.png) no-repeat;
    background-size: 100% 100%;
}

.imate{
    position: fixed;
    bottom: 61vw;
    right: 10px;
    width: 32px;
    height: 32px;
    background: #f8f8f8 url(../assets/images/icon/mate.png) no-repeat;
    background-size: 20px 20px;
    background-position: center center;
    box-shadow: 0vw 0vw 1vw 0vw rgba(0, 11, 10, 0.2);
    border-radius: 1vw;
}

.individuality_mate{
    position: fixed;
    left: 5vw;
    right: auto;
    bottom: 5vw;
    width: 92vw;
	height: 36vw;
	background-color: #ffffff;
	box-shadow: 0vw 0vw 1vw 0vw 
		rgba(0, 11, 10, 0.2);
	border-radius: 1vw;
}


.mate_icon{
    display: flex;
    padding-top: 7vw;
    padding-bottom: 6vw;
}

.mate_icon span{
    flex: 1;
    font-size: 7vw;
    text-align: center;
}

.mate_icon .iconfont.active{
    color: #00ab83;
}

.mate_time{
    width: 95vw;
    margin: 5vw 7vw 5vw 5vw;
    display:flex;
}

.mate_time span{
    flex: 1;
    font-size: 3vw;
	letter-spacing: 0vw;
	color: #000000;
    margin-left: -2.5vw;
}
</style>

