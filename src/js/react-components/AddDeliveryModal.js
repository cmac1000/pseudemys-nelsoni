/*jslint node: true */
'use strict';
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Modal = require('react-bootstrap').Modal;
var React = require('react');
var _ = require('lodash');

var AddDeliveryModal = React.createClass({

  getInitialState: function () {
    return {showModal: false};
  },

  _calculateUneditedState: function () {
    var self = this;
    if (self.props.base) {
      return {
        id: self.props.base.id,
        order: self.props.base.order
      };
    } else {
      return {
        id: null,
        order: null
      };
    }
  },

  close: function () {
    var s = this._calculateUneditedState();
    s.showModal = false;
    this.setState(s);
  },

  open: function () {
    // derive 'unedited' state fresh from props, for two reasons:
      // we don't want state hanging around in these modals between open/close
      // we don't want state from deleted components hanging around in their corresponding modals
    var s = this._calculateUneditedState();
    s.showModal = true;
    this.setState(s);
  },

  handleOrderChange: function (event) {
    var self = this;
    var orderId = event.target.value;
    var order = _.find(self.props.unscheduledOrders, function(candidate) {
      return candidate.id === orderId;
    });
    self.setState({order: order});
  },

  save: function () {
    var self = this;
    if (!self.state.order) {
      console.log('TODO: validation');
      return;
    }
    var delivery = {
      order: self.state.order
    };
    if (self.props.base) {
      if ('id' in self.props.base) {
        delivery.id = self.props.base.id;
      }
    }
    self.props.success(delivery);
    this.setState({ showModal: false });
  },

  render: function () {
    var self = this;
    var glyph = self.props.base ? 'grain' : 'plus';
    var buttonText = self.props.base ? 'Edit' : 'Add Delivery';
    var title = self.props.base ? 'Edit Delivery' : 'Add Delivery';
    var orderSelect = self._getOrderSelect();
    return (
      <div>
        <Button
          bsStyle='primary'
          onClick={self.open}
        >
          <Glyphicon glyph={glyph} />
          {buttonText}
        </Button>
        <Modal show={self.state.showModal} onHide={self.close}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {orderSelect}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={self.close}>Cancel</Button>
            <Button onClick={self.save}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },

  _getOrderSelect: function () {
    var self = this;
    var options = _.map(self.props.unscheduledOrders, function(order, index) {
      var optionString = order.turtle_quantity +
        ' ' +
        order.turtle_type +
        ' to ' +
        order.destination;
      return (
        <option key={index} value={order.id}>{optionString}</option>
      );
    });
    if (self.state) {
      var selectValue = self.state.order ? self.state.order.id : '';

      return (
        <select value={selectValue} onChange={self.handleOrderChange}>
          <option value=''>Select</option>
          {options}
        </select>
      );
    } else {
      return null;
    }
  }
});

module.exports = AddDeliveryModal;
