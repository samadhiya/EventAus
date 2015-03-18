angular.module('app').controller('adminEventListCtrl', function($scope, $q, mvEvent, $routeParams, notifier, mvCachedEvents, $location){
  mvEvent.query().$promise.then(function(collection){
    collection.forEach(function(event){
      if(event._id ===$routeParams.id){
        $scope.event = event;
        $scope.published = new Date(event.published);

      }
    })
  });

  $scope.update = function(){
    $scope.event.published = new Date($scope.published);
    $scope.event.$update(function(){
      notifier.notify('Event updated!');
      mvCachedEvents.refresh();
      $location.path('/events');
      }, function(errorResponse){
      notifier.error(errorResponse.data.message);
    });
  };

  $scope.deleteEvent = function(event){
    event.$remove(function() {
      notifier.notify('Event Deleted!');
      mvCachedEvents.refresh();
      $location.path('/events');
    }, function(errorResponse){
      notifier.error(errorResponse.data.message);
    });
  };
});