angular.module('app').factory('mvEvent', function($resource){
  return $resource('/api/events/:id', {_id:'@id'}, {update: {method: 'PUT', isArray: false}});

});