angular.module('mainApp')

  .controller('homeCtrl', function($scope, $http, cookieService, $filter) {

    let arr = [];
    let events = [];

    let user_email = cookieService.getCookie('email');

    $http.get('api/events')
      .then(function(response) {
        let line = '';
        response.data.forEach(elem => {
          elem.date = (new Date(elem.date)).toDateString();
          if(elem.creator === user_email) {
            line += `,${elem._id}`;
          }
          events.push(elem);
        });
        document.cookie = `createdEvents=${line}`;
      });


    $scope.evs = events;
    $scope.eventFilterBy = {};
    $scope.currentPage = 1;
    $scope.pageSize = 6;
    $scope.itemsPerPage = $scope.pageSize;

    $scope.start;
    $scope.end;

    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1;
      };

      $scope.q = '';

      $scope.getData = function () {

        return $filter('filter')($scope.evs, $scope.q);

      };

      $scope.dateRangeFilter = function (property, startDate, endDate) {
      return function (item) {
          if (item[property] === null) return false;

          var itemDate = moment(item[property]);
          var s = moment(startDate, "DD-MM-YYYY");
          var e = moment(endDate, "DD-MM-YYYY");

          if (itemDate >= s && itemDate <= e) return true;
          return false;
        };
      };


  });
  angular.module('mainApp').filter('start', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }

        start = +start;
        return input.slice(start);
    };
});
