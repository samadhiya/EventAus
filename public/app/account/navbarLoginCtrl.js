angular.module('app').controller('navbarLoginCtrl', function($scope, $http, identity, notifier, mvAuth, $location){
  $scope.identity = identity;
  $scope.signin = function(username, password){
    mvAuth.authenticateUser(username, password).then(function(success){
      if(success){
        notifier.notify("You've successfully logged in!");
      }
      else{
        notifier.notify('Login failed, please try again');
      }
    });
  };
  $scope.signout = function() {
    mvAuth.logoutUser().then(function () {
      $scope.username = "";
      $scope.password = "";
      notifier.notify("You have successfully logged out");
      $location.path('/');
    })
  };
});