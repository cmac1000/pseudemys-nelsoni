var q = require('q');
var schedules = require('../../data/schedules');
var orders = require('../../data/orders');
var imageUrls = require('../../data/image_urls');

var NelsoniAPI = {
  getSchedules: function() {
    return q.resolve(schedules);
  },
  getOrders: function() {
    return q.resolve(orders);
  }
};

module.exports = NelsoniAPI;
