angular.module('mainApp')
  .controller('generalCtrl', ['$scope', '$http', '$uibModal', '$sce', function(sc, $http, uibModal, sce) {

    sc.errorMsg = '';
    var arr = [];

    $http.get('/api/topevents')
      .then(function(response) {
        response.data.forEach(elem => {
          arr.push(elem);

        });
         sc.gallery_cells = modifyArr(arr);

      });



    // function create array, that is suitable for carousel


    function modifyArr(arr) {

      var outputArr = [];
      var i = 0;

      while(i <= arr.length - 1) {
        var obj = { 'events': [] };

        for(let j = 0; j < 3; j++) {
          arr[i] ? obj['events'].push(arr[i]) : break;
          i += 1;
        }
        outputArr.push(obj);
      }
      return outputArr;
    }






    //
    // sc.gallery_cells = [{
    //   events: [{
    //     name: "String1",
    //     place: "String",
    //     date: "String",
    //     time: "Number",
    //     type: "String",
    //     payment: "String",
    //     description: "String"
    //   }, {
    //     name: "String2",
    //     place: "String",
    //     date: "String",
    //     time: "Number",
    //     type: "String",
    //     payment: "String",
    //     description: "String"
    //   }, {
    //     name: "String3",
    //     place: "String",
    //     date: "String",
    //     time: "Number",
    //     type: "String",
    //     payment: "String",
    //     description: "String"
    //   }]
    // }, {
    //   events: [{
    //     name: "String4",
    //     place: "String",
    //     date: "String",
    //     time: "Number",
    //     type: "String",
    //     payment: "String",
    //     description: "String"
    //   }, {
    //     name: "String5",
    //     place: "String",
    //     date: "String",
    //     time: "Number",
    //     type: "String",
    //     payment: "String",
    //     description: "String"
    //   }, {
    //     name: "String6",
    //     place: "String",
    //     date: "String",
    //     time: "Number",
    //     type: "String",
    //     payment: "String",
    //     description: "String"
    //   }]
    // }];


    sc.errorMsg = '';


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

    };

    // sc.close = function () {
    //   uibModalInstance.close();
    // };

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
