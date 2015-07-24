var React = require('react');
var ScheduleList = require('./react-components/ScheduleList');
var NelsoniAPI = require('./data-services/NelsoniAPI');

window.NelsoniComponents = {
  'ScheduleList': ScheduleList,
  'NelsoniAPI': NelsoniAPI
};

window.React = React;
