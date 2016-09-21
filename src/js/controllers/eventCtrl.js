angular.module('mainApp')
  .controller('eventCtrl',['$scope', '$http', 'cookieService', function($scope, $http, cookieService) {

    let ev = location.pathname.slice(7);
    $http.get(`/api/events/${ev}`)
      .then(function(response) {
        $scope.event = angular.fromJson(response.data);
      });




      $scope.email = cookieService.getCookie('email');
      $scope.gender = cookieService.getCookie('gender');
      $scope.age = cookieService.getCookie('age');
      $scope.phone = cookieService.getCookie('phone');
      $scope.homeTown = cookieService.getCookie('homeTown');
      $scope.subscribed = cookieService.getCookie('subscribed')  + `,${ev}`;
      $scope.createdEvents = cookieService.getCookie('createdEvents');




    $scope.subscribe = function() {


        $http.put(`api/users/${$scope.email}`, {
          'age': $scope.age,
          'gender': $scope.gender,
          'phone': $scope.phone,
          'homeTown': $scope.phone,
          'subscribed': $scope.subscribed,
          'createdEvents': $scope.createdEvents
        //  'interests': $scope.interests

        });



    document.cookie = `age=${$scope.age}`;
    document.cookie = `phone=${$scope.phone}`;
    document.cookie = `homeTown=${$scope.homeTown}`;
    document.cookie = `gender=${$scope.gender}`;
    document.cookie = `subscribed=${$scope.subscribed}`;
    document.cookie = `createdEvents=${$scope.createdEvents}`;



    }


  }]);
