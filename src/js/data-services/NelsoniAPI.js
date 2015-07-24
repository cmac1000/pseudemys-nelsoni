var q = require('q');
var scheduledDeliveries = require('../../data/scheduled-deliveries')
var orders = require('../../data/orders')

var NelsoniAPI = {
  getScheduledDeliveries: function() {
    return q.resolve(scheduledDeliveries)
  },
  getOrders: function() {
    return q.resolve(orders)
  }
}

module.exports = NelsoniAPI
