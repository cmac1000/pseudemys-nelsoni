var Modal = require('react-bootstrap').Modal;
var React = require('react');

var AddDeliveryModal = React.createClass({

  getInitialState: function () {
    return {
      "turtleType": "",
      "turtleQuantity": "",
      "destination": ""
    }
  },

  handleTurtleTypeChange: function (event) {
    this.setState({"turtleType": event.target.value})
  },

  handleTurtleQuantityChange: function (event) {
    this.setState({"turtleQuantity": event.target.value})
  },

  handleDestinationChange: function (event) {
    this.setState({"destination": event.target.value})
  },

  handleSuccess: function () {
    if (this.state.itemMap) {
      this.props.handleSuccess(this.state.itemMap);
      this.props.onRequestHide()
    }
  },

  render: function() {
    var self = this;
    return (
        <Modal {...this.props} bsStyle="primary" title="Add Delivery" animation={false}>
          <div className="modal-body">
            <div className="row">
              ("TODO")
            </div>
          </div>
          <div className="modal-footer">
            <Button bsStyle="success" onClick={self.handleSuccess}>Add</Button>
          </div>
        </Modal>
      );
  }
});

module.exports = AddDeliveryModal
