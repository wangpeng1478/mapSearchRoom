<template>
  <div class="region-wrap">
    <div class="region-mask" @click="hiddenRegion"></div>
    <div class="region">
      <ul class="u1">
        <li @click="handleSelect(0,-1)" :class="selected[0]==-1 ? 'selected' : ''">不限</li>
        <li @click="handleSelect(0,0)" :class="selected[0]==0 ? 'selected' : ''">区域</li>
        <li @click="handleSelect(0,1)" :class="selected[0]==1 ? 'selected' : ''">地铁</li>
      </ul>
      <ul class="u2">
        <!-- <li  @click="handleSelect(1,-1)" v-if="selected[0]!=-1" :class="selected[1] == -1 ? 'selected' : ''">不限</li> -->
        <template v-if="selected[0]==0">
          <li @click="handleSelect(1,index)" v-for="(provincial,index) in provincialList" :key="provincial.prcId"
            :class="selected[1]==index ? 'selected' : ''">{{provincial.prcName}}</li>
        </template>
        <template v-if="selected[0]==1">
          <li @click="handleSelect(1,index)" v-for="(metro,index) in metroList" :key="metro.metroId"
            :class="selected[1]==index ? 'selected' : ''">{{metro.simpleName}}</li>
        </template>
      </ul>
      <ul class="u3">
        <li @click="handleSelect(2,-1)" v-if="selected[0]!=-1 && selected[1]!=-1"
          :class="selected[2] == -1 ? 'selected' : ''">不限</li>
        <template v-if="selected[0]==0&& selected[1]!=-1">
          <li @click="handleSelect(2,index)" v-for="(area,index) in provincialList[selected[1]].ceaList"
            :key="area.ceaId" :class="selected[2]==index ? 'selected' : ''">{{area.ceaName}}</li>
        </template>
        <template v-if="selected[0]==1 && selected[1]!=-1">
          <li @click="handleSelect(2,index)" v-for="(station,index) in metroList[selected[1]].metroStationList"
            :key="station.stationId" :class="selected[2]==index ? 'selected' : ''">{{station.stationName}}</li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import record from '@/utils/record';
  export default {
    data() {
      return {
        selected: [-1, -1, -1]
      };
    },
    mounted(){
      console.log(this.regionTemp)
      if(this.regionTemp && this.regionTemp.selected){
        this.selected = this.regionTemp.selected
      }
    },
    methods: {
      ...mapMutations(['assign']),
      hiddenRegion() {
        this.$emit("hiddenRegion");
      },
      handleSelect(category, index) {
        let selected = JSON.parse(JSON.stringify(this.selected));
        selected[category] = index;
        selected.splice(category + 1, 2 - category, -1, -1);
        selected = selected.slice(0, 3);
        this.selected = selected;

        if (category == 2 || index == -1) {
          this.recordInfo()
          //返回数据
          let data;
          let cityName = this.currentCity.cityName;
          if (category == 0) {
            data = {
              showRegion: cityName,
              key: "cityId",
              value: this.currentCity.cityId,
              levelType:1,
                latitudeAndLongitude:{
                  latitude:this.currentCity.latitude,
                  longitude:this.currentCity.longitude
                }
            };
          }
          if (category == 2 && index == -1) {
            if (selected[0] == 0) {
              let provincial = this.provincialList[selected[1]]
              data = {
                showRegion: cityName + '-' + provincial.prcName,
                key: "prcId",
                value: provincial.prcId,
                levelType:2,
                latitudeAndLongitude:{
                  latitude:provincial.latitude,
                  longitude:provincial.longitude
                }
              };
            }
            if (selected[0] == 1) {
              let metro = this.metroList[selected[1]]
              data = {
                showRegion: cityName + '-' + metro.simpleName,
                key: "metroId",
                value: metro.metroId,
                levelType:5
              };
            }
          }
          if (category == 2 && index != -1) {
            if (selected[0] == 0) {
              let cea = this.provincialList[selected[1]].ceaList[selected[2]]
              data = {
                showRegion: cityName + '-' + this.provincialList[selected[1]].prcName + '-' + cea.ceaName,
                key: "ceaId",
                value: cea.ceaId,
                levelType:3,
                latitudeAndLongitude:{
                  latitude:cea.latitude,
                  longitude:cea.longitude
                }
              };

            }
            if (selected[0] == 1) {
              let metroStation = this.metroList[selected[1]].metroStationList[selected[2]]
              data = {
                showRegion: cityName + '-' + this.metroList[selected[1]].simpleName + '-' + metroStation.stationName,
                key: "metroStationId",
                value: metroStation.stationId,
                levelType:6,
                latitudeAndLongitude:{
                  latitude:metroStation.latitude,
                  longitude:metroStation.longitude
                }
              };
            }
          }
          data.selected = this.selected;
          this.assign({
            key: 'regionTemp',
            value: data
          })
          this.$emit("hiddenRegion");
        }
      },
      recordInfo(category, index) {
        if (category == 0) {
          if (index == -1) {
            record(2, '入住区域不限')
          }
          if (index == 0) {
            record(2, '入住区域区域')
          }
          if (index == 1) {
            record(2, '入住区域地铁')
          }
        }
        if(category==1){
          if(this.selected[0]==0){
            record(2, '入住区域点击行政区'+this.provincialList[index].prcName)
          }
          if(this.selected[0]==1){
            record(2, '入住区域点击地铁线'+this.metroList[index].metroName)
          }
        }
        if(category==2){
          if(this.selected[0]==0 && index!=-1){
            record(2, '入住区域点击商圈'+this.provincialList[this.selected[1]].ceaList[index].ceaName)
          }else if(this.selected[0]==0 && index==-1){
            record(2, '入住区域点击行政区'+this.provincialList[this.selected[1]].prcName)
          }
          if(this.selected[0]==1 && index!=-1){
            record(2, '入住区域点击地铁站'+this.metroList[this.selected[1]].metroStationList[index].stationName)
          }else if(this.selected[0]==1 && index==-1){
            record(2, '入住区域点击地铁线'+this.metroList[this.selected[1]].metroName)
          }
        }
      }
    },
    computed: mapState([
      "metroList",
      "provincialList",
      "mapBaseDataReady",
      "currentCity",
      "regionTemp"
    ])
  };
</script>
<style scoped>
  .region-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 15;
  }

  .region {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 84vw;
    overflow: hidden;
    background: #fff;
    z-index: 10;
  }

  .region-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .region ul {
    overflow: auto;
    height: 100vh;
    float: left;
  }

  .region ul li {
    color: #313131;
    font-size: 4vw;
    height: 12vw;
    line-height: 12vw;
    text-align: center;
    overflow: hidden;
  }

  .u1 {
    width: 27vw;
    background: #f0f0f0;
  }

  .u2 {
    width: 27vw;
    background: #f8f8f8;
  }

  .u3 {
    width: 30vw;
  }

  .region .selected {
    color: #ff9900;
  }

  .region .u1 .selected {
    background: #f8f8f8;
  }

  .region .u2 .selected {
    background: #fff;
  }
</style>