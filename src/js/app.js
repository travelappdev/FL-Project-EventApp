angular.module('mainApp', ['router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])//, 'date.picker', 'time.picker'

  .controller('aboutCtrl',function($scope) {
    $scope.myname = 'about';
  })


  .controller('event_manageCtrl', function($scope) {
    $scope.myname = 'event manage';
  })

  .controller('errorCtrl', function($scope) {
    $scope.myname = 'about';
  });
