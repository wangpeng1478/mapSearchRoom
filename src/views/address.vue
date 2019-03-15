<template>
  <div>
    <router-link to="/" class="close"></router-link>
    <p class="tit">当前定位城市</p>

    <p class="tit">选择城市</p>
    <ul>
      <li v-for="city in cityList" :key="city.cityId">{{ city.cityName }}</li>
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
        longitude: "121.4803295328"
      },
      {
        cityId: 28,
        cityName: "苏州",
        cityPinyin: "su",
        latitude: "31.3045865027",
        longitude: "120.5896123397"
      },
      {
        cityId: 44,
        cityName: "杭州",
        cityPinyin: "hz",
        latitude: "30.2799186759",
        longitude: "120.1617445782"
      },
      {
        cityId: 62,
        cityName: "北京",
        cityPinyin: "bj",
        latitude: "39.9110666857",
        longitude: "116.4136103013"
      },
      {
        cityId: 125,
        cityName: "南京",
        cityPinyin: "nj",
        latitude: "32.0647517242",
        longitude: "118.8029140176"
      },
      {
        cityId: 154,
        cityName: "武汉",
        cityPinyin: "wh",
        latitude: "30.5984342798",
        longitude: "114.3118287971"
      }
    ]
    }
  }
};
</script>
<style scoped>
.close {
  display: block;
  width: 4vw;
  height: 4vw;
  margin: 4vw 0 4vw 4vw;
  background: url("../assets/images/close.png") no-repeat;
  background-size: 4vw;
}
.tit {
  height: 12vw;
  text-indent: 7vw;
  color: #999;
  font-size: 4vw;
  line-height: 12vw;
  background: #f4f4f4;
}
</style>
