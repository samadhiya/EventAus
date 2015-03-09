var mongoose = require('mongoose');
var userModel = require('../models/User');
var eventModel = require('../models/Event');

module.exports = function(config){
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('eventAus db opened');
  });

  userModel.createDefaultUsers();
  eventModel.createDefaultEvents();

};

