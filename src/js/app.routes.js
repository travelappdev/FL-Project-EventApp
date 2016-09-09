// inject ngRoute for all our routing needs

// TODO $state

angular.module('router', ['ngRoute']) // ui-router allow to maintain old browsers
  // configure our routes
  .config(function($routeProvider, $locationProvider) { // providers

    $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'general.html',
      controller : 'generalCtrl'
    })

    .when('/event/:name', {
      templateUrl : 'event.html',
      controller : 'eventCtrl'
    })

    .when('/home', {
      templateUrl : 'home.html',
      controller : 'homeCtrl'
    })

    .when('/about', {
      templateUrl: 'about.html',
      controller: 'aboutCtrl'
    })

    .when('/profile', {
      templateUrl: 'profile.html',
      controller: 'profileCtrl'
    })

    .when('/event_manage', {
      templateUrl: 'event_manage.html',
      controller: 'event_manageCtrl'
    })

    .otherwise({
      templateUrl: '404.html',
      controller: 'errorCtrl'
    });


  // set our app up to have pretty URLS
    $locationProvider.html5Mode(true);

  });
