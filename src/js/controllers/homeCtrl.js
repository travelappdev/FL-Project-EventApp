angular.module('mainApp')

  .controller('homeCtrl', function($scope, $http) {

    $http.get('api/events')
      .then(function(response) {
        $scope.events = angular.fromJson(response.data);
      })
  });
