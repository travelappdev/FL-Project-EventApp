angular.module('mainApp')
  .controller('eventCtrl',['$scope', '$http', function($scope, $http) {

    let ev = location.pathname.slice(7);
    $http.get(`/api/events/${ev}`)
      .then(function(response) {
        $scope.event = angular.fromJson(response.data);
      });



  }]);
