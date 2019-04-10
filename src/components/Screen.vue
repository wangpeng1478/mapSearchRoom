<template>
  <div class="screen">
    <div class="screen-list">
      <div class="region" v-if="!isOverLay">
        <h4>入住区域</h4>
        <p @click="selectionArea">
          <i class="iconfont icon-dingwei"></i>
          {{(keywordsSearch.keyWords&&Object.keys(regionTemp).length==0) ? keywordsSearch.keyWords : regionName}}
          <i class="iconfont icon-you"></i>
        </p>
      </div>
      <div class="screen-item">
        <h4>房间特色</h4>
        <ul>
          <li v-for="roomFeature in roomFeatureList" :key="roomFeature.roomFeatureId"
            :class="query.roomFeatureIds.indexOf(roomFeature.roomFeatureId)==-1? '' : 'select'"
            @click="handleRoomFeature(roomFeature.roomFeatureId)">{{roomFeature.roomFeatureName}}</li>
        </ul>
      </div>
      <div class="screen-item">
        <h4>房间户型</h4>
        <ul>
          <li v-for="roomType in roomTypeList" :key="roomType.status"
            :class="query.roomType==roomType.status ? 'select': ''" @click="handleroomType(roomType.status)">
            {{roomType.statusName}}</li>
        </ul>
      </div>
      <div class="screen-item" v-if="customPriceValue">
        <h4>房间价格（元）</h4>
        <p class="custom-price">
          {{customPriceValue[0]==0 ? 0 : customPriceValue[0]*100+400}} ——
          {{customPriceValue[1]==27 ? '不限' : customPriceValue[1]*100+400}}
        </p>
        <Slider ref="slider" :defaultValue="customPriceValue" step="27" @sliderChange="sliderChange"
          @endSlider="customPrice" />
        <ul>
          <li v-for="(price,index) in priceList" :key="index" @click="handlePriceRecomm(price.content)"
            :class="priceRecomm==price.content? 'select':''">{{price.name}}</li>
        </ul>
      </div>
      <div class="screen-item">
        <h4>可租日期</h4>
        <ul>
          <li v-for="roomRent in roomRentList" :key="roomRent.roomRentDays"
            @click="handleRoomRent(roomRent.roomRentDays)"
            :class="query.rentDays==roomRent.roomRentDays ? 'select' : ''">{{roomRent.roomRentName}}</li>
        </ul>
      </div>
    </div>
    <div class="bottom-button">
      <button class="reset" @click="handleReset">重置</button>
      <button class="confirm" :class="roomCount==0 ? 'gray' : ''" @click="handleQuery">确定<span
          v-if="roomCount!=null">（{{roomCount}}）</span></button>
    </div>
  </div>
</template>
<script>
  import Slider from "./Slider";
  import {
    mapState,
    mapMutations
  } from "vuex";
  import axios from "axios";
  import API from "@/utils/api";
  import {recordButton,recordSearch} from '@/utils/record'
  export default {
    data() {
      return {
        roomCount: null,
        regionName: null,
        customPriceValue: null,
        priceRecomm: null,
        query: {
          roomFeatureIds: [],
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
      } else {
        this.customPriceValue = [0, 27]
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
      ...mapMutations(["assign", "mapDataChangelatitudeAndLongitude"]),
      screenCondition() {
        let query = JSON.parse(JSON.stringify(this.query));
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
          if (priceRecommValue.length == 1 && priceRecommValue[0] == 500) {
            query.priceTo = priceRecommValue[0]
          } else {
            query.priceFrom = priceRecommValue[0];
            query.priceTo = priceRecommValue[1];
          }
        }

        if (!query.cityId) {
          query.cityId = this.currentCity.cityId;
        }
        return query;
      },
      screenChange() {
        let query = this.screenCondition();
        if(query.stationId){
          query.metroStationId = query.stationId;
          delete query['stationId']
        }
        if(Object.keys(this.keywordsSearch).length!=0&&Object.keys(this.regionTemp).length == 0){
            let tableId=this.keywordsSearch.tableId;
            switch (this.keywordsSearch.typeId) {
              case 1:
                query.villageId=tableId
                break;
              case 2:
                query.metroStationId=tableId
                break;
              case 3:
                query.metroId=tableId
                break;
              case 4:
                query.busStationId=tableId
                break;
              case 6:
                query.ceaId=tableId
                break;
              case 7:
                query.prcId=tableId
                break;
            }
        }
        this.recordSearchInfo(query)//埋点

        axios.post(API["queryMapRoomCount"], query).then(res => {
          if (res.data.code == 0) {
            let roomCount = res.data.data.roomCount;
            if (roomCount < 100) {
              this.roomCount = roomCount;
            } else {
              let roomCountStr = roomCount.toString()
              this.roomCount = roomCountStr.charAt(0) + '0'.repeat(roomCountStr.length - 1) + '+'
            }
          }
        });
      },
      recordSearchInfo(query){
        let keyWords='';
        keyWords+=this.currentCity.cityName+'-';
        keyWords+=((this.keywordsSearch.keyWords&&Object.keys(this.regionTemp).length==0) ? this.keywordsSearch.keyWords : this.regionName)+'-'
        if(query.roomType==1) keyWords+='独卫-';
        if(query.roomType==2) keyWords+='单间-';
        if(query.roomType==3) keyWords+='整租-';
        if(query.priceFrom) keyWords+='价格最小值-'+query.priceFrom+'-';
        if(query.priceTo) keyWords+='价格最大值-'+query.priceTo+'-';
        if(query.rentDays) keyWords+='可租日期'+query.rentDays+"-";
        if(query.roomFeatureIds){
          if(query.roomFeatureIds.indexOf(1)!=-1) keyWords+='近地铁-'
          if(query.roomFeatureIds.indexOf(2)!=-1) keyWords+='特价房-'
          if(query.roomFeatureIds.indexOf(3)!=-1) keyWords+='精装修-'
          if(query.roomFeatureIds.indexOf(4)!=-1) keyWords+='飘窗-'
          if(query.roomFeatureIds.indexOf(5)!=-1) keyWords+='阳台-'
          if(query.roomFeatureIds.indexOf(6)!=-1) keyWords+='房东原装-'
          if(query.roomFeatureIds.indexOf(7)!=-1) keyWords+='优选-'
        }
        recordSearch({
          keyType:1,
          keyWords
        })
      },
      customPrice(e) {
        this.customPriceValue = e;
        this.priceRecomm = null;
        this.screenChange();
      },
      sliderChange(e) {
        this.customPriceValue = e;
        this.priceRecomm = null;
      },
      selectionArea() {
        this.$emit("selectionArea");
      },
      handleReset() {
        recordButton('地图页面点击筛选中的重置');
        this.query = {
          roomFeatureIds: [],
          rentDays: null,
          roomType: null
        };
        this.priceRecomm = null;
        this.sliderReset();
        this.assign({
          key: "regionTemp",
          value: {}
        });
        this.screenChange();
      },
      sliderReset() {
        this.customPriceValue = [0, 27];
        this.$refs.slider.reset();
      },
      handleRoomFeature(selectRoomFeatureId) {
        let roomFeatureIds = this.query.roomFeatureIds;
        let roomFeatureIdIndex = roomFeatureIds.indexOf(selectRoomFeatureId);
        roomFeatureIdIndex == -1 ?
          roomFeatureIds.push(selectRoomFeatureId) :
          roomFeatureIds.splice(roomFeatureIdIndex, 1);
        this.screenChange();
      },
      handleroomType(selectroomTypeStatus) {
        if (this.query.roomType == selectroomTypeStatus) {
          this.query.roomType = null;
        } else {
          this.query.roomType = selectroomTypeStatus;
        }
        this.screenChange();
      },
      handleRoomRent(selectRoomRentDays) {
        let rentDays = this.query.rentDays;
        this.query.rentDays =
          selectRoomRentDays == rentDays ? null : selectRoomRentDays;
        this.screenChange();
      },
      handlePriceRecomm(priceContent) {

        let priceRecomm = this.priceRecomm;
        this.priceRecomm = priceRecomm == priceContent ? null : priceContent;
        if (this.priceRecomm) {
          let priceRecomm = this.priceRecomm;
          let priceRecommValue = priceRecomm.split("-");
          let priceFrom, priceTo;
          if (priceRecommValue.length == 1 && priceRecommValue[0] == 500) {
            priceTo = priceRecommValue[0];
            priceFrom = 0
          } else {
            priceFrom = priceRecommValue[0];
            priceTo = priceRecommValue[1];
          }
          let val = [0, 27];
          if (priceFrom != 0) {
            val[0] = priceFrom / 100 - 4;
          }
          if (priceTo) {
            val[1] = priceTo / 100 - 4;
          }
          this.customPriceValue = val;
          this.$refs.slider.changeDefaultValue(val);
        } else {
          this.customPriceValue = [0, 27];
          this.$refs.slider.changeDefaultValue([0, 27]);
        }
        this.screenChange();
      },
      handleQuery() {
        recordButton('地图页面点击筛选中的确定');
        let query = this.screenCondition();
        if (!this.isOverLay) {
          if (Object.keys(this.regionTemp).length != 0 && Object.keys(this.keywordsSearch).length != 0) {
            this.assign({
              key: 'keywordsSearch',
              value: {}
            })
          }
          if (Object.keys(this.regionTemp).length != 0) {
            if (this.regionTemp.latitudeAndLongitude) {
              this.mapDataChangelatitudeAndLongitude(this.regionTemp.latitudeAndLongitude)
            } else if (Object.keys(this.regionTemp).length == 0) {
              this.mapDataChangelatitudeAndLongitude({
                latitude: this.currentCity.latitude,
                longitude: this.currentCity.longitude
              })
            }
            if (this.regionTemp.levelType) {
              query.levelType = this.regionTemp.levelType;
            } else {
              query.levelType = 2
            }
            if (this.regionTemp.metroId) {
              query.metroId = this.regionTemp.metroId
            }
          } else if (Object.keys(this.keywordsSearch).length != 0) {
            if(this.keywordsSearch.latitude){
              query.latitude=this.keywordsSearch.latitude;
              query.longitude=this.keywordsSearch.longitude;
            }
            let tableId=this.keywordsSearch.tableId;
            switch (this.keywordsSearch.typeId) {
              case 1:
                query.levelType = 4;
                query.villageId=tableId
                break;
              case 2:
                query.levelType = 6
                query.metroStationId=tableId
                break;
              case 3:
                query.levelType = 5
                query.metroId=tableId
                break;
              case 4:
                query.levelType = 7
                query.busStationId=tableId
                break;
              case 6:
                query.levelType = 3
                query.ceaId=tableId
                break;
              case 7:
                query.levelType = 2
                query.prcId=tableId
                break;
            }
          }else if(Object.keys(this.regionTemp).length == 0){
            query.levelType = 2
          }
        }
        this.assign({
          key: "screen",
          value: {
            ...query,
            ...this.regionTemp.latitudeAndLongitude
          }
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
        this.$emit('screen')
      },
      showRegion() {
        if (Object.keys(this.regionTemp).length == 0) {
          this.regionName = this.currentCity.cityName;
        } else {
          this.regionName = this.regionTemp.showRegion;
        }
        this.screenChange();
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
      "mapData",
      "keywordsSearch"
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
    position: absolute;
    width: 84vw;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
  }

  .screen-list {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 14vw;
    overflow: auto;
  }

  .bottom-button {
    position: absolute;
    height: 13.3vw;
    width: 84vw;
    background: #e5e5e5;
    bottom: 0;
    right: 0;
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
    position: relative;
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
    position: absolute;
    right: 5vw;
    top: 1vw;
  }

  .gray {
    background: #666;
  }
</style>