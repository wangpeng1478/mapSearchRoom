<template>
    <div id="iMate">
        <div class="back" @click="hiddenMateFun"></div>
        <div class="imate"></div>
        <div class="individuality_mate">
            <div class="mate_icon">
                <span class="iconfont icon-gongjiao" :class="isActive == 1?'active':''" @click="choose(1)"></span>
                <span class="iconfont icon-chuzuche" :class="isActive == 2?'active':''" @click="choose(2)"></span>
                <span class="iconfont icon-paobuqihang" :class="isActive == 3?'active':''" @click="choose(3)"></span>
                <span class="iconfont icon-buhang" :class="isActive == 4?'active':''" @click="choose(4)"></span>
            </div>
            
            <slider-component
                sliderMin='0'  
                sliderMax='4' 
                step='1'
            ></slider-component>
            <div class="mate_time">
                <span>15分</span>
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
export default {
    name: 'iMate',
    data () {
        return{
            isActive:1
        }
    },
    components:{sliderComponent},
    props: ['showMate'],
    methods:{
        hiddenMateFun : function (){
            var hiddenMate = false;
            var elements = document.querySelectorAll(".BMap_noprint.anchorBL")[0];
                elements.className = "BMap_noprint anchorBL "; 
            this.$emit("hiddenMate",hiddenMate)
        },
        choose :function (res) {
            this.isActive = res;
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
}
</style>

<style>

</style>

