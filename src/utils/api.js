
const API = {
    queryCityList:'/mapsearch/queryCityList',
    queryMapBaseData:'/mapsearch/queryMapBaseData',
    queryMapRoomCount:'/mapsearch/queryMapRoomCount', //筛选总房源个数
    //搜索
    hotSearch:'/unit/hotSearch',
    keywordsSearch:'/unit/keywordsSearch',
    hotWordsCount:'/unit/hotWordsCount',

    queryMapCoverData:'/mapsearch/queryMapCoverData',
    queryRoomByVillage:'/mapsearch/queryRoomByVillage',
    queryMapCoverByCoordinate:'/mapsearch/queryMapCoverByCoordinate',
    getBanners:"/mapsearch/getBanners",
    //埋点
    record:'/behavioral/record'
}

export default API;