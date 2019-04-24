


//区域覆盖物
function ComplexAreaOverlay(point,key,price, text, mouseoverText,type){
    console.log("ComplexAreaOverlay")
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
    div.style.width = "12vw";
    div.style.height = "8vw";

    var p = this._p = document.createElement("p");
    p.className = "location_label_p";
    p.style.margin = "0px";
    p.style.textAlign = "center";
    p.style.overflow = "hidden";
    p.style.width = "11vw";
    p.style.height = "4vw";
    p.style.background = "#0fb896";
    p.style.padding = ".5vw .5vw 0vw";
    div.appendChild(p);
    p.appendChild(document.createTextNode("¥"+this._price+"+"));
    var p2 = this._p = document.createElement("p");
    p2.className = "location_label_p";
    p2.style.margin = "0px";
    p2.style.textAlign = "center";
    p2.style.width = "11vw";
    p2.style.height = "4vw";
    p2.style.padding = "0vw .5vw"
    p2.style.background = "#0fb896";
    p2.style.marginTop = "-1px";
    div.appendChild(p2);
    p2.appendChild(document.createTextNode(_this._overText));

    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_arrow";
    arrow.style.border = "6vw solid transparent";
    arrow.style.borderBottom = "0";
    arrow.style.borderTop = "2vw solid #0fb896";
    arrow.style.marginTop = "0px";
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
    div.style.zIndex = "1000";
    div.style.cursor = "pointer";
    div.style.height = "33px";
    var p = this._p = document.createElement("p");
    p.style.position = "relative";
    p.style.left = "-50%";
    p.style.margin = "0px";
    p.style.color = "#000";
    p.style.background="#fff";
    p.style.padding="6px";
    p.style.fontSize= "16px";
    p.style.borderRadius = "3px";

    div.appendChild(p);
    p.appendChild(document.createTextNode(this._text));
    var i = this._p = document.createElement("i");
    i.className = "location_site_write";
    
    
    p.appendChild(i);


    var arrow = this._arrow = document.createElement("div");
    arrow.className = "label_site_arrow";
    arrow.style.border = "9px solid transparent";
    arrow.style.borderTop = "9px solid #fff";
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
    this._div.style.left =pixel.x+ "px";
    this._div.style.top = (pixel.y-parseInt(this._div.style.height)-parseInt(this._arrow.style.borderWidth) - 27)+ "px";
}

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
    this._div.style.left = (pixel.x- parseFloat(this._div.offsetWidth/2))/window.innerWidth*100 + "vw";
    this._div.style.top  = (pixel.y/window.innerWidth*100 - parseInt(this._div.style.height) - parseInt(this._arrow.style.borderWidth) - 3) + "vw";
}

export default  {
    ComplexSiteOverlay,
    ComplexAreaOverlay,
    ComplexMetroStationOverlay
}
