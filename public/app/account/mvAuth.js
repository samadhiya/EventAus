angular.module('app').factory('mvAuth', function($http, identity, $q, mvUser, mvEvent, mvCachedEvents){
  return{
    authenticateUser: function(username, password){
      var deferred = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response){
        if(response.data.success){
          var user = new mvUser();
          angular.extend(user, response.data.user);
          identity.currentUser = user;
          deferred.resolve(true);
        }
        else{
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    },
    createUser: function(newUserData){
      var newUser = new mvUser(newUserData);
      var deferred = $q.defer();

      newUser.$save().then(function(){
        identity.currentUser = newUser;
        deferred.resolve();
      }, function(response){
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    },
    updateEvent: function(newEventData){
      var deferred = $q.defer();
      newEventData.$update().then(function(){
        mvCachedEvents.query();
        deferred.resolve();
        }, function(response){
        deferred.reject(response.data.reason)
      });
      return deferred.promise;
    },
    updateCurrentUser: function(newUserData){
      var deferred = $q.defer();

      var clone = angular.copy(identity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function(){
        identity.currentUser = clone;
        deferred.resolve();
      }, function(response){
        deferred.reject(response.data.reason)
      });
      return deferred.promise;
    },

    logoutUser: function(){
      var deferred = $q.defer();
      $http.post('logout', {logout: true}).then(function(){
        identity.currentUser = undefined;
        deferred.resolve();
      });
      return deferred.promise;
    },
    authoriseCurrentForRoute: function(role){
      if(identity.isAuthorised(role)){
        return true;
      }
      else{
        return $q.reject('not authorised');
      }
    },
    authoriseAuthenticatedUserForRoute: function(){
      if(identity.isAuthenticated()){
        return true;
      }
      else{
        return $q.reject('not authorised');
      }
    }

  }
});