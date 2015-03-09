var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  title: {type:String, required: '{PATH} is required'},
  featured: {type: Boolean, required: '{PATH} is required'},
  published: {type: Date, required: '{PATH} is required'},
  tags: [String],
  venue: {type:String, required: '{PATH} is required'}
});

var Event = mongoose.model('Event', eventSchema);

function createDefaultEvents() {
  Event.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Event.create({title: 'Broadway Unplugged', featured: true, published: new Date('3/16/2015'), tags: ['Open Mic', 'Jams'], venue: 'The Vanguard, Sydney'});
      Event.create({title: 'Mudfest st Bunnamagoo Winery', featured: true, published: new Date('3/16/2015'), tags: ['Lifestyle Shows', 'Expo'], venue: '603 Henry Lawson Drive, Mudgee'});
      Event.create({title: "St Patrick's Day", featured: false, published: new Date('3/16/2015'), tags: ['Lifestyle Shows', 'Expo'], venue: 'Town Hall, Gerringong'});
      Event.create({title: 'Binda Picnic Races', featured: false, published: new Date('3/16/2015'), tags: ['Sports'], venue: 'Funny Hill Race Track, Binda'});
      Event.create({title: "St Patrick's Day Irish Dancing", featured: true, published: new Date('3/16/2015'), tags: ['Lifestyle Shows', 'Expo'], venue: '100 Kerr St, Ballina'});
      Event.create({title: 'Sydney Opera House Goes Green', featured: true, published: new Date('3/17/2015'), tags: ['Lifestyle Shows', 'Expo'], venue: 'Sydney Opera House, Sydney'});
      Event.create({title: 'Future Submarine', featured: true, published: new Date('3/17/2015'), tags: ['Education'], venue: "Sydney Mechanics School of Art"});
      Event.create({title: 'The 7 Sopranos Tour', featured: true, published: new Date('3/18/2015'), tags: ['Acoustic', 'Instrumental'], venue: 'Armidale Counsil, Armidale'});
      Event.create({title: 'Delta Jazz', featured: true, published: new Date('3/18/2015'), tags: ['Jazz'], venue: 'Lane Cove Club, Sydney'});
      Event.create({title: 'Festival of Small Halls', featured: false, published: new Date('3/19/2015'), tags: ['Festival'], venue: 'The Rand School of Arts, Rand'});
      Event.create({title: 'Art Aquarium', featured: false, published: new Date('3/19/2015'), tags: ['Children', 'Kids', 'Holiday'], venue: 'SEA LIFE Sydney Aquarium'});
      Event.create({title: "Les Misèrables", featured: true, published: new Date('3/19/2015'), tags: ['Theatre'], venue: 'Capitol Theatre, Sydney'});
      Event.create({title: 'Street Foods of Saigon', featured: false, published: new Date('3/20/2015'), tags: ['Education'], venue: 'Otao Kitchen, Richmond'});
      Event.create({title: "Life's A Beach", featured: true, published: new Date('3/21/2015'), tags: ['Charity', 'Fundraisers'], venue: 'Bondi Pavilian, Sydney'});
      Event.create({title: 'Seascapes and Pictures', featured: true, published: new Date('3/21/2015'), tags: ['Acoustic', 'Instrumental'], venue: 'Strathfield Town Hall, Sydney'});
    }
  })
}

exports.createDefaultEvents = createDefaultEvents;