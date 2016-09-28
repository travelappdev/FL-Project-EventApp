angular.module('mainApp')

	.controller('loginCtrl',['$scope', '$http', '$uibModal', '$sce', '$location','$uibModalInstance', function (sc, $http, uibModal, sce, $location, uibModalInstance){


  // get user data from server

    sc.getUser = function() {
      $http.get(`/api/users/${sc.email}`)
        .then(function(response) {
          document.cookie = `email=${response.data.email}`;
          document.cookie = `password=${response.data.password}`;
          document.cookie = `username=${response.data.username}`;
          document.cookie = `age=${response.data.age}`;
          document.cookie = `phone=${response.data.phone}`;
          document.cookie = `homeTown=${response.data.homeTown}`;
          document.cookie = `gender=${response.data.gender}`;
          document.cookie = `subscribed=${response.data.subscribed}`;
          document.cookie = `createdEvents=${response.data.createdEvents}`;
					document.cookie = `userPhoto=${response.data.userPhoto}`;

        });
      $location.url('/home');
    }


				sc.close = function () {
					uibModalInstance.close();
				};



  }]);
