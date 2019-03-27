
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import API from '@/utils/api'
import store from '@/store'
export default {
  name: "app",
  created:function(){
    this.$nextTick(function(){
      this.httpQueryCityList();
      this.httpQueryMapBaseData();
    })
    
  },
  methods:{
    httpQueryCityList:function(){
        let that = this;
        axios.post(API['queryCityList'],{}).then((res)=>{
          if(res.data.code == 0){
             store.state.queryCityList = res.data;
          }
        })
    },
    httpQueryMapBaseData:function(){
        let that = this;
        axios.post(API['queryMapBaseData'],{cityId:2}).then((res)=>{
          if(res.data.code == 0){
             store.state.queryMapBaseData = res.data;
          }
        })
    },
  }
};
</script>

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
input{
  outline:none;
}
button{
  background: none;
  border: none;
  outline:none;
}

.bottom48{
  bottom:48vw !important;
}

</style>
