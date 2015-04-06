angular.module('app').controller('eventUpdateCtrl', function($scope, $q, mvEvent, $routeParams, notifier, mvCachedEvents, $location){
  mvEvent.query().$promise.then(function(collection){
    collection.forEach(function(event){
      if(event._id ===$routeParams.id){
        $scope.event = event;
        $scope.published = new Date(event.published);
        $scope.datetime_start = new Date(event.datetime_start.split('T')[0] + ' ' + event.datetime_start.split('T')[1].replace('Z', ''));
        $scope.datetime_end = new Date(event.datetime_end.split('T')[0] + ' ' + event.datetime_end.split('T')[1].replace('Z', ''));

      }
    })
  });

  $scope.update = function(){
    $scope.event.published = new Date($scope.published);
    $scope.event.datetime_start = new Date($scope.datetime_start + ' UTC');
    $scope.event.datetime_end = new Date($scope.datetime_end + ' UTC');
    //$scope.event.tags = $scope.event.tags.split(',');
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