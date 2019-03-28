<template>
<div class="region-wrap">
  <div class="region-mask" @click="hiddenRegion"></div>
  <div class="region">
    <ul class="u1">
      <li @click="handleSelect(0,0)" :class="selected[0]==0 ? 'selected' : ''">不限</li>
      <li @click="handleSelect(0,1)" :class="selected[0]==1 ? 'selected' : ''">区域</li>
      <li @click="handleSelect(0,2)" :class="selected[0]==2 ? 'selected' : ''">地铁</li>
    </ul>
    <ul class="u2">
      <li  @click="handleSelect(1,-1)" v-if="selected[0]!=0" :class="selected[1] == -1 ? 'selected' : ''">不限</li>
      <template v-if="selected[0]==1">
        <li @click="handleSelect(1,index)"
          v-for="(provincial,index) in provincialList"
          :key="provincial.prcId"
          :class="selected[1]==index ? 'selected' : ''"
        >{{provincial.prcName}}</li>
      </template>
      <template v-if="selected[0]==2">
        <li @click="handleSelect(1,index)"
          v-for="(metro,index) in metroList"
          :key="metro.metroId"
          :class="selected[1]==index ? 'selected' : ''"
        >{{metro.simpleName}}</li>
      </template>
    </ul>
    <ul class="u3">
      <li @click="handleSelect(2,-1)" v-if="selected[0]!=-1 && selected[1]!=-1" :class="selected[2] == -1 ? 'selected' : ''">不限</li>
      <template v-if="selected[0]==1&& selected[1]!=-1">
        <li @click="handleSelect(2,index)"
          v-for="(area,index) in provincialList[selected[1]].ceaList"
          :key="area.ceaId"
          :class="selected[2]==index ? 'selected' : ''"
        >{{area.ceaName}}</li>
      </template>
      <template v-if="selected[0]==2 && selected[1]!=-1">
        <li  @click="handleSelect(2,index)"
          v-for="(station,index) in metroList[selected[1]].metroStationList"
          :key="station.stationId"
          :class="selected[2]==index ? 'selected' : ''"
        >{{station.stationName}}</li>
      </template>
    </ul>
  </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      selected: [0, -1, -1]
    };
  },
 methods:{
    hiddenRegion(){
    this.$emit("hiddenRegion")
  },
  handleSelect(category,index){
    let selected = JSON.parse(JSON.stringify(this.selected));
    selected[category]=index;
    selected.splice(category+1,2-category,-1,-1);
    selected=selected.slice(0,3);
    this.selected=selected;
    if(category==2){
      //返回数据
      this.$emit("hiddenRegion")
    }
  }
 },
 computed:mapState(['metroList','provincialList','mapBaseDataReady'])
};
</script>
<style scoped>
.region-wrap{
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
.region-mask{
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
