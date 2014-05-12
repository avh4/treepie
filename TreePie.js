/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react');
var Paths = require('./Paths');

var Arc = React.createClass({
  render: function () {
    if (this.props.start === 0 && this.props.end == 2*Math.PI && this.props.r2 === 0) {
      return <circle className={this.props.className + " arc"} cx={this.props.cx} cy={this.props.cy} r={this.props.r}/>;
    } else {
      var p = Paths.annularSector(this.props.cx, this.props.cy, this.props.r,
        this.props.r2, this.props.start, this.props.end);
      return <path className={this.props.className + " arc"} d={p}/>;
    }
  }
});

function weight(o) {
  if (typeof o === 'string') return 1;
  if (o.children) return weight(o.children) || 1;
  return o.reduce(function(memo, c) { return memo + weight(c); }, 0);
}

function mapChildren(o, f) {
  if (typeof o === 'string') return [];
  if (o.children) return o.children.map(f);
  return o.map(f);
}

var TreePie = React.createClass({
  getInitialState: function() {
    return {path: []};
  },
  doSelect: function(path, e) {
    this.setState({path: path});
  },
  render: function() {
    var cx = 0;
    var cy = 0;
    var r = 200;

    console.log(this.state.path);
    var self = this;

    function child(d, ir, start, end, path) {
      var or = ir + r;
      var tr = (ir + or)/2;
      var mid = (start + end)/2;
      var size = end - start;
      var totalWeight = weight(d);

      var _start;
      var _end = start;
      var children = mapChildren(d, function(_d, j) {
        _start = _end;
        _end = _start + size * weight(_d) / totalWeight;
        return child(_d, or, _start, _end, path.concat(j));
      });
      
      var tx = tr*Math.cos(mid);
      var ty = tr*Math.sin(mid);
      var progress;
      if (d.percent) {
        progress = <Arc className="progress" cx={cx} cy={cy} r={or} r2={ir} start={start} end={start + (end-start)*d.percent}/>;
      }

      return <g>
        {children}
        <g onClick={self.doSelect.bind(self, path)}>
          <Arc cx={cx} cy={cy} r={or} r2={ir} start={start} end={end}/>
          {progress}
          <text x={tx} y={ty}>{d.name}</text>
          <text className="score" x={tx} y={ty+50}>{d.score}</text>
        </g>
      </g>;
    }

    var root = this.props.data;
    this.state.path.forEach(function(index) {
      if (root.children) root = root.children[index];
      else root = root[index];
    });

    return <g>
        <circle className="backdrop" cx={cx} cy={cy} r={r} />
        {child(root, 0, 0, 2*Math.PI, [])}
      </g>;
  }
});

module.exports = TreePie;
