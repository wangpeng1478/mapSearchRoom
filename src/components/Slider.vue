<template>
  <div class="slider-wrap">
    <div class="mate_line_active" :style="activeLine"></div>
    <span
      class="slider slider1"
      @touchstart="touchSlider('a',$event)"
      @touchmove="moveSlider('a',$event)"
      @touchend='endSlider'
      :style="{left:sliderLeft.a+'px'}"
    ></span>
    <span
      class="slider slider2"
      @touchstart="touchSlider('b',$event)"
      @touchmove="moveSlider('b',$event)"
      @touchend='endSlider'
      :style="{left:sliderLeft.b+'px'}"
    ></span>
  </div>
</template>

<script>
export default {
  name: "slider",
  data() {
    return {
      value: {
        a: 0,
        b: 10
      },
      stepLength: 0,
      temp: {
        startX: 0,
        value: 0
      },

      sliderLeft: {
        a: 0,
        b: 0
      },
      activeLine: {
        width: 0,
        left: 0
      }
    };
  },
  props: ["step", "defaultValue"],
  mounted() {
    this.stepLength =
        document.getElementsByClassName("slider-wrap")[0].offsetWidth /
        this.step;
    this.reset()
  },
  methods: {
    reset() {
      this.changeDefaultValue(this.defaultValue)
      this.sliderChange();
    },
    changeDefaultValue(valueArr){
      this.value = {
        a: valueArr[0],
        b: valueArr[1]
      };
      this.sliderChange();
    },
    endSlider(){
      this.$emit("endSlider", [this.value.a, this.value.b]);
    },
    touchSlider: function(item, e) {
      if (e) e.preventDefault()
      this.temp = {
        startX: e.changedTouches[0].clientX,
        value: this.value[item]
      };
    },
    moveSlider: function(item, e) {
      let value = this.value;
      let offsetLeft = e.changedTouches[0].clientX - this.temp.startX;
      let valueChange =
        Math.round(offsetLeft / this.stepLength) + this.temp.value;
      if (
        (item == "a" && value.b > valueChange && valueChange >= 0) ||
        (item == "b" && value.a < valueChange && valueChange <= this.step)
      ) {
        if (value[item] != valueChange) {
          value[item] = valueChange;
          this.$emit("sliderChange", [value.a, value.b]);
          this.sliderChange();
        }
      }
    },
    sliderChange() {
      this.sliderLeft = {
        a: this.value.a * this.stepLength,
        b: this.value.b * this.stepLength
      };
      this.activeLine = {
        left: this.sliderLeft.a + "px",
        width: this.sliderLeft.b - this.sliderLeft.a + "px"
      };
    }
  }
};
</script>

<style scoped>
.slider-wrap {
  height: 6vw;
  position: relative;
  width: 65vw;
  margin: 0 auto 2vw;
  height: 6vw;
}
.slider-wrap::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  top: 2.6vw;
  height: 0.6vw;
  background: #e4e4e4;
}

.slider-wrap .slider {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: -2.5vw;
  display: inline-block;
  width: 6vw;
  height: 6vw;
  background: url(../assets/images/icon/slider.png) no-repeat;
  background-size: 100% 100%;
  z-index: 1;
}
.slider-wrap .slider1{
  transform: translateX(-2vw)
}
.slider-wrap .slider2{
  transform: translateX(2vw)
}
.mate_line_active {
  position: absolute;
  top: 2.6vw;
  height: 0.6vw;
  background-color: #f08b00;
}
</style>
