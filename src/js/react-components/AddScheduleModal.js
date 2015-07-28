var Modal = require('react-bootstrap').Modal;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Popover = require('react-bootstrap').Popover;
var Tooltip = require('react-bootstrap').Tooltip;
var Button = require('react-bootstrap').Button;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var React = require('react');
var _ = require('lodash');

var AddScheduleModal = React.createClass({

  getInitialState: function () {
    var self = this;
    if (self.props.base) {
      return {
        selectedDate: self.props.base.date_time,
        id: self.props.base.id,
        deliveries: self.props.base.deliveries,
        showModal: false
      };
    } else {
      return {
        selectedDate: null,
        id: null,
        deliveries: [],
        showModal: false
      };
    };
  },

  close: function () {
    // TODO: this modal is stateful even when being closed/reopened. Problem?
    this.setState({ showModal: false });
  },

  open: function () {
    this.setState({ showModal: true });
  },

  handleDateChange: function (event) {
    this.setState({selectedDate: event.target.value})
  },

  save: function () {
    var self = this;
    var date = new Date(parseInt(self.state.selectedDate, 10))
    if (!self.state.selectedDate) {
      console.log("TODO: validation")
      return;
    }
    var schedule = {
      deliveries: self.state.deliveries,
      date_time: date.toISOString()
    }

    if (self.props.base) {
      if ("id" in self.props.base) {
        schedule.id = self.props.base.id;
      }
    }

    self.props.success(schedule)
    this.setState({ showModal: false });
  },

  render() {
    var self = this;
    var availableTimeSlots = self._getAvailableTimeSlots();
    var dateSelect = self._getDateSelect();
    var glyph = self.props.base ? "grain" : "plus"
    var buttonText = self.props.base ? "Edit" : "Add Schedule"
    var title = self.props.base ? "Edit Schedule" : "Add Schedule"
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
          {dateSelect}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={self.close}>Cancel</Button>
            <Button onClick={self.save}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },

  _getAvailableTimeSlots: function () {
    var d = new Date();
    var year = d.getFullYear()
    var month = d.getMonth()
    var day = d.getDay()
    var hours = d.getHours()
    return _.map(_.range(24), function(offset) {
      return new Date(
        year,
        month,
        day,
        hours + offset
      );
    });
  },

  _getDateSelect: function () {
    var self = this;
    var options = _.map(self._getAvailableTimeSlots(), function(timeslot, index) {
      return (
        <option key={index} value={timeslot.getTime()}>{timeslot.toGMTString()}</option>
      )
    })

    return (
      <select value={self.state.selectedDate} onChange={self.handleDateChange}>
        <option value="">Select</option>
        {options}
      </select>
    )
  }

});

module.exports = AddScheduleModal;
