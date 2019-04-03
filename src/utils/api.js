
const DOMAIN = 'http://192.168.103.216:7080';
const API = {
    queryCityList:DOMAIN+'/mapsearch/queryCityList',
    queryMapBaseData:DOMAIN+'/mapsearch/queryMapBaseData',
    queryMapRoomCount:DOMAIN+'/mapsearch/queryMapRoomCount', //筛选总房源个数
    //搜索
    hotSearch:DOMAIN+'/unit/hotSearch',
    keywordsSearch:DOMAIN+'/unit/keywordsSearch',
    hotWordsCount:DOMAIN+'/unit/hotWordsCount',

    queryMapCoverData:DOMAIN+'/mapsearch/queryMapCoverData',
    queryRoomByVillage:DOMAIN+'/mapsearch/queryRoomByVillage',
    queryMapCoverByCoordinate:DOMAIN+'/mapsearch/queryMapCoverByCoordinate',
    //埋点
    record:DOMAIN+'/behavioral/record'
}

export default API;