<template>
  <div class="slider-wrap">
    <div class="mate_line_active"></div>
    <span
      class="slider"
      @touchstart="touchSlider"
      @touchmove="moveSlider"
      @touchend="endSlider"
      :style="sliderStyle.a"
    ></span>
    <span
      class="slider"
      v-if="mode=='double'"
      @touchstart="touchSlider"
      @touchmove="moveSlider"
      @touchend="endSlider"
      :style="sliderStyle.b"
    ></span>
  </div>
</template>


<script>
import store from "@/store";
export default {
  name: "slider",
  data() {
    return {
      value: [0,0],
      sliderInfo: {
        width: "70vw",
        stepLength: ""
      },
      lineLength: 0,
      startX: 0,
      sliderLeft: 0,
      sliderStyle: {
        a: { left: "0vw" },
        b: { left: "1vw" }
      }
    };
  },
  store,
  props: ["defaultValue", "step", "mode"],
  mounted() {
    this.sliderInfo = {
      width: 70,
      stepLength: 70/this.step
    };
    let value = this.defaultValue.split(',');
    this.value = value;
    this.sliderChange()
    // this.lineLength = document.getElementsByClassName("mate_line")[0].offsetWidth;
    // this.sliderLeft = store.state.mapData.sliderLeft;
    // let s = document.getElementsByClassName("slider")[0],
    //     lineA = document.getElementsByClassName("mate_line_active")[0];
    // s.style.left = this.sliderLeft + "px";
    // lineA.style.width = this.sliderLeft + "px";
  },
  methods: {
    touchSlider(e) {
      // let target= e.srcElement? e.srcElement: e.target;
      // this.startX = e.changedTouches[0].clientX;
      
    },
    moveSlider: function(e) {
      // let target= e.srcElement? e.srcElement: e.target;
      // let moveX = e.changedTouches[0].clientX;
      // let _x = Math.abs(moveX - this.startX);       //滑动距离
      // let s = document.getElementsByClassName("slider")[0],
      //     lineA = document.getElementsByClassName("mate_line_active")[0];
      // let sl = this.lineLength/this.step;     //步长
      // let num = Math.round(_x / sl);
      // let lineLength = 0;
      // if(this.sliderLeft + (moveX - this.startX)/_x*num*sl >= this.lineLength){
      //     num = this.step;
      //     lineLength = this.lineLength + "px";
      // }else if(this.sliderLeft + (moveX - this.startX)/_x*num*sl <= 0){
      //     num = 0;
      //     lineLength = 0 + "px";
      // }else{
      //     lineLength = this.sliderLeft + (moveX - this.startX)/_x*num*sl + "px";
      // }
      // s.style.left = lineLength;
      // lineA.style.width = lineLength;
      // this.$emit("moveStep",num)

    console.log(e)


    },
    endSlider() {
      // let s = document.getElementsByClassName("slider")[0];
      // this.sliderLeft = parseFloat(s.style.left);
      // store.state.mapData.sliderLeft = this.sliderLeft;
    },
    sliderChange(){
        let stepLength = this.sliderInfo.stepLength
        this.sliderStyle = {
            a:{
                left:this.value[0]*stepLength
            },
            b:{
                left:this.value[1]*stepLength
            }
        }
    }
  }
};
</script>

<style scoped>
.slider-wrap {
  height: 5vw;
  position: relative;
  width: 75vw;
  margin: 0 2.5vw;
  height: 5vw;
}
.slider-wrap::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  top: 2.2vw;
  height: 0.6vw;
  background: #e4e4e4;
}

.slider-wrap .slider {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: -2.5vw;
  display: inline-block;
  width: 5vw;
  height: 5vw;
  background: url(../assets/images/icon/slider.png) no-repeat;
  background-size: 100% 100%;
}

.mate_line_active {
  position: absolute;
  top: 0;
  left: 0;
  width: 0vw;
  height: 3px;
  background-color: #f08b00;
}
</style>
