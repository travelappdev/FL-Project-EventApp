angular.module('mainApp')
.controller('generalCtrl',['$scope', '$http', '$uibModal', '$sce', function (sc, $http, uibModal, sce){

  sc.errorMsg = '';

function modifyArr(arr) {

      var outputArr = [];
      var i = 0;

      while (i <= arr.length - 1) {
        var obj = {
          'events': []
        };

        for (let j = 0; j < 3; j++) {
          if(arr[i]) obj['events'].push(arr[i]);
          i += 1;
        }
        outputArr.push(obj); 
      }
      return outputArr;
    }

    // download top events
    // should be fixed

    var eventsArr = [{
      name: "String1",
      place: "String",
      date: "String",
      time: "Number",
      type: "String",
      payment: "String",
      description: "String"
    }, {
      name: "String2",
      place: "String",
      date: "String",
      time: "Number",
      type: "String",
      payment: "String",
      description: "String"
    }, {
      name: "String2",
      place: "String",
      date: "String",
      time: "Number",
      type: "String",
      payment: "String",
      description: "String"
    }, {
      name: "String3",
      place: "String",
      date: "String",
      time: "Number",
      type: "String",
      payment: "String",
      description: "String"
    }, {
      name: "String4",
      place: "String",
      date: "String",
      time: "Number",
      type: "String",
      payment: "String",
      description: "String"
    }, {
      name: "String5",
      place: "String",
      date: "String",
      time: "Number",
      type: "String",
      payment: "String",
      description: "String"
    }, {
      name: "String6",
      place: "String",
      date: "String",
      time: "Number",
      type: "String",
      payment: "String",
      description: "String"
    }];

    sc.gallery_cells = modifyArr(eventsArr);

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
