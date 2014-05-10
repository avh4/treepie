/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react');
var Paths = require('./Paths');

var Arc = React.createClass({
  render: function () {
    var p = Paths.annularSector(this.props.cx, this.props.cy, this.props.r,
      this.props.r2, this.props.start * 2 * Math.PI, this.props.end * 2 * Math.PI);
    return <path d={p}/>;
  }
});

function weight(o) {
  if (typeof o === 'string') return 1;
  if (o.children) return weight(o.children);
  return o.length;
}

function mapChildren(o, f) {
  if (typeof o === 'string') return [];
  return o.children.map(f);
}

var TreePie = React.createClass({
  render: function() {
    var cx = 0;
    var cy = 0;
    var r = 600;
    var n = 0;
    this.props.data.forEach(function(d) {
      n += weight(d);
    });
    var size = 1/n;
    var arcs = this.props.data.map(function (d, i) {
      var start = i * size;
      var end = start + size * weight(d);
      var children = mapChildren(d, function(c, j) {
        var _start = start + j * size;
        return <Arc cx={cx} cy={cy} r={r+300} r2={r} start={_start} end={_start+size} k={j}/>;
      });
      return <g>
        {children}
        <Arc cx={cx} cy={cy} r={r} r2={r/2} start={start} end={end} key={i}/>
      </g>;
    });
    return <g>
        <circle cx={cx} cy={cy} r={r} />
        {arcs}
      </g>;
  }
});

module.exports = TreePie;
