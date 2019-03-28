<template>
  <div>
    <div class="input-row">
      <input type="text" placeholder="请输入小区/区域/地图" maxlength="50" v-model="searchValue">
      <!-- @input="handleInput" -->
      <i class="clearinput iconfont icon-guanbi" v-show="searchValue!=''" @click="handleClearinput"></i>
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
            :key="index"
          >{{historyTag.keyWords}}</li>
        </ul>
        <div v-else class="nolist">
          <img src="../assets/images/none.png">
          <p>暂无搜索历史</p>
        </div>
      </div>
      <div class="search-tag-list">
        <div class="tag-top">
          <p class="tag-tit">热门搜索</p>
        </div>
        <ul class="tag-list" v-if="hotSearch.length!=0">
          <li
            @click="handleSearchTag(index,'hotSearch')"
            v-for="(hotTag,index) in hotSearch"
            :key="index"
          >{{hotTag.keyWords}}</li>
        </ul>
        <div v-else class="nolist">
          <img src="../assets/images/none.png">
          <p>暂无热门搜索</p>
        </div>
      </div>
    </div>

    <ul class="search-result" v-show="searchValue!='' && isRegion">
      <li v-for="(result,index) in searchResult" :key="result.id" @click="handleSearchResult(index)">
        <p v-html="result.showKeyWords"></p>
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
import axios from "axios";
import API from "@/utils/api";
import { mapState,mapMutations } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      isRegion: true, //true为区域搜索，false为位置搜索
      searchValue: "",
      searchTagHistory: [],
      hotSearch: [],
      searchResult: []
    };
  },
  mounted() {
    let params = new URLSearchParams({
      cityId: this.currentCity.cityId,
      type: 3,
      limit: 9
    });
    axios
      .post(API["hotSearch"], params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
      .then(res => {
        if (res.data.code == 0) {
          this.hotSearch = res.data.data;
        }
      });

    let localStorageName = "searchTagHistory"+this.currentCity.cityId;
    if (localStorage[localStorageName]) {
      this.searchTagHistory = JSON.parse(localStorage[localStorageName]);
    } else {
      this.searchTagHistory = [];
    }
  },
  methods: {
    ...mapMutations(['assign']),
    clearHistory() {
      localStorage.removeItem("searchTagHistory");
      this.searchTagHistory = [];
    },
    handleInput(e) {
      let params = new URLSearchParams({
        cityId: this.currentCity.cityId,
        type: 3,
        limit: 9,
        keyword: this.searchValue
      });
      axios
        .post(API["keywordsSearch"], params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            let searchResult = res.data.data;

            searchResult.map(result => {
              result.showKeyWords = result.keyWords.replace(
                this.searchValue,
                "<span>" + this.searchValue + "</span>"
              );
            });
            this.searchResult = searchResult
          }
        });
    },
    handleSearchTag(idx, name) {
      let localStorageName = "searchTagHistory"+this.currentCity.cityId;
      //点击历史或者热门的tag
      let tag = this[name][idx];
      let searchTagHistory = JSON.parse(JSON.stringify(this.searchTagHistory));
      let _index = searchTagHistory.findIndex(item => {
        return item.id == tag.id;
      });
      if (_index != -1) {
        searchTagHistory.splice(_index, 1);
      }
      searchTagHistory.unshift(tag);
      searchTagHistory = JSON.stringify(searchTagHistory.slice(0, 9));
      localStorage.setItem(localStorageName, searchTagHistory);
      this.assign({
        key:'keywordsSearch',
        value:tag
      })
    },
    handleClearinput() {
      this.searchValue = "";
    },
    handleSearchResult(idx){
      this.assign({
        key:'keywordsSearch',
        value:this.searchResult[idx]
      })
    }
  },
  computed: mapState(["currentCity"]),
  watch: {
    searchValue(newVal, oldVal) {
      if (newVal != oldVal && newVal != "") {
        this.handleInput();
      }
      if(newVal != oldVal && newVal == ""){
        this.searchResult=[]
      }
      
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
  overflow: hidden;
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

.nolist img {
  display: block;
  width: 8vw;
  margin: 10vw auto 1vw;
}
.nolist p {
  text-align: center;
  font-size: 4vw;
  color: #888;
}
</style>
<style>
.search-result li p span {
  color: #ff0000;
}
</style>
