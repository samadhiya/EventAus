var auth = require('./auth'),
  users = require('../controllers/users'),
  events = require('../controllers/events'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(app){

  app.route('/api/users')
    .get(auth.requiresRole('admin'), users.getUsers)
    .post(users.createUser)
    .put(users.updateUser);

  app.route('/api/events')
    .get(events.getEvents)
    .post(events.create);


  app.route('/api/events/:id')
    .get(events.getEventsById)
    .put(auth.requiresRole('admin'), events.updateEvents)
    .delete(auth.requiresRole('admin'), events.delete)


  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res){
    req.logout();
    res.end();
  });

  app.all('/api/*', function(req, res){
    res.send(404);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};