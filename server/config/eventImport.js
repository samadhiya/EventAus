var request = require("request");
var Event = require('mongoose').model('Event');
module.exports = function(app){
  //delete all imported records.
  function timeOut(){
    setTimeout(function(){
      console.log('Importing events again in one hour.');
      deleteAndImportNew();
      timeOut();
    },60*60*1000);
  }
  timeOut();
  deleteAndImportNew();
}

function deleteAndImportNew(){
  Event.find({externalID: {'$ne': null }}).remove(function(err,data){
    console.log('deleting old db ',err,data);
  });
  request.get('http://api.eventfinda.com.au/v2/events.json?rows=20&point=-33.8787,151.2143&radius=5', {
    headers: {Authorization:'Basic ZXZlbnRhdXM6dGtieDNmZzV6ZjNu'}
  }, function (error, response, body, one) {
    var data = (JSON.parse(body));
    data.events.forEach(function(event){
     // var pubDate=new Date(event.datetime_start.split('T')[0] + " " + event.datetime_start.split('T')[1].split('.')[0] + ' UTC');
     // var pubDate1=new Date(event.datetime_end.split('T')[0] + " " + event.datetime_end.split('T')[1].split('.')[0] + ' UTC');
      //console.log("Event is  ",event);
      var eventLocal =new Event(event);
      eventLocal.title=event.name;
      eventLocal.venue=event.location.name;
      eventLocal.datetime_start=new Date(event.datetime_start + ' UTC');
      eventLocal.datetime_end=new Date(event.datetime_end + ' UTC');
      eventLocal.externalID=event.id;
      eventLocal.published=Date.now();
      eventLocal.image=event.images.images[0].transforms.transforms[4]?event.images.images[0].transforms.transforms[4].url : event.images.images[0].transforms.transforms[3]?event.images.images[0].transforms.transforms[3].url : event.images.images[0].transforms.transforms[2]?event.images.images[0].transforms.transforms[2].url : event.images.images[0].transforms.transforms[1]?event.images.images[0].transforms.transforms[1].url : event.images.images[0].transforms.transforms[0].url;
      eventLocal.tags= event.category.name.split(',');
      eventLocal.featured=event.is_featured;
      eventLocal.save(function(err) {
        if (err) {
          if(err){console.log("Error ",err.toString())};
        } else {
          //console.log('Event saved');
        }
      });
    });
  });
}