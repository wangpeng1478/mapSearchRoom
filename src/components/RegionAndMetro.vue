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
          v-for="(area,index) in provincialList[selected[1]].areaList"
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
export default {
  data() {
    return {
      metroList: [
        {
          cityId: 2,
          metroId: 1,
          metroName: "地铁1号线",
          simpleName: "1号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 1,
              stationId: 101,
              stationName: "富锦路",
              longitude: "121.43117",
              latitude: "31.39878"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 102,
              stationName: "友谊西路",
              longitude: "121.43448",
              latitude: "31.38783"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 103,
              stationName: "宝安公路",
              longitude: "121.43750",
              latitude: "31.37630"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 104,
              stationName: "共富新村",
              longitude: "121.44060",
              latitude: "31.36165"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 105,
              stationName: "呼兰路",
              longitude: "121.44433",
              latitude: "31.34608"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 106,
              stationName: "通河新村",
              longitude: "121.44796",
              latitude: "31.33789"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 107,
              stationName: "共康路",
              longitude: "121.45361",
              latitude: "31.32545"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 108,
              stationName: "彭浦新村",
              longitude: "121.45524",
              latitude: "31.31304"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 109,
              stationName: "汶水路",
              longitude: "121.45670",
              latitude: "31.29891"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1010,
              stationName: "上海马戏城",
              longitude: "121.45865",
              latitude: "31.28594"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1011,
              stationName: "延长路",
              longitude: "121.46204",
              latitude: "31.27815"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1012,
              stationName: "中山北路",
              longitude: "121.46576",
              latitude: "31.26537"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1013,
              stationName: "上海火车站",
              longitude: "121.46252",
              latitude: "31.25370"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1014,
              stationName: "汉中路",
              longitude: "121.46514",
              latitude: "31.24790"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1015,
              stationName: "新闸路",
              longitude: "121.47495",
              latitude: "31.24479"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1016,
              stationName: "人民广场",
              longitude: "121.48184",
              latitude: "31.23899"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1017,
              stationName: "黄陂南路",
              longitude: "121.47994",
              latitude: "31.22885"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1018,
              stationName: "陕西南路",
              longitude: "121.46682",
              latitude: "31.22359"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1019,
              stationName: "常熟路",
              longitude: "121.45787",
              latitude: "31.22002"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1020,
              stationName: "衡山路",
              longitude: "121.45330",
              latitude: "31.21143"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1021,
              stationName: "徐家汇",
              longitude: "121.44489",
              latitude: "31.19924"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1022,
              stationName: "上海体育馆",
              longitude: "121.44298",
              latitude: "31.18844"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1023,
              stationName: "漕宝路",
              longitude: "121.44164",
              latitude: "31.17461"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1024,
              stationName: "上海南站",
              longitude: "121.43642",
              latitude: "31.16125"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1025,
              stationName: "锦江乐园",
              longitude: "121.42082",
              latitude: "31.14840"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1026,
              stationName: "莲花路",
              longitude: "121.40948",
              latitude: "31.13683"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1027,
              stationName: "外环路",
              longitude: "121.39996",
              latitude: "31.12702"
            },
            {
              cityId: 2,
              metroId: 1,
              stationId: 1028,
              stationName: "莘庄",
              longitude: "121.39177",
              latitude: "31.11667"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 2,
          metroName: "地铁2号线",
          simpleName: "2号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 2,
              stationId: 2022,
              stationName: "徐泾东",
              longitude: "121.30768",
              latitude: "31.19531"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2021,
              stationName: "虹桥火车站",
              longitude: "121.32806",
              latitude: "31.20019"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2020,
              stationName: "虹桥2号航站楼",
              longitude: "121.33343",
              latitude: "31.20044"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2019,
              stationName: "淞虹路",
              longitude: "121.36595",
              latitude: "31.22387"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2018,
              stationName: "北新泾",
              longitude: "121.38079",
              latitude: "31.22198"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2017,
              stationName: "威宁路",
              longitude: "121.39382",
              latitude: "31.22036"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2016,
              stationName: "娄山关路",
              longitude: "121.41097",
              latitude: "31.21684"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2015,
              stationName: "中山公园",
              longitude: "121.42461",
              latitude: "31.22449"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2014,
              stationName: "江苏路",
              longitude: "121.43910",
              latitude: "31.22605"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2013,
              stationName: "静安寺",
              longitude: "121.45286",
              latitude: "31.22943"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2012,
              stationName: "南京西路",
              longitude: "121.46693",
              latitude: "31.23601"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 1016,
              stationName: "人民广场",
              longitude: "121.48184",
              latitude: "31.23899"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2010,
              stationName: "南京东路",
              longitude: "121.49047",
              latitude: "31.24279"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 209,
              stationName: "陆家嘴",
              longitude: "121.50898",
              latitude: "31.24351"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 208,
              stationName: "东昌路",
              longitude: "121.52215",
              latitude: "31.23896"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 207,
              stationName: "世纪大道",
              longitude: "121.53359",
              latitude: "31.23473"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 206,
              stationName: "上海科技馆",
              longitude: "121.55077",
              latitude: "31.22540"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 205,
              stationName: "世纪公园",
              longitude: "121.55733",
              latitude: "31.21581"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 204,
              stationName: "龙阳路",
              longitude: "121.56397",
              latitude: "31.20931"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 203,
              stationName: "张江高科",
              longitude: "121.59421",
              latitude: "31.20776"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 202,
              stationName: "金科路",
              longitude: "121.60871",
              latitude: "31.20981"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 201,
              stationName: "广兰路",
              longitude: "121.62734",
              latitude: "31.21654"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2024,
              stationName: "唐镇",
              longitude: "121.66284",
              latitude: "31.21997"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2025,
              stationName: "创新中路",
              longitude: "121.68055",
              latitude: "31.21989"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2026,
              stationName: "华夏东路",
              longitude: "121.68751",
              latitude: "31.20331"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2027,
              stationName: "川沙",
              longitude: "121.70471",
              latitude: "31.19302"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2028,
              stationName: "凌空路",
              longitude: "121.73052",
              latitude: "31.19873"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2029,
              stationName: "远东大道",
              longitude: "121.76238",
              latitude: "31.20534"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2030,
              stationName: "海天三路",
              longitude: "121.80344",
              latitude: "31.17509"
            },
            {
              cityId: 2,
              metroId: 2,
              stationId: 2031,
              stationName: "浦东国际机场",
              longitude: "121.81360",
              latitude: "31.15518"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 3,
          metroName: "地铁3号线",
          simpleName: "3号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 3,
              stationId: 301,
              stationName: "江杨北路",
              longitude: "121.44645",
              latitude: "31.41411"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 302,
              stationName: "铁力路",
              longitude: "121.46808",
              latitude: "31.41415"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 303,
              stationName: "友谊路",
              longitude: "121.48277",
              latitude: "31.40982"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 304,
              stationName: "宝杨路",
              longitude: "121.48636",
              latitude: "31.40118"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 305,
              stationName: "水产路",
              longitude: "121.49495",
              latitude: "31.38699"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 306,
              stationName: "淞滨路",
              longitude: "121.49962",
              latitude: "31.37646"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 307,
              stationName: "张华浜",
              longitude: "121.50564",
              latitude: "31.36355"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 308,
              stationName: "淞发路",
              longitude: "121.50737",
              latitude: "31.35070"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 309,
              stationName: "长江南路",
              longitude: "121.49842",
              latitude: "31.33756"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3010,
              stationName: "殷高西路",
              longitude: "121.49165",
              latitude: "31.32545"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3011,
              stationName: "江湾镇",
              longitude: "121.49187",
              latitude: "31.31105"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3012,
              stationName: "大柏树",
              longitude: "121.48985",
              latitude: "31.29499"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3013,
              stationName: "赤峰路",
              longitude: "121.48922",
              latitude: "31.28693"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3014,
              stationName: "虹口足球场",
              longitude: "121.48588",
              latitude: "31.27737"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3015,
              stationName: "东宝兴路",
              longitude: "121.48687",
              latitude: "31.26564"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3016,
              stationName: "宝山路",
              longitude: "121.48327",
              latitude: "31.25736"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 1013,
              stationName: "上海火车站",
              longitude: "121.46252",
              latitude: "31.25370"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3018,
              stationName: "中潭路",
              longitude: "121.44769",
              latitude: "31.26091"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3019,
              stationName: "镇坪路",
              longitude: "121.43647",
              latitude: "31.25271"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3020,
              stationName: "曹杨路",
              longitude: "121.42450",
              latitude: "31.24546"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3021,
              stationName: "金沙江路",
              longitude: "121.41999",
              latitude: "31.23826"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 2015,
              stationName: "中山公园",
              longitude: "121.42461",
              latitude: "31.22449"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3023,
              stationName: "延安西路",
              longitude: "121.42382",
              latitude: "31.21576"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3024,
              stationName: "虹桥路",
              longitude: "121.42754",
              latitude: "31.20339"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3025,
              stationName: "宜山路",
              longitude: "121.43360",
              latitude: "31.19292"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3026,
              stationName: "漕溪路",
              longitude: "121.44497",
              latitude: "31.18287"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3027,
              stationName: "龙漕路",
              longitude: "121.45104",
              latitude: "31.17562"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 3028,
              stationName: "石龙路",
              longitude: "121.44986",
              latitude: "31.16420"
            },
            {
              cityId: 2,
              metroId: 3,
              stationId: 1024,
              stationName: "上海南站",
              longitude: "121.43642",
              latitude: "31.16125"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 4,
          metroName: "地铁4号线",
          simpleName: "4号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 4,
              stationId: 3025,
              stationName: "宜山路",
              longitude: "121.43360",
              latitude: "31.19292"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 1022,
              stationName: "上海体育馆",
              longitude: "121.44298",
              latitude: "31.18844"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 403,
              stationName: "上海体育场",
              longitude: "121.45045",
              latitude: "31.19237"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 404,
              stationName: "东安路",
              longitude: "121.46158",
              latitude: "31.19723"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 405,
              stationName: "大木桥路",
              longitude: "121.47035",
              latitude: "31.20052"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 406,
              stationName: "鲁班路",
              longitude: "121.48119",
              latitude: "31.20513"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 407,
              stationName: "西藏南路",
              longitude: "121.49633",
              latitude: "31.20786"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 408,
              stationName: "南浦大桥",
              longitude: "121.50654",
              latitude: "31.21447"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 409,
              stationName: "塘桥",
              longitude: "121.52556",
              latitude: "31.21559"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 4010,
              stationName: "蓝村路",
              longitude: "121.53471",
              latitude: "31.21780"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 4011,
              stationName: "浦电路",
              longitude: "121.53851",
              latitude: "31.22901"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 207,
              stationName: "世纪大道",
              longitude: "121.53359",
              latitude: "31.23473"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 4013,
              stationName: "浦东大道",
              longitude: "121.52622",
              latitude: "31.24598"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 4014,
              stationName: "杨树浦路",
              longitude: "121.52415",
              latitude: "31.25787"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 4015,
              stationName: "大连路",
              longitude: "121.51978",
              latitude: "31.26391"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 4016,
              stationName: "临平路",
              longitude: "121.50781",
              latitude: "31.26677"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 4017,
              stationName: "海伦路",
              longitude: "121.49632",
              latitude: "31.26432"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 3016,
              stationName: "宝山路",
              longitude: "121.48327",
              latitude: "31.25736"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 1013,
              stationName: "上海火车站",
              longitude: "121.46252",
              latitude: "31.25370"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 3018,
              stationName: "中潭路",
              longitude: "121.44769",
              latitude: "31.26091"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 3019,
              stationName: "镇坪路",
              longitude: "121.43647",
              latitude: "31.25271"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 3020,
              stationName: "曹杨路",
              longitude: "121.42450",
              latitude: "31.24546"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 3021,
              stationName: "金沙江路",
              longitude: "121.41999",
              latitude: "31.23826"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 2015,
              stationName: "中山公园",
              longitude: "121.42461",
              latitude: "31.22449"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 3023,
              stationName: "延安西路",
              longitude: "121.42382",
              latitude: "31.21576"
            },
            {
              cityId: 2,
              metroId: 4,
              stationId: 3024,
              stationName: "虹桥路",
              longitude: "121.42754",
              latitude: "31.20339"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 5,
          metroName: "地铁5号线",
          simpleName: "5号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 5,
              stationId: 1028,
              stationName: "莘庄",
              longitude: "121.39177",
              latitude: "31.11667"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 502,
              stationName: "春申路",
              longitude: "121.39254",
              latitude: "31.10414"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 503,
              stationName: "银都路",
              longitude: "121.39708",
              latitude: "31.09527"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 504,
              stationName: "颛桥",
              longitude: "121.40864",
              latitude: "31.07303"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 505,
              stationName: "北桥",
              longitude: "121.41669",
              latitude: "31.05132"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 506,
              stationName: "剑川路",
              longitude: "121.42318",
              latitude: "31.03276"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 507,
              stationName: "东川路",
              longitude: "121.42653",
              latitude: "31.02465"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 508,
              stationName: "金平路",
              longitude: "121.41676",
              latitude: "31.01733"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 509,
              stationName: "华宁路",
              longitude: "121.40184",
              latitude: "31.01325"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 5010,
              stationName: "文井路",
              longitude: "121.38753",
              latitude: "31.00938"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 5011,
              stationName: "闵行开发区",
              longitude: "121.37670",
              latitude: "31.00650"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20641,
              stationName: "江川路",
              longitude: "121.429892",
              latitude: "31.011737"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20642,
              stationName: "西渡",
              longitude: "121.438912",
              latitude: "30.995618"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20643,
              stationName: "萧塘",
              longitude: "121.448398",
              latitude: "30.972266"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20644,
              stationName: "奉浦大道",
              longitude: "121.455718",
              latitude: "30.948119"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20645,
              stationName: "环城东路",
              longitude: "121.470082",
              latitude: "30.937138"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20646,
              stationName: "望园路",
              longitude: "121.490294",
              latitude: "30.937713"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20647,
              stationName: "金海湖",
              longitude: "121.499044",
              latitude: "30.934607"
            },
            {
              cityId: 2,
              metroId: 5,
              stationId: 20648,
              stationName: "奉贤新城",
              longitude: "121.502763",
              latitude: "30.919831"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 6,
          metroName: "地铁6号线",
          simpleName: "6号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 6,
              stationId: 601,
              stationName: "港城路",
              longitude: "121.58102",
              latitude: "31.35913"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 602,
              stationName: "外高桥保税区北",
              longitude: "121.59332",
              latitude: "31.35371"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 603,
              stationName: "航津路",
              longitude: "121.60041",
              latitude: "31.34113"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 604,
              stationName: "外高桥保税区南",
              longitude: "121.60854",
              latitude: "31.32706"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 605,
              stationName: "洲海路",
              longitude: "121.59580",
              latitude: "31.31818"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 606,
              stationName: "五洲大道",
              longitude: "121.59572",
              latitude: "31.30846"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 607,
              stationName: "东靖路",
              longitude: "121.59520",
              latitude: "31.29663"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 608,
              stationName: "巨峰路",
              longitude: "121.59485",
              latitude: "31.28653"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 609,
              stationName: "五莲路",
              longitude: "121.59441",
              latitude: "31.27784"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6010,
              stationName: "博兴路",
              longitude: "121.59329",
              latitude: "31.26989"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6011,
              stationName: "金桥路",
              longitude: "121.58825",
              latitude: "31.26312"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6012,
              stationName: "云山路",
              longitude: "121.57919",
              latitude: "31.25649"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6013,
              stationName: "德平路",
              longitude: "121.57045",
              latitude: "31.25149"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6014,
              stationName: "北洋泾路",
              longitude: "121.55910",
              latitude: "31.24542"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6015,
              stationName: "民生路",
              longitude: "121.54980",
              latitude: "31.24195"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6016,
              stationName: "源深体育中心",
              longitude: "121.54077",
              latitude: "31.23887"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 207,
              stationName: "世纪大道",
              longitude: "121.53359",
              latitude: "31.23473"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 4011,
              stationName: "浦电路",
              longitude: "121.53851",
              latitude: "31.22901"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 4010,
              stationName: "蓝村路",
              longitude: "121.53471",
              latitude: "31.21780"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6020,
              stationName: "上海儿童医学中心",
              longitude: "121.52966",
              latitude: "31.20923"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6021,
              stationName: "临沂新村",
              longitude: "121.52295",
              latitude: "31.19878"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6022,
              stationName: "高科西路",
              longitude: "121.51627",
              latitude: "31.19112"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6023,
              stationName: "东明路",
              longitude: "121.51736",
              latitude: "31.17808"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6024,
              stationName: "高青路",
              longitude: "121.52214",
              latitude: "31.16508"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6025,
              stationName: "华夏西路",
              longitude: "121.52102",
              latitude: "31.15540"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6026,
              stationName: "上南路",
              longitude: "121.51283",
              latitude: "31.15462"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6027,
              stationName: "灵岩南路",
              longitude: "121.50155",
              latitude: "31.15420"
            },
            {
              cityId: 2,
              metroId: 6,
              stationId: 6028,
              stationName: "东方体育中心",
              longitude: "121.48689",
              latitude: "31.15918"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 7,
          metroName: "地铁7号线",
          simpleName: "7号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 7,
              stationId: 701,
              stationName: "美兰湖",
              longitude: "121.35630",
              latitude: "31.40768"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 702,
              stationName: "罗南新村",
              longitude: "121.36406",
              latitude: "31.39421"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 703,
              stationName: "潘广路",
              longitude: "121.36217",
              latitude: "31.37003"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 704,
              stationName: "刘行",
              longitude: "121.36876",
              latitude: "31.36326"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 705,
              stationName: "顾村公园",
              longitude: "121.37919",
              latitude: "31.35041"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 706,
              stationName: "祁华路",
              longitude: "121.38003",
              latitude: "31.32794"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 707,
              stationName: "上海大学",
              longitude: "121.39517",
              latitude: "31.32609"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 708,
              stationName: "南陈路",
              longitude: "121.40510",
              latitude: "31.32706"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 709,
              stationName: "上大路",
              longitude: "121.41465",
              latitude: "31.32129"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7010,
              stationName: "场中路",
              longitude: "121.42004",
              latitude: "31.30979"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7011,
              stationName: "大场镇",
              longitude: "121.42282",
              latitude: "31.29954"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7012,
              stationName: "行知路",
              longitude: "121.42793",
              latitude: "31.29106"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7013,
              stationName: "大华三路",
              longitude: "121.42936",
              latitude: "31.28002"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7014,
              stationName: "新村路",
              longitude: "121.42891",
              latitude: "31.26999"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7015,
              stationName: "岚皋路",
              longitude: "121.42821",
              latitude: "31.26241"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 3019,
              stationName: "镇坪路",
              longitude: "121.43647",
              latitude: "31.25271"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7017,
              stationName: "长寿路",
              longitude: "121.44461",
              latitude: "31.24609"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7018,
              stationName: "昌平路",
              longitude: "121.44862",
              latitude: "31.24031"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 2013,
              stationName: "静安寺",
              longitude: "121.45286",
              latitude: "31.22943"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 1019,
              stationName: "常熟路",
              longitude: "121.45787",
              latitude: "31.22002"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7021,
              stationName: "肇嘉浜路",
              longitude: "121.45656",
              latitude: "31.20485"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 404,
              stationName: "东安路",
              longitude: "121.46158",
              latitude: "31.19723"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7023,
              stationName: "龙华中路",
              longitude: "121.46325",
              latitude: "31.19114"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7024,
              stationName: "后滩",
              longitude: "121.47991",
              latitude: "31.17771"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7025,
              stationName: "长清路",
              longitude: "121.49252",
              latitude: "31.18016"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7026,
              stationName: "耀华路",
              longitude: "121.50100",
              latitude: "31.18391"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7027,
              stationName: "云台路",
              longitude: "121.50714",
              latitude: "31.18759"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 6022,
              stationName: "高科西路",
              longitude: "121.51627",
              latitude: "31.19112"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7029,
              stationName: "杨高南路",
              longitude: "121.53153",
              latitude: "31.19328"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7030,
              stationName: "锦绣路",
              longitude: "121.54627",
              latitude: "31.19360"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7031,
              stationName: "芳华路",
              longitude: "121.55635",
              latitude: "31.19936"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 204,
              stationName: "龙阳路",
              longitude: "121.56397",
              latitude: "31.20931"
            },
            {
              cityId: 2,
              metroId: 7,
              stationId: 7033,
              stationName: "花木路",
              longitude: "121.56910",
              latitude: "31.21740"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 8,
          metroName: "地铁8号线",
          simpleName: "8号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 8,
              stationId: 801,
              stationName: "市光路",
              longitude: "121.53826",
              latitude: "31.32872"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 802,
              stationName: "嫩江路",
              longitude: "121.53829",
              latitude: "31.32113"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 803,
              stationName: "翔殷路",
              longitude: "121.53820",
              latitude: "31.31123"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 804,
              stationName: "黄兴公园",
              longitude: "121.53941",
              latitude: "31.30214"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 805,
              stationName: "延吉中路",
              longitude: "121.54114",
              latitude: "31.29493"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 806,
              stationName: "黄兴路",
              longitude: "121.53417",
              latitude: "31.28478"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 807,
              stationName: "江浦路",
              longitude: "121.52453",
              latitude: "31.28103"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 808,
              stationName: "鞍山新村",
              longitude: "121.51580",
              latitude: "31.27913"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 809,
              stationName: "四平路",
              longitude: "121.50755",
              latitude: "31.28078"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8010,
              stationName: "曲阳路",
              longitude: "121.49677",
              latitude: "31.28233"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 3014,
              stationName: "虹口足球场",
              longitude: "121.48588",
              latitude: "31.27737"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8012,
              stationName: "西藏北路",
              longitude: "121.47498",
              latitude: "31.26961"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8013,
              stationName: "中兴路",
              longitude: "121.47514",
              latitude: "31.25924"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8014,
              stationName: "曲阜路",
              longitude: "121.47774",
              latitude: "31.24851"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 1016,
              stationName: "人民广场",
              longitude: "121.48184",
              latitude: "31.23899"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8016,
              stationName: "大世界",
              longitude: "121.48562",
              latitude: "31.23334"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8017,
              stationName: "老西门",
              longitude: "121.48922",
              latitude: "31.22488"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8018,
              stationName: "陆家浜路",
              longitude: "121.49245",
              latitude: "31.21762"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 407,
              stationName: "西藏南路",
              longitude: "121.49633",
              latitude: "31.20786"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8020,
              stationName: "中华艺术宫",
              longitude: "121.50048",
              latitude: "31.19155"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 7026,
              stationName: "耀华路",
              longitude: "121.50100",
              latitude: "31.18391"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8022,
              stationName: "成山路",
              longitude: "121.50246",
              latitude: "31.17669"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8023,
              stationName: "杨思",
              longitude: "121.50002",
              latitude: "31.16692"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 6028,
              stationName: "东方体育中心",
              longitude: "121.48689",
              latitude: "31.15918"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8025,
              stationName: "凌兆新村",
              longitude: "121.49601",
              latitude: "31.14690"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8026,
              stationName: "芦恒路",
              longitude: "121.50411",
              latitude: "31.12512"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8027,
              stationName: "浦江镇",
              longitude: "121.51262",
              latitude: "31.10241"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8028,
              stationName: "江月路",
              longitude: "121.51486",
              latitude: "31.09020"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8029,
              stationName: "联航路",
              longitude: "121.51686",
              latitude: "31.07986"
            },
            {
              cityId: 2,
              metroId: 8,
              stationId: 8030,
              stationName: "沈杜公路",
              longitude: "121.51853",
              latitude: "31.06727"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 9,
          metroName: "地铁9号线",
          simpleName: "9号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 9,
              stationId: 20569,
              stationName: "曹路",
              longitude: "121.689449",
              latitude: "31.277549"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20568,
              stationName: "民雷路",
              longitude: "121.674609",
              latitude: "31.274649"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20567,
              stationName: "顾唐路",
              longitude: "121.663",
              latitude: "31.272188"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20566,
              stationName: "金海路",
              longitude: "121.64549",
              latitude: "31.269485"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20565,
              stationName: "金吉路",
              longitude: "121.634401",
              latitude: "31.26994"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20564,
              stationName: "金桥",
              longitude: "121.619064",
              latitude: "31.266889"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20563,
              stationName: "台儿庄路",
              longitude: "121.603984",
              latitude: "31.258705"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20562,
              stationName: "蓝天路",
              longitude: "121.584168",
              latitude: "31.247521"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 20561,
              stationName: "芳甸路",
              longitude: "121.56462",
              latitude: "31.237704"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 901,
              stationName: "杨高中路",
              longitude: "121.55475",
              latitude: "31.23400"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 207,
              stationName: "世纪大道",
              longitude: "121.53359",
              latitude: "31.23473"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 903,
              stationName: "商城路",
              longitude: "121.52262",
              latitude: "31.23633"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 904,
              stationName: "小南门",
              longitude: "121.50463",
              latitude: "31.22286"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 8018,
              stationName: "陆家浜路",
              longitude: "121.49245",
              latitude: "31.21762"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 906,
              stationName: "马当路",
              longitude: "121.48343",
              latitude: "31.21540"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 907,
              stationName: "打浦桥",
              longitude: "121.47513",
              latitude: "31.21228"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 908,
              stationName: "嘉善路",
              longitude: "121.46695",
              latitude: "31.20915"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 7021,
              stationName: "肇嘉浜路",
              longitude: "121.45656",
              latitude: "31.20485"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 1021,
              stationName: "徐家汇",
              longitude: "121.44489",
              latitude: "31.19924"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 3025,
              stationName: "宜山路",
              longitude: "121.43360",
              latitude: "31.19292"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9012,
              stationName: "桂林路",
              longitude: "121.42471",
              latitude: "31.18121"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9013,
              stationName: "漕河泾开发区",
              longitude: "121.40389",
              latitude: "31.17643"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9014,
              stationName: "合川路",
              longitude: "121.39090",
              latitude: "31.17243"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9015,
              stationName: "星中路",
              longitude: "121.37530",
              latitude: "31.16407"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9016,
              stationName: "七宝",
              longitude: "121.35578",
              latitude: "31.16160"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9017,
              stationName: "中春路",
              longitude: "121.34447",
              latitude: "31.15616"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9018,
              stationName: "九亭",
              longitude: "121.32511",
              latitude: "31.14405"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9019,
              stationName: "泗泾",
              longitude: "121.26699",
              latitude: "31.12418"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9020,
              stationName: "佘山",
              longitude: "121.23599",
              latitude: "31.11082"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9021,
              stationName: "洞泾",
              longitude: "121.23674",
              latitude: "31.09060"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9022,
              stationName: "松江大学城",
              longitude: "121.23893",
              latitude: "31.06025"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9023,
              stationName: "松江新城",
              longitude: "121.23699",
              latitude: "31.03642"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9024,
              stationName: "松江体育中心",
              longitude: "121.23686",
              latitude: "31.02226"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9025,
              stationName: "醉白池",
              longitude: "121.23556",
              latitude: "31.00720"
            },
            {
              cityId: 2,
              metroId: 9,
              stationId: 9026,
              stationName: "松江南站",
              longitude: "121.23741",
              latitude: "30.99116"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 10,
          metroName: "地铁10号线",
          simpleName: "10号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 10,
              stationId: 1001,
              stationName: "新江湾城",
              longitude: "121.51333",
              latitude: "31.33436"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1002,
              stationName: "殷高东路",
              longitude: "121.51332",
              latitude: "31.32765"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1003,
              stationName: "三门路",
              longitude: "121.51485",
              latitude: "31.31852"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1004,
              stationName: "江湾体育场",
              longitude: "121.52078",
              latitude: "31.30865"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1005,
              stationName: "五角场",
              longitude: "121.52133",
              latitude: "31.30371"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1006,
              stationName: "国权路",
              longitude: "121.51689",
              latitude: "31.29526"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1007,
              stationName: "同济大学",
              longitude: "121.51319",
              latitude: "31.28812"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 809,
              stationName: "四平路",
              longitude: "121.50755",
              latitude: "31.28078"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1009,
              stationName: "邮电新村",
              longitude: "121.50100",
              latitude: "31.27409"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 4017,
              stationName: "海伦路",
              longitude: "121.49632",
              latitude: "31.26432"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10011,
              stationName: "四川北路",
              longitude: "121.49092",
              latitude: "31.25764"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10012,
              stationName: "天潼路",
              longitude: "121.48888",
              latitude: "31.25021"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 2010,
              stationName: "南京东路",
              longitude: "121.49047",
              latitude: "31.24279"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10014,
              stationName: "豫园",
              longitude: "121.49404",
              latitude: "31.23391"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 8017,
              stationName: "老西门",
              longitude: "121.48922",
              latitude: "31.22488"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10016,
              stationName: "新天地",
              longitude: "121.48196",
              latitude: "31.22215"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 1018,
              stationName: "陕西南路",
              longitude: "121.46682",
              latitude: "31.22359"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10018,
              stationName: "上海图书馆",
              longitude: "121.45091",
              latitude: "31.21435"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10019,
              stationName: "交通大学",
              longitude: "121.44070",
              latitude: "31.20811"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 3024,
              stationName: "虹桥路",
              longitude: "121.42754",
              latitude: "31.20339"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10021,
              stationName: "宋园路",
              longitude: "121.41858",
              latitude: "31.20260"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10022,
              stationName: "伊犁路",
              longitude: "121.41081",
              latitude: "31.20454"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10023,
              stationName: "水城路",
              longitude: "121.39859",
              latitude: "31.20498"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10024,
              stationName: "龙溪路",
              longitude: "121.38661",
              latitude: "31.19979"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10025,
              stationName: "龙柏新村",
              longitude: "121.37713",
              latitude: "31.18279"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10026,
              stationName: "紫藤路",
              longitude: "121.37111",
              latitude: "31.17544"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10027,
              stationName: "航中路",
              longitude: "121.36139",
              latitude: "31.17153"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10028,
              stationName: "上海动物园",
              longitude: "121.373597",
              latitude: "31.196049"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 10029,
              stationName: "虹桥1号航站楼",
              longitude: "121.3539",
              latitude: "31.197476"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 2020,
              stationName: "虹桥2号航站楼",
              longitude: "121.33343",
              latitude: "31.20044"
            },
            {
              cityId: 2,
              metroId: 10,
              stationId: 2021,
              stationName: "虹桥火车站",
              longitude: "121.32806",
              latitude: "31.20019"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 11,
          metroName: "地铁11号线",
          simpleName: "11号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 11,
              stationId: 11037,
              stationName: "迪士尼",
              longitude: "121.674752",
              latitude: "31.147665"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11036,
              stationName: "康新公路",
              longitude: "121.62383",
              latitude: "31.136033"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11035,
              stationName: "秀沿路",
              longitude: "121.605344",
              latitude: "31.143615"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 1603,
              stationName: "罗山路",
              longitude: "121.59947",
              latitude: "31.15904"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11034,
              stationName: "御桥",
              longitude: "121.54554",
              latitude: "31.157148"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11033,
              stationName: "浦三路",
              longitude: "121.54554",
              latitude: "31.157148"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11032,
              stationName: "三林东",
              longitude: "121.529691",
              latitude: "31.152393"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 1101,
              stationName: "三林",
              longitude: "121.51765",
              latitude: "31.14854"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 6028,
              stationName: "东方体育中心",
              longitude: "121.48689",
              latitude: "31.15918"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 1103,
              stationName: "龙耀路",
              longitude: "121.46610",
              latitude: "31.16597"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 1104,
              stationName: "云锦路",
              longitude: "121.46501",
              latitude: "31.17250"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 1105,
              stationName: "龙华",
              longitude: "121.45933",
              latitude: "31.17911"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 1106,
              stationName: "上海游泳馆",
              longitude: "121.44813",
              latitude: "31.18522"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 1021,
              stationName: "徐家汇",
              longitude: "121.44489",
              latitude: "31.19924"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 10019,
              stationName: "交通大学",
              longitude: "121.44070",
              latitude: "31.20811"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 2014,
              stationName: "江苏路",
              longitude: "121.43910",
              latitude: "31.22605"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11010,
              stationName: "隆德路",
              longitude: "121.43019",
              latitude: "31.23658"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 3020,
              stationName: "曹杨路",
              longitude: "121.42450",
              latitude: "31.24546"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11012,
              stationName: "枫桥路",
              longitude: "121.41764",
              latitude: "31.24792"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11013,
              stationName: "真如",
              longitude: "121.41393",
              latitude: "31.25635"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11014,
              stationName: "上海西站",
              longitude: "121.40804",
              latitude: "31.26840"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11015,
              stationName: "李子园",
              longitude: "121.39663",
              latitude: "31.27448"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11016,
              stationName: "祁连山路",
              longitude: "121.38260",
              latitude: "31.27706"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11017,
              stationName: "武威路",
              longitude: "121.37142",
              latitude: "31.28268"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11018,
              stationName: "桃浦新村",
              longitude: "121.35604",
              latitude: "31.28750"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11019,
              stationName: "南翔",
              longitude: "121.32985",
              latitude: "31.30321"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11020,
              stationName: "马陆",
              longitude: "121.28353",
              latitude: "31.32526"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11021,
              stationName: "嘉定新城",
              longitude: "121.26114",
              latitude: "31.33560"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11029,
              stationName: "白银路",
              longitude: "121.251801",
              latitude: "31.351371"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11030,
              stationName: "嘉定西",
              longitude: "121.234404",
              latitude: "31.383236"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11031,
              stationName: "嘉定北",
              longitude: "121.24401",
              latitude: "31.397409"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11022,
              stationName: "上海赛车场",
              longitude: "121.23272",
              latitude: "31.33780"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11023,
              stationName: "昌吉东路",
              longitude: "121.20687",
              latitude: "31.29979"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11024,
              stationName: "上海汽车城",
              longitude: "121.18735",
              latitude: "31.29143"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11025,
              stationName: "安亭",
              longitude: "121.16870",
              latitude: "31.29419"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11026,
              stationName: "兆丰路",
              longitude: "121.15693",
              latitude: "31.29451"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11027,
              stationName: "光明路",
              longitude: "121.12409",
              latitude: "31.30197"
            },
            {
              cityId: 2,
              metroId: 11,
              stationId: 11028,
              stationName: "花桥",
              longitude: "121.11080",
              latitude: "31.30470"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 12,
          metroName: "地铁12号线",
          simpleName: "12号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 12,
              stationId: 1201,
              stationName: "金海路",
              longitude: "121.64495",
              latitude: "31.26876"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1202,
              stationName: "申江路",
              longitude: "121.63354",
              latitude: "31.28567"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1203,
              stationName: "金京路",
              longitude: "121.62195",
              latitude: "31.28523"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1204,
              stationName: "杨高北路",
              longitude: "121.60917",
              latitude: "31.28567"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 608,
              stationName: "巨峰路",
              longitude: "121.59485",
              latitude: "31.28653"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1206,
              stationName: "东陆路",
              longitude: "121.58500",
              latitude: "31.28853"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1207,
              stationName: "复兴岛",
              longitude: "121.56758",
              latitude: "31.28703"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1208,
              stationName: "爱国路",
              longitude: "121.55918",
              latitude: "31.28617"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1209,
              stationName: "隆昌路",
              longitude: "121.55058",
              latitude: "31.28116"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12010,
              stationName: "宁国路",
              longitude: "121.53882",
              latitude: "31.27458"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12011,
              stationName: "江浦公园",
              longitude: "121.53003",
              latitude: "31.27032"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 4015,
              stationName: "大连路",
              longitude: "121.51978",
              latitude: "31.26391"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12013,
              stationName: "提篮桥",
              longitude: "121.51303",
              latitude: "31.25896"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12014,
              stationName: "国际客运中心",
              longitude: "121.50460",
              latitude: "31.25565"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 10012,
              stationName: "天潼路",
              longitude: "121.48888",
              latitude: "31.25021"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 8014,
              stationName: "曲阜路",
              longitude: "121.47774",
              latitude: "31.24851"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1014,
              stationName: "汉中路",
              longitude: "121.46514",
              latitude: "31.24790"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 2012,
              stationName: "南京西路",
              longitude: "121.46693",
              latitude: "31.23601"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1018,
              stationName: "陕西南路",
              longitude: "121.46682",
              latitude: "31.22359"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 908,
              stationName: "嘉善路",
              longitude: "121.46695",
              latitude: "31.20915"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 405,
              stationName: "大木桥路",
              longitude: "121.47035",
              latitude: "31.20052"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 7023,
              stationName: "龙华中路",
              longitude: "121.46325",
              latitude: "31.19114"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1105,
              stationName: "龙华",
              longitude: "121.45933",
              latitude: "31.17911"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 3027,
              stationName: "龙漕路",
              longitude: "121.45104",
              latitude: "31.17562"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 1023,
              stationName: "漕宝路",
              longitude: "121.44164",
              latitude: "31.17461"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12026,
              stationName: "桂林公园",
              longitude: "121.42509",
              latitude: "31.17304"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12027,
              stationName: "虹漕路",
              longitude: "121.41697",
              latitude: "31.17007"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12028,
              stationName: "虹梅路",
              longitude: "121.40400",
              latitude: "31.16596"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12029,
              stationName: "东兰路",
              longitude: "121.39873",
              latitude: "31.16091"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12030,
              stationName: "顾戴路",
              longitude: "121.39895",
              latitude: "31.14667"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12031,
              stationName: "虹莘路",
              longitude: "121.38597",
              latitude: "31.14294"
            },
            {
              cityId: 2,
              metroId: 12,
              stationId: 12032,
              stationName: "七莘路",
              longitude: "121.36982",
              latitude: "31.13780"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 13,
          metroName: "地铁13号线",
          simpleName: "13号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 13,
              stationId: 20633,
              stationName: "张江路",
              longitude: "121.635521",
              latitude: "31.194945"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 20634,
              stationName: "学林路",
              longitude: "121.620837",
              latitude: "31.189108"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 20635,
              stationName: "中科路",
              longitude: "121.609041",
              latitude: "31.184652"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 1602,
              stationName: "华夏中路",
              longitude: "121.58962",
              latitude: "31.18096"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 20636,
              stationName: "莲溪路",
              longitude: "121.572553",
              latitude: "31.175344"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 20637,
              stationName: "陈春路",
              longitude: "121.564036",
              latitude: "31.181339"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 20638,
              stationName: "北蔡",
              longitude: "121.558763",
              latitude: "31.186467"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 20639,
              stationName: "下南路",
              longitude: "121.546672",
              latitude: "31.185533"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 20640,
              stationName: "华鹏路",
              longitude: "121.533485",
              latitude: "31.182442"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 6023,
              stationName: "东明路",
              longitude: "121.51736",
              latitude: "31.17808"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 8022,
              stationName: "成山路",
              longitude: "121.50246",
              latitude: "31.17669"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 7025,
              stationName: "长清路",
              longitude: "121.49252",
              latitude: "31.18016"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 1301,
              stationName: "世博大道",
              longitude: "121.49094",
              latitude: "31.18823"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 1302,
              stationName: "世博会博物馆",
              longitude: "121.48851",
              latitude: "31.20261"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 906,
              stationName: "马当路",
              longitude: "121.48343",
              latitude: "31.21540"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 10016,
              stationName: "新天地",
              longitude: "121.48196",
              latitude: "31.22215"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 1305,
              stationName: "淮海中路",
              longitude: "121.47068",
              latitude: "31.22620"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 2012,
              stationName: "南京西路",
              longitude: "121.46693",
              latitude: "31.23601"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 1307,
              stationName: "自然博物馆",
              longitude: "121.46928",
              latitude: "31.24192"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 1014,
              stationName: "汉中路",
              longitude: "121.46514",
              latitude: "31.24790"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 1309,
              stationName: "江宁路",
              longitude: "121.45057",
              latitude: "31.25055"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 7017,
              stationName: "长寿路",
              longitude: "121.44461",
              latitude: "31.24609"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 13011,
              stationName: "武宁路",
              longitude: "121.43642",
              latitude: "31.24011"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 11010,
              stationName: "隆德路",
              longitude: "121.43019",
              latitude: "31.23658"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 3021,
              stationName: "金沙江路",
              longitude: "121.41999",
              latitude: "31.23826"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 13014,
              stationName: "大渡河路",
              longitude: "121.40146",
              latitude: "31.23735"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 13015,
              stationName: "真北路",
              longitude: "121.38864",
              latitude: "31.23768"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 13016,
              stationName: "祁连山南路",
              longitude: "121.37389",
              latitude: "31.24298"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 13017,
              stationName: "丰庄",
              longitude: "121.36193",
              latitude: "31.24818"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 13018,
              stationName: "金沙江西路",
              longitude: "121.34144",
              latitude: "31.24721"
            },
            {
              cityId: 2,
              metroId: 13,
              stationId: 13019,
              stationName: "金运路",
              longitude: "121.32578",
              latitude: "31.24718"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 16,
          metroName: "地铁16号线",
          simpleName: "16号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 16,
              stationId: 204,
              stationName: "龙阳路",
              longitude: "121.56397",
              latitude: "31.20931"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1602,
              stationName: "华夏中路",
              longitude: "121.58962",
              latitude: "31.18096"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1603,
              stationName: "罗山路",
              longitude: "121.59947",
              latitude: "31.15904"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1604,
              stationName: "周浦东",
              longitude: "121.61328",
              latitude: "31.11561"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1605,
              stationName: "鹤沙航城",
              longitude: "121.61754",
              latitude: "31.08322"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1606,
              stationName: "航头东",
              longitude: "121.62380",
              latitude: "31.06051"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1607,
              stationName: "新场",
              longitude: "121.65501",
              latitude: "31.05130"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1608,
              stationName: "野生动物园",
              longitude: "121.70593",
              latitude: "31.05622"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 1609,
              stationName: "惠南",
              longitude: "121.76820",
              latitude: "31.05947"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 16010,
              stationName: "惠南东",
              longitude: "121.79946",
              latitude: "31.03258"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 16011,
              stationName: "书院",
              longitude: "121.85697",
              latitude: "30.96482"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 16012,
              stationName: "临港大道",
              longitude: "121.91649",
              latitude: "30.93017"
            },
            {
              cityId: 2,
              metroId: 16,
              stationId: 16013,
              stationName: "滴水湖",
              longitude: "121.93574",
              latitude: "30.91322"
            }
          ]
        },
        {
          cityId: 2,
          metroId: 54,
          metroName: "地铁17号线",
          simpleName: "17号线",
          metroStationList: [
            {
              cityId: 2,
              metroId: 54,
              stationId: 2021,
              stationName: "虹桥火车站",
              longitude: "121.32806",
              latitude: "31.20019"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20570,
              stationName: "诸光路",
              longitude: "121.299641",
              latitude: "31.197876"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20571,
              stationName: "蟠龙路",
              longitude: "121.28601",
              latitude: "31.192847"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20572,
              stationName: "徐盈路",
              longitude: "121.261172",
              latitude: "31.184323"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20573,
              stationName: "徐泾北城",
              longitude: "121.248372",
              latitude: "31.181269"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20574,
              stationName: "嘉松中路",
              longitude: "121.231307",
              latitude: "31.170012"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20575,
              stationName: "赵巷",
              longitude: "121.198722",
              latitude: "31.16745"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20576,
              stationName: "汇金路",
              longitude: "121.158335",
              latitude: "31.16694"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20577,
              stationName: "青浦新城",
              longitude: "121.131697",
              latitude: "31.164518"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20578,
              stationName: "漕盈路",
              longitude: "121.10271",
              latitude: "31.16665"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20579,
              stationName: "淀山湖大道",
              longitude: "121.088537",
              latitude: "31.140749"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20580,
              stationName: "朱家角",
              longitude: "121.088537",
              latitude: "31.140749"
            },
            {
              cityId: 2,
              metroId: 54,
              stationId: 20581,
              stationName: "东方绿舟",
              longitude: "121.026283",
              latitude: "31.10417"
            }
          ]
        }
      ],
      provincialList: [
        {
          cityId: 2,
          prcId: 3,
          prcName: "黄浦区",
          longitude: "121.4928850000",
          latitude: "31.2135770000",
          prcCode: "0901001",
          areaList: [
            {
              cityId: 2,
              prcId: 3,
              ceaId: 2,
              ceaName: "打浦桥",
              pinyin: "D",
              longitude: "121.4761010513",
              latitude: "31.2110778236",
              roomCount: 3,
              ceaDistrictId: "0901001"
            },
            {
              cityId: 2,
              prcId: 3,
              ceaId: 3,
              ceaName: "董家渡",
              pinyin: "D",
              longitude: "121.5088336871",
              latitude: "31.2190660732",
              roomCount: 2,
              ceaDistrictId: "0901001"
            },
            {
              cityId: 2,
              prcId: 3,
              ceaId: 12,
              ceaName: "世博滨江",
              pinyin: "S",
              longitude: "121.5013360000",
              latitude: "31.2092390000",
              roomCount: 4,
              ceaDistrictId: "0901001"
            },
            {
              cityId: 2,
              prcId: 3,
              ceaId: 13,
              ceaName: "外滩",
              pinyin: "W",
              longitude: "121.4967128509",
              latitude: "31.2417718418",
              roomCount: 3,
              ceaDistrictId: "0901001"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 26,
          prcName: "卢湾区",
          longitude: "121.4778600000",
          latitude: "31.2176410000",
          prcCode: "0901002",
          areaList: []
        },
        {
          cityId: 2,
          prcId: 19,
          prcName: "崇明区",
          longitude: "121.4997840000",
          latitude: "31.6169110000",
          prcCode: "0901019",
          areaList: []
        },
        {
          cityId: 2,
          prcId: 18,
          prcName: "奉贤区",
          longitude: "121.4773620000",
          latitude: "30.9319890000",
          prcCode: "0901018",
          areaList: [
            {
              cityId: 2,
              prcId: 18,
              ceaId: 229,
              ceaName: "百联南桥购物中心",
              pinyin: "B",
              longitude: "121.4902866850",
              latitude: "30.9217960172",
              roomCount: 70,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 230,
              ceaName: "奉城",
              pinyin: "F",
              longitude: "121.6523109534",
              latitude: "30.9164966807",
              roomCount: 71,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 231,
              ceaName: "海湾旅游区",
              pinyin: "H",
              longitude: "121.5349461707",
              latitude: "30.8322835184",
              roomCount: 158,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 232,
              ceaName: "环城东路",
              pinyin: "H",
              longitude: "121.4795318076",
              latitude: "30.9086018786",
              roomCount: 37,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 234,
              ceaName: "金汇",
              pinyin: "J",
              longitude: "121.5083566869",
              latitude: "30.9936948001",
              roomCount: 25,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 235,
              ceaName: "南桥",
              pinyin: "N",
              longitude: "121.4621890000",
              latitude: "30.9162160000",
              roomCount: 403,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 236,
              ceaName: "南桥新城区",
              pinyin: "N",
              longitude: "121.5098260000",
              latitude: "30.9239770000",
              roomCount: 17,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 237,
              ceaName: "西渡",
              pinyin: "X",
              longitude: "121.4504367782",
              latitude: "30.9740880827",
              roomCount: 26,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 238,
              ceaName: "新都汇",
              pinyin: "X",
              longitude: "121.5606416796",
              latitude: "30.9151224526",
              roomCount: 5,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 240,
              ceaName: "柘林",
              pinyin: "Z",
              longitude: "121.4810021163",
              latitude: "30.8361115792",
              roomCount: 59,
              ceaDistrictId: "0901018"
            },
            {
              cityId: 2,
              prcId: 18,
              ceaId: 242,
              ceaName: "庄行",
              pinyin: "Z",
              longitude: "121.4039768205",
              latitude: "30.9096809347",
              roomCount: 6,
              ceaDistrictId: "0901018"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 17,
          prcName: "青浦区",
          longitude: "121.1559850000",
          latitude: "31.1582170000",
          prcCode: "0901016",
          areaList: [
            {
              cityId: 2,
              prcId: 17,
              ceaId: 222,
              ceaName: "白鹤",
              pinyin: "B",
              longitude: "121.1467295208",
              latitude: "31.2618173747",
              roomCount: 14,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 223,
              ceaName: "华新镇",
              pinyin: "H",
              longitude: "121.2337900237",
              latitude: "31.2516247239",
              roomCount: 25,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 224,
              ceaName: "青浦城区",
              pinyin: "Q",
              longitude: "121.1310360000",
              latitude: "31.1467170000",
              roomCount: 77,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 225,
              ceaName: "青浦镇",
              pinyin: "Q",
              longitude: "121.1144735465",
              latitude: "31.1527163172",
              roomCount: 6,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 226,
              ceaName: "赵巷镇",
              pinyin: "Z",
              longitude: "121.2024997090",
              latitude: "31.1553436334",
              roomCount: 62,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 227,
              ceaName: "重固镇",
              pinyin: "C",
              longitude: "121.1846116031",
              latitude: "31.2064904186",
              roomCount: 23,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 228,
              ceaName: "朱家角",
              pinyin: "Z",
              longitude: "121.0661939166",
              latitude: "31.1148288239",
              roomCount: 141,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 381,
              ceaName: "华新大居",
              pinyin: "H",
              longitude: "",
              latitude: "",
              roomCount: 5,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 382,
              ceaName: "徐泾镇",
              pinyin: "",
              longitude: "121.2792843173",
              latitude: "31.1783589804",
              roomCount: 75,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 383,
              ceaName: "青浦新城",
              pinyin: "",
              longitude: "121.1306360000",
              latitude: "31.1555400000",
              roomCount: 101,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 390,
              ceaName: "吾悦广场",
              pinyin: "W",
              longitude: "121.1011198920",
              latitude: "31.1492101066",
              roomCount: 16,
              ceaDistrictId: "0901016"
            },
            {
              cityId: 2,
              prcId: 17,
              ceaId: 2312,
              ceaName: "香花桥",
              pinyin: "X",
              longitude: "",
              latitude: "",
              roomCount: 18,
              ceaDistrictId: "0901016"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 16,
          prcName: "松江区",
          longitude: "121.2439470000",
          latitude: "31.0454180000",
          prcCode: "0901015",
          areaList: [
            {
              cityId: 2,
              prcId: 16,
              ceaId: 201,
              ceaName: "飞航广场",
              pinyin: "F",
              longitude: "121.2137208339",
              latitude: "31.0164369107",
              roomCount: 47,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 203,
              ceaName: "九亭",
              pinyin: "J",
              longitude: "121.3342812486",
              latitude: "31.1349172337",
              roomCount: 9,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 204,
              ceaName: "开元地中海",
              pinyin: "K",
              longitude: "121.2259470674",
              latitude: "31.0439864311",
              roomCount: 10,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 208,
              ceaName: "佘山",
              pinyin: "S",
              longitude: "121.1959043814",
              latitude: "31.1062247501",
              roomCount: 393,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 209,
              ceaName: "泗泾",
              pinyin: "S",
              longitude: "121.2799723025",
              latitude: "31.1201095579",
              roomCount: 378,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 211,
              ceaName: "松江城区",
              pinyin: "S",
              longitude: "121.2422700000",
              latitude: "31.0115930000",
              roomCount: 12,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 212,
              ceaName: "松江大学城",
              pinyin: "S",
              longitude: "121.2133406710",
              latitude: "31.0560497002",
              roomCount: 54,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 213,
              ceaName: "松江老城",
              pinyin: "S",
              longitude: "121.2569560000",
              latitude: "31.0168930000",
              roomCount: 265,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 214,
              ceaName: "松江新城",
              pinyin: "S",
              longitude: "121.2398398751",
              latitude: "31.0388975367",
              roomCount: 43,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 217,
              ceaName: "小昆山",
              pinyin: "X",
              longitude: "121.1425787205",
              latitude: "31.0402019390",
              roomCount: 37,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 218,
              ceaName: "莘闵",
              pinyin: "S",
              longitude: "121.3537990000",
              latitude: "31.0867940000",
              roomCount: 14,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 219,
              ceaName: "新桥",
              pinyin: "X",
              longitude: "121.3204229996",
              latitude: "31.0687682303",
              roomCount: 174,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 220,
              ceaName: "新松江路",
              pinyin: "X",
              longitude: "121.2131769413",
              latitude: "31.0451558577",
              roomCount: 1,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 221,
              ceaName: "中山中路",
              pinyin: "Z",
              longitude: "121.2352060550",
              latitude: "31.0127877502",
              roomCount: 1,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 368,
              ceaName: "洞泾",
              pinyin: "D",
              longitude: "121.2455750000",
              latitude: "31.0906250000",
              roomCount: 288,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 388,
              ceaName: "车墩镇",
              pinyin: "",
              longitude: "121.3212552366",
              latitude: "31.0214618437",
              roomCount: 84,
              ceaDistrictId: "0901015"
            },
            {
              cityId: 2,
              prcId: 16,
              ceaId: 389,
              ceaName: "佘北大居",
              pinyin: "",
              longitude: "121.2026600000",
              latitude: "31.1342190000",
              roomCount: 5,
              ceaDistrictId: "0901015"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 15,
          prcName: "金山区",
          longitude: "121.3365080000",
          latitude: "30.7603480000",
          prcCode: "0901014",
          areaList: [
            {
              cityId: 2,
              prcId: 15,
              ceaId: 190,
              ceaName: "金山卫",
              pinyin: "J",
              longitude: "121.3291425817",
              latitude: "30.7341041370",
              roomCount: 11,
              ceaDistrictId: "0901014"
            },
            {
              cityId: 2,
              prcId: 15,
              ceaId: 191,
              ceaName: "金山新城",
              pinyin: "J",
              longitude: "121.3413015960",
              latitude: "30.7570831959",
              roomCount: 252,
              ceaDistrictId: "0901014"
            },
            {
              cityId: 2,
              prcId: 15,
              ceaId: 192,
              ceaName: "金山中部",
              pinyin: "J",
              longitude: "121.2484081798",
              latitude: "30.8350807771",
              roomCount: 1,
              ceaDistrictId: "0901014"
            },
            {
              cityId: 2,
              prcId: 15,
              ceaId: 195,
              ceaName: "石化",
              pinyin: "D",
              longitude: "121.3685949919",
              latitude: "30.7325708709",
              roomCount: 10,
              ceaDistrictId: "0901014"
            },
            {
              cityId: 2,
              prcId: 15,
              ceaId: 196,
              ceaName: "亭林",
              pinyin: "T",
              longitude: "121.3204125793",
              latitude: "30.8898967057",
              roomCount: 110,
              ceaDistrictId: "0901014"
            },
            {
              cityId: 2,
              prcId: 15,
              ceaId: 199,
              ceaName: "朱泾",
              pinyin: "Z",
              longitude: "121.1711317205",
              latitude: "30.9030071950",
              roomCount: 1,
              ceaDistrictId: "0901014"
            },
            {
              cityId: 2,
              prcId: 15,
              ceaId: 200,
              ceaName: "朱行镇",
              pinyin: "Z",
              longitude: "121.3481803623",
              latitude: "30.8556953031",
              roomCount: 3,
              ceaDistrictId: "0901014"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 14,
          prcName: "浦东新区",
          longitude: "121.5664740000",
          latitude: "31.2269180000",
          prcCode: "0901013",
          areaList: [
            {
              cityId: 2,
              prcId: 14,
              ceaId: 153,
              ceaName: "八佰伴",
              pinyin: "B",
              longitude: "121.5238430000",
              latitude: "31.2343110000",
              roomCount: 6,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 154,
              ceaName: "北蔡",
              pinyin: "B",
              longitude: "121.5626010000",
              latitude: "31.1889050000",
              roomCount: 79,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 155,
              ceaName: "碧云社区",
              pinyin: "B",
              longitude: "121.5876938618",
              latitude: "31.2448712069",
              roomCount: 2,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 156,
              ceaName: "曹路",
              pinyin: "C",
              longitude: "121.6734920000",
              latitude: "31.2844880000",
              roomCount: 107,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 157,
              ceaName: "川沙",
              pinyin: "C",
              longitude: "121.7140050000",
              latitude: "31.2028350000",
              roomCount: 141,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 159,
              ceaName: "航头",
              pinyin: "H",
              longitude: "121.6023650000",
              latitude: "31.0295560000",
              roomCount: 25,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 160,
              ceaName: "花木",
              pinyin: "H",
              longitude: "121.5692270000",
              latitude: "31.2175700000",
              roomCount: 16,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 161,
              ceaName: "惠南镇",
              pinyin: "H",
              longitude: "121.7559010000",
              latitude: "31.0536160000",
              roomCount: 447,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 162,
              ceaName: "金桥",
              pinyin: "J",
              longitude: "121.5973100000",
              latitude: "31.2595660000",
              roomCount: 29,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 163,
              ceaName: "金杨地区",
              pinyin: "J",
              longitude: "121.5814200000",
              latitude: "31.2552230000",
              roomCount: 2,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 164,
              ceaName: "康桥/周浦",
              pinyin: "K",
              longitude: "121.5856519235",
              latitude: "31.1412125578",
              roomCount: 285,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 166,
              ceaName: "临沂/南码头",
              pinyin: "L",
              longitude: "121.5169420000",
              latitude: "31.1994420000",
              roomCount: 12,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 168,
              ceaName: "陆家嘴",
              pinyin: "L",
              longitude: "121.5022720000",
              latitude: "31.2440260000",
              roomCount: 3,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 172,
              ceaName: "浦东外环",
              pinyin: "P",
              longitude: "121.5264030000",
              latitude: "31.1347060000",
              roomCount: 1,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 173,
              ceaName: "三林地区",
              pinyin: "S",
              longitude: "121.5175560000",
              latitude: "31.1486880000",
              roomCount: 59,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 174,
              ceaName: "上南地区",
              pinyin: "S",
              longitude: "121.5036122864",
              latitude: "31.1822636294",
              roomCount: 7,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 175,
              ceaName: "世博滨江",
              pinyin: "S",
              longitude: "121.4956930000",
              latitude: "31.1921960000",
              roomCount: 3,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 177,
              ceaName: "唐镇",
              pinyin: "T",
              longitude: "121.6624700000",
              latitude: "31.2147030000",
              roomCount: 236,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 178,
              ceaName: "塘桥",
              pinyin: "T",
              longitude: "121.5253530000",
              latitude: "31.2154070000",
              roomCount: 7,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 179,
              ceaName: "外高桥",
              pinyin: "W",
              longitude: "121.5944330000",
              latitude: "31.3487830000",
              roomCount: 77,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 180,
              ceaName: "潍坊",
              pinyin: "W",
              longitude: "121.5297660000",
              latitude: "31.2305780000",
              roomCount: 4,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 181,
              ceaName: "新场",
              pinyin: "X",
              longitude: "121.6599380000",
              latitude: "31.0321840000",
              roomCount: 20,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 183,
              ceaName: "洋泾",
              pinyin: "Y",
              longitude: "121.5519800000",
              latitude: "31.2444190000",
              roomCount: 5,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 185,
              ceaName: "张江",
              pinyin: "Z",
              longitude: "121.5940610000",
              latitude: "31.2078790000",
              roomCount: 136,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 367,
              ceaName: "王港",
              pinyin: "W",
              longitude: "121.6862630000",
              latitude: "31.2413580000",
              roomCount: 55,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 588,
              ceaName: "御桥",
              pinyin: "Y",
              longitude: "",
              latitude: "",
              roomCount: 27,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 589,
              ceaName: "高行",
              pinyin: "G",
              longitude: "",
              latitude: "",
              roomCount: 19,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 2314,
              ceaName: "周浦万达",
              pinyin: "Z",
              longitude: "",
              latitude: "",
              roomCount: 3,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 5609,
              ceaName: "周浦",
              pinyin: "Z",
              longitude: "",
              latitude: "",
              roomCount: 19,
              ceaDistrictId: "0901013"
            },
            {
              cityId: 2,
              prcId: 14,
              ceaId: 5612,
              ceaName: "江镇",
              pinyin: "J",
              longitude: "",
              latitude: "",
              roomCount: 5,
              ceaDistrictId: "0901013"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 13,
          prcName: "嘉定区",
          longitude: "121.2721420000",
          latitude: "31.3811020000",
          prcCode: "0901012",
          areaList: [
            {
              cityId: 2,
              prcId: 13,
              ceaId: 140,
              ceaName: "安亭",
              pinyin: "A",
              longitude: "121.1689195533",
              latitude: "31.3009201496",
              roomCount: 507,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 141,
              ceaName: "博乐广场",
              pinyin: "B",
              longitude: "121.2588824095",
              latitude: "31.3898342139",
              roomCount: 5,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 142,
              ceaName: "丰庄",
              pinyin: "F",
              longitude: "121.3697167060",
              latitude: "31.2525937130",
              roomCount: 6,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 143,
              ceaName: "黄渡镇",
              pinyin: "H",
              longitude: "121.2188738799",
              latitude: "31.2785158437",
              roomCount: 62,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 144,
              ceaName: "嘉定城区",
              pinyin: "J",
              longitude: "121.2596762573",
              latitude: "31.3894867271",
              roomCount: 734,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 145,
              ceaName: "戬浜镇",
              pinyin: "J",
              longitude: "121.3072581527",
              latitude: "31.3835626335",
              roomCount: 86,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 146,
              ceaName: "江桥",
              pinyin: "J",
              longitude: "121.3521747757",
              latitude: "31.2653585444",
              roomCount: 315,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 147,
              ceaName: "菊园新区",
              pinyin: "J",
              longitude: "121.2578510802",
              latitude: "31.4044793639",
              roomCount: 302,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 149,
              ceaName: "马陆",
              pinyin: "M",
              longitude: "121.3018781013",
              latitude: "31.3817625389",
              roomCount: 519,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 150,
              ceaName: "南翔",
              pinyin: "N",
              longitude: "121.2660441654",
              latitude: "31.3058709362",
              roomCount: 704,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 152,
              ceaName: "真新",
              pinyin: "Z",
              longitude: "121.3797840000",
              latitude: "31.2588210000",
              roomCount: 5,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 312,
              ceaName: "嘉定镇",
              pinyin: "J",
              longitude: "121.2261864173",
              latitude: "31.3815773511",
              roomCount: 13,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 370,
              ceaName: "外冈镇",
              pinyin: "W",
              longitude: "",
              latitude: "",
              roomCount: 37,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 385,
              ceaName: "方泰镇",
              pinyin: "",
              longitude: "121.2202444255",
              latitude: "31.3311437889",
              roomCount: 5,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 386,
              ceaName: "嘉定新城",
              pinyin: "",
              longitude: "121.2620210000",
              latitude: "31.3358980000",
              roomCount: 462,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 387,
              ceaName: "嘉定北工业区",
              pinyin: "",
              longitude: "121.2431850000",
              latitude: "31.4289540000",
              roomCount: 40,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 584,
              ceaName: "徐行",
              pinyin: "X",
              longitude: "",
              latitude: "",
              roomCount: 170,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 585,
              ceaName: "朱桥",
              pinyin: "Z",
              longitude: "",
              latitude: "",
              roomCount: 9,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 5630,
              ceaName: "江桥新城",
              pinyin: "J",
              longitude: "",
              latitude: "",
              roomCount: 1,
              ceaDistrictId: "0901012"
            },
            {
              cityId: 2,
              prcId: 13,
              ceaId: 5641,
              ceaName: "华亭",
              pinyin: "H",
              longitude: "",
              latitude: "",
              roomCount: 2,
              ceaDistrictId: "0901012"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 12,
          prcName: "宝山区",
          longitude: "121.4394180000",
          latitude: "31.3617020000",
          prcCode: "0901011",
          areaList: [
            {
              cityId: 2,
              prcId: 12,
              ceaId: 124,
              ceaName: "宝山城区",
              pinyin: "B",
              longitude: "121.4883010000",
              latitude: "31.3980020000",
              roomCount: 69,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 125,
              ceaName: "高境",
              pinyin: "G",
              longitude: "121.4861745595",
              latitude: "31.3259078191",
              roomCount: 18,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 126,
              ceaName: "共富",
              pinyin: "G",
              longitude: "121.4358890000",
              latitude: "31.3556260000",
              roomCount: 5,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 127,
              ceaName: "顾村",
              pinyin: "G",
              longitude: "121.3908007951",
              latitude: "31.3530215514",
              roomCount: 339,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 128,
              ceaName: "罗店",
              pinyin: "L",
              longitude: "121.3497154847",
              latitude: "31.4201176362",
              roomCount: 806,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 129,
              ceaName: "美兰湖",
              pinyin: "M",
              longitude: "121.3670831438",
              latitude: "31.4021931825",
              roomCount: 16,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 130,
              ceaName: "庙行/共康",
              pinyin: "M",
              longitude: "121.4449653332",
              latitude: "31.3275135197",
              roomCount: 32,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 131,
              ceaName: "上海大学",
              pinyin: "S",
              longitude: "121.4000161017",
              latitude: "31.3213237033",
              roomCount: 128,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 132,
              ceaName: "淞滨地区",
              pinyin: "S",
              longitude: "121.5018700000",
              latitude: "31.3782500000",
              roomCount: 1,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 133,
              ceaName: "淞南",
              pinyin: "S",
              longitude: "121.4932777306",
              latitude: "31.3440444238",
              roomCount: 12,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 134,
              ceaName: "淞南高境",
              pinyin: "S",
              longitude: "121.4892990000",
              latitude: "31.3265760000",
              roomCount: 1,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 135,
              ceaName: "通河/泗塘",
              pinyin: "T",
              longitude: "121.4727981616",
              latitude: "31.4035542509",
              roomCount: 3,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 136,
              ceaName: "吴淞",
              pinyin: "W",
              longitude: "121.5026658317",
              latitude: "31.3777291794",
              roomCount: 3,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 137,
              ceaName: "杨行",
              pinyin: "Y",
              longitude: "121.4484692636",
              latitude: "31.3794559465",
              roomCount: 384,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 138,
              ceaName: "月浦",
              pinyin: "Y",
              longitude: "121.4325345815",
              latitude: "31.4204953188",
              roomCount: 76,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 583,
              ceaName: "罗泾",
              pinyin: "L",
              longitude: "",
              latitude: "",
              roomCount: 7,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 586,
              ceaName: "大场镇",
              pinyin: "D",
              longitude: "",
              latitude: "",
              roomCount: 55,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 2307,
              ceaName: "淞宝",
              pinyin: "S",
              longitude: "",
              latitude: "",
              roomCount: 2,
              ceaDistrictId: "0901011"
            },
            {
              cityId: 2,
              prcId: 12,
              ceaId: 2315,
              ceaName: "大华路",
              pinyin: "D",
              longitude: "",
              latitude: "",
              roomCount: 3,
              ceaDistrictId: "0901011"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 11,
          prcName: "闵行区",
          longitude: "121.3853760000",
          latitude: "31.1112340000",
          prcCode: "0901010",
          areaList: [
            {
              cityId: 2,
              prcId: 11,
              ceaId: 96,
              ceaName: "北桥",
              pinyin: "B",
              longitude: "121.4055849707",
              latitude: "31.0435683201",
              roomCount: 80,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 97,
              ceaName: "春申",
              pinyin: "C",
              longitude: "121.3944820000",
              latitude: "31.1056080000",
              roomCount: 21,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 98,
              ceaName: "春申地区",
              pinyin: "C",
              longitude: "121.4026060000",
              latitude: "31.1082820000",
              roomCount: 3,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 99,
              ceaName: "古美罗阳",
              pinyin: "G",
              longitude: "121.4124012195",
              latitude: "31.1273867810",
              roomCount: 22,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 100,
              ceaName: "航华",
              pinyin: "H",
              longitude: "121.3582211802",
              latitude: "31.1790059538",
              roomCount: 8,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 104,
              ceaName: "华漕/虹桥镇",
              pinyin: "H",
              longitude: "121.3355174966",
              latitude: "31.2284290407",
              roomCount: 37,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 105,
              ceaName: "江川路",
              pinyin: "J",
              longitude: "121.3847207895",
              latitude: "31.0015522074",
              roomCount: 48,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 106,
              ceaName: "交大闵行校区",
              pinyin: "J",
              longitude: "121.4438451471",
              latitude: "31.0289502226",
              roomCount: 4,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 107,
              ceaName: "金虹桥",
              pinyin: "J",
              longitude: "121.4034290000",
              latitude: "31.1881810000",
              roomCount: 3,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 108,
              ceaName: "金平路步行街",
              pinyin: "J",
              longitude: "121.4188236700",
              latitude: "31.0154995711",
              roomCount: 3,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 110,
              ceaName: "老闵行",
              pinyin: "L",
              longitude: "121.4244334828",
              latitude: "31.0148179831",
              roomCount: 35,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 112,
              ceaName: "龙茗",
              pinyin: "L",
              longitude: "121.3920210000",
              latitude: "31.1488360000",
              roomCount: 1,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 113,
              ceaName: "马桥",
              pinyin: "M",
              longitude: "121.3762219650",
              latitude: "31.0347206980",
              roomCount: 202,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 114,
              ceaName: "梅陇",
              pinyin: "M",
              longitude: "121.4211938338",
              latitude: "31.1415550305",
              roomCount: 8,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 115,
              ceaName: "南方商城",
              pinyin: "N",
              longitude: "121.4075527053",
              latitude: "31.1373157590",
              roomCount: 2,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 116,
              ceaName: "浦江镇",
              pinyin: "P",
              longitude: "121.5232853720",
              latitude: "31.0814753461",
              roomCount: 850,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 117,
              ceaName: "七宝",
              pinyin: "Q",
              longitude: "121.3538363714",
              latitude: "31.1623951904",
              roomCount: 31,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 119,
              ceaName: "吴泾镇",
              pinyin: "W",
              longitude: "121.4619099451",
              latitude: "31.0446667309",
              roomCount: 165,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 120,
              ceaName: "莘庄",
              pinyin: "S",
              longitude: "121.3852100506",
              latitude: "31.1119856362",
              roomCount: 64,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 121,
              ceaName: "莘庄龙之梦",
              pinyin: "S",
              longitude: "121.4226770260",
              latitude: "31.2243709341",
              roomCount: 13,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 122,
              ceaName: "仲盛商业中心",
              pinyin: "Z",
              longitude: "121.3949575637",
              latitude: "31.1121518478",
              roomCount: 2,
              ceaDistrictId: "0901010"
            },
            {
              cityId: 2,
              prcId: 11,
              ceaId: 123,
              ceaName: "颛桥",
              pinyin: "Z",
              longitude: "121.4039739460",
              latitude: "31.0703094529",
              roomCount: 286,
              ceaDistrictId: "0901010"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 10,
          prcName: "杨浦区",
          longitude: "121.5394530000",
          latitude: "31.2886570000",
          prcCode: "0901009",
          areaList: [
            {
              cityId: 2,
              prcId: 10,
              ceaId: 85,
              ceaName: "鞍山新村",
              pinyin: "A",
              longitude: "121.5188880614",
              latitude: "31.2837937040",
              roomCount: 1,
              ceaDistrictId: "0901009"
            },
            {
              cityId: 2,
              prcId: 10,
              ceaId: 86,
              ceaName: "东外滩",
              pinyin: "D",
              longitude: "121.5061088570",
              latitude: "31.2407392042",
              roomCount: 7,
              ceaDistrictId: "0901009"
            },
            {
              cityId: 2,
              prcId: 10,
              ceaId: 87,
              ceaName: "黄兴公园",
              pinyin: "H",
              longitude: "121.5371495344",
              latitude: "31.2997552018",
              roomCount: 7,
              ceaDistrictId: "0901009"
            },
            {
              cityId: 2,
              prcId: 10,
              ceaId: 88,
              ceaName: "控江地区",
              pinyin: "K",
              longitude: "121.5357165996",
              latitude: "31.3045104795",
              roomCount: 1,
              ceaDistrictId: "0901009"
            },
            {
              cityId: 2,
              prcId: 10,
              ceaId: 90,
              ceaName: "五角场/大学区",
              pinyin: "W",
              longitude: "121.5206326605",
              latitude: "31.3072378331",
              roomCount: 7,
              ceaDistrictId: "0901009"
            },
            {
              cityId: 2,
              prcId: 10,
              ceaId: 94,
              ceaName: "中原地区",
              pinyin: "Z",
              longitude: "121.5387957691",
              latitude: "31.3243383596",
              roomCount: 2,
              ceaDistrictId: "0901009"
            },
            {
              cityId: 2,
              prcId: 10,
              ceaId: 95,
              ceaName: "周家嘴路",
              pinyin: "Z",
              longitude: "121.5195983453",
              latitude: "31.2700448113",
              roomCount: 1,
              ceaDistrictId: "0901009"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 9,
          prcName: "虹口区",
          longitude: "121.5072580000",
          latitude: "31.2753250000",
          prcCode: "0901008",
          areaList: [
            {
              cityId: 2,
              prcId: 9,
              ceaId: 77,
              ceaName: "北外滩",
              pinyin: "B",
              longitude: "121.4919185408",
              latitude: "31.2824972290",
              roomCount: 1,
              ceaDistrictId: "0901008"
            },
            {
              cityId: 2,
              prcId: 9,
              ceaId: 80,
              ceaName: "虹口足球场",
              pinyin: "J",
              longitude: "121.4875415110",
              latitude: "31.2771796160",
              roomCount: 4,
              ceaDistrictId: "0901008"
            },
            {
              cityId: 2,
              prcId: 9,
              ceaId: 81,
              ceaName: "凉城/江湾镇",
              pinyin: "L",
              longitude: "121.4778347809",
              latitude: "31.3004033182",
              roomCount: 34,
              ceaDistrictId: "0901008"
            },
            {
              cityId: 2,
              prcId: 9,
              ceaId: 83,
              ceaName: "曲阳地区",
              pinyin: "Q",
              longitude: "121.4974825190",
              latitude: "31.2857275634",
              roomCount: 2,
              ceaDistrictId: "0901008"
            },
            {
              cityId: 2,
              prcId: 9,
              ceaId: 84,
              ceaName: "四川北路",
              pinyin: "S",
              longitude: "121.4894604748",
              latitude: "31.2634533133",
              roomCount: 2,
              ceaDistrictId: "0901008"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 8,
          prcName: "闸北区",
          longitude: "121.4656010000",
          latitude: "31.2537550000",
          prcCode: "0901007",
          areaList: [
            {
              cityId: 2,
              prcId: 8,
              ceaId: 67,
              ceaName: "北区汽车站",
              pinyin: "B",
              longitude: "121.4671485386",
              latitude: "31.2676031520",
              roomCount: 8,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 68,
              ceaName: "大宁地区",
              pinyin: "D",
              longitude: "121.4620670000",
              latitude: "31.2904140000",
              roomCount: 13,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 71,
              ceaName: "彭浦新村",
              pinyin: "P",
              longitude: "121.4589426974",
              latitude: "31.3173403378",
              roomCount: 4,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 72,
              ceaName: "彭浦镇",
              pinyin: "P",
              longitude: "121.4468081701",
              latitude: "31.2891494699",
              roomCount: 9,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 74,
              ceaName: "西藏北路/中兴路",
              pinyin: "X",
              longitude: "121.4747157771",
              latitude: "31.2616547155",
              roomCount: 2,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 75,
              ceaName: "阳城永和",
              pinyin: "Y",
              longitude: "121.4342730000",
              latitude: "31.2903360000",
              roomCount: 3,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 76,
              ceaName: "闸北公园",
              pinyin: "Z",
              longitude: "121.4625825415",
              latitude: "31.2770179868",
              roomCount: 7,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 591,
              ceaName: "新客站",
              pinyin: "X",
              longitude: "",
              latitude: "",
              roomCount: 3,
              ceaDistrictId: "0901007"
            },
            {
              cityId: 2,
              prcId: 8,
              ceaId: 5634,
              ceaName: "芷江西路",
              pinyin: "Z",
              longitude: "",
              latitude: "",
              roomCount: 1,
              ceaDistrictId: "0901007"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 7,
          prcName: "普陀区",
          longitude: "121.3543310000",
          latitude: "31.2886570000",
          prcCode: "0901006",
          areaList: [
            {
              cityId: 2,
              prcId: 7,
              ceaId: 53,
              ceaName: "曹杨",
              pinyin: "C",
              longitude: "121.4127148179",
              latitude: "31.2449639588",
              roomCount: 4,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 54,
              ceaName: "长风公园/华师大",
              pinyin: "C",
              longitude: "121.4060368147",
              latitude: "31.2312756249",
              roomCount: 3,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 56,
              ceaName: "长征",
              pinyin: "C",
              longitude: "121.4039527460",
              latitude: "31.2530119142",
              roomCount: 13,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 57,
              ceaName: "光新",
              pinyin: "G",
              longitude: "121.4385570013",
              latitude: "31.2572970121",
              roomCount: 2,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 58,
              ceaName: "梅川路",
              pinyin: "M",
              longitude: "121.3991210409",
              latitude: "31.2459043885",
              roomCount: 2,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 59,
              ceaName: "桃浦",
              pinyin: "T",
              longitude: "121.4051491991",
              latitude: "31.2647421321",
              roomCount: 25,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 60,
              ceaName: "万里",
              pinyin: "W",
              longitude: "121.4103740000",
              latitude: "31.2764310000",
              roomCount: 3,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 61,
              ceaName: "武宁地区",
              pinyin: "W",
              longitude: "121.4300680000",
              latitude: "31.2453560000",
              roomCount: 1,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 63,
              ceaName: "真光",
              pinyin: "Z",
              longitude: "121.3930120000",
              latitude: "31.2574550000",
              roomCount: 61,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 64,
              ceaName: "真如",
              pinyin: "Z",
              longitude: "121.4086431584",
              latitude: "31.2526104760",
              roomCount: 13,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 65,
              ceaName: "中山北路/甘泉地区",
              pinyin: "Z",
              longitude: "121.4391626263",
              latitude: "31.2563406550",
              roomCount: 2,
              ceaDistrictId: "0901006"
            },
            {
              cityId: 2,
              prcId: 7,
              ceaId: 311,
              ceaName: "大华地区",
              pinyin: "D",
              longitude: "121.4209097896",
              latitude: "31.2822371689",
              roomCount: 2,
              ceaDistrictId: "0901006"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 6,
          prcName: "静安区",
          longitude: "121.4526410000",
          latitude: "31.2288940000",
          prcCode: "0901005",
          areaList: [
            {
              cityId: 2,
              prcId: 6,
              ceaId: 47,
              ceaName: "曹家渡",
              pinyin: "C",
              longitude: "121.4353330000",
              latitude: "31.2347510000",
              roomCount: 2,
              ceaDistrictId: "0901005"
            },
            {
              cityId: 2,
              prcId: 6,
              ceaId: 49,
              ceaName: "静安寺",
              pinyin: "J",
              longitude: "121.4502725221",
              latitude: "31.2302445697",
              roomCount: 2,
              ceaDistrictId: "0901005"
            },
            {
              cityId: 2,
              prcId: 6,
              ceaId: 2316,
              ceaName: "静安周边",
              pinyin: "J",
              longitude: "",
              latitude: "",
              roomCount: 4,
              ceaDistrictId: "0901005"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 5,
          prcName: "长宁区",
          longitude: "121.3560550000",
          latitude: "31.2180240000",
          prcCode: "0901004",
          areaList: [
            {
              cityId: 2,
              prcId: 5,
              ceaId: 36,
              ceaName: "北新泾",
              pinyin: "B",
              longitude: "121.3784942288",
              latitude: "31.2226089931",
              roomCount: 5,
              ceaDistrictId: "0901004"
            },
            {
              cityId: 2,
              prcId: 5,
              ceaId: 38,
              ceaName: "古北",
              pinyin: "G",
              longitude: "121.4002472357",
              latitude: "31.2002877759",
              roomCount: 1,
              ceaDistrictId: "0901004"
            },
            {
              cityId: 2,
              prcId: 5,
              ceaId: 42,
              ceaName: "天山",
              pinyin: "T",
              longitude: "121.3984730000",
              latitude: "31.2194880000",
              roomCount: 2,
              ceaDistrictId: "0901004"
            },
            {
              cityId: 2,
              prcId: 5,
              ceaId: 43,
              ceaName: "仙霞",
              pinyin: "X",
              longitude: "121.4093000000",
              latitude: "31.2129750000",
              roomCount: 1,
              ceaDistrictId: "0901004"
            },
            {
              cityId: 2,
              prcId: 5,
              ceaId: 46,
              ceaName: "中山公园",
              pinyin: "Z",
              longitude: "121.4257802224",
              latitude: "31.2280264239",
              roomCount: 4,
              ceaDistrictId: "0901004"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 4,
          prcName: "徐汇区",
          longitude: "121.4399930000",
          latitude: "31.1779920000",
          prcCode: "0901003",
          areaList: [
            {
              cityId: 2,
              prcId: 4,
              ceaId: 16,
              ceaName: "滨江",
              pinyin: "B",
              longitude: "121.4688180000",
              latitude: "31.1836950000",
              roomCount: 8,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 17,
              ceaName: "漕河泾/田林",
              pinyin: "C",
              longitude: "121.4358646001",
              latitude: "31.1717362695",
              roomCount: 11,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 18,
              ceaName: "长桥",
              pinyin: "C",
              longitude: "121.4461112117",
              latitude: "31.1416443458",
              roomCount: 2,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 23,
              ceaName: "华东理工",
              pinyin: "H",
              longitude: "121.4320982745",
              latitude: "31.1497424470",
              roomCount: 1,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 24,
              ceaName: "华泾",
              pinyin: "H",
              longitude: "121.4548437294",
              latitude: "31.1253528687",
              roomCount: 4,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 27,
              ceaName: "康健",
              pinyin: "K",
              longitude: "121.4184450000",
              latitude: "31.1578830000",
              roomCount: 2,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 28,
              ceaName: "龙华",
              pinyin: "L",
              longitude: "121.4575948798",
              latitude: "31.1788754210",
              roomCount: 4,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 29,
              ceaName: "上海南站",
              pinyin: "S",
              longitude: "121.4357742305",
              latitude: "31.1595231124",
              roomCount: 1,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 30,
              ceaName: "万体馆",
              pinyin: "W",
              longitude: "121.4485239705",
              latitude: "31.1946271097",
              roomCount: 10,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 32,
              ceaName: "徐家汇",
              pinyin: "X",
              longitude: "121.4751077051",
              latitude: "31.2115497720",
              roomCount: 5,
              ceaDistrictId: "0901003"
            },
            {
              cityId: 2,
              prcId: 4,
              ceaId: 35,
              ceaName: "上海植物园",
              pinyin: "S",
              longitude: "121.4508640000",
              latitude: "31.1534890000",
              roomCount: 3,
              ceaDistrictId: "0901003"
            }
          ]
        },
        {
          cityId: 2,
          prcId: 41,
          prcName: "上海花桥",
          longitude: "121.4914730000",
          latitude: "31.2379480000",
          prcCode: "0901020",
          areaList: []
        }
      ],
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
 }
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
