<template>
  <div>
    <div class="input-row">
      <input
        type="text"
        placeholder="请输入小区/区域/地图"
        maxlength="50"
        v-model="searchValue"
        @input="handleInput"
      >
      <i class="clearinput iconfont icon-guanbi" v-show="searchValue!=''"></i>
      <router-link to="/">取消</router-link>
    </div>
    <div class="search-tag" v-show="searchValue==''">
      <div class="search-tag-list">
        <div class="tag-top">
          <p class="tag-tit">搜索历史</p>
          <p class="clear" @click="clearHistory">
            清空记录
            <i class="iconfont icon-lajitong"></i>
          </p>
        </div>
        <ul class="tag-list" v-if="searchTagHistory.length!=0">
          <li
            @click="handleSearchTag(index,'searchTagHistory')"
            v-for="(historyTag,index) in searchTagHistory"
            :key="historyTag.id"
          >{{historyTag.keyWords}}</li>
        </ul>
      </div>
      <div class="search-tag-list">
        <div class="tag-top">
          <p class="tag-tit">热门搜索</p>
        </div>
        <ul class="tag-list" v-if="searchTagHot.length!=0">
          <li
            @click="handleSearchTag(index,'searchTagHot')"
            v-for="(hotTag,index) in searchTagHot"
            :key="hotTag.id"
          >{{hotTag.keyWords}}</li>
        </ul>
      </div>
    </div>

    <ul class="search-result" v-show="searchValue!='' && isRegion">
      <li v-for="result in searchResult" :key="result.id">
        <p>{{result.keyWords}}</p>
        <span>{{result.typeName}}</span>
      </li>
    </ul>
    <ul class="local-result" v-show="searchValue!='' && !isRegion">
      <li>
        <p>龙华中路-地铁站</p>
        <span>上海市 | 徐汇区</span>
      </li>
      <li>
        <p>龙华中路-地铁站</p>
        <span>上海市 | 徐汇区</span>
      </li>
      <li>
        <p>龙华中路-地铁站</p>
        <span>上海市 | 徐汇区</span>
      </li>
      <li>
        <p>龙华中路-地铁站</p>
        <span>上海市 | 徐汇区</span>
      </li>
      <li>
        <p>龙华中路-地铁站</p>
        <span>上海市 | 徐汇区</span>
      </li>
    </ul>
  </div>
</template>
<script>
/**
 * TODO：热门和历史没有加载动画和没有列表的图标
 *  */
export default {
  name: "Search",
  data() {
    return {
      isRegion: false, //true为区域搜索，false为位置搜索
      searchValue: "",
      searchTagHistory: [],
      searchTagHot: [
        {
          id: 18,
          keyWords: "徐汇区",
          latitude: "31.1779920000",
          longitude: "121.4399930000",
          parentId: 0,
          remark: "",
          tableId: 4,
          typeId: 7,
          typeName: "行政区"
        },
        {
          id: 337,
          keyWords: "地铁7号线",
          latitude: "",
          longitude: "",
          parentId: 0,
          remark: "",
          tableId: 7,
          typeId: 3,
          typeName: "地铁线路"
        },
        {
          id: 3781,
          keyWords: "地铁1号线",
          latitude: "",
          longitude: "",
          parentId: 0,
          remark: "",
          tableId: 1,
          typeId: 3,
          typeName: "地铁线路"
        }
      ],
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
          id: 15074,
          keyWords: "洞泾",
          latitude: "31.09060",
          longitude: "121.23674",
          parentId: 9,
          remark: "地铁9号线",
          tableId: 9031,
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
          tableId: 9121,
          typeId: 2,
          typeName: "地铁站"
        }
      ]
    };
  },
  mounted() {
    let searchTagHistory;
    if (localStorage.searchTagHistory) {
        searchTagHistory = JSON.parse(localStorage.searchTagHistory);
      } else {
        searchTagHistory = [];
      }
      this.searchTagHistory = searchTagHistory
  },
  methods: {
    clearHistory() {},
    handleInput() {
      //搜索框输入
    },
    handleSearchTag(idx, name) {
      //点击历史或者热门的tag
      let tag = this[name][idx];
      let searchTagHistory =  JSON.parse(JSON.stringify(this.searchTagHistory));
      let _index = searchTagHistory.findIndex(item => {
        return item.id == tag.id;
      });
      if (_index != -1) {
        searchTagHistory.splice(_index, 1);
      }
      searchTagHistory.unshift(tag);
      searchTagHistory = JSON.stringify(searchTagHistory.slice(0, 9));
      localStorage.setItem("searchTagHistory", searchTagHistory);
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
  width: 60vw;
  height: 10.6vw;
  padding-left: 11.5vw;
  padding-right: 9vw;
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
.tag-top {
  overflow: hidden;
  height: 12.66vw;
  border-bottom: 1px solid #e5e5e5;
}
.tag-top p {
  height: 12.66vw;
}
.tag-tit {
  margin-left: 4vw;
  line-height: 12.66vw;
  float: left;
  font-weight: 700;
  font-size: 4vw;
}
.clear {
  font-size: 3.2vw;
  color: #666666;
  line-height: 12.66vw;
  float: right;
  margin-right: 4vw;
}
.clear i {
  margin-left: 1.33vw;
  font-size: 3.4vw;
}
.tag-list {
  width: 83.2vw;
  margin: 4vw 4.4vw 0 8.4vw;
  overflow: hidden;
}
.tag-list li {
  float: left;
  height: 8vw;
  padding: 0 3vw;
  color: #666;
  background: #f3f3f3;
  border-radius: 0.667vw;
  margin: 0 4vw 4vw 0;
  line-height: 8vw;
}
.search-tag-list {
  min-height: 50vw;
}
.search-tag-list:nth-of-type(1) {
  border-bottom: 4vw #f4f4f4 solid;
}
.search-result,
.local-result {
  margin-top: 2vw;
}
.search-result li {
  height: 12vw;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 6.5vw;
}
.search-result li p {
  width: 70vw;
  height: 12vw;
  float: left;
  font-size: 3.733vw;
  letter-spacing: 1px;
  line-height: 12vw;
  overflow: hidden;
  color: #313131;
}
.search-result li span {
  display: block;
  width: 16vw;
  height: 12vw;
  color: #a8a8a8;
  font-size: 3.733vw;
  text-align: right;
  float: right;
  line-height: 12vw;
}
.search-result li p span {
  color: #ff0000;
}
.local-result li {
  height: 12vw;
  border-bottom: 1px solid #e5e5e5;
  padding: 4vw 6.5vw 0;
}
.local-result li p {
  font-size: 4vw;
  color: #313131;
  letter-spacing: 1px;
  line-height: 1;
  margin-bottom: 1vw;
}
.local-result li span {
  color: #a8a8a8;
  font-size: 3.733vw;
  line-height: 1;
}
.local-result li p span {
  color: #ff0000;
}
.clearinput {
  display: block;
  color: #666;
  width: 8vw;
  height: 10.6vw;
  position: absolute;
  left: 77vw;
  font-size: 3vw;
  line-height: 10.6vw;
  text-align: center;
  font-weight: bold;
}
</style>
