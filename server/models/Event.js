var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  title: {type:String, required: '{PATH} is required'},
  featured: {type: Boolean, required: '{PATH} is required'},
  published: {type: Date, default:new Date()},
  tags: [String],
  description: {type:String, required: '{PATH} is required'},
  datetime_start:{type:Date},
  datetime_end:{type:Date},
  image: {type:String},
  venue: {type:String, required: '{PATH} is required'},
  externalID:{type:String},
  location_summary:{type:String},
  address:{type:String},
  is_free	:{type: Boolean},
  is_cancelled	:{type: Boolean},
  restrictions:{type:String},
  point:{},
  timezone:{type:String},
  datetime_summary:{type:String},
  location:{},
  category:{},
  sessions:{},
  ticket_types:{},
  artists:{},
  web_sites:{}
});

var Event = mongoose.model('Event', eventSchema);

