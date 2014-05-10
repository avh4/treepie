/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react');
var Paths = require('./Paths');

var Arc = React.createClass({
  render: function () {
    var p = Paths.annularSector(this.props.cx, this.props.cy, this.props.r,
      this.props.r * 0.5, this.props.start * 2 * Math.PI, this.props.end * 2 * Math.PI);
    return <path d={p}/>;
	}
});

var TreePie = React.createClass({
  render: function() {
		var cx = 0;
		var cy = 0;
		var r = 600;
		var n = this.props.data.length;
		var size = 1/n;
    var arcs = this.props.data.map(function (d, i) {
      var start = i * size;
      return <Arc cx={cx} cy={cy} r={r} start={start} end={start + size} key={i}/>
    });
    return <g>
        <circle cx={cx} cy={cy} r={r} />
        {arcs}
      </g>;
  }
});

module.exports = TreePie;
