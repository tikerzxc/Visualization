(function(e,t){typeof define=="function"&&define.amd?define(["d3","./CommonSerial","amcharts.serial","../api/INDChart","css!./Area"],t):e.amchart_Area=t(e.d3,e.amchart_CommonSerial,e.amcharts,e.api_INDChart)})(this,function(e,t,n,r){function i(){t.call(this),this._class="amchart_Area",this._tag="div",this._gType="line"}return i.prototype=Object.create(t.prototype),i.prototype.implements(r.prototype),i.prototype.publish("paletteID","default","set","Palette ID",i.prototype._palette.switch(),{tags:["Basic","Shared"]}),i.prototype.publish("isStacked",!1,"boolean","Stack Chart",null,{tags:["Basic","Shared"]}),i.prototype.publish("fillOpacity",.7,"number","Opacity of The Fill Color",null,{min:0,max:1,step:.001,inputType:"range",tags:["Intermediate","Shared"]}),i.prototype.publish("tooltipTemplate","[[category]]: [[value]]","string","Tooltip Text",null,{tags:["Intermediate"]}),i.prototype.publish("stackType","regular","set","Stack Type",["none","regular","100%"],{tags:["Basic"]}),i.prototype.enter=function(e,n){t.prototype.enter.apply(this,arguments)},i.prototype.updateChartOptions=function(){return t.prototype.updateChartOptions.apply(this,arguments),this._chart.colors=this._columns.filter(function(e,t){return t>0}).map(function(e){return this._palette(e)},this),this.isStacked()?this._chart.valueAxes[0].stackType=this.stackType():this._chart.valueAxes[0].stackType="none",this.buildGraphs(this._gType),this._chart},i.prototype.buildGraphs=function(e){function a(e){return e.fillAlphas=this.fillOpacity(),e}typeof this._chart.graphs=="undefined"&&(this._chart.graphs=[]);var n=this._chart.graphs.length,r=Math.max(n,this._valueField.length);for(var i=0;i<r;i++)if(typeof this._valueField!="undefined"&&typeof this._valueField[i]!="undefined"){var s=t.prototype.buildGraphObj.call(this,e,i),o=a.call(this,s);if(typeof this._chart.graphs[i]!="undefined")for(var u in o)this._chart.graphs[i][u]=o[u];else this._chart.addGraph(o)}else this._chart.removeGraph(this._chart.graphs[i])},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),this.updateChartOptions(),this._chart.validateNow(),this._chart.validateData()},i});