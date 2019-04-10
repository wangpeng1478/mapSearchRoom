import axios from 'axios';
import API from '@/utils/api';
import store from '@/store';

const pageNames = {
    Map:'地图页面',
    Address:'城市切换页面',
    Search:'搜索页面'
}

const getSystemInfo = () => {
    let u = navigator.userAgent;
        let os = 4,osVersion=1;
        if (u.indexOf('Android') != -1) {
            os = 1;
            osVersion=navigator.userAgent.split(';')[1].match(/\d+\.\d+/g)[0];
        }
        if (u.indexOf('iPhone') != -1) {
            os = 2;
            osVersion=navigator.userAgent.split(';')[1].match(/(\d+)_(\d+)_?(\d+)?/)[0];
        }
        var networkStr = u.match(/NetType\/\w+/) ? u.match(/NetType\/\w+/)[0] : 'NetType/other';
        let networkType = networkStr.toLowerCase().replace('nettype/', '')
        return {
            os,
            osVersion,
            networkType,
            model:osVersion
        };
}

const getCityInfo = () =>{
    let currentCity = store.state.currentCity;
    return {
        cityId:currentCity.cityId,
        cityName:currentCity.cityName
    }
}

let pageInfo={
    currentPage:null,
    prevPage:null
};
const getPageInfo = (pageName) => {
    pageInfo={
        currentPage:pageNames[pageName.currentPage],
        prevPage:pageNames[pageName.prevPage]
    }
}

const recordPage = () => {
    recordHttp(1)
}

const recordButton = (buttonName) => {
    recordHttp(2,{buttonName})
}

const recordSearch = (searchInfo) => {
    recordHttp(3,searchInfo)

}

const recordHttp = (eventType,otherParams) => {
    let cityInfo = getCityInfo();
    let params = {
        ...getSystemInfo(),
        eventType,
        ...pageInfo,
        ...cityInfo
    }
    if(eventType!=1){
        Object.assign(params,otherParams)
    }

    axios.post(API['record'], params)
        .then(res=>{
            console.log(res)
        })

}

export {
    recordPage,
    recordButton,
    recordSearch,
    getPageInfo
}