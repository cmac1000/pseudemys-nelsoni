var React = require('react');
var Delivery = require('./Delivery');
var AddScheduleModal = require('./AddScheduleModal');

var Schedule = React.createClass({
  render: function() {
    var self = this;
    var deliveryNodes = self.props.data.get('deliveries').map(function (delivery, index) {
      var deliveryKeyPath = self.props.keyPath.concat(['deliveries', index]);
      var remove = function () {
        var tgtIndex = index;
        self.props.update(
          // keypath
          self.props.keyPath.concat(['deliveries']),
          // filtered list of deliveries
          self.props.data.get('deliveries').filter(function(delivery, i) {
            return tgtIndex != i;
          })
        )
      }
      // NOTE: could I implement a generic deletion mechanism with the keypath? Maybe.
      return (
        <Delivery
          key={index}
          data={delivery}
          keyPath={deliveryKeyPath}
          update={self.update}
          remove={remove}
        />
      )
    })
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {self.props.data.get('date_time')}
          <button onClick={self._delete} type="button" className="btn btn-default">Delete</button>
          <AddScheduleModal
            base={self.props.data.toJSON()}
            success={self._edit}
          />
        </div>
        <div className="panel-body">
          {deliveryNodes}
        </div>
        <button onClick={self._addDelivery} type="button" className="btn btn-default">Add Delivery</button>
      </div>
    );
  },
  _addDelivery: function() {
    console.log('add delivery');
  },
  _delete: function() {
    var self = this;
    self.props.remove();
  },
  _edit: function(schedule) {
    console.log('edit schedule');
  }
})

module.exports = Schedule
