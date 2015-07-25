var q = require('q');
var schedules = require('../../data/schedules')
var orders = require('../../data/orders')
var imageUrls = require('../../data/image_urls')

var NelsoniAPI = {
  getSchedules: function() {
    return q.resolve(
      schedules.map(function(schedule) {
        schedule.deliveries = schedule.deliveries.map(function (delivery) {
          if(!imageUrls[delivery['order']['destination']]) {
            throw new Error('unknown destination')
          }
          if(!imageUrls[delivery['order']['turtle_type']]) {
            throw new Error('unknown turtle type')
          }
          delivery.moonImgURL = imageUrls[delivery['order']['destination']];
          delivery.turtleImgURL = imageUrls[delivery['order']['turtle_type']];
          return delivery;
        })
        return schedule;
      })
    );
  },
  getOrders: function() {
    return q.resolve(orders);
  }
}

module.exports = NelsoniAPI;
