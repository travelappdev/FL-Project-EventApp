angular.module('mainApp')

  .controller('homeCtrl', function($scope, $http) {

    $http.get('http://localhost:8000/api/events')
      .then(function(response) {
        $scope.events = angular.fromJson(response.data);
      })
  });
