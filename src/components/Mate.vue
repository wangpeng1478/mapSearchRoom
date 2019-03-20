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
            
            <slider-component
                sliderMin='0'  
                sliderMax='4' 
                step='4'
            ></slider-component>
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
import store from '@/store'
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
    name: 'iMate',
    data () {
        return{
            // type:1
        }
    },
    store,
    components:{sliderComponent},
    props: ['showMate'],
    computed:{
        // ...mapGetters(["getMap"]),
        // ...mapState(['mapData']),
        mapData(){
            this.$store.state.mapData.type;
            this.$store.state.mapData.site;
             return this.$store.state.mapData;
        }
    },
    created: function (){
    },
    watch:{
        mapData:(newQuestion, oldQuestion)=>{
            
            var mp = store.state.map;
            var _state = store.state.mapData
            let point = new BMap.Point(_state.site.lng,_state.site.lat);
            let type = newQuestion.type;
            let distance = 1000;
            switch (type) {
                case 1:
                    distance = 2000;
                    break;
                case 2:
                    distance = 1500;
                    break;
                case 3:
                    distance = 1000;
                    break;
                case 4:
                    distance = 500;
                    break;
                default:
                    break;
            }
            store.state.mapData.distance = distance;
            
            let scale = Math.round(Math.log(80000000 / distance) / Math.log(2)) - 1;
            store.state.mapData.scale = scale;
            mp.centerAndZoom(point, scale);
            var circle1 = new BMap.Circle(point,distance,{fillColor:"#78e9fe", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
            mp.clearOverlays();
            mp.addOverlay(circle1); //增加圆
            
            

            // var canvasLayer = new BMap.CanvasLayer({
            //     update: update
            // });

            // function update() {
            //     var ctx = this.canvas.getContext("2d");

            //     if (!ctx) {
            //         return;
            //     }

            //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            //     var temp = {};
            //     ctx.fillStyle = "rgba(50, 50, 255, 0.7)";
            //     ctx.beginPath();
            //     var data = [
            //         new BMap.Point(116.3964,39.9093),
            //     ];

            //     for (var i = 0, len = data.length; i < len; i++) {
            //         var pixel = mp.pointToPixel(data[i]);
            //         ctx.fillRect(pixel.x, pixel.y, 30, 30);
            //     }
            // }
            // mp.addOverlay(canvasLayer);
        }
    },
    methods:{
        backFun : function (){
            var mp = store.state.map;
            var hiddenMate = false;
            var elements = document.querySelectorAll(".BMap_noprint.anchorBL")[0];
                elements.className = "BMap_noprint anchorBL "; 
            mp.clearOverlays();
            this.$emit("hiddenMate",hiddenMate)
        },
        choose :function (res) {
            this.type = res;
            this.$store.state.mapData.type = res;
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

<style>

</style>

