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
    self.setState({'data': Immutable.fromJS(self.props.data)});
  },

  render: function() {
      var self = this;
      var schedules = self.state.data;
      var scheduleNodes = schedules.map(function(schedule, index) {
        return (
          <Schedule
            key={index}
            data={schedule}
            keyPath={[index]}
            update={self.update}
          />
        )
      })
      return (
        <div className="container">
          <h2>Scheduled Deliveries</h2>
          {scheduleNodes}
        </div>
      );
  }

})

module.exports = ScheduleList
