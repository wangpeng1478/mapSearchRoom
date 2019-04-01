import systemInfo from './systemInfo';
import axios from 'axios';
import API from '@/utils/api'

let info = systemInfo()

let routePath = {
    currentPage:null,
    prevPage:null,
    cityId:null,
    cityName:null
}

const routeName = {
    Map:'地图找房页面',
    Address:'城市选择页面',
    Search:'地图搜索页面'
}

const record = (eventType,value) => {
    if(eventType==1){
        routePath = {
            currentPage:routeName[value.to],
            prevPage:routeName[value.from],
            cityId:value.cityId,
            cityName:value.cityName
        }
    }
    if(eventType==2){
        
    }
    recordHttp(eventType)
}

const recordHttp = (eventType) =>{
    let params = {
        ...info,
        ...routePath,
        eventType
    }
    console.log(params)


    axios.post(API['record'],params)
        .then(res=>{
            console.log(res.data.msg)
        })
}

export default record;