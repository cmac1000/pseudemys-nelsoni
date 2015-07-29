/*jslint node: true */
'use strict';
var React = require('react');
var AddDeliveryModal = require('./AddDeliveryModal');
var Immutable = require('Immutable');

var Delivery = React.createClass({
  render: function() {
    var self = this;
    var data = self.props.data;
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='row'>
            <div className='col-xs-10'>
              {data.get('order').get('turtle_quantity') + ' '}
              <b>
                {data.get('order').get('turtle_type')}
              </b>
              {' to ' + data.get('order').get('destination')}
            </div>
            <div className='col-xs-2'>
              <AddDeliveryModal
                base={self.props.data.toJSON()}
                success={self._edit}
                unscheduledOrders={self.props.unscheduledOrders}
              />
              <button onClick={self._delete} type='button' className='btn btn-default'>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _delete: function () {
    this.props.remove();
  },

  _edit: function (delivery) {
    var self = this;
    self.props.update(self.props.keyPath, Immutable.fromJS(delivery));
  }
});

module.exports = Delivery;
