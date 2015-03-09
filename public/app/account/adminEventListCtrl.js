angular.module('app').controller('adminEventListCtrl', function($scope, $q, mvCachedEvents, $routeParams, mvEvent, notifier){
  mvCachedEvents.query().$promise.then(function(collection){
    collection.forEach(function(event){
      if(event._id ===$routeParams.id){
        //$scope.title = event.title;
        $scope.event = event;
        //$scope.featured = event.featured;
        $scope.published = new Date(event.published);
        //$scope.tags = event.tags;
      }
    })
  });

  $scope.update = function(){
    var deferred = $q.defer();
    var newEventData = {
      title: $scope.title,
      featured: $scope.featured,
      published: new Date($scope.published),
      tags: $scope.tags
    };
    mvEvent.$update(newEventData).then(function(){
      notifier.notify('Your account details have been updated');
    }, function(reason){
      notifier.error(reason);
    })
  }
});