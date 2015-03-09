angular.module('app').controller('mainCtrl', function($scope, mvCachedEvents) {
  $scope.events = mvCachedEvents.query();
});