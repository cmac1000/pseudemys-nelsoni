/*jslint node: true */
'use strict';
var React = require('react');
var Delivery = require('./Delivery');
var AddScheduleModal = require('./AddScheduleModal');
var AddDeliveryModal = require('./AddDeliveryModal');
var Immutable = require('Immutable');

var Schedule = React.createClass({

  render: function() {
    var self = this;
    var deliveryNodes = self.props.data.get('deliveries').map(function (delivery, index) {
      var deliveryKeyPath = self.props.keyPath.concat(['deliveries', index]);
      // NOTE: could I implement a generic deletion mechanism with the keypath? Maybe.
      var remove = function () {
        var tgtIndex = index;
        self.props.update(
          // keypath
          self.props.keyPath.concat(['deliveries']),
          // filtered list of deliveries
          self.props.data.get('deliveries').filter(function(candidate, i) {
            return tgtIndex !== i;
          })
        );
      };
      return (
        <Delivery
          key={index}
          data={delivery}
          keyPath={deliveryKeyPath}
          update={self.props.update}
          remove={remove}
          unscheduledOrders={self.props.unscheduledOrders}
        />
      );
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-10">
              <h3>{self.props.data.get('date_time')}</h3>
            </div>
            <div className="col-xs-2">
              <AddScheduleModal
                base={self.props.data.toJSON()}
                success={self._edit}
              />
              <button onClick={self._delete} type="button" className="btn btn-default">Delete</button>
            </div>
          </div>

        </div>
        <div className="panel-body">
          {deliveryNodes}
        </div>
        <AddDeliveryModal
          base={null}
          success={self._addDelivery}
          unscheduledOrders={self.props.unscheduledOrders}
        />
      </div>
    );
  },

  _addDelivery: function(delivery) {
    var self = this;
    var deliveries = self.props.data.get('deliveries').toJS();
    // todo ordering
    deliveries.push(delivery);
    self.props.update(self.props.keyPath.concat(['deliveries']), Immutable.fromJS(deliveries));
  },

  _delete: function() {
    this.props.remove();
  },

  _edit: function(schedule) {
    var self = this;
    self.props.update(self.props.keyPath, Immutable.fromJS(schedule));
  }
});

module.exports = Schedule;
