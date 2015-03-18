var Event = require('mongoose').model('Event');
var _ = require('lodash');

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



exports.updateEvents = function(req, res) {
  Event.findOne({_id: req.params.id}).exec(function (err, event) {
    if (err) {
      return res.status(400).send({
        message: err.toString()
      });
    }
    if (!event) {
      return res.status(400).send({
        message: "Event not found"
      });
    }
    else {
      event = _.extend(event, req.body);
      event.save(function (err) {
        if (err) {
          res.status(400);
          return res.send({reason: err.toString()})
        }
        res.send(req.event);
      })
    }
  });
};

exports.delete=function(req,res){

  Event.findOne({_id:req.params.id}).exec(function(err, event){
    if(err)
      return res.status(400).send({
        message:err.toString()
      });

    if(!event){
      return res.status(400).send({
        message:"Event not found"
      });
    }
    else
    {
      event.remove(function(err) {
        if (err) {
          return res.status(400).send({
            message:err.toString()
          });
        } else {
          res.json(event);
        }
      });
    }
  });
};

exports.create=function(req,res){
  var event = new Event(req.body);
  event.save(function(err) {
    if (err) {
      res.status(400);
      return res.send({reason:err.toString()})
    } else {
      res.jsonp(event);
    }
  });
}