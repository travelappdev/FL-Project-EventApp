angular.module('mainApp', ['router'])

  .controller('mainCtrl', function($scope, $location) {

    $scope.showLoginForm = function() {
      $location.url('/home');
    };

  })


  .controller('generalCtrl', function($scope, $http) {

    $scope.showSignUpForm = function() {
      alert('signup');
    };


    $http.get('http://localhost:8000/api/events')
      .then(function(response) {
        $scope.events = angular.fromJson(response.data);
      });

  })


      //
      // $scope.val = ""; // debug
      // $scope.func = function(val) {
      //   $http.get('http://localhost:8080/api/users/' + val)
      //     .then(function(response) {
      //       $scope.user = angular.fromJson(response.data);
      //       $localStorage.username = $scope.user.username;
      //       $localStorage.password = $scope.user.password;
      //       $localStorage.email = $scope.user.email;
      //       $localStorage.city = $scope.user.city;
      //       $localStorage.fullname = $scope.user.fullname;
      //       $localStorage.age = $scope.user.age;
      //       $localStorage.interests = $scope.user.interests;
      //       $localStorage.subscribed = $scope.user.subscribed;
      //       $localStorage.val = "true";
      //     });
      //     $location.url('/me');
      //   }


  .controller('aboutCtrl',function($scope) {
    $scope.myname = 'about';
  })


  .controller('homeCtrl', function($scope, $http) {

    $http.get('http://localhost:8000/api/topevents')
      .then(function(response) {
        $scope.events = angular.fromJson(response.data);
    });


  })


  .controller('eventCtrl', function($scope) {
    $scope.myname = 'event';
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
