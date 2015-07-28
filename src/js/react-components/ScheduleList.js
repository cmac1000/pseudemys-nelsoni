var React = require('react');
var Schedule = require('./Schedule');
var Immutable = require('Immutable');
var AddScheduleModal = require('./AddScheduleModal')

var ScheduleList = React.createClass({
  update: function(keyPath, value) {
    var self = this;
    newData = self.state.data.setIn(keyPath, value)
    // NOTE: could keep old states around for undo/redo
    self.setState({'data': newData})
  },

  componentWillMount: function() {
    var self = this;
    self.setState({'data': Immutable.fromJS(self.props.data)});
  },

  render: function() {
      var self = this;
      var schedules = self.state.data.get('schedules');
      var scheduleNodes = schedules.map(function(schedule, index) {
        var remove = function () {
          var tgtIndex = index;
          self.update(
            // keypath
            ['schedules'],
            // filtered list of schedules
            self.state.data.get('schedules').filter(function(schedule, i) {
              return tgtIndex != i;
            })
          )
        };
        return (
          <Schedule
            key={index}
            data={schedule}
            keyPath={['schedules', index]}
            update={self.update}
            remove={remove}
          />
        )
      })
      var success = function (state) {
        console.log('success!')
      }
      var modal = (
        <AddScheduleModal
          base={null}
          success={success}
        />
      );
      return (
        <div className="container">
          <h2>Scheduled Deliveries</h2>
          {scheduleNodes}
          {modal}
        </div>
      );
  }
})

module.exports = ScheduleList
