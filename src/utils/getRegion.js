import store from '../store';
const getRegion = (val) =>{
    let metroList = store.state.metroList;
    let priceList = store.state.priceList;
    let currentCity = store.state.currentCity;

    let type = Object.keys(val)[0];
    let region={
        key:type,
        value:val[type]
    }
    
    switch (type){
        case 'prcId':
        region.levelType=3;
        for(let i=0;i<priceList.length;i++){
            if(priceList[i].prcId==val[type]){
                region.atitudeAndLongitude={
                    latitude:priceList[i].latitude,
                    longitude:priceList[i].longitude
                }
                region.showRegion = currentCity.cityName+'-'+metroList[i].prcName;
                region.selected=[0,i,-1]
            }
        }
        break;
        case 'ceaId':
        region.levelType=4;
        for(let i=0;i<priceList.length;i++){
            for(let j=0;j<priceList[i].length;j++){
                if(priceList[i][j].ceaId==val[type]){
                    region.atitudeAndLongitude={
                        latitude:priceList[i][j].latitude,
                        longitude:priceList[i][j].longitude
                    }
                    region.showRegion = currentCity.cityName+'-'+priceList[i].prcName+'-'+priceList[i][j].ceaName;
                    region.selected=[0,i,j]
                }
            }
        }
        break;
        case 'metroId':
        region.levelType=5;
        for(let i=0;i<metroList.length;i++){
            if(metroList[i].metroId==val[type]){
                region.showRegion = currentCity.cityName+'-'+metroList[i].simpleName;
                region.selected=[1,i,-1]
            }
        }

        break;
        case 'stationId':
        region.levelType=6;
        for(let i=0;i<metroList.length;i++){
            for(let j=0;j<metroList[i].length;j++){
                if(metroList[i][j].stationId==val[type]){
                    region.atitudeAndLongitude={
                        latitude:metroList[i][j].latitude,
                        longitude:metroList[i][j].longitude
                    }
                    region.showRegion = currentCity.cityName+'-'+metroList[i].simpleName+'-'+metroList[i][j].stationName;
                    region.selected=[1,i,j]
                }
            }
        }
        break;
    }
    store.state.region=region;
}
export default getRegion;