var React = require('react');
var Delivery = require('./Delivery');

var Schedule = React.createClass({
  render: function() {
    var self = this;
    var deliveryNodes = self.props.data.get('deliveries').map(function (delivery, index) {
      return (
        <Delivery
          key={index}
          data={delivery}
          keyPath={[index]}
          update={self.update}
        />
      )
    })
    return (
      <div className="panel panel-default">
        <div className="panel-heading">A Schedule</div>
        <div className="panel-body">
          {deliveryNodes}
        </div>
      </div>
    );
  }
})

module.exports = Schedule
