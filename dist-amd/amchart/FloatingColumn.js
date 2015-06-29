(function(e,t){typeof define=="function"&&define.amd?define(["d3","./CommonSerial","amcharts.serial","../api/INDChart"],t):e.amchart_FloatingColumn=t(e.d3,e.amchart_CommonSerial,e.amcharts,e.api_INDChart)})(this,function(e,t,n,r){function i(){t.call(this),this._class="amchart_FloatingColumn",this._tag="div",this._gType="column"}return i.prototype=Object.create(t.prototype),i.prototype.implements(r.prototype),i.prototype.publish("paletteID","Dark2","set","Palette ID",i.prototype._palette.switch(),{tags:["Basic","Shared"]}),i.prototype.publish("isStacked",!0,"boolean","Stacked",null,{tags:["Basic","Shared"]}),i.prototype.publish("fillOpacity",.7,"number","Opacity of The Fill Color",null,{min:0,max:1,step:.001,inputType:"range",tags:["Intermediate","Shared"]}),i.prototype.publish("paletteGrouping","By Column","set","Palette Grouping",["By Category","By Column"],{tags:["Intermediate"]}),i.prototype.publish("columnWidth",.62,"number","Bar Width",null,{tags:["Basic"]}),i.prototype.publish("Depth3D",0,"number","3D Depth (px)",null,{tags:["Basic"]}),i.prototype.publish("Angle3D",45,"number","3D Angle (Deg)",null,{tags:["Basic"]}),i.prototype.publish("stackType","regular","set","Stack Type",["none","regular","100%"],{tags:["Basic"]}),i.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]","string","Tooltip Text",null,{tags:["Intermediate"]}),i.prototype.testData=function(){return this.columns(["Subject","open","close"]),this.data([["Geography",15,35],["English",25,45],["Math",10,35],["Science",45,60]]),this},i.prototype.columns=function(e){if(!arguments.length)return this._columns;var t=this;return this._categoryField=e[0],this._openField=[],this._closeField=[],this._valueField=[],e.slice(1,e.length).forEach(function(e,n){n%2?(t._closeField.push(e),t._valueField.push(e)):t._openField.push(e)}),this._columns=e,this},i.prototype.enter=function(e,n){t.prototype.enter.apply(this,arguments)},i.prototype.updateChartOptions=function(){t.prototype.updateChartOptions.apply(this,arguments),this._chart.depth3D=this.Depth3D(),this._chart.angle=this.Angle3D(),this._chart.categoryAxis.startOnAxis=!1;var e=this;switch(this.paletteGrouping()){case"By Category":this._chart.dataProvider.forEach(function(t,n){e._chart.dataProvider[n].color=e._palette(n),e._chart.dataProvider[n].linecolor=e.lineColor()!==null?e.lineColor():e._palette(n)}),this._chart.colors=[];break;case"By Column":this._chart.colors=this._columns.filter(function(e,t){return t>0}).map(function(e){return this._palette(e)},this);break;default:this._chart.colors=this._columns.filter(function(e,t){return t>0}).map(function(e){return this._palette(e)},this)}this.buildGraphs(this._gType)},i.prototype.buildGraphs=function(e){function a(e){return this.columnWidth()&&(e.columnWidth=this.columnWidth()),this.paletteGrouping()==="By Category"&&(e.colorField="color",e.lineColorField="linecolor"),e.fillAlphas=this.fillOpacity(),e}typeof this._chart.graphs=="undefined"&&(this._chart.graphs=[]);var n=this._chart.graphs.length,r=Math.max(n,this._openField.length);for(var i=0;i<r;i++)if(typeof this._openField!="undefined"&&typeof this._openField[i]!="undefined"){var s=t.prototype.buildGraphObj.call(this,e,i),o=a.call(this,s);if(typeof this._chart.graphs[i]!="undefined")for(var u in o)this._chart.graphs[i][u]=o[u];else this._chart.addGraph(o)}else this._chart.removeGraph(this._chart.graphs[i])},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),this.updateChartOptions(),this._chart.validateNow(),this._chart.validateData()},i});