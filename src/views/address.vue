<template>
  <div>
    <router-link to="/" class="close"></router-link>
    <p class="tit">当前定位城市</p>
    <div class="location" @click="handleCurrentClick">
      <i :class="{'refresh-rotate' : positionState==1}" class="refresh"></i>
      <p v-show="positionState==1">正在获取当前定位城市</p>
      <p v-show="positionState==0 && localCity==-1">定位失败 点击重试</p>
      <p v-show="positionState==0 && localCity!=-1">{{cityList[localCity].cityName}}</p>
    </div>
    <p class="tit">选择城市</p>
    <ul class="city-list">
      <li v-for="city in cityList" :key="city.cityId">
        <router-link to="/">{{ city.cityName }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Address",
  data() {
    return {
      cityList: [
        {
          cityId: 2,
          cityName: "上海",
          latitude: "31.2363429624",
          longitude: "121.4803295328",
          baiduCode: 289
        },
        {
          cityId: 28,
          cityName: "苏州",
          cityPinyin: "su",
          latitude: "31.3045865027",
          longitude: "120.5896123397",
          baiduCode: 224
        },
        {
          cityId: 44,
          cityName: "杭州",
          cityPinyin: "hz",
          latitude: "30.2799186759",
          longitude: "120.1617445782",
          baiduCode: 44
        },
        {
          cityId: 62,
          cityName: "北京",
          cityPinyin: "bj",
          latitude: "39.9110666857",
          longitude: "116.4136103013",
          baiduCode: 131
        },
        {
          cityId: 125,
          cityName: "南京",
          cityPinyin: "nj",
          latitude: "32.0647517242",
          longitude: "118.8029140176",
          baiduCode: 315
        },
        {
          cityId: 154,
          cityName: "武汉",
          cityPinyin: "wh",
          latitude: "30.5984342798",
          longitude: "114.3118287971",
          baiduCode: 154
        }
      ],
      localCity: -1,
      positionState: 1 //定位状态，1：正在定位，0：定位完成
    };
  },
  mounted() {
    console.log("mounted");
    this.getLocation();
  },
  methods: {
    handleCurrentClick() {
      if (this.positioning) return;
      this.localCity!=-1 ? this.pageJump() : this.getLocation();
    },
    //获取当前城市
    getLocation() {
      this.positionState=1;
      let _this = this;
      var myCity = new BMap.LocalCity();
      myCity.get(res => {
        this.localCity = _this.cityList.findIndex(city => {
          return city.baiduCode == res.code;
        });
        this.positionState=0;
      });
    },
    pageJump() {
    }
  }
};
</script>
<style scoped>
.close {
  display: block;
  width: 4vw;
  height: 4vw;
  margin: 3.7vw 0 4vw 3.6vw;
  background: url("../assets/images/close.png") no-repeat;
  background-size: 4vw;
}
.tit {
  height: 12vw;
  text-indent: 6.6vw;
  color: #999;
  font-size: 4vw;
  line-height: 12vw;
  background: #f4f4f4;
}
.city-list {
  overflow: hidden;
}
.city-list li {
  height: 13.3vw;
  border-bottom: 1px solid #e5e5e5;
}
.city-list li a {
  display: block;
  height: 13.3vw;
  line-height: 13.3vw;
  font-size: 4.8vw;
  text-indent: 6.6vw;
}
.location {
  overflow: hidden;
  position: relative;
  height: 12vw;
}
.location p {
  height: 12vw;
  line-height: 12vw;
  margin-left: 13.3vw;
}
.refresh {
  display: block;
  width: 4vw;
  height: 4vw;
  background: url("../assets/images/refresh.png") no-repeat;
  background-size: 4vw;
  position: absolute;
  left: 6.6vw;
  top: 4vw;
}
.refresh-rotate {
  animation: rotate 0.8s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
