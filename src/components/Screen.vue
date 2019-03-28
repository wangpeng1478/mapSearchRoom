<template>
  <div class="screen">
    <div class="screen-list">
      <div class="region">
        <h4>入住区域</h4>
        <p @click="selectionArea">
          <i class="iconfont icon-dingwei"></i>{{regionName}}
          <i class="iconfont icon-you"></i>
        </p>
      </div>
      <div class="screen-item">
        <h4>房间特色</h4>
        <ul>
          <li
            v-for="roomFeature in roomFeatureList"
            :key="roomFeature.roomFeatureId"
            :class="query.roomFeatureIdList.indexOf(roomFeature.roomFeatureId)==-1? '' : 'select'"
            @click="handleRoomFeature(roomFeature.roomFeatureId)"
          >{{roomFeature.roomFeatureName}}</li>
        </ul>
      </div>
      <div class="screen-item">
        <h4>房间户型</h4>
        <ul>
          <li
            v-for="roomFeature in roomFeatureList"
            :key="roomFeature.roomFeatureId"
            :class="query.roomFeatureIdList.indexOf(roomFeature.roomFeatureId)==-1? '' : 'select'"
            @click="handleRoomFeature(roomFeature.roomFeatureId)"
          >{{roomFeature.roomFeatureName}}</li>
        </ul>
      </div>
      <div class="screen-item">
        <h4>房间价格（元）</h4>
        <Slider ref='slider' defaultValue='0,27' step="27" @sliderChange="customPrice"/>
        <p class="custom-price">{{customPriceValue[0]==0 ? 0 : customPriceValue[0]*100+400}}　——　{{customPriceValue[1]==27 ? '不限' : customPriceValue[1]*100+400}}</p>
        <ul>
          <li
            v-for="(price,index) in priceList"
            :key="index"
            @click="handlePriceRecomm(price.content)"
            :class="query.priceRecomm==price.content? 'select':''"
          >{{price.name}}</li>
        </ul>
      </div>
      <div class="screen-item">
        <h4>可租日期</h4>
        <ul>
          <li
            v-for="roomRent in roomRentList"
            :key="roomRent.roomRentDays"
            @click="handleRoomRent(roomRent.roomRentDays)"
            :class="query.roomRentDays==roomRent.roomRentDays ? 'select' : ''"
          >{{roomRent.roomRentName}}</li>
        </ul>
      </div>
    </div>
    <div class="bottom-button">
      <button class="reset" @click="handleReset">重置</button>
      <button class="confirm" @click="handelQuery">确定（100+）</button>
    </div>
  </div>
</template>
<script>
import Slider from "./Slider";
import {mapState,mapMutations} from 'vuex'
import { watch } from 'fs';
export default {
  data() {
    return {
      regionName:null,
      customPriceValue:[0,27],
      query: {
        roomFeatureIdList: [],
        roomRentDays: null,
        priceRecomm: null,
        roomType:null
      }
    };
  },
  components: {
    Slider
  },
  mounted(){
    this.showRegion()
  },
  methods: {
    screenChange(){
      console.log('screenChange')
      let data = {
        [this.region.key]:[this.region.value],
        rentDays:this.rentDays

        
      }
    },
    customPrice(e){
      this.customPriceValue = e;
      this.query.priceRecomm=null;
      this.screenChange()
    },
    selectionArea() {
      this.$emit("selectionArea");
    },
    handleReset() {
      this.query = {
        roomFeatureIdList: [],
        roomRentDays: null,
        priceRecomm: null
      };
      this.sliderReset()
    },
    sliderReset(){
      this.customPriceValue = [0,27];
      this.$refs.slider.reset()
    },
    handleRoomFeature(selectRroomFeatureId) {
      let roomFeatureIdList = this.query.roomFeatureIdList;
      let roomFeatureIdIndex = roomFeatureIdList.indexOf(selectRroomFeatureId);
      roomFeatureIdIndex == -1
        ? roomFeatureIdList.push(selectRroomFeatureId)
        : roomFeatureIdList.splice(roomFeatureIdIndex, 1);
      this.query.roomFeatureIdList = roomFeatureIdList;
      this.screenChange()
    },
    handleRoomRent(selectRoomRentDays) {
      let roomRentDays = this.query.roomRentDays;
      this.query.roomRentDays =
        selectRoomRentDays == roomRentDays ? null : selectRoomRentDays;
      this.screenChange()
    },
    handlePriceRecomm(priceContent) {
      this.$refs.slider.reset()
      let priceRecomm = this.query.priceRecomm;
      this.query.priceRecomm =
        priceRecomm == priceContent ? null : priceContent;
      if(this.query.priceRecomm){
        this.sliderReset()
      }
      this.screenChange()
    },
    handelQuery() {
      console.log("点击确定");
    },
    showRegion(){
      if(Object.keys(this.region).length ==0){
        this.regionName = this.currentCity.cityName
      }else{
        this.regionName = this.region.showRegion
      }
      this.screenChange()
    }
  },
  computed:mapState(['priceList','roomFeatureList','roomRentList','region','currentCity']),
  watch:{
    region(){
      this.showRegion()
    }
  }
};
</script>
<style scoped>
.screen {
  position: fixed;
  width: 84vw;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  box-sizing: border-box;
  height: 100vh;
  padding-bottom: 13.3vw;
  overflow: hidden;
}
.screen-list {
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 14vw;
  overflow: auto;
}
.bottom-button {
  position: absolute;
  height: 13.3vw;
  width: 84vw;
  background: #e5e5e5;
  bottom: 0;
  left: 0;
}
.bottom-button button {
  font-size: 4vw;
  text-align: center;
  line-height: 13.3vw;
  padding: 0;
  display: block;
  float: left;
  letter-spacing: 1px;
}
.reset {
  width: 33.3vw;
  color: #313131;
}
.confirm {
  color: #fff;
  width: 50.7vw;
  background: #ff9900;
}
.region,
.screen-item {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 4vw;
  overflow: hidden;
}
.region h4 {
  float: left;
}
.region p {
  float: right;
  font-size: 3.733vw;
  color: #ff9900;
  line-height: 11.5vw;
}
.region p i {
  display: inline-block;
  line-height: 1;
}
.icon-dingwei {
  color: #00ac84;
  margin-right: 2vw;
  font-size: 5vw;
  transform: translateY(0.5vw);
}
.icon-you {
  color: #000;
  display: block;
}
.region,
.screen-item h4 {
  font-size: 4vw;
  height: 11vw;
  line-height: 11.5vw;
}
.screen-item:last-of-type {
  border: none;
}
.screen-item ul {
  overflow: hidden;
}
.screen-item ul li {
  width: 22.66vw;
  box-sizing: border-box;
  border: 1px solid #a8a8a8;
  text-align: center;
  margin-right: 4vw;
  float: left;
  font-size: 3.4vw;
  margin-bottom: 3.8vw;
  line-height: 8vw;
  height: 8.1vw;
}
.screen-item ul li:nth-of-type(3n) {
  margin-right: 0;
}
.screen-item .select {
  background: #ff9900;
  color: #fff;
  border-color: #ff9900;
}
.custom-price{
  text-align: center;
  font-size: 4vw;
  margin: 2vw 0 4vw;
  color: #ff9900;
}
</style>
