<template>
  <div class="roomlist-wrap" :class="roomListTransition ? 'roomlist-transition' : ''"
    :style="{transform: 'translateY('+translateY+'px)'}">
    <div class="village">
        <button class="retract" @touchstart="handleRoomlistStart" @touchend="handleRoomlistEnd" @touchmove="handleRoomlistScroll" @click="roomListDestroy"></button>
        <template v-if="roomList.length!=0">
        <a :href="'https://'+currentCity.url+'/'+currentCity.cityPinyin+'/xiaoqu/gk_v'+roomList[0].villageId" class="village-info">{{roomList[0].villageName}}（{{roomList.length}}间）</a>
        </template>
    </div>

    <div class="roomlist" :class="{'height80' : translateState==1}" v-if="roomList.length!=0">
      <div class="banner swiper-container" v-if="banners.length!=0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
            <a :href="'https://'+banner.href">
              <img :src="banner.imgUrl">
            </a>
          </div>
        </div>
      </div>
      <a :href="'https://'+currentCity.url+'/'+currentCity.cityPinyin+'/easy/'+room.roomId" v-for="room in roomList" :key="room.roomId">
        <div class="roomlist-img">
          <em class="img-tag img-tag1" v-if=" room.roomSpecialOffer!=0 && room.roomSpecialOffer !=null">特价</em>
          <em class="img-tag img-tag2" v-else-if="room.roomState == 1">预租中</em>
          <em class="img-tag img-tag3" v-else-if="room.roomState == 9">配置中</em>
          <img
            :src="room.roomCoverPhotoSmall!='' && room.roomCoverPhotoSmall!=null ? room.roomCoverPhotoSmall : 'https://www.qk365.com/images/noPic_Big0.jpg'">
          <i></i>
        </div>
        <div class="room-list-info">
          <p class="room-list-tit" :class="room.activeClass">{{room.prcName}}-{{room.ceaName}}-{{room.villageName}}</p>
          <div class="roon-info-line2">
            <i v-if="room.busStationName!=null&& room.busDistance>0 && room.busDistance  < 1500" class="iconfont icon-dingwei"></i>
            <p v-if="room.busStationName!=null&& room.busDistance>0 && room.busDistance  < 1500">{{roomList[0].distance}}</p>
            <span v-if="room.activityName!=''">{{room.activityName}}</span>
          </div>
          <div class="price">
            <p class="oldprice">原价：{{room.roomRent}}元/月</p>
            <p class="newprice">
              {{room.roomSpecialOffer!=0 && room.roomSpecialOffer !=null ? '特价' : 'VIP价'}}：<span>{{room.showPrice}}</span>元/月起
            </p>
          </div>
          <div class="tag">
            <p v-for="(label,index) in room.roomLabels" :key="index">{{label}}</p>
          </div>
        </div>
      </a>
      <p class="tips">—— 已加载完成 ——</p>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css';
  import API from '@/utils/api'
  import {
    mapState,mapMutations
  } from 'vuex'
  export default {
    name: "RoomList",
    data() {
      return {
        touchStartY: 0,
        translateY: 0,
        vh: 0,
        roomListTransition: true,
        translateState: -1, //-1 已经销毁 0 高度40 1 高度80
        roomList: []
      };
    },
    props: ['villageId'],
    mounted() {
      if (this.banners.length != 0) {
        new Swiper('.swiper-container', {
          observer: true,
          observeParents: true,
          autoplay:true
        })
      }
      this.vh = document.body.clientHeight / 100;
      this.loadRoomList();
    },
    methods: {
      ...mapMutations(['assignMapData']),
      loadRoomList() {
        let params = {};
        if (this.screen) {
          params = this.screen
        }
        params.villageId = this.villageId;
        axios.post(API['queryRoomByVillage'], params)
          .then(res => {
            if (res.data.code == 0) {
              let roomList = res.data.data;            
                let distance = '';
                if(roomList[0].metroStationName && roomList[0].metroDistance<1500){
                  if(roomList[0].metroDistance<6) roomList[0].metroDistance=6;
                  distance=`距${roomList[0].metroStationName}约${roomList[0].metroDistance}米`
                }else if(roomList[0].busStationName && roomList[0].busDistance<1500){
                  if(roomList[0].busDistance<6) roomList[0].busDistance=6
                  distance=`距${roomList[0].busStationName}约${roomList[0].busDistance}米`
                }
                roomList[0].distance=distance;

              this.roomList = roomList;
              this.roomList.map((item)=>{
                if(!item.roomCoverPhotoSmall){
                  item.roomCoverPhotoSmall ='https://www.qk365.com/images/noPic_Big0.jpg'
                }

                if(item.activityLabelPosition==0||item.activityLabelPosition==1){
                  if(item.activityLabelStyle && item.activityLabelStyle!=''){
                    item.activeClass = 'active active-'+item.activityLabelStyle;
                  }
                }
              })
              let oRoomList = document.getElementsByClassName("roomlist");
              if(oRoomList.item(0)){
                oRoomList.item(0).scrollTop=0;
              }
            }
          })
      },
      handleRoomlistStart(e) {
        this.touchStartY = e.changedTouches[0].clientY - this.translateY;
        this.roomListTransition=false;
      },
      handleRoomlistScroll(e) {
        e.preventDefault();
        let translateY = e.changedTouches[0].clientY - this.touchStartY;
        if (translateY > -this.vh * 40) {
          this.translateY = translateY;
        } else {
          this.translateY = -this.vh * 40;
        }
      },
      handleRoomlistEnd() {
        this.roomListTransition=true
        let _top = 40 * this.vh - this.translateY;
        if (_top <= 20 * this.vh) {
          this.translateState = -1;
          this.$emit('roomListDestroy')
        } else if (20 * this.vh < _top && _top <= 55 * this.vh) {
          this.translateY = 0;
          this.translateState = 0;
        } else {
          this.translateState = 1;
          this.translateY = -40 * this.vh;
        }
      },
      roomListDestroy(){
        this.$emit('roomListDestroy')
      }
    },
    computed: mapState(['screen','currentCity', 'banners']),
    watch:{
      villageId(){
        this.loadRoomList();
      }
    }
  };
</script>

<style scoped>
  .roomlist-wrap {
    background: #fff;
    position: absolute;
    z-index: 5;
    bottom: -40vh;
    width: 100%;
    height: 70vh;
  }

  .roomlist-transition {
    transition: all 0.3s;
  }

  .village {
    position: absolute;
    height: 21vw;
    top: -21vw;
    overflow: hidden;
    border-bottom: 1.333vw solid #f4f4f4;
    width: 100%;
    z-index: 5;
    background: #fff;
  }

  .retract {
    width:100%;
    height: 4vw;
    background:url("../assets/images/ling-ico.png") no-repeat center 3vw;
    display: block;
    padding-top: 7vw;
  }

  .village-info {
    overflow: hidden;
    display:block;
    height: 6vw;
    padding: 4vw 0;
    margin:0 4vw;
    top: 7vw;
    width: 92vw;
    color: #101010;
    font-size: 4.5vw;
    font-weight: bold;
    line-height: 6vw;
  }

  .roomlist {
    width: 100%;
    height: 30vh;
    overflow: auto;
  }

  .height80 {
    height: 70vh;
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

  .img-tag {
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

  .img-tag2 {
    background-color: #f08b00;
  }

  .img-tag3 {
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
    width: 36vw;
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
    margin-top: 1.6vw;
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
    height: 5.4vw;
  }

  .tag p {
    height: 4.8vw;
    padding: 0 2vw;
    color: #00ac84;
    border: solid 1px #00ac84;
    text-align: center;
    float: left;
    margin: 0 1.9vw 1vw 0.5vw;
    font-size: 2.667vw;
    line-height: 4.8vw;
  }

  .tips {
    color: #999;
    font-size: 3vw;
    text-align: center;
    margin: 2vw 0 10vw;
  }

  .banner {
    width: 94.67vw;
    height: 22.67vw;
    background: #eaeaea;
    margin-top: 3vw;
  }
  .banner a{
    margin: 0;
  }
  .banner img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .village-tit{
    height: 20vw;
    overflow: hidden;
  }
  .active{
    padding-left: 5.5vw;
    position: relative;
  }
  .active::before{
    position: absolute;
    display: block;
    left: 0;
    top: 0.4vw;
    width: 5vw;
    height: 4.8vw;
    text-align: center;
    line-height: 4.8vw;
    color: #fff;
    font-size: 3.5vw;
    border-radius: 0.5vw;
  }
  .active-A::before{
    content: "惠";
    background: #efae50;
  }
  .active-B::before{
    content: "返";
    background: #3bcdf2;
  }
  .active-C::before{
    content: "减";
    background: #03d1a1;
  }
  .active-D::before{
    content: "折";
    background: #fd7c69;
  }
  .active-E::before{
    content: "赠";
    background: #fcab36;
  }
</style>