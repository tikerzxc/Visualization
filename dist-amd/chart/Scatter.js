!function(t,e){"function"==typeof define&&define.amd?define(["d3","../common/SVGWidget","./XYAxis","../api/INDChart","../api/ITooltip","css!./Scatter"],e):t.chart_Scatter=e(t.d3,t.common_SVGWidget,t.chart_XYAxis,t.api_INDChart,t.api_ITooltip)}(this,function(t,e,o,i,n){function r(t){o.call(this),i.call(this),n.call(this),this.xAxisGuideLines_default(!0).yAxisGuideLines_default(!0)}return r.prototype=Object.create(o.prototype),r.prototype.constructor=r,r.prototype._class+=" chart_Scatter",r.prototype["implements"](i.prototype),r.prototype["implements"](n.prototype),r.prototype.publish("paletteID","default","set","Palette ID",r.prototype._palette["switch"](),{tags:["Basic","Shared"]}),r.prototype.publish("pointShape","cross","set","Shape of the data points",["circle","rectangle","cross"]),r.prototype.publish("pointSize",6,"number","Point Size"),r.prototype.publish("interpolate","","set","Interpolate Data",["","linear","step","step-before","step-after","basis","bundle","cardinal","monotone"]),r.prototype.publish("interpolateFill",!1,"boolean","Fill Interpolation"),r.prototype.publish("interpolateFillOpacity",.66,"number","Fill Interpolation Opacity"),r.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),r.prototype.xPos=function(t){return"horizontal"===this.orientation()?this.dataPos(t.label):this.valuePos(t.value)},r.prototype.yPos=function(t){return"horizontal"===this.orientation()?this.valuePos(t.value):this.dataPos(t.label)},r.prototype.enter=function(t,e){o.prototype.enter.apply(this,arguments);var i=this;this.tooltipHTML(function(t){return i.tooltipFormat({label:t.label,series:i.columns()[t.colIdx],value:t.value})})},r.prototype.updateChart=function(e,o,i,n,r,a){function s(t){switch(t){case"rectangle":return"rect";case"circle":return"circle";case"cross":return"path"}}var l=this;this._palette=this._palette["switch"](this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this._prevPointShape!==this.pointShape()&&(this.svgData.selectAll(".data").remove(),this._prevPointShape=this.pointShape());var p=this.flattenData().map(function(t){return t.shape=s(l.pointShape()),t}),c=this.svgData.selectAll(".point").data(p,function(t,e){return t.shape+"_"+e});c.enter().append("g").attr("class","point").each(function(e){var o=t.select(this);o.append("circle").attr("class","pointSelection").on("mouseout.tooltip",l.tooltip.hide).on("mousemove.tooltip",l.tooltip.show).call(l._selection.enter.bind(l._selection)).on("click",function(t,e){l.click(l.rowToObj(l.data()[t.rowIdx]),l.columns()[t.colIdx],l._selection.selected(this))}),o.append(e.shape).attr("class","pointShape")}),c.each(function(e){var o=t.select(this).select(".pointSelection");o.attr("cx",function(t){return l.xPos(t)}).attr("cy",function(t){return l.yPos(t)}).attr("r",l.pointSize());var i=t.select(this).select(".pointShape");switch(e.shape){case"rect":i.attr("x",function(t){return l.xPos(t)-l.pointSize()/2}).attr("y",function(t){return l.yPos(t)-l.pointSize()/2}).attr("width",l.pointSize()).attr("height",l.pointSize()).style("fill",function(t,e){return l._palette(l.columns()[t.colIdx])});break;case"circle":i.attr("cx",function(t){return l.xPos(t)}).attr("cy",function(t){return l.yPos(t)}).attr("r",l.pointSize()/2).style("fill",function(t,e){return l._palette(l.columns()[t.colIdx])});break;case"path":i.attr("d",function(t){return"M"+(l.xPos(t)-l.pointSize()/2)+" "+(l.yPos(t)-l.pointSize()/2)+" L"+(l.xPos(t)+l.pointSize()/2)+" "+(l.yPos(t)+l.pointSize()/2)+" M"+(l.xPos(t)-l.pointSize()/2)+" "+(l.yPos(t)+l.pointSize()/2)+" L"+(l.xPos(t)+l.pointSize()/2)+" "+(l.yPos(t)-l.pointSize()/2)}).style("stroke",function(t,e){return l._palette(l.columns()[t.colIdx])})}}),c.exit().remove();var u=this.svgData.selectAll(".area").data(this.columns().filter(function(t,e){return l.interpolate()&&l.interpolateFill()&&e>0}));u.enter().append("path").attr("class","area");var h=t.svg.area().interpolate(this.interpolate());a?h.x(function(t){return l.xPos(t)}).y0(function(t){return r}).y1(function(t){return l.yPos(t)}):h.y(function(t){return l.yPos(t)}).x0(function(t){return 0}).x1(function(t){return l.xPos(t)}),u.each(function(e,o){var i=t.select(this);i.attr("d",h(p.filter(function(t){return t.colIdx===o+1}))).style("opacity",l.interpolateFillOpacity()).style("stroke","none").style("fill",function(e,i){return t.hsl(l._palette(l.columns()[o+1])).brighter()})}),u.exit().remove();var f=this.svgData.selectAll(".line").data(this.columns().filter(function(t,e){return l.interpolate()&&e>0}));f.enter().append("path").attr("class","line");var y=t.svg.line().x(function(t){return l.xPos(t)}).y(function(t){return l.yPos(t)}).interpolate(this.interpolate());f.each(function(e,o){var i=t.select(this),n=p.filter(function(t){return t.colIdx===o+1});i.attr("d",y(n)).style("stroke",function(t,e){return l._palette(l.columns()[o+1])}).style("fill","none")}),f.exit().remove()},r.prototype.exit=function(t,o){e.prototype.exit.apply(this,arguments)},r});