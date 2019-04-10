


//区域覆盖物
function ComplexAreaOverlay(point,key,price, text, mouseoverText,type){
    this._point = point;
    this._price = price;
    this._key = key;
    // this._parentkey = parentkey;
    this._text = text;
    this._overText = mouseoverText;
    this._type = type;
}
ComplexAreaOverlay.prototype = new BMap.Overlay();
ComplexAreaOverlay.prototype.initialize = function(map){ 
    let _this = this;
    this._map = map;
    var div = this._div = document.createElement("div");
    div.className = "location_label";
    div.setAttribute("lat",this._point.lat);
    div.setAttribute("lng",this._point.lng);
    div.setAttribute("key",this._key);
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = "14vw";
    div.style.height = "9vw";

    var p = this._p = document.createElement("p");
    p.style.margin = "0px";
    p.style.textAlign = "center";
    p.style.overflow = "hidden";
    p.style.width = "12vw";
    p.style.height = "5vw";
    p.style.background = "#0fb896";
    p.style.padding = "1vw 1vw 0vw";
    div.appendChild(p);
    p.appendChild(document.createTextNode("¥"+this._price+"+"));
    var p2 = this._p = document.createElement("p");
    p2.style.margin = "0px";
    p2.style.textAlign = "center";
    p2.style.width = "12vw";
    p2.style.height = "4vw";
    p2.style.padding = "0vw 1vw"
    p2.style.background = "#0fb896";
    p2.style.marginTop = "-1px";
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(_this._overText));

    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_arrow";
    arrow.style.border = "7vw solid transparent";
    arrow.style.borderBottom = "0";
    arrow.style.borderTop = "3vw solid #0fb896";
    arrow.style.marginTop = "-1px";
    div.appendChild(arrow);

    var p3 = this.p3 = document.createElement("p");
    p3.className = "label_area_name";
    div.appendChild(p3);
    p3.appendChild(document.createTextNode(_this._text));


    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexAreaOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
}


//定位覆盖物
function ComplexSiteOverlay(point, text,type,callback){
    this._point = point;
    this._text = text;
    this._type = type;
    this._callback = callback;
}
ComplexSiteOverlay.prototype = new BMap.Overlay();
ComplexSiteOverlay.prototype.initialize = function(map){ 
    let _this = this;
    this._map = map;
    var div = this._div = document.createElement("div");
    div.className = "location_site_label";
    div.style.height = "8vw";
    div.style.zIndex = "1000";
    div.style.backgroundColor = "#fff";
    div.style.cursor = "pointer";
    var p = this._p = document.createElement("p");
    p.style.margin = "0px";
    p.style.color = "#000";
    p.style.background="#fff";
    p.style.padding="2vw 3vw";
    p.style.fontSize= "4vw";
    p.style.borderRadius = "1vw";

    div.appendChild(p);
    p.appendChild(document.createTextNode(this._text));
    var i = this._p = document.createElement("i");
    i.className = "location_site_write";
    
    
    p.appendChild(i);


    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_site_arrow";
    arrow.style.border = "2vw solid transparent";
    arrow.style.borderTop = "2vw solid #fff";
    div.appendChild(arrow);

    var p3 = this.p3 = document.createElement("p");
    p3.className = "label_site_img";
    div.appendChild(p3);

    div.addEventListener('touchend',function(){
        _this._callback();
    });
    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexSiteOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = (pixel.x/window.innerWidth*100 - this._div.offsetWidth/window.innerWidth*100/2 - 1) + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 6) + "vw";
}



// //行政区覆盖物
// function ComplexPrcOverlay(point, text, mouseoverText,type){
//     this._point = point;
//     this._text = text;
//     this._overText = mouseoverText;
//     this._type = type;
// }
// ComplexPrcOverlay.prototype = new BMap.Overlay();
// ComplexPrcOverlay.prototype.initialize = function(map){ 
//     let _this = this;
//     this._map = map;
//     var div = this._div = document.createElement("div");
//     div.id = 
//     div.className = "location_label";
//     div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
//     div.style.width = "14vw";
//     div.style.height = "8vw";

//     var p = this._p = document.createElement("p");
//     p.style.margin = "0px";
//     div.appendChild(p);
//     p.appendChild(document.createTextNode("¥1500+"));
//     var p2 = this._p = document.createElement("p");
//     p2.style.margin = "0px";
//     p2.style.textAlign = "center";
//     div.appendChild(p2);
//     p2.appendChild(document.createTextNode(_this._overText));

//     var arrow = this._arrow = document.createElement("div");
//     arrow.className = "label_arrow";
//     arrow.style.border = "8vw solid transparent";
//     arrow.style.borderTop = "3vw solid #0fb896";
//     div.appendChild(arrow);

//     var p3 = this.p3 = document.createElement("p");
//     p3.className = "label_area_name";
//     div.appendChild(p3);
//     p3.appendChild(document.createTextNode(_this._text));


//     map.getPanes().labelPane.appendChild(div);

//     return div;
// }
// ComplexPrcOverlay.prototype.draw = function(){
//     var map = this._map;
//     var pixel = map.pointToOverlayPixel(this._point);
//     this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
//     this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
// }

// //商圈覆盖物
// function ComplexCeaOverlay(point, text, mouseoverText,type){
//     this._point = point;
//     this._text = text;
//     this._overText = mouseoverText;
//     this._type = type;
// }
// ComplexCeaOverlay.prototype = new BMap.Overlay();
// ComplexCeaOverlay.prototype.initialize = function(map){ 
//     let _this = this;
//     this._map = map;
//     var div = this._div = document.createElement("div");
//     div.id = 
//     div.className = "location_cea_label";
//     div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
//     div.style.width = "14vw";
//     div.style.height = "8vw";

//     var p = this._p = document.createElement("p");
//     p.style.margin = "0px";
//     div.appendChild(p);
//     p.appendChild(document.createTextNode("¥1500+"));
//     var p2 = this._p = document.createElement("p");
//     p2.style.margin = "0px";
//     p2.style.textAlign = "center";
//     div.appendChild(p2);
//     p2.appendChild(document.createTextNode(_this._overText));

//     var arrow = this._arrow = document.createElement("div");
//     arrow.className = "label_cea_arrow";
//     arrow.style.border = "8vw solid transparent";
//     arrow.style.borderTop = "3vw solid #0fb896";
//     div.appendChild(arrow);

//     var p3 = this.p3 = document.createElement("p");
//     p3.className = "label_area_cea_name";
//     div.appendChild(p3);
//     p3.appendChild(document.createTextNode(_this._text));


//     map.getPanes().labelPane.appendChild(div);

//     return div;
// }
// ComplexCeaOverlay.prototype.draw = function(){
//     var map = this._map;
//     var pixel = map.pointToOverlayPixel(this._point);
//     this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
//     this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
// }

// //小区覆盖物
// function ComplexVillageOverlay(point, text, mouseoverText,type){
//     this._point = point;
//     this._text = text;
//     this._overText = mouseoverText;
//     this._type = type;
// }
// ComplexVillageOverlay.prototype = new BMap.Overlay();
// ComplexVillageOverlay.prototype.initialize = function(map){ 
//     let _this = this;
//     this._map = map;
//     var div = this._div = document.createElement("div");
//     div.id = 
//     div.className = "location_cea_label";
//     div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
//     div.style.width = "14vw";
//     div.style.height = "8vw";
//     div.style.zIndex = "100";

//     var p = this._p = document.createElement("p");
//     p.style.margin = "0px";
//     div.appendChild(p);
//     p.appendChild(document.createTextNode("¥1500+"));
//     var p2 = this._p = document.createElement("p");
//     p2.style.margin = "0px";
//     p2.style.textAlign = "center";
//     div.appendChild(p2);
//     p2.appendChild(document.createTextNode(_this._overText));

//     var arrow = this._arrow = document.createElement("div");
//     arrow.className = "label_cea_arrow";
//     arrow.style.border = "8vw solid transparent";
//     arrow.style.borderTop = "3vw solid #0fb896";
//     div.appendChild(arrow);

//     var p3 = this.p3 = document.createElement("p");
//     p3.className = "label_area_cea_name";
//     div.appendChild(p3);
//     p3.appendChild(document.createTextNode(_this._text));


//     map.getPanes().labelPane.appendChild(div);

//     return div;
// }
// ComplexVillageOverlay.prototype.draw = function(){
//     var map = this._map;
//     var pixel = map.pointToOverlayPixel(this._point);
//     this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
//     this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
// }

//地铁覆盖物
function ComplexMetroStationOverlay(point, key,text, mouseoverText,type){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
    this._type = type;
    this._key = key
}
ComplexMetroStationOverlay.prototype = new BMap.Overlay();
ComplexMetroStationOverlay.prototype.initialize = function(map){ 
    let _this = this;
    this._map = map;
    var div = this._div = document.createElement("div");
    div.id = 
    div.className = "location_metro_label";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    // div.style.width = "10vw";
    div.style.height = "3vw";
    div.setAttribute("lat",this._point.lat);
    div.setAttribute("lng",this._point.lng);
    div.setAttribute("key",this._key);
    div.setAttribute("text",this._text);

    var p2 = this._p = document.createElement("p");
    p2.style.margin = "0px";
    p2.style.textAlign = "center";
    p2.style.zIndex = "10";
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(this._text + " " + _this._overText));

    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_metro_arrow";
    arrow.style.border = "3vw solid transparent";
    arrow.style.borderBottom = "0";
    arrow.style.borderTop = "2vw solid #0fb896";
    div.appendChild(arrow);

    var p3 = this._p = document.createElement("p");
    p3.className = "label_metro_circle";
    div.appendChild(p3);
    map.getPanes().labelPane.appendChild(div);
    return div;
}
ComplexMetroStationOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    console.log(this._div.offsetWidth);
    this._div.style.left = (pixel.x- parseFloat(this._div.offsetWidth/2))/window.innerWidth*100 + "vw";
    // this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
}

export default  {
    ComplexSiteOverlay,
    ComplexAreaOverlay,
    
    // ComplexVillageOverlay,
    ComplexMetroStationOverlay
}
