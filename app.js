/** @jsx React.DOM */

"use strict";

var React = require('react');
var TreePie = require('./TreePie');

var tasks = [
'Body', 'Mind', 'Soul'
];

React.renderComponent(
	<svg xmlns="http://www.w3.org/2000/svg" version = "1.1" viewBox="-1000 -1000 2000 2000">
	  <TreePie data={tasks} />
	</svg>,
	document.body);
