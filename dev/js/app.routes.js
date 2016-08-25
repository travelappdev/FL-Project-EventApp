// inject ngRoute for all our routing needs
angular.module('router', ['ngRoute'])
  // configure our routes
  .config(function($routeProvider, $locationProvider) {

    $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'public/pages/general.html',
      controller : 'generalCtrl'
      //controllerAs: 'general'
    })

    .when('/event', {
      templateUrl : 'public/pages/event.html',
      controller : 'eventCtrl'
      //controllerAs: 'login'
    })

    .when('/home', {
      templateUrl : 'public/pages/home.html',
      controller : 'homeCtrl'
      //controllerAs : 'events'
    })

    .when('/about', {
      templateUrl: 'public/pages/about.html',
      controller: 'aboutCtrl'
      //controllerAs : 'about'
    })

    .when('/profile', {
      templateUrl: 'public/pages/profile.html',
      controller: 'profileCtrl'
      //controllerAs: 'me'
    })

    .when('/event_manage', {
      templateUrl: 'public/pages/event_manage.html',
      controller: 'event_manageCtrl'
      //controllerAs: 'login'
    });




  // set our app up to have pretty URLS
    $locationProvider.html5Mode(true);

  });
