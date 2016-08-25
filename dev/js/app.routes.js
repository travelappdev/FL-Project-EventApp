// inject ngRoute for all our routing needs
angular.module('router', ['ngRoute'])
  // configure our routes
  .config(function($routeProvider, $locationProvider) {

    $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'public/pages/general.html',
      controller : 'generalCtrl'
    })

    .when('/event', {
      templateUrl : 'public/pages/event.html',
      controller : 'eventCtrl'
    })

    .when('/home', {
      templateUrl : 'public/pages/home.html',
      controller : 'homeCtrl'
    })

    .when('/about', {
      templateUrl: 'public/pages/about.html',
      controller: 'aboutCtrl'
    })

    .when('/profile', {
      templateUrl: 'public/pages/profile.html',
      controller: 'profileCtrl'
    })

    .when('/event_manage', {
      templateUrl: 'public/pages/event_manage.html',
      controller: 'event_manageCtrl'
    });




  // set our app up to have pretty URLS
    $locationProvider.html5Mode(true);

  });
