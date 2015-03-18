angular.module('app').controller('mvEventAddCtrl', function($scope, mvEvent, mvCachedEvents, $location){
  $scope.add=function(){
    var event = new mvEvent({
      "featured" :this.featured,
      "published" :new Date(this.published),
      "tags" :this.tags.split(','),
      "title" :this.title,
      "venue" :this.venue
    });
    // Redirect after save
    event.$save(function(response) {
      mvCachedEvents.refresh();
      $location.path('/events');

      // Clear form fields
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  }
});