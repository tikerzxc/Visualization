(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","css!./XYAxis"],t):e.chart_XYAxis=t(e.d3,e.common_SVGWidget)})(this,function(e,t){function n(n){t.call(this),this._drawStartPos="origin",this._dateParser=e.time.format("%Y-%m-%d").parse}n.prototype=Object.create(t.prototype),n.prototype._class+=" chart_XYAxis",n.prototype.publish("orientation","horizontal","set","Selects orientation for the axis",["horizontal","vertical"]),n.prototype.publish("valueAxisPadding",5,"number","Value Axis Padding Percent"),n.prototype.publish("selectionMode",!1,"boolean","Range Selector"),n.prototype.publish("xAxisType","category","set","X-Axis Type",["category","timeseries","indexed"]),n.prototype.publish("timeseriesPattern","%Y-%m-%d","string","Time Series Pattern");var r=n.prototype.timeseriesPattern;return n.prototype.timeseriesPattern=function(t){var n=r.apply(this,arguments);return arguments.length&&(this._dateParser=e.time.format(t).parse),n},n.prototype.columns=function(e){return t.prototype.columns.apply(this,arguments)},n.prototype.data=function(e){var n=t.prototype.data.apply(this,arguments);if(!arguments.length)switch(this.xAxisType()){case"timeseries":n=n.map(function(e){return e.map(function(e,t){return t===0?this._dateParser(e):e},this)},this)}return n},n.prototype.enter=function(t,n){this.dataScale=null;switch(this.xAxisType()){case"timeseries":this.dataScale=e.time.scale();break;default:this.dataScale=e.scale.ordinal()}this.valueScale=e.scale.linear(),this.dataAxis=e.svg.axis().orient("bottom").scale(this.dataScale),this.valueAxis=e.svg.axis().orient("left").scale(this.valueScale).tickFormat(e.format(".2s")).ticks(10),this.svg=n.append("g"),this.svgData=this.svg.append("g"),this.svgXAxis=this.svg.append("g"),this.svgYAxis=this.svg.append("g");var r=this;this.xBrush=e.svg.brush().x(this.dataScale).on("brush",function(){return r.brushMoved.apply(r,arguments)}),this.yBrush=e.svg.brush().y(this.dataScale).on("brush",function(){return r.brushMoved.apply(r,arguments)}),this.brush_g=n.append("g").attr("class","brush")},n.prototype.resizeBrushHandle=function(e,t,n){var r,i,s;return e==="e"||e==="w"?(r=+(e==="e"),i=r?1:-1,s=n/3,"M"+.5*i+","+s+"A6,6 0 0 "+r+" "+6.5*i+","+(s+6)+"V"+(2*s-6)+"A6,6 0 0 "+r+" "+.5*i+","+2*s+"Z"+"M"+2.5*i+","+(s+8)+"V"+(2*s-8)+"M"+4.5*i+","+(s+8)+"V"+(2*s-8)):(r=+(e==="s"),s=r?1:-1,i=t/3,"M"+i+", "+.5*s+"A6,6 0 0 "+(r+1)%2+" "+(i+6)+","+6.5*s+"H"+(2*i-6)+"A6,6 0 0 "+(r+1)%2+" "+2*i+","+.5*s+"Z"+"M"+(i+8)+","+2.5*s+"H"+(2*i-8)+"M"+(i+8)+","+4.5*s+"H"+(2*i-8))},n.prototype.brushMoved=t.prototype.debounce(function(){var t=this.data().filter(function(e){var t;switch(this.xAxisType()){case"timeseries":return t=e[0],this.orientation()==="horizontal"?t>=this.xBrush.extent()[0]&&t<=this.xBrush.extent()[1]:t>=this.yBrush.extent()[0]&&t<=this.yBrush.extent()[1];default:return t=this.dataScale(e[0])+(this.dataScale.rangeBand?this.dataScale.rangeBand()/2:0),this.orientation()==="horizontal"?t>=this.xBrush.extent()[0]&&t<=this.xBrush.extent()[1]:t>=this.yBrush.extent()[0]&&t<=this.yBrush.extent()[1]}},this);this.selection(t)},250),n.prototype.calcMargin=function(e,t){var n={top:this.selectionMode()?8:0,right:this.selectionMode()?8:0,bottom:50,left:50},r=this.height()-n.top-n.bottom,i=t.append("g"),s=i.append("g").attr("class",this.orientation()==="horizontal"?"x axis":"y axis").attr("transform","translate(0,"+r+")").call(this.currAxis),o=i.append("g").attr("class",this.orientation()==="horizontal"?"y axis":"x axis").call(this.otherAxis),u=s.node().getBBox(),a=o.node().getBBox();return n.bottom=u.height,n.left=a.width,i.remove(),n},n.prototype.update=function(t,n){var r=this,i=this.orientation()==="horizontal";this.dataAxis.orient(i?"bottom":"left"),this.valueAxis.orient(i?"left":"bottom"),this.currAxis=i?this.dataAxis:this.valueAxis,this.otherAxis=i?this.valueAxis:this.dataAxis;switch(this.xAxisType()){case"timeseries":var s=e.min(this.data(),function(e){return e[0]}),o=e.max(this.data(),function(e){return e[0]});this.dataScale.domain([s,o]);break;default:this.dataScale.domain(this.data().map(function(e){return e[0]}))}var u=e.min(this.data(),function(t){return e.min(t.filter(function(e,t){return t>0&&r._columns[t]&&r._columns[t].indexOf("__")!==0}),function(e){return+e})}),a=e.max(this.data(),function(t){return e.max(t.filter(function(e,t){return t>0&&r._columns[t]&&r._columns[t].indexOf("__")!==0}),function(e){return+e})}),f=u-(a-u)*this.valueAxisPadding()/100;if(u>=0&&f<0||u===a)f=0;var l=a+(a-u)*this.valueAxisPadding()/100;this.valueScale.domain([f,l]),this.dataScale.rangeRoundBands?this.dataScale.rangeRoundBands([0,this.width()],.1):this.dataScale.rangeRound&&this.dataScale.range([0,this.width()]),this.valueScale.range([this.height(),0]);var c=this.calcMargin(t,n);this.margin=c;var h=this.width()-c.left-c.right,p=this.height()-c.top-c.bottom,d=i?h:p;this.dataScale.rangeRoundBands?this.dataScale.rangeRoundBands([0,d],.1):this.dataScale.rangeRound&&this.dataScale.range([0,d]),this.valueScale.range([i?p:0,i?0:h]),this.svg.transition().attr("transform","translate("+c.left+","+c.top+")"),this.svgXAxis.transition().attr("class",i?"x axis":"y axis").attr("transform","translate(0,"+p+")").call(this.currAxis),this.svgYAxis.transition().attr("class",i?"y axis":"x axis").call(this.otherAxis);var v=i?this.xBrush:this.yBrush,m=i?this.yBrush:this.xBrush;if(this.selectionMode()){if(!this._prevBrush)v.extent([0,d]);else if(this._prevBrush&&this._prevBrush.orientation!==this.orientation()){var g=m.extent();v.extent([g[0]*d/this._prevBrush.maxExtent,g[1]*d/this._prevBrush.maxExtent])}this._prevBrush={orientation:this.orientation(),maxExtent:d}}this.brush_g.attr("transform","translate("+c.left+", "+c.top+")").style("display",this.selectionMode()?null:"none").call(v).selectAll(".background").transition().attr("width",h).attr("height",p),this.brush_g.selectAll(".extent, .resize rect").transition().attr(i?"y":"x",0).attr(i?"height":"width",i?p:h);var y=this.brush_g.selectAll(".resize").selectAll("path").data(function(e){return e});y.enter().append("path"),y.transition().attr("d",function(e){return r.resizeBrushHandle(e,h,p)}),this.updateChart(t,n,c,h,p)},n.prototype.updateChart=function(e,t,n,r,i){},n.prototype.selection=function(e){console.log(e)},n});