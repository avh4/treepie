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
  replaceString: function(string) {
    this.refs.textarea.getDOMNode().value = string;
    this.onChange();
  },
  doConvertToJson: function(e) {
    var string = this.refs.textarea.getDOMNode().value;
    this.replaceString(JSON.stringify(OutlineParser(string), null, 2));
  },
  doConvertToOutline: function(e) {
    if (confirm('Convert to outline MAY LOSE INFORMATION!\nOnly the name of each node and the heirarchy will be retained; all other information will be lost.  Are you sure you want to continue?') == true) {
      var string = this.refs.textarea.getDOMNode().value;
      this.replaceString(OutlineParser.reverse(JSON.parse(string)));
    }
  },
  doSaveToDropbox: function(e) {
    var string = this.refs.textarea.getDOMNode().value;
    Dropbox.save('data:text/plain,'+string, 'treepie.txt');
  },
  render: function() {
    return <div>
      <button onClick={this.doConvertToJson}>Convert to JSON</button>
      <button onClick={this.doConvertToOutline}>Convert to outline</button>
      <button onClick={this.doSaveToDropbox}>Backup to Dropbox</button>
      <textarea onChange={this.onChange} ref="textarea">{this.state.string}</textarea>
    </div>;
  }
});
