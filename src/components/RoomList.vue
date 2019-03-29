<template>
  <div class="roomlist-wrap" :style="{transform: 'translateY('+translateY+'px)'}">
    <div
      class="village"
      @touchstart="handleRoomlistStart"
      @touchend="handleRoomlistEnd"
      @touchmove="handleRoomlistScroll"
    >
      <button class="retract"></button>
      <div class="village-info">
        <p>梦蝶苑（5间）</p>
        <span>距龙华中路站约1000米</span>
      </div>
    </div>

    <div class="roomlist" @scroll="test" :class="{'height80' : translateState==1}">
      <a href="javascript:;" target="_blank" v-for="room in roomList" :key="room.roomId">
        <div class="roomlist-img">
          <em class="img-tag img-tag1" v-if="room.roomSpecialOffer>0">特价</em>
          <em class="img-tag img-tag2" v-else-if="room.roomState == 1">预租中</em>
          <em class="img-tag img-tag3" v-else-if="room.roomState == 9">配置中</em>
          <img :src="room.roomCoverPhotoSmall!='' && room.roomCoverPhotoSmall!=null ? room.roomCoverPhotoSmall : 'https://mp.qk365.com'+room.randomRoomCoverPhoto">
          <i></i>
        </div>
        <div class="room-list-info">
          <p class="room-list-tit">{{room.prcName}}-{{room.ceaName}}-{{room.villageName}}</p>
          <div class="roon-info-line2">
            <i class="iconfont icon-dingwei"></i>
            <!-- TODO -->
            <p v-if="room.metroDistance < 2000">距龙华中路约1000米</p>
            <p v-else-if="room.busStationName.length>0 && room.busDistance>0 && room.busDistance  < 1500">距龙华中路约1000米</p>
            <span>{{room.activityName}}</span>
          </div>
          <div class="price">
            <p class="oldprice">原价：{{room.formatRoomRent}}元/月</p>
            <p class="newprice">{{room.roomSpecialOffer!=0 && room.roomSpecialOffer !=null ? '特价' : 'VIP价'}}：<span>{{room.formatShowPrice}}</span>元/月起</p>
          </div>
          <div class="tag">
            <p v-for="(label,index) in room.roomLabels" :key="index">{{label}}</p>
          </div>
        </div>
      </a>
      <p class="tips">没有更多啦~</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import API from '@/utils/api'
export default {
  name: "RoomList",
  data() {
    return {
      touchStartY: 0,
      translateY: 0,
      vh: 0,
      translateState: -1, //-1 已经销毁 0 高度40 1 高度80
      roomList: [
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/98/AF/CgoKaFxFcaOAAkfSAAAhFrdqUEE154.jpg",
          roomLock: 0,
          roomVipSellingPrice: 1045.78,
          roomLevelStr: "3SY",
          cucId: 16642,
          roomLabels: ["阳台", "朝南", "0中介费", "立即可租"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 28,
          roomId: 56098,
          roomTypeId: 2,
          cucFloor: 1,
          roomSpecialOffer: 789.0,
          roomAddress: "",
          cucTotalFloor: 4,
          prcName: "青浦区",
          ceaId: 228,
          roomRent: 1431.1,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/10.jpg",
          roomLevel: ["客厅", "阳台"],
          activityName: "助力得红包",
          busStationId: 10028228,
          ceaName: "朱家角",
          villageLatitude: "31.1249363366",
          room360VideoUrl: "",
          roomSellingPrice: 1161.98,
          formatShowPrice: 789,
          busStationName: "漕华路淀山湖大道",
          simpleMetroName: "",
          villageId: 24106,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "马家桥路299弄",
          metroDistance: 0,
          prcId: 17,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0055919A",
          villageName: "中信泰富隽苑",
          formatRoomRent: 1431,
          metroName: "",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/9610d6f0aa974322871ab75beec729ce/A0055919A0.mp4",
          roomCancel: 0,
          villageLongitude: "121.0478476379",
          orientation: "朝南",
          metroStationId: 0,
          busName: "",
          roomAdminId: "",
          metroId: 0,
          busDistance: 305,
          showPrice: 789.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "",
          roomTitle:
            "【青浦区】马家桥路299弄 中信泰富隽苑 精装修 配备全 单间卧室带阳台出租"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/A0/D2/CgoKaFxGr6CAJiS-AAAsPk08gsQ079.jpg",
          roomLock: 0,
          roomVipSellingPrice: 2148.98,
          roomLevelStr: "1STY",
          cucId: 9421,
          roomLabels: ["近地铁", "整租", "独卫", "0中介费"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 19,
          roomId: 31699,
          roomTypeId: 3,
          cucFloor: 1,
          roomSpecialOffer: 2040.0,
          roomAddress: "",
          cucTotalFloor: 6,
          prcName: "松江区",
          ceaId: 368,
          roomRent: 2551.2,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/4.jpg",
          roomLevel: ["主卧", "独卫", "阳台"],
          activityName: "助力得红包",
          busStationId: 10405549,
          ceaName: "洞泾",
          villageLatitude: "31.090626",
          room360VideoUrl: "",
          roomSellingPrice: 2348.98,
          formatShowPrice: 2040,
          busStationName: "塘桥",
          simpleMetroName: "9号线",
          villageId: 3322,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "沈砖公路5160弄",
          metroDistance: 840,
          prcId: 16,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0031665A",
          villageName: "其灵公寓",
          formatRoomRent: 2551,
          metroName: "地铁9号线",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/17f2f6e6e93f40638d2f922ca2d9534b/A0031665A.mp4",
          roomCancel: 0,
          villageLongitude: "121.245575",
          orientation: "朝南",
          metroStationId: 9021,
          busName: "",
          roomAdminId: "",
          metroId: 9,
          busDistance: 389,
          showPrice: 2040.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "洞泾",
          roomTitle:
            "【松江区】9号线 洞泾 沈砖公路5160弄 其灵公寓 全新装修 首次出租 独门独户"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/A0/D2/CgoKZ1xGr6SAGA_OAAAq8i6woeo012.jpg",
          roomLock: 0,
          roomVipSellingPrice: 2148.98,
          roomLevelStr: "1NTY",
          cucId: 9304,
          roomLabels: ["近地铁", "整租", "独卫", "0中介费"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 28,
          roomId: 31692,
          roomTypeId: 3,
          cucFloor: 2,
          roomSpecialOffer: 1950.0,
          roomAddress: "",
          cucTotalFloor: 6,
          prcName: "松江区",
          ceaId: 368,
          roomRent: 2548.0,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/7.jpg",
          roomLevel: ["主卧", "独卫", "阳台"],
          activityName: "助力得红包",
          busStationId: 10405549,
          ceaName: "洞泾",
          villageLatitude: "31.090626",
          room360VideoUrl: "",
          roomSellingPrice: 2348.98,
          formatShowPrice: 1950,
          busStationName: "塘桥",
          simpleMetroName: "9号线",
          villageId: 3322,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "沈砖公路5160弄",
          metroDistance: 840,
          prcId: 16,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0031673A",
          villageName: "其灵公寓",
          formatRoomRent: 2548,
          metroName: "地铁9号线",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/6d8f5b5309dc4c378878a9445d447057/A0031673A.mp4",
          roomCancel: 0,
          villageLongitude: "121.245575",
          orientation: "朝北",
          metroStationId: 9021,
          busName: "",
          roomAdminId: "",
          metroId: 9,
          busDistance: 389,
          showPrice: 1950.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "洞泾",
          roomTitle:
            "【松江区】九号线 洞泾 沈砖公路5160弄 青客其灵公寓 酒店式租房 精装全配 独门独户"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/A0/D2/CgoKZ1xGr6SAGA_OAAAq8i6woeo012.jpg",
          roomLock: 0,
          roomVipSellingPrice: 2148.98,
          roomLevelStr: "1NTY",
          cucId: 9304,
          roomLabels: ["近地铁", "整租", "独卫", "0中介费"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 28,
          roomId: 31693,
          roomTypeId: 3,
          cucFloor: 2,
          roomSpecialOffer: 1950.0,
          roomAddress: "",
          cucTotalFloor: 6,
          prcName: "松江区",
          ceaId: 368,
          roomRent: 2548.0,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/7.jpg",
          roomLevel: ["主卧", "独卫", "阳台"],
          activityName: "助力得红包",
          busStationId: 10405549,
          ceaName: "洞泾",
          villageLatitude: "31.090626",
          room360VideoUrl: "",
          roomSellingPrice: 2348.98,
          formatShowPrice: 1950,
          busStationName: "塘桥",
          simpleMetroName: "9号线",
          villageId: 3322,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "沈砖公路5160弄",
          metroDistance: 840,
          prcId: 16,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0031673A",
          villageName: "其灵公寓",
          formatRoomRent: 2548,
          metroName: "地铁9号线",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/6d8f5b5309dc4c378878a9445d447057/A0031673A.mp4",
          roomCancel: 0,
          villageLongitude: "121.245575",
          orientation: "朝北",
          metroStationId: 9021,
          busName: "",
          roomAdminId: "",
          metroId: 9,
          busDistance: 389,
          showPrice: 1950.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "洞泾",
          roomTitle:
            "【松江区】九号线 洞泾 沈砖公路5160弄 青客其灵公寓 酒店式租房 精装全配 独门独户"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/A2/E0/CgoKZ1xHEKSAc_pfAAAlk9VViD0549.jpg",
          roomLock: 0,
          roomVipSellingPrice: 2048.98,
          roomLevelStr: "1NTY",
          cucId: 9292,
          roomLabels: ["近地铁", "主卧", "独卫", "0中介费"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 17,
          roomId: 31811,
          roomTypeId: 2,
          cucFloor: 1,
          roomSpecialOffer: 1960.0,
          roomAddress: "",
          cucTotalFloor: 6,
          prcName: "松江区",
          ceaId: 368,
          roomRent: 2477.75,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/3.jpg",
          roomLevel: ["主卧", "独卫", "阳台"],
          activityName: "助力得红包",
          busStationId: 10405549,
          ceaName: "洞泾",
          villageLatitude: "31.090626",
          room360VideoUrl: "",
          roomSellingPrice: 2248.98,
          formatShowPrice: 1960,
          busStationName: "塘桥",
          simpleMetroName: "9号线",
          villageId: 3322,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "沈砖公路5160弄",
          metroDistance: 840,
          prcId: 16,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0031553A",
          villageName: "其灵公寓",
          formatRoomRent: 2478,
          metroName: "地铁9号线",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/c15189a744334b3c9d360e0e6e9642f4/A0031553A.mp4",
          roomCancel: 0,
          villageLongitude: "121.245575",
          orientation: "朝北",
          metroStationId: 9021,
          busName: "",
          roomAdminId: "",
          metroId: 9,
          busDistance: 389,
          showPrice: 1960.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "洞泾",
          roomTitle:
            "【松江区】九号线 洞泾 沈砖公路5160弄 其灵公寓 精装修酒店式公寓房 南朝向大空间"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/9E/92/CgoKZ1xGRL2AfgpAAAAyvwPz9Gk037.jpg",
          roomLock: 0,
          roomVipSellingPrice: 1081.78,
          roomLevelStr: "2NP",
          cucId: 24583,
          roomLabels: ["房东原装", "飘窗", "0中介费", "立即可租"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 23,
          roomId: 82885,
          roomTypeId: 2,
          cucFloor: 3,
          roomSpecialOffer: 892.0,
          roomAddress: "",
          cucTotalFloor: 18,
          prcName: "嘉定区",
          ceaId: 144,
          roomRent: 1401.0,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/6.jpg",
          roomLevel: ["次卧", "飘窗"],
          activityName: "助力得红包",
          busStationId: 10382567,
          ceaName: "嘉定城区",
          villageLatitude: "31.381044",
          room360VideoUrl: "",
          roomSellingPrice: 1201.98,
          formatShowPrice: 892,
          busStationName: "嘉泯小区",
          simpleMetroName: "",
          villageId: 1656,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "新成路129弄",
          metroDistance: 0,
          prcId: 13,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0082637E",
          villageName: "嘉源花苑",
          formatRoomRent: 1401,
          metroName: "",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/af1c13fa95c745c4b7a5d3f8f831c367/A0082633A0.mp4",
          roomCancel: 0,
          villageLongitude: "121.276885",
          orientation: "朝北",
          metroStationId: 0,
          busName: "",
          roomAdminId: "",
          metroId: 0,
          busDistance: 204,
          showPrice: 892.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "",
          roomTitle:
            "【嘉定区】新成路129弄   嘉源花苑  精装白领公寓单间出租   配备齐全   拎包即住"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/A0/D2/CgoKZ1xGr6SAGA_OAAAq8i6woeo012.jpg",
          roomLock: 0,
          roomVipSellingPrice: 2148.98,
          roomLevelStr: "1NTY",
          cucId: 9304,
          roomLabels: ["近地铁", "整租", "独卫", "0中介费"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 28,
          roomId: 31691,
          roomTypeId: 3,
          cucFloor: 2,
          roomSpecialOffer: 1950.0,
          roomAddress: "",
          cucTotalFloor: 6,
          prcName: "松江区",
          ceaId: 368,
          roomRent: 2548.0,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/7.jpg",
          roomLevel: ["主卧", "独卫", "阳台"],
          activityName: "助力得红包",
          busStationId: 10405549,
          ceaName: "洞泾",
          villageLatitude: "31.090626",
          room360VideoUrl: "",
          roomSellingPrice: 2348.98,
          formatShowPrice: 1950,
          busStationName: "塘桥",
          simpleMetroName: "9号线",
          villageId: 3322,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "沈砖公路5160弄",
          metroDistance: 840,
          prcId: 16,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0031673A",
          villageName: "其灵公寓",
          formatRoomRent: 2548,
          metroName: "地铁9号线",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/6d8f5b5309dc4c378878a9445d447057/A0031673A.mp4",
          roomCancel: 0,
          villageLongitude: "121.245575",
          orientation: "朝北",
          metroStationId: 9021,
          busName: "",
          roomAdminId: "",
          metroId: 9,
          busDistance: 389,
          showPrice: 1950.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "洞泾",
          roomTitle:
            "【松江区】九号线 洞泾 沈砖公路5160弄 青客其灵公寓 酒店式租房 精装全配 独门独户"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/9A/BD/CgoKZ1xFs0GAVl_tAAAsiW38MII129.jpg",
          roomLock: 0,
          roomVipSellingPrice: 1351.78,
          roomLevelStr: "3SY",
          cucId: 7429,
          roomLabels: ["阳台", "朝南", "0中介费", "立即可租"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 22,
          roomId: 26223,
          roomTypeId: 2,
          cucFloor: 1,
          roomSpecialOffer: 0,
          roomAddress: "",
          cucTotalFloor: 14,
          prcName: "嘉定区",
          ceaId: 140,
          roomRent: 1818.15,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/7.jpg",
          roomLevel: ["客厅", "阳台"],
          activityName: "助力得红包",
          busStationId: 10033785,
          ceaName: "安亭",
          villageLatitude: "31.316100290189",
          room360VideoUrl: "",
          roomSellingPrice: 1501.98,
          formatShowPrice: 1352,
          busStationName: "沁富佳苑",
          simpleMetroName: "11号线",
          villageId: 1909,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "新源路1288弄",
          metroDistance: 2410,
          prcId: 13,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0026256C",
          villageName: "沁富佳苑",
          formatRoomRent: 1818,
          metroName: "地铁11号线",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/fdee3b3d7ac74f2eb39760c83c055503/A0026256C.mp4",
          roomCancel: 0,
          villageLongitude: "121.15942608105",
          orientation: "朝南",
          metroStationId: 11026,
          busName: "",
          roomAdminId: "",
          metroId: 11,
          busDistance: 240,
          showPrice: 1351.78,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "兆丰路",
          roomTitle:
            "【嘉定区】十一号线 安亭 新源路1288弄 沁富佳苑 白领公寓 干净整洁 次卧朝南带阳台"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/A2/E1/CgoKaFxHENmAdHwdAAAa9ir-T2Q788.jpg",
          roomLock: 0,
          roomVipSellingPrice: 2278.98,
          roomLevelStr: "1STY",
          cucId: 9403,
          roomLabels: ["近地铁", "整租", "独卫", "0中介费"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 17,
          roomId: 31788,
          roomTypeId: 3,
          cucFloor: 4,
          roomSpecialOffer: 2080.0,
          roomAddress: "",
          cucTotalFloor: 6,
          prcName: "松江区",
          ceaId: 368,
          roomRent: 2678.0,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/8.jpg",
          roomLevel: ["主卧", "独卫", "阳台"],
          activityName: "助力得红包",
          busStationId: 10405549,
          ceaName: "洞泾",
          villageLatitude: "31.090626",
          room360VideoUrl: "",
          roomSellingPrice: 2478.98,
          formatShowPrice: 2080,
          busStationName: "塘桥",
          simpleMetroName: "9号线",
          villageId: 3322,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "沈砖公路5160弄",
          metroDistance: 840,
          prcId: 16,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0031576A",
          villageName: "其灵公寓",
          formatRoomRent: 2678,
          metroName: "地铁9号线",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/c99ddcdb220444e09cf3dd04cd98984c/沈砖公路5160弄50支弄14号402室A室1S.mp4",
          roomCancel: 0,
          villageLongitude: "121.245575",
          orientation: "朝南",
          metroStationId: 9021,
          busName: "",
          roomAdminId: "",
          metroId: 9,
          busDistance: 389,
          showPrice: 2080.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "洞泾",
          roomTitle:
            "【松江区】九号线 洞泾 沈砖公路5160弄 青客其灵公寓 酒店式租房 精装全配 独门独户"
        },
        {
          roomCoverPhotoSmall:
            "http://oss-wuxi.qk365.com/qingkepic/M00/A9/E9/CgoKaFxIb6-AU60DAAArRk9Wen0331.jpg",
          roomLock: 0,
          roomVipSellingPrice: 1063.78,
          roomLevelStr: "3SY",
          cucId: 27698,
          roomLabels: ["阳台", "朝南", "0中介费", "立即可租"],
          cityId: 2,
          roomDiscountMaxprice: 0,
          roomView: 20,
          roomId: 93789,
          roomTypeId: 2,
          cucFloor: 6,
          roomSpecialOffer: 777.0,
          roomAddress: "",
          cucTotalFloor: 18,
          prcName: "奉贤区",
          ceaId: 231,
          roomRent: 1409.83,
          busId: 0,
          roomCoverPhotoBig: "",
          randomRoomCoverPhoto: "/images/cover/room/9.jpg",
          roomLevel: ["客厅", "阳台"],
          activityName: "助力得红包",
          busStationId: 10535447,
          ceaName: "海湾旅游区",
          villageLatitude: "30.854677",
          room360VideoUrl: "",
          roomSellingPrice: 1181.98,
          formatShowPrice: 777,
          busStationName: "佳源广场",
          simpleMetroName: "",
          villageId: 23619,
          busInfoList: [],
          roomPrestate: 0,
          roomState: 0,
          villageAddress: "金海公路99弄",
          metroDistance: 0,
          prcId: 18,
          roomRecommType: 0,
          roomVacantDate: "",
          roomAdminMobile: "",
          roomCode: "A0093540B",
          villageName: "柘林佳源新都",
          formatRoomRent: 1410,
          metroName: "",
          cityName: "上海市",
          roomAdminName: "",
          roomVideoUrl:
            "http://qk365-nct-out-001.oss-cn-hangzhou.aliyuncs.com/Act-ss-mp4-ld/f5272f9df1824a8d9e9122deeab9005a/A0093541A0.mp4",
          roomCancel: 0,
          villageLongitude: "121.518553",
          orientation: "朝南",
          metroStationId: 0,
          busName: "",
          roomAdminId: "",
          metroId: 0,
          busDistance: 157,
          showPrice: 777.0,
          metroInfoList: [],
          roomDiscountMinprice: 0,
          roomCoverPhotoMid: "",
          metroStationName: "",
          roomTitle:
            "【奉贤区】金海公路99弄 柘林佳源新都 精装白领公寓 朝南卧室带阳台出租 配备齐全"
        }
      ]
    };
  },
  mounted() {
    this.vh = document.body.clientHeight / 100;
    axios.post(API['queryRoomByVillage'],{
      villageId:'',
    })
  },
  methods: {
    test(e) {
    },
    handleRoomlistStart(e) {
      this.touchStartY = e.changedTouches[0].clientY - this.translateY;
    },
    handleRoomlistScroll(e) {
      let translateY = e.changedTouches[0].clientY - this.touchStartY;
      if (translateY > -this.vh * 40) {
        this.translateY = translateY;
      } else {
        this.translateY = -this.vh * 40;
      }
    },
    handleRoomlistEnd() {
      let _top = 40 * this.vh - this.translateY;
      if (_top <= 20 * this.vh) {
        this.translateState = -1;
      } else if (20 * this.vh < _top && _top <= 55 * this.vh) {
        this.translateY = 0;
        this.translateState = 0;
      } else {
        this.translateState = 1;
        this.translateY = -40 * this.vh;
      }
    }
  }
};
</script>

<style scoped>
.roomlist-wrap {
  background: #fff;
  position: fixed;
  z-index: 99;
  top: 60vh;
  width: 100%;
  height: 80vh;
  overflow: hidden;
}
.village {
  position: absolute;
  height: 21vw;
  overflow: hidden;
  border-bottom: 1.333vw solid #f4f4f4;
  width: 100%;
  z-index: 5;
  background: #fff;
}
.retract {
  width: 10vw;
  height: 2vw;
  color: #999999;
  background: #999;
  display: block;
  margin: 3vw auto 1vw;
  border-radius: 1.5vw;
}
.village-info {
  position: absolute;
  overflow: hidden;
  height: 6vw;
  padding: 4vw 4vw;
  top: 7vw;
  width: 92vw;
}
.village-info p {
  color: #101010;
  font-size: 4.5vw;
  font-weight: bold;
  line-height: 1;
  float: left;
}
.village-info span {
  display: block;
  float: right;
  line-height: 1;
  font-size: 3.467vw;
  margin-top: 1vw;
}
.roomlist {
  width: 100%;
  overflow: hidden;
  height: 40vh;
  box-sizing: border-box;
  padding-top: 21vw;
  overflow: auto;
}
.height80 {
  height: 80vh;
}
.roomlist a {
  display: block;
  margin: 4vw auto 0;
  width: 96vw;
  height: 24vw;
  overflow: hidden;
}
.roomlist-img {
  width: 32vw;
  height: 24vw;
  float: left;
  position: relative;
}
.roomlist-img img {
  display: block;
  width: 32vw;
  height: 24vw;
  background: url("../assets/images/imgBg.png") no-repeat center;
  background-size: 15vw;
  background-color: #999;
}
.roomlist-img i {
  display: block;
  width: 6vw;
  height: 6vw;
  background: url("../assets/images/playBtn.png") no-repeat;
  background-size: 6vw;
  position: absolute;
  right: 1vw;
  bottom: 1vw;
}
.img-tag{
  width: 70px;
  height: 40px;
  line-height: 60px;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  top: -10px;
  left: -24px;
  transform: rotate(-45deg);
  font-style: normal;
}
.img-tag1 {
 background-color: #ff3e3e;
}
.img-tag2{
 background-color: #f08b00;
}
.img-tag3{
   background-color: #00aa83;
}
.room-list-info {
  width: 60vw;
  float: right;
}
.room-list-tit {
  font-size: 4vw;
  color: #303030;
  letter-spacing: 1px;
  line-height: 1.4;
  margin-bottom: 0.75vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.roon-info-line2 {
  overflow: hidden;
  height: 6vw;
}
.roon-info-line2 i {
  display: block;
  float: left;
  font-size: 4vw;
  margin-top: 1vw;
  margin-right: 1vw;
}
.roon-info-line2 p {
  width: 32vw;
  color: #767676;
  font-size: 3.2vw;
  line-height: 6vw;
  float: left;
}
.roon-info-line2 span {
  width: 18vw;
  height: 4vw;
  margin-top: 1vw;
  overflow: hidden;
  background: #ff0000;
  float: right;
  display: block;
  border-radius: 1vw;
  color: #fff;
  text-align: center;
  line-height: 4vw;
  font-size: 3vw;
}
.price {
  overflow: hidden;
}
.oldprice {
  color: #767676;
  font-size: 2.667vw;
  float: left;
  margin-top: 0.5vw;
  line-height: 1.4;
}
.newprice {
  float: right;
  color: #f18c00;
  font-size: 2.667vw;
  line-height: 1.4;
}
.newprice span {
  font-size: 4vw;
}
.tag {
  width: 58vw;
  overflow: hidden;
  margin-top: 1vw;
}
.tag p {
  height: 4.8vw;
  padding: 0 2vw;
  color: #00ac84;
  border: solid 0.133vw #00ac84;
  text-align: center;
  float: left;
  margin-right: 2vw;
  margin-bottom: 1vw;
  font-size: 2.667vw;
  line-height: 4.8vw;
}
.tips {
  color: #999;
  font-size: 12px;
  text-align: center;
  margin: 2vw 0;
}
</style>
