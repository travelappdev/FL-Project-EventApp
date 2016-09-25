angular.module('mainApp', ['router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])//, 'date.picker', 'time.picker'

  .controller('aboutCtrl',function($scope) {
    $scope.myname = 'about';
  })


  .controller('errorCtrl', function($scope) {
    $scope.myname = 'about';
  });
