<template>
    <div id="iMate">
        <div class="back" @click="backFun"></div>
        <div class="mapShadow"></div>
        <div class="imate" @click="mateScreen"></div>
        <div v-show="!showScreen" class="iconfont icon-fold" @click="foldMate"></div>
        
        <div v-show="!showScreen" v-if="foldMate" class="individuality_mate" @touchmove.stop="moveStop">
            <div class="mate-top" @click="closedFoldMate">
                <div class="iconfont icon-you"></div>
            </div>
            <div class="mate-bottom">
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
    </div>
</template>

<script>

import sliderComponent from '@/components/sliderComponent.vue'
import  ComplexOverlay  from '@/utils/prototype.js'
import {mapState,mapMutations} from 'vuex'
import {recordButton} from '@/utils/record'
import { setTimeout } from 'timers';
export default {
    name: 'iMate',
    data () {
        return{
            speed:0,
            time:0
        }
    },
    props:["showScreen"],
    components:{sliderComponent},
    mounted:function(){
        //阻止浏览器页面滑动
        document.getElementById("iMate").addEventListener('touchmove', function (e) {
            e.preventDefault(); 
        }, {passive: false}); 


        this.$nextTick(function(){
            let map = this.map;
            let _this = this;
            this.speed = 600;   //默认出行方式 speed
            this.time = 30;
            let distance = this.speed * this.time; //默认出行方式
            this.assignMapData({
                type:1,
                scale:11
            })

            let point = new BMap.Point(_this.mapData.longitude,_this.mapData.latitude);
            let scale = _this.mapData.scale;
            map.centerAndZoom(point, scale);
            let circle = this.$.paintCircle(point,distance);
            this.assign({circleObj:circle})
            map.addOverlay(circle); //增加圆
            this.getLocation(point)
            var json = {
                longitude:this.mapData.longitude,
                latitude:this.mapData.latitude,
                levelType:this.toLevelType(scale),
                radius:distance
            };
            Object.assign(json,this.screen)
            this.assignMapData({
                longitude:json.longitude,
                latitude:json.latitude,
                levelType:json.levelType,
                radius:distance,
            })
            this.$.showCoverHouse(json);
        })
    },
    methods:{
        ...mapMutations(['assign','assignMapData','clearScreen']),
        foldMate:function(params) {
            var cn = document.getElementsByClassName("individuality_mate")[0].className;
            if(cn.indexOf("mate-stye1")>-1){
                document.getElementsByClassName("individuality_mate")[0].className = "individuality_mate";
                document.getElementsByClassName("icon-fold")[0].className = "iconfont icon-fold op0"
                
            }else{
                document.getElementsByClassName("individuality_mate")[0].className = "individuality_mate mate-stye1";
                document.getElementsByClassName("icon-fold")[0].className = "iconfont icon-fold op1";
            }
        },
        closedFoldMate:function(){
            var cn = document.getElementsByClassName("individuality_mate")[0].className;
            if(cn.indexOf("mate-stye1")>-1){
                document.getElementsByClassName("individuality_mate")[0].className = "individuality_mate";
                 document.getElementsByClassName("icon-fold")[0].className = "iconfont icon-fold op0";
            }else{
                document.getElementsByClassName("individuality_mate")[0].className = "individuality_mate mate-stye1";
                document.getElementsByClassName("icon-fold")[0].className = "iconfont icon-fold op1";
            }
        },
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
        moveStop:function(event) {
            event.preventDefault();
            // // return false
        },
        filter:function(){
           
            if(this.speed!=0){
                var mp = this.map;
                var _this = this;
                if(this.circleObj){
                    mp.removeOverlay(this.circleObj);
                }
                
                 mp.getOverlays().map((val)=>{
                    if(val._type=="ComplexCoverOverlay"){
                    mp.removeOverlay(val)
                    }
                    return;
                })

                let mapData = this.mapData;
                let pointSearch = this.pointSearch;
                this.assignMapData({
                    longitude:pointSearch.lng,
                    latitude:pointSearch.lat
                })
                let point = new BMap.Point(mapData.longitude,mapData.latitude);
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

                _this.assign({
                    pointSearch:{
                        lat:point.lat,
                        lng:point.lng,
                        name:address
                        }
                    })
                _this.map.addOverlay(myCompOverlay);
            }); 
        },
        checkTime : function (params) {
            
            if(this.time !== (20+10*params)){
                this.time = (20+10*params);
                this.assignMapData({
                    time:20+10*params,
                    radius:(20+10*params)*this.speed
                })
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
            //筛选条件置空
            this.clearScreen()
            this.assignMapData({
                levelType:2,
                scale:11,
                isOverLay:false,
            })
            this.assign({pointSearch:null})
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
                    _this.speed = val.speed;
                }
            })
            this.assignMapData({radius:this.speed*this.time})
            this.filter();
        }
    },
    computed:mapState(['currentCity','mapData','pointSearch','map','trafficSpeedList','circleObj'])
}
</script>

<style scoped>

.mate-stye1{
    height: 0vw !important;
    transform: scaleX(0)
}


.op0{
    opacity: 0!important;
}

.op1{
    opacity: 1!important;
}

.icon-fold{
    position: absolute;
    left: 50%;
    bottom: 2vh;
    width: 32px;
    height: 32px;
    margin-left: -16px;
    text-align: center;
    line-height: 32px;
    z-index: 1000;
    color: #ffffff;
    background: rgb(15, 184, 150);
    box-shadow: 0vw 0vw 1vw 0vw rgba(0, 11, 10, 0.2);
    border-radius: 1vw;
    transform: rotate(90deg);
    opacity: 0;
    transition:all 3s ease;
}

.mate-top{
    position: relative;
    width: 92vw;
    height: 5vw;
    text-align: center;
    line-height: 5vw;
    background: rgb(15, 184, 150);
    
}

.icon-you{
    color: #ffffff;
    transform: rotate(90deg);
}



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
    position: absolute;
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
    position: absolute;
    right: 4vw;
    bottom: 5vh;
    width: 92vw;
	height: 36vw;
	background-color: #ffffff;
	box-shadow: 0vw 0vw 1vw 0vw 
		rgba(0, 11, 10, 0.2);
	border-radius: 1vw;
    overflow: hidden;
    transition:transform 1s ease, height 1s ease;
}


.mate_icon{
    display: flex;
    padding-top: 5vw;
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
    width: 92vw;
    margin: 5vw 7vw 5vw 5vw;
    display:flex;
}

.mate_time span{
    flex: 1;
    font-size: 3vw;
	letter-spacing: 0vw;
	color: #000000;
}
</style>

