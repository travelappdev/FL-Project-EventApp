angular.module('mainApp', ['router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])//, 'date.picker', 'time.picker'

  .controller('aboutCtrl',function($scope) {
    $scope.myname = 'about';
  })


  .controller('homeCtrl', function($scope, $http) {

    $http.get('http://localhost:8000/api/topevents')
      .then(function(response) {
        $scope.events = angular.fromJson(response.data);
    });


  })

  .controller('profileCtrl', function($scope) {
    $scope.myname = 'profile';
  })

  .controller('event_manageCtrl', function($scope) {
    $scope.myname = 'event manage';
  })

  .controller('errorCtrl', function($scope) {
    $scope.myname = 'about';
  });
