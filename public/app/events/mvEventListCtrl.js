angular.module('app').controller('mvEventListCtrl', function($scope, mvCachedEvents, identity){
  $scope.events = mvCachedEvents.query();
  $scope.identity = identity;

  $scope.sortOptions = [{value: "title", text:"Sort by Title"},
    {value: "published", text:"Sort by Publish Date"}];

  $scope.sortOrder = $scope.sortOptions[0].value;

});