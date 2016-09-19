angular.module('mainApp')
.controller('generalCtrl',['$scope', '$http', '$uibModal', '$sce', function (sc, $http, uibModal, sce){

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
        "password": sc.user_password
      });
    } else {
      sc.errorMsg = 'Confirmation failed!';
      sc.user_password = '';
      sc.user_repassword = '';
    }

  }


    sc.animationsEnabled = true;

    sc.event = {
      name: "name",
      place: "place",
      payment: "type",
      dt: "date",
      time: "time",
      description: "text",
      file: ""
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

      sc.openComponentModal = function () {
        var modalInstance = uibModal.open({
        animation: this.animationsEnabled,
        component: 'modalComponent'
        });
      };


    };



}]);
