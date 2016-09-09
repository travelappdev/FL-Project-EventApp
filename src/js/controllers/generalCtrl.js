angular.module('mainApp')
.controller('generalCtrl',['$scope', '$http', '$uibModal', '$sce', function (sc, $http, uibModal, sce){


// download top events
// should be fixed

  $http.get('/api/events')
    .then(function(response) {
      sc.events = angular.fromJson(response.data);
    });

// post user data on server

  sc.postData = function() {
    $http.post('http://localhost:8000/api/users/', {
      "email": sc.user_email,
      "fullname": sc.user_fullname,
      "password": sc.user_password
    });
  }


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



}]);
