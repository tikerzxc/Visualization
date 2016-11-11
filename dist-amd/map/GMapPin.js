!function(t,o){"function"==typeof define&&define.amd?define(["d3","./GMapLayered","./Pins"],o):t.map_GMapPin=o(t.d3,t.map_GMapLayered,t.map_Pins)}(this,function(t,o,i){function p(t){o.call(this);var p=this;this._pins=(new i).columns(["lat","long","ext"]).on("click",function(t,o,i){p.click(p.rowToObj(t.ext.origRow),"",i)}).on("dblclick",function(t,o,i){p.dblclick(p.rowToObj(t.ext.origRow),"",i)})}return p.prototype=Object.create(o.prototype),p.prototype.constructor=p,p.prototype._class+=" map_GMapPin",p.prototype.publishProxy("pinColor","_pins","fillColor"),p.prototype.publishProxy("pinType","_pins","pinType"),p.prototype.publishProxy("pinWidth","_pins","pinWidth"),p.prototype.publishProxy("pinHeight","_pins","pinHeight"),p.prototype.publishProxy("cornerRadius","_pins","cornerRadius"),p.prototype.publishProxy("pinRadius","_pins","pinRadius"),p.prototype.publishProxy("arrowWidth","_pins","arrowWidth"),p.prototype.publishProxy("arrowHeight","_pins","arrowHeight"),p.prototype.publishProxy("textBaseline","_pins","textBaseline"),p.prototype.publishProxy("strokeWidth","_pins","strokeWidth"),p.prototype.publish("latitudeColumn",null,"set","Latitude",function(){return this.columns()},{optional:!0}),p.prototype.publish("longtitudeColumn",null,"set","Longtitude",function(){return this.columns()},{optional:!0}),p.prototype.publish("colorColumn",null,"set","Color",function(){return this.columns()},{optional:!0}),p.prototype.publish("tooltipColumn",null,"set","Tooltip",function(){return this.columns()},{optional:!0}),p.prototype.pinsData=function(){var t=this.columns();return this._view=this._db.rollupView([this.latitudeColumn(),this.longtitudeColumn()]),this._view.entries().map(function(o){var i=o.values[0].values[0];return[o.key,o.values[0].key,{fillColor:i[t.indexOf(this.colorColumn())],tooltip:i[t.indexOf(this.tooltipColumn())],origRow:i}]},this)},p.prototype.enter=function(t,i){o.prototype.enter.apply(this,arguments),this.layers([this._pins])},p.prototype.update=function(t,i){o.prototype.update.apply(this,arguments),this._pins.data(this.pinsData())},p.prototype.exit=function(t,i){o.prototype.exit.apply(this,arguments)},p.prototype.click=function(t,o,i){console.log("Click:  "+JSON.stringify(t)+", "+o+","+i)},p.prototype.dblclick=function(t,o,i){console.log("Double click:  "+JSON.stringify(t)+", "+o+","+i)},p});