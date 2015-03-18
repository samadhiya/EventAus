angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {
      auth: function(mvAuth){
      return mvAuth.authoriseCurrentForRoute('admin');
      }
    },
    user: {
      auth: function(mvAuth){
        return mvAuth.authoriseAuthenticatedUserForRoute();
      }
    }
  };

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {templateUrl: '/partials/main/main',
      controller: 'mainCtrl'})
    .when('/admin/users', { templateUrl: '/partials/admin/user-list',
      controller: 'UserListCtrl',
      resolve: routeRoleChecks.admin
    })
    .when('/admin/events/:id', { templateUrl: '/partials/account/admin-event-list',
      controller: 'adminEventListCtrl',
      resolve: routeRoleChecks.admin
    })
    .when('/admin/event/create', { templateUrl: '/partials/events/event-add',
      controller: 'mvEventAddCtrl',
      resolve: routeRoleChecks.user
    })
    .when('/profile', {templateUrl: '/partials/account/profile',
      controller: 'mvProfileCtrl',
      resolve: routeRoleChecks.user
  })
    .when('/events', {templateUrl: '/partials/events/event-list',
      controller: 'mvEventListCtrl'
    })
    .when('/events/:id', {templateUrl: '/partials/events/event-detail',
      controller: 'mvEventDetailCtrl'
    })
    .when('/signup', {templateUrl: '/partials/account/signup',
      controller: 'SignupCtrl'});
});

angular.module('app').run(function($rootScope, $location){
   $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
     if(rejection === 'not authorised'){
       $location.path('/');
     }
   })
});

