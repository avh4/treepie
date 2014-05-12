/** @jsx React.DOM */

"use strict";

var React = require('react');
var OutlineParser = require('./OutlineParser');

function format(string) {
  try {
    return JSON.stringify(JSON.parse(string), null, 2);
  } catch(e) {
    return string;
  }
}

function parse(string) {
  if (string[0] === '[') {
    try {
      return JSON.parse(string);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  } else {
    return OutlineParser(string);
  }
}

module.exports = React.createClass({
  sendData: function(string) {
    var parsed = parse(string);
    if (parsed) this.props.onChange(parsed);
  },
  getInitialState: function() {
    var string = localStorage.treepieDemo || 'Body\nMind\nSoul\n A\n B\n C';
    string = format(string);
    return {string: string};
  },
  componentDidMount: function() {
    this.sendData(this.state.string);
  },
  onChange: function(e) {
    var string = this.refs.textarea.getDOMNode().value;
    localStorage.treepieDemo = string;
    this.sendData(string);
  },
  render: function() {
    return <textarea onChange={this.onChange} ref="textarea">{this.state.string}</textarea>;
  }
});
