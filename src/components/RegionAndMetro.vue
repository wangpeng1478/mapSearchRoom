<template>
  <div class="region">
    <ul class="u1">
      <li>不限</li>
      <li class="selected">区域</li>
      <li>地铁</li>
    </ul>
    <ul class="u2">
      <li>徐汇区</li>
      <li>长宁区</li>
      <li>静安区</li>
      <li>普陀区</li>
      <li class="selected">闸北区</li>
      <li>虹口区</li>
      <li>杨浦区</li>
      <li>闵行区</li>
      <li>杨浦区</li>
      <li>宝山区</li>
      <li>杨浦区</li>
      <li>杨浦区</li>
      <li>杨浦区</li>
    </ul>
    <ul class="u3">
      <li>徐汇区</li>
      <li class="selected">长宁区</li>
      <li>静安区</li>
      <li>普陀区</li>
      <li>闸北区</li>
      <li>虹口区</li>
      <li>杨浦区</li>
      <li>闵行区</li>
      <li>杨浦区</li>
      <li>宝山区</li>
      <li>杨浦区</li>
      <li>杨浦区</li>
      <li>杨浦区</li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  }
};
</script>
<style scoped>
.region {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 84vw;
  overflow: hidden;
  background: #fff;
}
.region ul{
    overflow: auto;
    height: 100vh;
    float: left;
}
.region ul li{
    color: #313131;
    font-size: 4vw;
    height: 12vw;
    line-height: 12vw;
    text-align: center;
}
.u1{
    width: 27vw;
    background: #f0f0f0;
}
.u2{
    width: 27vw;
    background: #f8f8f8;
}
.u3{
    width: 30vw;
}
.region .selected{
    color: #ff9900;
}
.region .u1 .selected{
background: #f8f8f8;
}
.region .u2 .selected{
    background: #fff;
}
</style>
