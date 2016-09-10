angular.module('mainApp')
  .controller('mainCtrl', function($scope, $location, $http) {


 // Check the url

  $scope.showLogin = function() {
    return location.pathname === '/';
  }



  // Button events


  $scope.visitHome = function() {
    $location.url('/home');
  };

  $scope.logout = function() {
    $location.url('/');
  }

  $scope.visitProfile = function() {
    $location.url('/profile');
  }


  $scope.user_regist = {};

  $scope.submitForm = function () {
    console.log($scope.user_regist)
    // http({
    // 	method: 'POST',
    // 	url: '/app/users',
    // 	data: sc.user_regist,
    // 	//headers:  {}
    // });
  };

});
