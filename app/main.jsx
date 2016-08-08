var ReactDOM = require("react-dom");
var React = require("react");
var container = document.getElementById('react-container');

var App = React.createClass({
  getInitialState: function(){
    return {
      "wahaha":458885,
    }
  },
  render: function(){
    return (
      <h1>{this.state.wahaha}</h1>
    )
  }
});
ReactDOM.render(
  <App />, container
);
