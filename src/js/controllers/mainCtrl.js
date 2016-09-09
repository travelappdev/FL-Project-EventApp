angular.module('mainApp')
  .controller('mainCtrl', function($scope, $location, $http) {

  $scope.showLoginForm = function() {
    $location.url('/home');
  };


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
