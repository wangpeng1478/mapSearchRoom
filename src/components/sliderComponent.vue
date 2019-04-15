<template>
    <div id="slider">
        <div class="mate_line" @touchmove='movePrevent($event)'>
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
            num:0,      //移动 长度（格）
            sdvalue:0
        }
    },
    props: ["sliderMin","sliderMax","step","value"],
    mounted: function (){
        this.lineLength = document.getElementsByClassName("mate_line")[0].offsetWidth;
        this.sl = this.lineLength/this.step; 
        this.sdvalue = parseInt(this.value);
        this.sliderLeft = this.sdvalue*this.sl;
        let s = document.getElementsByClassName("slider")[0],
            lineA = document.getElementsByClassName("mate_line_active")[0];
        s.style.left = this.sliderLeft + "px";
        lineA.style.width = this.sliderLeft + "px";
    },
    methods:{
        ...mapMutations(['assignMapData']),
        movePrevent:function(event) {
            //防止iPhone 浏览器页面 左右滑动
            event.preventDefault();
        },
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
            let num = (moveX - this.startX)/_x*Math.round(_x / sl);
            let lineLength = 0;
            
            if(this.sliderLeft + num*sl >= this.lineLength){
                num = this.step - this.sdvalue;
                lineLength = this.lineLength + "px";
            }else if(this.sliderLeft + num*sl <= 0){
                num = -this.sdvalue;
                lineLength = 0 + "px";
            }else{
                lineLength = this.sliderLeft + num*sl + "px";
            }
            s.style.left = lineLength;
            lineA.style.width = lineLength;
            if(this.num!=num){
                this.num = num;
                
            }

        },
        endSlider : function () {
            this.sdvalue =parseInt(this.sdvalue) + parseInt(this.num);
            this.$emit("moveStep",this.sdvalue)
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
