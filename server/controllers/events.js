var Event = require('mongoose').model('Event');
var _ = require('lodash');
var uuid = require('uuid');
var fs = require('fs');

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
  var file = req.files.file;
  var contentType = file.mimetype;
  var tmpPath = file.path;
  //var extIndex = tmpPath.lastIndexOf('.');
  var extension =file.extension;
  // uuid is for generating unique filenames.
  var fileName = uuid.v4() +'.'+extension;
  var destPath = './public/uploads/' +fileName;

  // Server side file type checker.
  if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
    fs.unlink(tmpPath);
    return res.status(400).send('Unsupported file type.');
  }

  fs.rename(tmpPath, destPath, function(err) {
    if (err) {
      return res.status(400).send('Image is not saved:');
    }
    console.log('req.body.published', req.body.datetime_start);
    var pubDate=new Date(req.body.datetime_start.split('T')[0] + " " + req.body.datetime_start.split('T')[1].split('.')[0] + ' UTC');
    var pubDate1=new Date(req.body.datetime_end.split('T')[0] + " " + req.body.datetime_end.split('T')[1].split('.')[0] + ' UTC');
    var event =new Event({
      "featured" :req.body.featured,
      "datetime_start": pubDate,
      "datetime_end": pubDate1,
      "tags" :req.body.tags.split(','),
      "address" :req.body.address,
      "title" :req.body.title,
      "venue" :req.body.venue,
      "description" :req.body.description,
      "image":'uploads/'+fileName
    });

    event.save(function(err) {
      if (err) {
        if(err){res.status(400); return res.send({reason:err.toString()})}
      } else {
        res.json(event);
      }
    });
  });
};


