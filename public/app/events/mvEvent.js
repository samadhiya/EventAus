angular.module('app').factory('mvEvent',
  function($resource){
  return $resource('/api/events/:id', {id:'@_id'}, {
    update: {method: 'PUT'}});

}
);