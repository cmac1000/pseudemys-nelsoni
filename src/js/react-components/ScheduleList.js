var React = require('react');
var Schedule = require('./Schedule');
var Immutable = require('Immutable');

var ScheduleList = React.createClass({
  update: function(keyPath, value) {
    var self = this;
    newData = self.state.data.setIn(keyPath, value)
    self.setState({'data': newData})
  },

  componentWillMount: function() {
    var self = this;
    self.setState({'data': Immutable.fromJS(self.props.data)})
  },

  render: function() {
      return (
        <div>
          <p>A Schedule List</p>
        </div>
      );
  }

})

module.exports = ScheduleList
