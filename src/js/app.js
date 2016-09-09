angular.module('mainApp', ['router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])//, 'date.picker', 'time.picker'
  .controller('mainCtrl', function($scope, $location, $http) {

    $scope.showLoginForm = function() {
      $location.url('/home');
    };


    $scope.user_regist = {};

    $scope.submitForm = function ()
    {
      console.log($scope.user_regist)
      // http({
      // 	method: 'POST',
      // 	url: '/app/users',
      // 	data: sc.user_regist,
      // 	//headers:  {}
      // });
    };

  })


  .controller('generalCtrl',['$scope', '$http', '$uibModal', '$sce', function (sc, $http, uibModal, sce){

    sc.showSignUpForm = function() {
      alert('signup');
    };


    $http.get('/api/events')
      .then(function(response) {
        sc.events = angular.fromJson(response.data);
      });




      sc.animationsEnabled = true;

      sc.event = {
        name: "name",
        place: "place",
        payment: "type",
        dt: "date",
        time: "time",
        description: "text",
        image: ""
      };

      var modalInstance;

      sc.open = function (url, size, controller)
      {

        modalInstance = uibModal.open({
          animation: this.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: sce.trustAsResourceUrl(url),
          controller: controller,
          sc: sc,
          size: size
        });

        // sc.openComponentModal = function () {
        //   var modalInstance = uibModal.open({
        //   animation: this.animationsEnabled,
        //   component: 'modalComponent'
        //   });
        // };

        sc.toggleAnimation = function () {
          this.animationsEnabled = !this.animationsEnabled;
        };
      };



  }])


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
