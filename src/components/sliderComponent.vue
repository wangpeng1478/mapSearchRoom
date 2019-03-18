<template>
    <div id="slider">
        <div class="mate_line">
            <div class="mate_line_active"></div>
            <span class="slider" @touchstart="touchSlider" @touchmove='moveSlider' @touchend='endSlider' ></span>
        </div>
    </div>
</template>


<script>

export default {
    name: 'slider',
    data () {
        return{
        }
    },
    props: ["sliderMin","sliderMax","step"],
    methods:{
        touchSlider : function (e) {
            var e=e||event;
            let target= e.srcElement? e.srcElement: e.target;
            let startX = e.changedTouches[0].clientX;
            console.log(e)
            console.log(target)
        },
        moveSlider:function (e) {
            var e=e||event;
            let target= e.srcElement? e.srcElement: e.target;
            let moveX = e.changedTouches[0].clientX;
            
        },
        endSlider : function (e) {

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
    width: 76vw;
	height: 3px;
    background-color: #f08b00;
}



</style>
