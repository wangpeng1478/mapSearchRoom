<template>
  <div>
    <p to="index" class="close" append @click="handleClose"></p>
    <p class="tit">当前定位城市</p>
    <div class="location">
      <i :class="{'refresh-rotate' : positionState==1}" class="refresh"></i>
      <p v-show="positionState==1">正在获取当前定位城市</p>
      <p v-show="positionState==0 && localCity==-1" @click="getLocation">定位失败 点击重试</p>
      <p v-if="positionState==0 && localCity!=-1" @click="chooseCity(localCity)">{{cityList[localCity].cityName}}</p>
    </div>
    <p class="tit">选择城市</p>
    <ul class="city-list" v-if="cityList">
      <li v-for="(city,index) in cityList" :key="city.cityId">
        <p @click="chooseCity(index)">{{ city.cityName }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {recordButton} from '@/utils/record';
export default {
  name: "Address",
  data() {
    return {
      localCity: -1,
      positionState: 1 //定位状态，1：正在定位，0：定位完成
    };
  },
  mounted(){
    this.getLocation()
  },
  methods: {
    ...mapMutations(['assign','currentCityChange']),
    handleClose(){
      recordButton('城市切换页面关闭按钮')
      this.$router.go(-1);
    },
    chooseCity(idx){
      recordButton('城市切换页面点击城市')
      if(this.cityList[idx].cityId!=this.currentCity.cityId){
        this.currentCityChange(idx);
      }else{
        this.$router.go(-1);
      }
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
    }
  },
  computed:mapState(['currentCity','cityList'])
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
.city-list li p {
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
