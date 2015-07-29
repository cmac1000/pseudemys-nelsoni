/*jslint node: true */
'use strict';
var React = require('react');
var Schedule = require('./Schedule');
var Immutable = require('Immutable');
var AddScheduleModal = require('./AddScheduleModal');
var _ = require('lodash');

var ScheduleList = React.createClass({
  update: function(keyPath, value) {
    var self = this;
    var newData = self.state.data.setIn(keyPath, value);
    // NOTE: could keep old states around for undo/redo
    self.setState({'data': newData});
  },

  componentWillMount: function() {
    var self = this;
    self.setState({'data': Immutable.fromJS(self.props.data)});
  },

  render: function() {
      var self = this;
      var scheduleNodes = self._getScheduleNodes();
      return (
        <div className="container">
          <h2>Scheduled Deliveries</h2>
          {scheduleNodes}
          <AddScheduleModal
            base={null}
            success={self.addSchedule}
          />
        </div>
      );
  },

  addSchedule: function (schedule) {
    var self = this;
    var schedules = self.state.data.get('schedules').toJS();
    // todo ordering
    schedules.push(schedule);
    self.update(['schedules'], Immutable.fromJS(schedules));
  },

  _calculateUnscheduledOrders: function () {
    var self = this;
    var allOrders = self.state.data.get('orders').toJSON();
    var scheduledOrders = _.flatten(
      self.state.data.get('schedules').map(function (schedule) {
        return schedule.get('deliveries').map(function (delivery) {
          return delivery.get('order');
        });
      }).toJSON()
    );
    return _.filter(
      allOrders,
      function (order) {
        return _.every(scheduledOrders, function (scheduledOrder) {
          return !_.isEqual(order, scheduledOrder);
        });
      }
    );
  },

  _getScheduleNodes: function () {
    var self = this;
    var schedules = self.state.data.get('schedules');
    var unscheduledOrders = self._calculateUnscheduledOrders();
    return schedules.map(function(schedule, index) {
      var remove = function () {
        var tgtIndex = index;
        self.update(
          // keypath
          ['schedules'],
          // filtered list of schedules
          self.state.data.get('schedules').filter(function(candidate, i) {
            return tgtIndex !== i;
          })
        );
      };
      return (
        <Schedule
          key={index}
          data={schedule}
          keyPath={['schedules', index]}
          update={self.update}
          remove={remove}
          unscheduledOrders={unscheduledOrders}
        />
      );
    });
  }
});
module.exports = ScheduleList;
