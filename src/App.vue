
<template>
  <div id="app">
    <router-view/>
    <p class="toast" v-if="toast">{{toast}}</p>
  </div>
</template>

<script>
import axios from "axios";
import API from "@/utils/api";
import { mapState, mapMutations,mapActions } from "vuex";
import { setTimeout } from 'timers';

export default {
  name: "app",
  created: function() {
    this.httpQueryCityList();
    this.httpQueryMapBaseData();
  },
  methods: {
    ...mapMutations(["assign","mapBaseData","resetAllState"]),
    ...mapActions(['assignAsync']),
    httpQueryCityList: function() {
      let _this = this;
      axios.post(API["queryCityList"]).then(res => {
        if (res.data.code == 0) {
          _this.assign({
            key: "cityList",
            value: res.data.data
          });
        }
      });
    },
    httpQueryMapBaseData: function() {
      axios.post(API["queryMapBaseData"], { cityId: this.currentCity.cityId }).then(res => {
        if (res.data.code == 0) {
          this.mapBaseData(res.data.data)
           this.assignAsync({
            key: "mapBaseDataReady",
            value: true
          });
        }
      });
    },
    
  },
  computed:mapState(['currentCity','toast']),
  watch:{
    currentCity(){
      this.httpQueryMapBaseData();
      this.resetAllState();
    },
    toast(val){
      if(val){
        setTimeout(()=>{
          this.assign({
            key:'toast',
            value:null
          })
        },3000)
      }
    }
  }
};
</script>

<style scoped>
.toast{
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
</style>
