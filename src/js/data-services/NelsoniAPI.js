/*jslint node: true */
'use strict';
var q = require('q');
var schedules = require('../../data/schedules');
var orders = require('../../data/orders');

var NelsoniAPI = {
  getSchedules: function() {
    return q.resolve(schedules);
  },
  getOrders: function() {
    return q.resolve(orders);
  }
};

module.exports = NelsoniAPI;
