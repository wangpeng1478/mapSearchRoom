import store from '@/store'
export default{ //很关键
    hasClass:(ele, cls) =>  {
        return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    },
    //为指定的dom元素添加样式
    addClass:(ele, cls) => {
        if (!this.hasClass(ele, cls)) ele.className += " " + cls;
    },
    //删除指定dom元素的样式
    removeClass:(ele, cls) => {
        if (this.hasClass(ele, cls)) {
         var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
         ele.className = ele.className.replace(reg, " ");
        }
    },
    //如果存在(不存在)，就删除(添加)一个样式
    toggleClass:(ele,cls) => { 
        if(this.hasClass(ele,cls)){ 
          this.removeClass(ele, cls); 
        }else{ 
            this.addClass(ele, cls); 
        } 
    },
    locationSuccess:(obj)=>{
        obj.addEventListener("locationSuccess", function(e){
            // 定位成功事件
            store.state.mapData.site.lat = e.point.lat;
            store.state.mapData.site.lng = e.point.lng;
        });
    }
}
