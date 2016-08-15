var ReactDOM = require("react-dom");
var React = require("react");
var addons = require("react-addons");
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var hashHistory = require('react-router').hashHistory

require("./style/reset.css");
require("./style/main.less");
require("./util/util.js")


var App = require("./component/app.jsx");
var Center = require("./component/center.jsx");
// ReactDOM.initializeTouchEvents(true);
// require("zepto");
// require("./vendor/zepto.js");
var container = document.getElementById('react-container');
console.log(hashHistory);
ReactDOM.render(
  (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="center" component={Center}/>
    <Route path="*" component={App}/>
  </Router>
	)
  , container
);


