angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, identity, notifier){
  $scope.email = identity.currentUser.username;
  $scope.fname = identity.currentUser.firstName;
  $scope.lname = identity.currentUser.lastName;

  $scope.update = function(){
    var newUserData = {
      username: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    };
    if($scope.password && $scope.password.length > 0){
      newUserData.password = $scope.password;
    }

    mvAuth.updateCurrentUser(newUserData).then(function(){
      notifier.notify('Your account details have been updated');
    }, function(reason){
      notifier.error(reason);
    })
  }

});