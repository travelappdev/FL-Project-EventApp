angular.module('mainApp')
  .controller('eventCtrl',['$scope', '$http', function($scope, $http) {

    $http.get('/api/events/')

  }]);
