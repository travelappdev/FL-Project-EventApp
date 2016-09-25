angular.module('mainApp')
  .controller('event_manageCtrl',['$scope', '$http', 'cookieService', 'eventService', function($scope, $http, cookieService, eventService) {

    let ev = location.pathname.slice(14);
    $scope.members = [];

$scope.place = '';

  $http.get(`/api/events/${ev}`)
    .then(function(response) {
      $scope.place = response.data.place;
      changeImage(response.data.photoURL);
      $scope.event = angular.fromJson(response.data);
      console.log($scope.event);

      eventService.getMembers($scope);
    });



    // TODO put this func into service

    function changeImage(url) {
      $('.event-picture').css({
        'background-image': `url(${url})`,
        'width': '100%',
        'height': '400px'
      });
    }



    $scope.change = function() {
      changeImage($scope.new_photo);

      $http.put(`/api/events/${ev}`, {
        'name': $scope.event.name,
        'place': $scope.event.place,
        'date': $scope.event.date,
        'time': $scope.event.time,
        'type': $scope.event.type,
        'payment': $scope.event.payment,
        'description': $scope.event.description,
        'photoURL': $scope.new_photo,
        'members': $scope.event.members
      });
    }




      $scope.deleteReadonlyState = function(val) {
        if(!($(`#${val}`).attr('readonly')) ) {

          $(`#${val}`).attr('readonly', '');

            $http.put(`/api/events/${ev}`, {
              'name': $scope.event.name,
              'place': $scope.event.place,
              'date': $scope.event.date,
              'time': $scope.event.time,
              'type': $scope.event.type,
              'payment': $scope.event.payment,
              'description': $scope.event.description,
              'photoURL': $scope.event.photoURL,
              'members': $scope.event.members
            });


          } else {

            $(`#${val}`).removeAttr('readonly');

          }

      };


  }]);
