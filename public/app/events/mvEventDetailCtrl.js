angular.module('app').controller('mvEventDetailCtrl', function($scope, mvCachedEvents, $routeParams){
  mvCachedEvents.query().$promise.then(function(collection){
    collection.forEach(function(event){

      if(event._id ===$routeParams.id){
        $scope.event = event;

      }

    })
  })
});