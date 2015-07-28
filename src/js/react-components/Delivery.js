var React = require('react');
var AddDeliveryModal = require('./AddDeliveryModal');

var Delivery = React.createClass({
  render: function() {
    var self = this;
    var data = self.props.data;
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-10">
              {data.get('order').get('turtle_quantity') + " "}
              <b>
                {data.get('order').get('turtle_type')}
              </b>
              {" to " + data.get('order').get('destination')}
            </div>
            <div className="col-xs-2">
              <AddDeliveryModal
                base={self.props.data.toJSON()}
                success={self._edit}
              />
              <button onClick={self._delete} type="button" className="btn btn-default">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  _delete: function () {
    this.props.remove();
  },
  _edit: function () {
    console.log('edit me')
  }
})

module.exports = Delivery;
