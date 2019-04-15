<template>
    <div id="iMate">
        <div class="back" @click="backFun"></div>
        <div class="mapShadow"></div>
        <div class="imate" @click="mateScreen"></div>
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
import {mapState,mapMutations} from 'vuex'
import {recordButton} from '@/utils/record'
export default {
    name: 'iMate',
    data () {
        return{
            speed:0,
            time:0
        }
    },
    store,
    components:{sliderComponent},
    mounted:function(){
        this.$nextTick(function(){
            let map = this.map;
            let _this = this;
            let distance = 0;
            this.speed = 800;
            this.time = 30;
            distance = this.speed * this.time; //默认出行方式
            this.assignMapData({
                type:2,
                scale:11
            })

            let point = new BMap.Point(_this.mapData.longitude,_this.mapData.latitude);
            let scale = _this.mapData.scale;
            map.centerAndZoom(point, scale);
            let circle = this.$.paintCircle(point,distance);
            this.$store.state.circleObj = circle;
            map.addOverlay(circle); //增加圆
            this.getLocation(point)
            // this.mapScreen.radius = distance;
            this.mapData.radius = distance;
            //筛选条件置空
            this.clearScreen()
            var json = {};
            json.longitude = this.mapData.longitude;
            json.latitude = this.mapData.latitude;
            json.levelType = this.toLevelType(scale);
            json.radius = distance;

            this.assignMapData({
                mateSite:{
                    latitude:json.latitude,
                    longitude:json.longitude,
                }
            })
            Object.assign(json,this.screen)
            this.assignMapData({
                longitude:json.longitude,
                latitude:json.latitude,
                levelType:json.levelType
            })
            this.$.showCoverHouse(json);
        })
    },
    methods:{
        ...mapMutations(['assignMapData','clearScreen']),
        toLevelType:function(scale){
            var levelType;
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
            
            return levelType;
        },
        filter:function(){
           
            if(this.speed!=0){
                var mp = this.map;
                var _this = this;
                if(store.state.circleObj){
                    mp.removeOverlay(store.state.circleObj);
                }
                
                 mp.getOverlays().map((val)=>{
                    if(val._type=="ComplexCoverOverlay"){
                    mp.removeOverlay(val)
                    }
                    return;
                })

                let mapData = this.mapData;
                this.assignMapData({
                    longitude:mapData.mateSite.longitude,
                    latitude:mapData.mateSite.latitude
                })
                let point = new BMap.Point(mapData.longitude,mapData.latitude);
                // let distance = this.mapScreen.radius;
                let distance = this.mapData.radius;
                let scale = mapData.scale;
                if(mapData.isInvFind){
                    scale = Math.round(Math.log(80000000 / distance) / Math.log(2))-1;
                }
                this.assignMapData({
                    isOverLay:true,
                    scale:scale,
                    isClickZoom:true
                })
                
                var circle = this.$.paintCircle(point,distance);
                mp.getOverlays().map((val)=>{
                    if(val._type!="ComplexOverlay"){
                        mp.removeOverlay(val)
                    }
                    return;
                })
                mp.addOverlay(circle); //增加圆
                this.getLocation(point);
                let json = {
                    longitude:this.mapData.longitude,
                    latitude:this.mapData.latitude,
                    levelType:this.toLevelType(scale),
                    radius:distance
                }
                Object.assign(json,this.screen)
                this.assignMapData({
                    levelType:json.levelType,
                    isInvFind:false
                })
                this.$.showCoverHouse(json);
            }
        },
        getLocation(point){
            let _this = this;
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs){
                    var address =  rs.addressComponents.street==""?rs.addressComponents.district:rs.addressComponents.street;
                    if(_this.pointSearch){
                        address = _this.pointSearch.name;
                    }
                    var myCompOverlay = new ComplexOverlay.ComplexSiteOverlay(point,address,"ComplexCoverOverlay",
                    function(){
                        _this.$router.push('/'+_this.currentCity.cityPinyin+"/map/search");
                    });
                    _this.map.addOverlay(myCompOverlay);
                }); 
        },
        checkTime : function (params) {
            
            if(this.time !== (20+10*params)){
                this.$store.state.mapData.time = (20+10*params);
                // this.$store.state.mapScreen.radius = (20+10*params)*this.mapData.speed;
                // this.$store.state.mapData.radius = (20+10*params)*this.mapData.speed;
                this.time = (20+10*params);
                this.assignMapData({
                    radius:(20+10*params)*this.speed
                })
                console.log("radius",this.mapData.radius)
                this.filter();
            }
        },
        backFun : function (){
            var mp = this.map;
            var hiddenMate = false;
            var elements = document.querySelectorAll(".BMap_noprint.anchorBL")[0];
                elements.className = "BMap_noprint anchorBL "; 
            mp.getOverlays().map((val)=>{
                 mp.removeOverlay(val)
                return;
            })
            this.assignMapData({isOverLay:false})
            //筛选条件置空
            this.clearScreen()
            this.assignMapData({
                levelType:2,
                scale:11,
                isOverLay:false,
            })
            this.$store.state.pointSearch = null;
            this.assignMapData({
                isOverLay:false,
            })
            this.$emit("hiddenMate",hiddenMate)
        },
        mateScreen:function(){
            this.$emit("mateScreen","showScreen")
        },
        choose :function (res) {
            if(res==1) recordButton('个性找房点击公交')
            if(res==2) recordButton('个性找房点击汽车')
            if(res==3) recordButton('个性找房点击自行车')
            if(res==4) recordButton('个性找房点击步行')
            let _this = this;
            this.assignMapData({
                isInvFind:true,
                type:res
            })
            this.trafficSpeedList.map((val)=>{
                if(val.type == res){
                    // store.state.mapData.speed = val.speed;
                    _this.speed = val.speed;
                }
            })
            // this.speed =  _this.speed;
            // this.$store.state.mapScreen.radius = this.mapData.speed*this.mapData.time;
            // this.$store.state.mapData.radius = this.mapData.speed*this.mapData.time;
            this.$store.state.mapData.radius = this.speed*this.time;
            this.filter();
        }
    },
    computed:mapState(['currentCity','mapData','pointSearch','map','mapScreen','trafficSpeedList'])
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

