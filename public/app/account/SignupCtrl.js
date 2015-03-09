angular.module('app').controller('SignupCtrl', function($scope, mvUser, notifier, $location, mvAuth){
  $scope.signup = function(){
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    mvAuth.createUser(newUserData).then(function(){
      notifier.notify('user account created!');
      $location.path('/');
      }, function(reason){
      notifier.error(reason);
    })

  }
});