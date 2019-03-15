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
      <SearchTag :isHistory="isHistory"/>
      <SearchTag/>
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
import SearchTag from "@/components/SearchTag";
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
  components: {
    SearchTag
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
</style>
