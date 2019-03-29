
//行政区覆盖物
function ComplexPrcOverlay(point, text, mouseoverText,type){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
    this._type = type;
}
ComplexPrcOverlay.prototype = new BMap.Overlay();
ComplexPrcOverlay.prototype.initialize = function(map){ 
    let _this = this;
    this._map = map;
    var div = this._div = document.createElement("div");
    div.id = 
    div.className = "location_label";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = "14vw";
    div.style.height = "8vw";

    var p = this._p = document.createElement("p");
    p.style.margin = "0px";
    div.appendChild(p);
    p.appendChild(document.createTextNode("¥1500+"));
    var p2 = this._p = document.createElement("p");
    p2.style.margin = "0px";
    p2.style.textAlign = "center";
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(_this._overText));

    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_arrow";
    arrow.style.border = "8vw solid transparent";
    arrow.style.borderTop = "3vw solid #0fb896";
    div.appendChild(arrow);

    var p3 = this.p3 = document.createElement("p");
    p3.className = "label_area_name";
    div.appendChild(p3);
    p3.appendChild(document.createTextNode(_this._text));


    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexPrcOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
}

//商圈覆盖物
function ComplexCeaOverlay(point, text, mouseoverText,type){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
    this._type = type;
}
ComplexCeaOverlay.prototype = new BMap.Overlay();
ComplexCeaOverlay.prototype.initialize = function(map){ 
    let _this = this;
    this._map = map;
    var div = this._div = document.createElement("div");
    div.id = 
    div.className = "location_cea_label";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = "14vw";
    div.style.height = "8vw";

    var p = this._p = document.createElement("p");
    p.style.margin = "0px";
    div.appendChild(p);
    p.appendChild(document.createTextNode("¥1500+"));
    var p2 = this._p = document.createElement("p");
    p2.style.margin = "0px";
    p2.style.textAlign = "center";
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(_this._overText));

    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_cea_arrow";
    arrow.style.border = "8vw solid transparent";
    arrow.style.borderTop = "3vw solid #0fb896";
    div.appendChild(arrow);

    var p3 = this.p3 = document.createElement("p");
    p3.className = "label_area_cea_name";
    div.appendChild(p3);
    p3.appendChild(document.createTextNode(_this._text));


    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexCeaOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
}

//小区覆盖物
function ComplexVillageOverlay(point, text, mouseoverText,type){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
    this._type = type;
}
ComplexVillageOverlay.prototype = new BMap.Overlay();
ComplexVillageOverlay.prototype.initialize = function(map){ 
    let _this = this;
    this._map = map;
    var div = this._div = document.createElement("div");
    div.id = 
    div.className = "location_cea_label";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = "14vw";
    div.style.height = "8vw";
    div.style.zIndex = "100";

    var p = this._p = document.createElement("p");
    p.style.margin = "0px";
    div.appendChild(p);
    p.appendChild(document.createTextNode("¥1500+"));
    var p2 = this._p = document.createElement("p");
    p2.style.margin = "0px";
    p2.style.textAlign = "center";
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(_this._overText));

    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_cea_arrow";
    arrow.style.border = "8vw solid transparent";
    arrow.style.borderTop = "3vw solid #0fb896";
    div.appendChild(arrow);

    var p3 = this.p3 = document.createElement("p");
    p3.className = "label_area_cea_name";
    div.appendChild(p3);
    p3.appendChild(document.createTextNode(_this._text));


    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexVillageOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
}

//地铁覆盖物
function ComplexMetroStationOverlay(point, text, mouseoverText){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
}
ComplexMetroStationOverlay.prototype = new BMap.Overlay();
ComplexMetroStationOverlay.prototype.initialize = function(map){ 
    let _this = this;
    this._map = map;
    var div = this._div = document.createElement("div");
    div.id = 
    div.className = "location_metro_label";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = "14vw";
    div.style.height = "4vw";

    var p2 = this._p = document.createElement("p");
    p2.style.margin = "0px";
    p2.style.textAlign = "center";
    p2.style.zIndex = "10";
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(_this._overText));

    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_metro_arrow";
    arrow.style.border = "3vw solid transparent";
    arrow.style.borderTop = "2vw solid #0fb896";
    div.appendChild(arrow);
    map.getPanes().labelPane.appendChild(div);
    return div;
}
ComplexMetroStationOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = (pixel.x/window.innerWidth*100 - parseInt(this._div.style.width)/2 - 1) + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
}

export default  {
    ComplexPrcOverlay,
    ComplexCeaOverlay,
    ComplexVillageOverlay,
    ComplexMetroStationOverlay
}
