<template>
    <div id="slider">
        <div class="mate_line">
            <div class="mate_line_active"></div>
            <span class="slider"  @touchstart="touchSlider($event)" @touchmove='moveSlider($event)' @touchend='endSlider($event)' ></span>
        </div>
    </div>
</template>


<script>
import store from '@/store'
export default {
    name: 'slider',
    data () {
        return{
            lineLength:0,
            startX:0,
            sliderLeft:0,
        }
    },
    store,
    props: ["sliderMin","sliderMax","step"],
    mounted: function (){
        this.lineLength = document.getElementsByClassName("mate_line")[0].offsetWidth;
        this.sliderLeft = store.state.mapData.sliderLeft ;
        let s = document.getElementsByClassName("slider")[0],
            lineA = document.getElementsByClassName("mate_line_active")[0];
        s.style.left = this.sliderLeft + "px";
        lineA.style.width = this.sliderLeft + "px";
    },
    methods:{
        touchSlider : function (e) {
            let target= e.srcElement? e.srcElement: e.target;
            this.startX = e.changedTouches[0].clientX;
        },
        moveSlider:function (e) {
            let target= e.srcElement? e.srcElement: e.target;
            let moveX = e.changedTouches[0].clientX;
            let _x = Math.abs(moveX - this.startX);       //滑动距离
            let s = document.getElementsByClassName("slider")[0],
                lineA = document.getElementsByClassName("mate_line_active")[0];
            let sl = this.lineLength/this.step;     //步长
            let num = Math.round(_x / sl);
            let lineLength = 0;
            if(this.sliderLeft + (moveX - this.startX)/_x*num*sl >= this.lineLength){
                num = this.step;
                lineLength = this.lineLength + "px";
            }else if(this.sliderLeft + (moveX - this.startX)/_x*num*sl <= 0){
                num = 0;
                lineLength = 0 + "px";
            }else{
                lineLength = this.sliderLeft + (moveX - this.startX)/_x*num*sl + "px";
            }
            s.style.left = lineLength;
            lineA.style.width = lineLength;
            this.$emit("moveStep",num)
            
        },
        endSlider : function () {
            let s = document.getElementsByClassName("slider")[0];
            this.sliderLeft = parseFloat(s.style.left);
            store.state.mapData.sliderLeft = this.sliderLeft;
        }
    }
}
</script>

<style scoped>
.mate_line{
    position: relative;
    width: 76vw;
	height: 3px;
    background-color: #e4e4e4;
    margin: 0 7vw;
}

.mate_line .slider{
    position: absolute;
    top: -2vw;
    left: 0;
    margin-left: -2.5vw;
    display: inline-block;
    width: 5vw;
	height: 5vw;
    background: url(../assets/images/icon/slider.png) no-repeat;
    background-size: 100% 100%;
}

.mate_line_active{
    position: absolute;
    top: 0;
    left: 0;
    width: 0vw;
	height: 3px;
    background-color: #f08b00;
}



</style>
