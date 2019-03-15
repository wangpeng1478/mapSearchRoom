<template>
    <div>
        <div class="tag-top">
            <p class="tag-tit">搜索历史</p>
            <p class="clear" v-if="isHistory">清空记录<i class="iconfont icon-lajitong"></i></p>
        </div>
        <ul>
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
</template>
<script>
export default {
    name:'SearchTag',
    data(){
        return {

        }
    },
    props:['isHistory'],
    mounted(){
        console.log(this.isHistory)
    }
}
</script>
<style scoped>
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
    ul{
        width: 83.2vw;
        margin: 4vw 4.4vw 0 8.4vw;
        overflow: hidden;
    }
    li{
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
