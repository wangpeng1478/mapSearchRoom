<template>
  <div
    class="roomlist-wrap"
    @touchstart="handleRoomlistStart"
    @touchend="handleRoomlistEnd"
    @touchmove="handleRoomlistScroll"
    :style="{transform: 'translateY('+translateY+'px)'}"
  >
    <button class="retract iconfont icon-xiala"></button>
    <div class="village-info">
      <p>梦蝶苑（5间）</p>
      <span>距龙华中路站约1000米</span>
    </div>
    <div class="roomlist">
      <a href="javascript:;">
        <div class="roomlist-img">
          <em class="img-tag1">特价中</em>
          <img src="../assets/images/room-list.png">
          <i></i>
        </div>
        <div class="room-list-info">
          <p class="room-list-tit">徐汇区-龙华-梦蝶苑</p>
          <div class="roon-info-line2">
            <i class="iconfont icon-dingwei"></i>
            <p>距龙华中路约1000米</p>
            <span>助力得红包</span>
          </div>
          <div class="price">
            <p class="oldprice">原价：1588元/月</p>
            <p class="newprice">
              特价：
              <span>1788</span>元/月起
            </p>
          </div>
          <div class="tag">
            <p>整租</p>
            <p>独卫</p>
            <p>押一付一</p>
            <p>0中介费</p>
          </div>
        </div>
      </a>
      <a href="javascript:;">
        <div class="roomlist-img">
          <em class="img-tag1">特价中</em>
          <img src="../assets/images/room-list.png">
          <i></i>
        </div>
        <div class="room-list-info">
          <p class="room-list-tit">徐汇区-龙华-梦蝶苑</p>
          <div class="roon-info-line2">
            <i class="iconfont icon-dingwei"></i>
            <p>距龙华中路约1000米</p>
            <span>助力得红包</span>
          </div>
          <div class="price">
            <p class="oldprice">原价：1588元/月</p>
            <p class="newprice">
              特价：
              <span>1788</span>元/月起
            </p>
          </div>
          <div class="tag">
            <p>整租</p>
            <p>独卫</p>
            <p>押一付一</p>
            <p>0中介费</p>
          </div>
        </div>
      </a>
      <a href="javascript:;">
        <div class="roomlist-img">
          <em class="img-tag1">特价中</em>
          <img src="../assets/images/room-list.png">
          <i></i>
        </div>
        <div class="room-list-info">
          <p class="room-list-tit">徐汇区-龙华-梦蝶苑</p>
          <div class="roon-info-line2">
            <i class="iconfont icon-dingwei"></i>
            <p>距龙华中路约1000米</p>
            <span>助力得红包</span>
          </div>
          <div class="price">
            <p class="oldprice">原价：1588元/月</p>
            <p class="newprice">
              特价：
              <span>1788</span>元/月起
            </p>
          </div>
          <div class="tag">
            <p>整租</p>
            <p>独卫</p>
            <p>押一付一</p>
            <p>0中介费</p>
          </div>
        </div>
      </a>
      <a href="javascript:;">
        <div class="roomlist-img">
          <em class="img-tag1">特价中</em>
          <img src="../assets/images/room-list.png">
          <i></i>
        </div>
        <div class="room-list-info">
          <p class="room-list-tit">徐汇区-龙华-梦蝶苑</p>
          <div class="roon-info-line2">
            <i class="iconfont icon-dingwei"></i>
            <p>距龙华中路约1000米</p>
            <span>助力得红包</span>
          </div>
          <div class="price">
            <p class="oldprice">原价：1588元/月</p>
            <p class="newprice">
              特价：
              <span>1788</span>元/月起
            </p>
          </div>
          <div class="tag">
            <p>整租</p>
            <p>独卫</p>
            <p>押一付一</p>
            <p>0中介费</p>
          </div>
        </div>
      </a>
      <a href="javascript:;">
        <div class="roomlist-img">
          <em class="img-tag1">特价中</em>
          <img src="../assets/images/room-list.png">
          <i></i>
        </div>
        <div class="room-list-info">
          <p class="room-list-tit">徐汇区-龙华-梦蝶苑</p>
          <div class="roon-info-line2">
            <i class="iconfont icon-dingwei"></i>
            <p>距龙华中路约1000米</p>
            <span>助力得红包</span>
          </div>
          <div class="price">
            <p class="oldprice">原价：1588元/月</p>
            <p class="newprice">
              特价：
              <span>1788</span>元/月起
            </p>
          </div>
          <div class="tag">
            <p>整租</p>
            <p>独卫</p>
            <p>押一付一</p>
            <p>0中介费</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomList",
  data() {
    return {
      touchStartY: 0,
      translateY: 0,
      vh: 0,
      roomlistOverflow:'auto'
    };
  },
  mounted() {
    this.vh = document.body.clientHeight / 100;
  },
  methods: {
    handleRoomlistStart(e) {
      this.touchStartY = e.changedTouches[0].clientY - this.translateY;
      console.log(this.touchStartY);
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
      if (this.translateY > 20 * this.vh) {
        console.log("销毁");
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
.retract {
  height: 7vw;
  width: 100%;
  text-align: center;
  line-height: 7vw;
  color: #999999;
}
.village-info {
  overflow: hidden;
  border-bottom: 1.333vw solid #f4f4f4;
  padding: 4vw 4.1vw;
}
.village-info p {
  color: #101010;
  font-size: 4vw;
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
}
.roomlist a {
  display: block;
  overflow: hidden;
  margin-top: 4vw;
  margin: 4vw 4vw 0;
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
.img-tag1 {
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
  background-color: #ff3e3e;
  font-style: normal;
}
.room-list-info {
  width: 56vw;
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
  margin-top: 1.5vw;
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
</style>
