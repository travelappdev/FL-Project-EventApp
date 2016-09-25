angular.module('mainApp')

	.controller('registController',['$scope', '$http', '$uibModal', '$sce','$uibModalInstance', function (sc, $http, uibModal, sce, uibModalInstance){

	  sc.errorMsg = '';


	// download top events
	// should be fixed

	  $http.get('/api/topevents')
	    .then(function(response) {
	      sc.events = angular.fromJson(response.data);
	    });

	// post user data on server

	  sc.postData = function() {
	    if(sc.user_password === sc.user_repassword) {
	      $http.post('http://localhost:8000/api/users/', {
	        "email": sc.user_email,
	        "username": sc.user_name,
	        "password": sc.user_password,
					"userPhoto": ''
	      });

	    } else {
	      sc.errorMsg = 'Confirmation failed!';
	      sc.user_password = '';
	      sc.user_repassword = '';
	    }

	  };

	  sc.close = function () {
	    uibModalInstance.close();
	  };

	    sc.event = {
	      name: "name",
	      place: "place",
	      payment: "type",
	      dt: "date",
	      time: "time",
	      description: "text",
				photoURL: ''

	    };



	}]);
