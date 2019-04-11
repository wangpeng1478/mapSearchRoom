<template>
  <div id="app">
    <router-view />
    <Model v-if="showModel" :content="cityList ? cityList[localCity].cityName : ''" @handelModel='handelModel' />
    <p class="toast" v-if="toast">{{toast}}</p>
  </div>
</template>

<script>
  import axios from "axios";
  import API from "@/utils/api";
  import Model from '@/components/Model'
  import {
    mapState,
    mapMutations,
    mapActions
  } from "vuex";
  import {
    setTimeout
  } from 'timers';
  export default {
    name: "app",
    metaInfo() {
      return {
        title: `${this.cityName}租房网_${this.cityName}合租|房屋出租信息网_青客移动站`,
        meta: [{
          name: 'keywords',
          content: `${this.cityName}租房网、${this.cityName}合租、${this.cityName}房屋出租、${this.cityName}租房信息网`
        }, {name:'description',content:`手机青客租房网提供${this.cityName}同城最新、最全的房屋出租信息,${this.cityName}租房、找合租、个人房屋出租,就上手机青客租房网。`}]
      }
    },
    data() {
      return {
        showModel: false,
        cityName: '上海'
      }
    },
    components: {
      Model,
      localCity: -1 //定位的城市索引
    },
    mounted() {
      this.httpQueryCityList();
      this.location();

      var lastTouchEnd = 0;
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);

      // 阻止双指放大
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
      });
    },
    methods: {
      ...mapMutations(["assign", "mapBaseData", "resetAllState", "mapDataChangelatitudeAndLongitude",
        'currentCityChange', 'currentCityAddConfirm'
      ]),
      ...mapActions(['assignAsync']),
      location() {
        if (navigator.geolocation) { //判断是否支持Geolocation API
          navigator.geolocation.getCurrentPosition(res => {}, err => {
          }, {
            enableHighAccuracy: true, //设置提升定位的精准度
            maximumAge: 0, //禁用缓存
            timeout: 30000 //开始获取定位信息30秒后超时
          })
        }
      },
      httpQueryCityList: function () {
        let _this = this;
        axios.post(API["queryCityList"]).then(res => {
          if (res.data.code == 0) {
            let cityList = res.data.data
            _this.assign({
              key: "cityList",
              value: cityList
            });
            let cityPY = this.$route.params.cityPY
            let localCity = cityList.findIndex(city => {
              return city.cityPinyin == cityPY;
            });
            if (localCity != -1) {
              _this.assign({
                key: "currentCity",
                value: cityList[localCity]
              });
            } else {
              _this.assign({
                key: "currentCity",
                value: cityList[0]
              });
              this.$router.push('/' + cityList[0].cityPinyin + '/map')
            }
            _this.loadCity()
          }
        });
      },
      httpQueryMapBaseData: function () {
        axios.post(API["queryMapBaseData"], {
          cityId: this.currentCity.cityId
        }).then(res => {
          if (res.data.code == 0) {
            this.mapBaseData(res.data.data)
            this.assignAsync({
              key: "mapBaseDataReady",
              value: true
            });
          }
        });
      },
      handelModel(e) {
        this.showModel = false;
        if (e) {
          //点击确定
          this.currentCityChange(this.localCity)
        } else {
          //点击取消
          this.currentCityAddConfirm()
        }
      },
      loadCity() {
        if (this.currentCity.confirm == undefined) {
          this.mapDataChangelatitudeAndLongitude({
            latitude: this.currentCity.latitude,
            longitude: this.currentCity.longitude
          })
          this.getLocation()
        }
      },
      getLocation() {
        var myCity = new BMap.LocalCity();
        myCity.get(res => {
          let localCity = this.cityList.findIndex(city => {
            return city.baiduCode == res.code;
          });
          if (this.cityList[localCity].cityId != this.currentCity.cityId && localCity != -1) {
            this.localCity = localCity;
            this.showModel = true;
          }
        });
      }
    },
    computed: mapState(['currentCity', 'toast', 'cityList']),
    watch: {
      $route(to, from) {
        let cityPY = this.$route.params.cityPY;
        console.log(cityPY)
        if (this.cityList) {
          let localCity = this.cityList.findIndex(city => {
            return city.cityPinyin == cityPY;
          });
          if (localCity == -1) {
            this.$router.go(-1)
          } else {
            this.assign({
              key: "currentCity",
              value: this.cityList[localCity]
            });
          }
        }

      },
      currentCity() {
        this.cityName = this.currentCity.cityName;
        this.httpQueryMapBaseData();
        this.$router.push('/' + this.currentCity.cityPinyin + '/map')
        this.resetAllState();
      },
      toast(val) {
        if (val) {
          setTimeout(() => {
            this.assign({
              key: 'toast',
              value: null
            })
          }, 3000)
        }
      }
    }
  };
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 30vh;
    margin: auto;
    z-index: 999;
    font-size: 14px;
    text-align: center;
    width: 70vw;
    background: rgba(0, 0, 0, 0.5);
    color: #eee;
    line-height: 1.4;
    padding: 5px 0;
    border-radius: 10px;
  }
</style>


<style>
  body,
  ul,
  ol,
  li,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  form,
  fieldset,
  table,
  td,
  img,
  div,
  dt,
  dl,
  dd,
  blockquote {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    word-break: break-all;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  input {
    outline: none;
  }

  button {
    background: none;
    border: none;
    outline: none;
  }

  .bottom48 {
    bottom: 48vw !important;
  }

  .anchorBL {
    display: none;
  }
</style>