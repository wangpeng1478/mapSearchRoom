<template>
  <div class="screen">
    <div class="screen-list">
      <div class="region" v-if="!isOverLay">
        <h4>入住区域</h4>
        <p @click="selectionArea">
          <i class="iconfont icon-dingwei"></i>
          {{regionName}}
          <i class="iconfont icon-you"></i>
        </p>
      </div>
      <div class="screen-item">
        <h4>房间特色</h4>
        <ul>
          <li
            v-for="roomFeature in roomFeatureList"
            :key="roomFeature.roomFeatureId"
            :class="query.roomFeatureId.indexOf(roomFeature.roomFeatureId)==-1? '' : 'select'"
            @click="handleRoomFeature(roomFeature.roomFeatureId)"
          >{{roomFeature.roomFeatureName}}</li>
        </ul>
      </div>
      <div class="screen-item">
        <h4>房间户型</h4>
        <ul>
          <li
            v-for="roomType in roomTypeList"
            :key="roomType.status"
            :class="query.roomType==roomType.status ? 'select': ''"
            @click="handleroomType(roomType.status)"
          >{{roomType.statusName}}</li>
        </ul>
      </div>
      <div class="screen-item" v-if="customPriceValue">
        <h4>房间价格（元）</h4>
        <Slider ref="slider" :defaultValue="customPriceValue" step="27" @sliderChange="sliderChange" @endSlider="customPrice"/>
        <p class="custom-price">
          {{customPriceValue[0]==0 ? 0 : customPriceValue[0]*100+400}} ——
          {{customPriceValue[1]==27 ? '不限' : customPriceValue[1]*100+400}}
        </p>
        <ul>
          <li
            v-for="(price,index) in priceList"
            :key="index"
            @click="handlePriceRecomm(price.content)"
            :class="priceRecomm==price.content? 'select':''"
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
            :class="query.rentDays==roomRent.roomRentDays ? 'select' : ''"
          >{{roomRent.roomRentName}}</li>
        </ul>
      </div>
    </div>
    <div class="bottom-button">
      <button class="reset" @click="handleReset">重置</button>
      <button class="confirm" :class="roomCount==0 ? 'gray' : ''" @click="handleQuery">确定<span v-if="roomCount!=null">（{{roomCount}}）</span></button>
    </div>
  </div>
</template>
<script>
import Slider from "./Slider";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import API from "@/utils/api";
import record from '@/utils/record'
export default {
  data() {
    return {
      roomCount: null,
      regionName: null,
      customPriceValue: null,
      priceRecomm: null,
      query: {
        roomFeatureId: [],
        rentDays: null,
        roomType: null
      },
      isOverLay: null
    };
  },
  components: {
    Slider
  },
  mounted() {
    this.isOverLay = this.mapData.isOverLay;
    let screenTemp = JSON.parse(JSON.stringify(this.screenTemp));
    if (this.screenTemp) {
      this.roomCount = screenTemp.roomCount;
        this.regionName = screenTemp.regionName,
        this.customPriceValue = screenTemp.customPriceValue;
        this.priceRecomm = screenTemp.priceRecomm;
        this.query = screenTemp.query;
    }else{
      this.customPriceValue = [0,27]
    }
    if (!this.isOverLay) {
      if (Object.keys(this.region).length == 0) {
        this.regionName = this.currentCity.cityName;
      } else {
        this.regionName = this.region.showRegion;
      }
    }
    this.screenChange();
  },
  methods: {
    ...mapMutations(["assign","mapDataChangelatitudeAndLongitude"]),
    screenCondition() {
      let query = Object.assign(this.query);
      if (Object.keys(this.regionTemp).length != 0 && !this.isOverLay) {
        query[this.regionTemp.key] = this.regionTemp.value;
      }
      let customPriceValue = this.customPriceValue;
      if (this.customPriceValue != [0, 27]) {
        query.priceFrom =
          customPriceValue[0] == 0 ? 0 : customPriceValue[0] * 100 + 400;
        query.priceTo =
          customPriceValue[1] == 27 ? "" : customPriceValue[1] * 100 + 400;
      }
      let priceRecomm = this.priceRecomm;
      if (priceRecomm) {
        let priceRecommValue = priceRecomm.split("-");
        if(priceRecommValue.length==1 && priceRecommValue[0]==500){
          query.priceTo = priceRecommValue[0]
        }else{
          query.priceFrom = priceRecommValue[0];
          query.priceTo = priceRecommValue[1];
        }
      }
      
      if (!query.cityId) {
        query.cityId = this.currentCity.cityId;
      }
      return query;
    },
    screenChange(msg) {
      let query = this.screenCondition();
      axios.post(API["queryMapRoomCount"], query).then(res => {
        if (res.data.code == 0) {
          let roomCount = res.data.data.roomCount;
          if (roomCount < 100) {
            this.roomCount = roomCount;
          } else {
            this.roomCount = Math.floor(roomCount / 100) + "00+";
          }
        }
      });
      record(2,msg)
    },
    customPrice(e) {
      this.customPriceValue = e;
      this.priceRecomm = null;
    },
    sliderChange(e){
      this.customPriceValue = e;
      this.priceRecomm = null;
      this.screenChange('自定义价格筛选');
    },
    selectionArea() {
      this.$emit("selectionArea");
    },
    handleReset() {
      this.query = {
        roomFeatureId: [],
        rentDays: null,
        roomType: null
      };
      this.priceRecomm = null;
      this.sliderReset();
      this.assign({
        key: "regionTemp",
        value: {}
      });
      this.screenChange('条件筛选重置按钮');
    },
    sliderReset() {
      this.customPriceValue = [0, 27];
      this.$refs.slider.reset();
    },
    handleRoomFeature(selectRroomFeatureId) {
      let roomFeatureId = this.query.roomFeatureId;
      let roomFeatureIdIndex = roomFeatureId.indexOf(selectRroomFeatureId);
      roomFeatureIdIndex == -1
        ? roomFeatureId.push(selectRroomFeatureId)
        : roomFeatureId.splice(roomFeatureIdIndex, 1);
      this.screenChange('房间特色按钮');
    },
    handleroomType(selectroomTypeStatus) {
      if (this.query.roomType == selectroomTypeStatus) {
        this.query.roomType = null;
      } else {
        this.query.roomType = selectroomTypeStatus;
      }
      this.screenChange('房间类型按钮');
    },
    handleRoomRent(selectRoomRentDays) {
      let rentDays = this.query.rentDays;
      this.query.rentDays =
        selectRoomRentDays == rentDays ? null : selectRoomRentDays;
      this.screenChange('可租日期按钮');
    },
    handlePriceRecomm(priceContent) {
      this.$refs.slider.reset();
      let priceRecomm = this.priceRecomm;
      this.priceRecomm = priceRecomm == priceContent ? null : priceContent;
      if (this.priceRecomm) {
        this.sliderReset();
      }
      this.screenChange('房间价格按钮');
    },
    handleQuery() {
      let query = this.screenCondition();
      if (!this.isOverLay){
        if(this.regionTemp.latitudeAndLongitude){
          this.mapDataChangelatitudeAndLongitude(this.regionTemp.latitudeAndLongitude)
        }
        if(this.regionTemp.levelType){
          query.levelType = this.regionTemp.levelType;
        }else{
          query.levelType=2
        }
      }
      this.assign({
        key: "screen",
        value: query
      });
      this.assign({
        key: "screenTemp",
        value: {
          roomCount: this.roomCount,
          regionName: this.regionName,
          customPriceValue: this.customPriceValue,
          priceRecomm: this.priceRecomm,
          query: this.query
        }
      });
      if (!this.isOverLay) {
        this.assign({
          key: "region",
          value: this.regionTemp
        });
      }
      this.recordInfo(query)
      this.$emit('screen')
    },
    recordInfo(query){
      let roomFeatureId = JSON.parse(JSON.stringify(this.query.roomFeatureId));
      let roomFeatureKeyword = ''
      this.roomFeatureList.forEach(item=>{
        roomFeatureId.forEach(id=>{
          if(item.roomFeatureId==id){
            roomFeatureKeyword=roomFeatureKeyword+'-'+item.roomFeatureName
          }
        })
      })
      let roomTypeKeyword = '';
      this.roomTypeList.forEach(item=>{
        if(this.query.roomType==item.status){
          roomTypeKeyword=item.statusName
        }
      })
      let priceTo = ''
      if(query.priceTo==''){
        priceTo='不限'
      }
      let keyWords=`${this.regionName}-${roomFeatureKeyword}-${roomTypeKeyword}-${query.priceFrom}-${priceTo}元`
      if(query.rentDays){
        keyWords=keyWords+'-'+query.rentDays+'日可租'
      }
      record(3,{
        keyWords,
        keyType:1
      })
    },
    showRegion() {
      if (Object.keys(this.regionTemp).length == 0) {
        this.regionName = this.currentCity.cityName;
      } else {
        this.regionName = this.regionTemp.showRegion;
      }
      this.screenChange('区域筛选按钮');
    }
  },
  computed: mapState([
    "priceList",
    "roomFeatureList",
    "roomRentList",
    "region",
    "regionTemp",
    "currentCity",
    "roomTypeList",
    "screenTemp",
    "screen",
    "mapData"
  ]),
  watch: {
    regionTemp() {
      if (!this.isOverLay) this.showRegion();
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

.custom-price {
  text-align: center;
  font-size: 4vw;
  margin: 2vw 0 4vw;
  color: #ff9900;
}
.gray{
  background: #666;
}
</style>