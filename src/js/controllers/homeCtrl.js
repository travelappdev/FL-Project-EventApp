angular.module('mainApp')

  .controller('homeCtrl', function($scope, $http, cookieService, $filter) {

    let arr = [];
    let events = [];

    let user_email = cookieService.getCookie('email');

    $http.get('api/events')
      .then(function(response) {
        let line = '';
        response.data.forEach(elem => {
          if(elem.creator === user_email) {
            line += `,${elem._id}`;
          }
          events.push(elem);
        });
        document.cookie = `createdEvents=${line}`;
      });


    $scope.evs = events;

    $scope.currentPage = 1; 
    $scope.pageSize = 6;
    $scope.itemsPerPage = $scope.pageSize;



    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1;
    };

      $scope.q = '';
      
      $scope.getData = function () {

        return $filter('filter')($scope.evs, $scope.q);

      };


  });
  angular.module('mainApp').filter('start', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
 
        start = +start;
        return input.slice(start);
    };
});

