var Event = require('mongoose').model('Event');

exports.getEvents = function(req, res){
  Event.find({}).exec(function(err, collection){
    res.send(collection);
  })
};

exports.getEventsById = function(req, res){
  Event.findOne({_id:req.params.id}).exec(function(err, event){
    res.send(event);
  })
};

exports.updateEvents = function(req, res){
  var eventUpdates = req.body;

  req.event.title = eventUpdates.title;
  req.event.featured = eventUpdates.featured;
  req.event.published = eventUpdates.published;
  req.event.tags = eventUpdates.tags;

  req.event.save(function(err){
    if(err){res.status(400); return res.send({reason:err.toString()})}
    res.send(req.event);
  })

};