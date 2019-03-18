<template>
  <div>
    <div class="input-row">
      <input
        type="text"
        placeholder="请输入小区/区域/地图"
        maxlength="100"
        v-model="searchValue"
        @input="handleInput"
      >
      <router-link to="/">取消</router-link>
    </div>
    <div class="search-tag" v-if="searchValue==''">
        <div class="tag-top">
          <p class="tag-tit">搜索历史</p>
          <p class="clear" v-if="isHistory">清空记录
            <i class="iconfont icon-lajitong"></i>
          </p>
        </div>
        <ul class="tag-list">
          <li>龙华</li>
          <li>绿地中心</li>
          <li>绿地中心A座</li>
          <li>绿地中心</li>
          <li>龙华中路596号</li>
          <li>绿地中心</li>
          <li>绿地中心A座</li>
          <li>东安路</li>
        </ul>
        <div class="tag-top">
          <p class="tag-tit">搜索历史</p>
        </div>
        <ul class="tag-list">
          <li>龙华</li>
          <li>绿地中心</li>
          <li>绿地中心A座</li>
          <li>绿地中心</li>
          <li>龙华中路596号</li>
          <li>绿地中心</li>
          <li>绿地中心A座</li>
          <li>东安路</li>
        </ul>
    </div>
    <ul class="search-result">
      <li>
        <p>龙华中路</p>
        <span>商圈</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      isHistory: true,
      searchValue: "",
      searchResult: [
        {
          id: 4064,
          keyWords: "江桥万达广场",
          latitude: "31.2420511978103",
          longitude: "121.33028671483109",
          parentId: 146,
          remark: "鹤友路336弄",
          tableId: 20758,
          typeId: 1,
          typeName: "小区"
        },
        {
          id: 2071,
          keyWords: "大湾名苑",
          latitude: "31.2893265353",
          longitude: "121.3483955139",
          parentId: 367,
          remark: "川沙路2015弄",
          tableId: 3218,
          typeId: 1,
          typeName: "小区"
        },
        {
          id: 15974,
          keyWords: "洞泾",
          latitude: "31.09060",
          longitude: "121.23674",
          parentId: 9,
          remark: "地铁9号线",
          tableId: 9021,
          typeId: 2,
          typeName: "地铁站"
        },
        {
          id: 15974,
          keyWords: "洞泾",
          latitude: "31.09060",
          longitude: "121.23674",
          parentId: 9,
          remark: "地铁9号线",
          tableId: 9021,
          typeId: 2,
          typeName: "地铁站"
        }
      ]
    };
  },
  methods: {
    handleInput() {
      //发送请求
    }
  }
};
</script>
<style scoped>
.input-row {
  width: 96vw;
  overflow: hidden;
  margin: 3.2vw 0 0 4vw;
}
.input-row input {
  display: block;
  border: none;
  width: 69vw;
  height: 10.6vw;
  padding-left: 11.5vw;
  border-radius: 1.067vw;
  float: left;
  background: url("../assets/images/search.png") no-repeat 4vw #f6f6f6;
  background-size: 5.73vw;
  color: #999;
  font-size: 3.2vw;
  line-height: 10.6vw;
}
.input-row a {
  display: block;
  width: 15.5vw;
  height: 10.6vw;
  float: right;
  font-size: 4vw;
  color: #313131;
  line-height: 10.6vw;
  text-align: center;
}
.tag-top{
        overflow: hidden;
        height: 12.66vw;
        border-bottom: 1px solid #e5e5e5;
    }
    .tag-top p{
        height: 12.66vw;
    }
    .tag-tit{
        margin-left: 4vw;
        line-height: 12.66vw;
        float: left;
        font-weight: 700;
        font-size: 4vw;
    }
    .clear{
        font-size: 3.2vw;
        color: #666666;
        line-height: 12.66vw;
        float: right;
        margin-right: 4vw;
    }
    .clear i{
        margin-left: 1.33vw;
        font-size: 3.4vw;
    }
    .tag-list{
        width: 83.2vw;
        margin: 4vw 4.4vw 0 8.4vw;
        overflow: hidden;
    }
    .tag-list li{
        float: left;
        height: 8vw;
        padding: 0 3vw;
        color: #666;
        background: #f3f3f3;
        border-radius: 0.667vw;
        margin: 0 4vw 4vw 0;
        line-height: 8vw;
    }
</style>
