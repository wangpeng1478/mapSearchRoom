<template>
    <div id="slider">
        <div class="mate_line">
            <div class="mate_line_active"></div>
            <span class="slider"  @touchstart="touchSlider($event)" @touchmove='moveSlider($event)' @touchend='endSlider($event)' ></span>
        </div>
    </div>
</template>


<script>
import {mapMutations} from 'vuex'
export default {
    name: 'slider',
    data () {
        return{
            lineLength:0,
            startX:0,
            sliderLeft:0,
            sl:0,    //步长
            num:0
        }
    },
    props: ["sliderMin","sliderMax","step","value"],
    mounted: function (){
        this.lineLength = document.getElementsByClassName("mate_line")[0].offsetWidth;
        this.sl = this.lineLength/this.step; 
        this.num = this.value;
        this.sliderLeft = this.num*this.sl;
        let s = document.getElementsByClassName("slider")[0],
            lineA = document.getElementsByClassName("mate_line_active")[0];
        s.style.left = this.sliderLeft + "px";
        lineA.style.width = this.sliderLeft + "px";
    },
    methods:{
        ...mapMutations(['assignMapData']),
        touchSlider : function (e) {
            var s = document.getElementsByClassName("slider")[0];
            this.sliderLeft = parseFloat(s.style.left);
            this.startX = e.changedTouches[0].clientX;
        },
        moveSlider:function (e) {
            
            let sl = this.sl;
            this.assignMapData({isInvFind:true})
            let moveX = e.changedTouches[0].clientX;
            let _x = Math.abs(moveX - this.startX);       //滑动距离
            let s = document.getElementsByClassName("slider")[0],
                lineA = document.getElementsByClassName("mate_line_active")[0];
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
            if(this.num!=num){
                this.num = num;
                
            }
        },
        endSlider : function () {
            this.$emit("moveStep",this.num)
            this.assignMapData({isInvFind:false})
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
