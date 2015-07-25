var React = require('react');

var Delivery = React.createClass({
  render: function() {
    var self = this;
    var data = self.props.data;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {data.get('order').get('turtle_quantity') + " "}
          <b>
            {data.get('order').get('turtle_type')}
          </b>
          {" to " + data.get('order').get('destination')}
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-4">
              <img src={data.get('turtleImgURL')} style={{width: "50%"}}></img>
            </div>
            <div className="col-md-4">
              {" => "}
            </div>
            <div className="col-md-4">
              <img src={data.get('moonImgURL')} style={{width: "50%"}}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = Delivery
