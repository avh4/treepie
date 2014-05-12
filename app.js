/** @jsx React.DOM */

"use strict";

var React = require('react');
var TreePie = require('./TreePie');
var InputField = require('./InputField');

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
