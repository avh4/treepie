/** @jsx React.DOM */

"use strict";

var React = require('react');
var TreePie = require('./TreePie');
var OutlineParser = require('./OutlineParser');

var InputField = React.createClass({
  getInitialState: function() {
    return {string: 'Body\nMind\nSoul\n A\n B\n C'};
  },
  onChange: function(e) {
    var string = this.refs.textarea.getDOMNode().value;
    this.props.onChange(OutlineParser(string));
  },
  render: function() {
    return <textarea onChange={this.onChange} ref="textarea">{this.state.string}</textarea>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {tasks: [
      'Body', 'Mind',
      { name:'Soul', children: ['A', 'B', 'C'] }
    ]};
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
