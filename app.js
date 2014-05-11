/** @jsx React.DOM */

"use strict";

var React = require('react');
var TreePie = require('./TreePie');
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

var InputField = React.createClass({
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

var App = React.createClass({
  getInitialState: function() {
    return {tasks: []};
  },
  
  onInputChange: function(newTasks) {
    this.setState({tasks: newTasks});
  },
  
  render: function() {
    return <div>
      <InputField onChange={this.onInputChange}/>
      <svg xmlns="http://www.w3.org/2000/svg" version = "1.1" viewBox="-1000 -1000 2000 2000">
        <TreePie data={this.state.tasks} />
      </svg>
    </div>;
  }
})

React.renderComponent(<App/>, document.body);
