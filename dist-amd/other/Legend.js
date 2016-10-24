!function(t,e){"function"==typeof define&&define.amd?define(["d3","./Table","../common/Palette","css!./Legend"],e):t.other_Legend=e(t.d3,t.other_Table,t.common_Palette)}(this,function(t,e,i){function o(){e.call(this),this.showHeader(!1),this.pagination(!1)}function r(t){return'<div class="colorBlock" style="background-color:'+t+';"></div>'}o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.prototype._class+=" other_Legend",o.prototype.publish("dataFamily","ND","set","Type of data",["1D","2D","ND","map","any"],{tags:["Private"]}),o.prototype.publish("orientation","vertical","set","Orientation of Legend rows",["vertical","horizontal"],{tags:["Private"]}),o.prototype.publish("rainbowFormat",",","string","Rainbow number formatting",null,{tags:["Private"],optional:!0,disable:function(t){return!t.isRainbow()}}),o.prototype.publish("rainbowBins",8,"number","Number of rainbow bins",null,{tags:["Private"],disable:function(t){return!t.isRainbow()}}),o.prototype.isRainbow=function(){var t=this.getWidget();return t&&t._palette&&"rainbow"===t._palette.type()},o.prototype.targetWidget=function(t){if(!arguments.length)return this._targetWidget;this._targetWidget=t,this._targetWidgetMonitor&&(this._targetWidgetMonitor.remove(),delete this._targetWidgetMonitor);var e=this;return this._targetWidgetMonitor=this._targetWidget.monitor(function(t,i,o,r){switch(t){case"chart":case"columns":case"data":case"paletteID":e.lazyRender()}}),this},o.prototype.getWidget=function(){if(this._targetWidget)switch(this._targetWidget.classID()){case"chart_MultiChart":return this._targetWidget.chart()}return this._targetWidget},o.prototype.getPalette=function(){var t=this.getWidget();if(t&&t._palette)switch(t._palette.type()){case"ordinal":return i.ordinal(t._palette.id());case"rainbow":return i.rainbow(t._palette.id())}return i.ordinal("default")};var a=e.prototype.getBBox;return o.prototype.getBBox=function(t,e){var i=a.apply(this,arguments),o=this.element().select(".tableDiv > table");if(!o.empty()){var r=o.node().getBoundingClientRect(),n=r.width+8+(this.hasVScroll(this._parentElement)?this.getScrollbarWidth():0),s=r.height+8+(this.hasHScroll(this._parentElement)?this.getScrollbarWidth():0);return{x:i.x,y:i.y,width:(e?Math.round(n):n)*this._scale,height:(e?Math.round(s):s)*this._scale}}return i},o.prototype.enter=function(i,o){e.prototype.enter.apply(this,arguments),t.select(i.parentNode).style("overflow-y","auto"),this.renderHtmlDataCells(!0),this.fixedHeader(!1),this.fixedSize(!0),o.classed("other_Legend",!0)},o.prototype.update=function(i,o){var a=["Key","Label"],n=[];if(this._targetWidget){var s=this.getPalette();switch(s.type()){case"ordinal":switch(this.dataFamily()){case"2D":n=this._targetWidget.data().map(function(t){return[r(s(t[0])),t[0]]},this);break;case"ND":var l=this._targetWidget.columns();n=l.filter(function(t,e){return e>0}).map(function(t){return[r(s(t)),t]},this)}break;case"rainbow":var h=t.format(this.rainbowFormat()),g=this.getWidget(),d=this.rainbowBins(),p=g._dataMinWeight,c=g._dataMaxWeight,u=(c-p)/(d-1);n.push([r(s(p,p,c)),h(p)]);for(var f=1;d-1>f;++f){var y=u*f;n.push([r(s(y,p,c)),h(Math.floor(y))])}n.push([r(s(c,p,c)),h(c)])}}this.columns(a),this.data(n),e.prototype.update.apply(this,arguments),o.classed("horiz-legend","horizontal"===this.orientation());var b=o.select(".tableDiv > table"),m=b.node().getBoundingClientRect(),_=this._parentElement.node().getBoundingClientRect();o.select(".tableDiv").style({overflow:"visible"});var v=_.height/2-m.height/2,w=_.width/2-m.width/2;b.style({position:"absolute",top:v+"px",left:w+"px"});var W=this.pageNumber()-1,M=this.itemsPerPage(),D=W*M,x=parseInt(W*M)+parseInt(M),B=null;B=this.pagination()?this.data().slice(D,x):this.data();var P=this.tbody.selectAll("tr").data(B),k=this;P.on("click",function(t,e){k.onClick(t,e)}).on("mouseover",function(t,e){k.onMouseOver(t,e)})},o.prototype.exit=function(t,i){this._targetWidgetMonitor&&(this._targetWidgetMonitor.remove(),delete this._targetWidgetMonitor),e.prototype.exit.apply(this,arguments)},o.prototype.onClick=function(t,e){console.log("Legend onClick method"),console.log("rowData: "+t),console.log("rowIdx: "+e)},o.prototype.onMouseOver=function(t,e){console.log("Legend onMouseOver method"),console.log("rowData: "+t),console.log("rowIdx: "+e)},o});