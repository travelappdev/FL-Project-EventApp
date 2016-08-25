

angular.module('mainApp', ['router'])
  .controller('mainCtrl', function($scope) {
    $scope.myname = 'main';
  })


  .controller('generalCtrl', function($scope) {
    $scope.myname = 'general';
  })


  .controller('aboutCtrl', function($scope) {
    $scope.myname = 'about';
  })


  .controller('homeCtrl', function($scope) {
    $scope.myname = 'home';
  })


  .controller('eventCtrl', function($scope) {
    $scope.myname = 'event';
  })


  .controller('profileCtrl', function($scope) {
    $scope.myname = 'profile';
  })

  .controller('event_manageCtrl', function($scope) {
    $scope.myname = 'event manage';
  });
