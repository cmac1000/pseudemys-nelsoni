var Modal = require('react-bootstrap').Modal;
var Popover = require('react-bootstrap').Popover;
var Tooltip = require('react-bootstrap').Tooltip;
var Button = require('react-bootstrap').Button;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var React = require('react');

var AddScheduleModal = React.createClass({

  getInitialState(){
    return {
      selectedDateTime: "2015-07-22T10:00:00.000Z",
      showModal: false
    };
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },

  handleDatetimeChange: function (event) {
    this.setState({selectedDateTime: event.target.value})
  },

  render() {
    var self = this;
    return (
      <div>
        <Button
          bsStyle='primary'
          onClick={self.open}
        >
          Add Schedule
        </Button>

        <Modal show={self.state.showModal} onHide={self.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={self.state.selectedDateTime} onChange={self.handleDatetimeChange}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={self.close}>Cancel</Button>
            <Button onClick={self.props.success}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = AddScheduleModal;
