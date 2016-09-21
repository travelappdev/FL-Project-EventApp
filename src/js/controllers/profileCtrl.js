angular.module('mainApp')

  .controller('profileCtrl', function($scope, $http, cookieService) {

    $scope.getCookie = function(val) {
      let arr = document.cookie.split(';');
      let cookie = '';
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].includes(val)) {
          for(let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] === '=') cookie = arr[i].substring(j+1);
          }
        }
      }
      if(cookie === 'undefined' || cookie === 'null') return '';
      return cookie;
    }


  // DATA from cookies


      $scope.email = $scope.getCookie('email');
      $scope.gender = $scope.getCookie('gender');
      $scope.age = $scope.getCookie('age');
      $scope.phone = $scope.getCookie('phone');
      $scope.homeTown = $scope.getCookie('homeTown');
      $scope.subscribed = $scope.getCookie('subscribed');
      $scope.createdEvents = $scope.getCookie('createdEvents');

      function eventsArr(val) {

        let arr = [];
        let outputArr = [];
        let str = '';
        if(val === 'subscribed') str = $scope.subscribed;
        else if(val === 'created') str = $scope.createdEvents;

        str = str.slice(1);
        arr = str.split(',');

        for(let i = 0; i < arr.length; i++) {

          $http.get(`api/events/${arr[i]}`)
            .then(function(response) {
              outputArr.push( angular.fromJson(response.data) );
            });

        }


        return outputArr;
      }

      $scope.subscr = eventsArr('subscribed');
      $scope.created = eventsArr('created');






    $scope.deleteReadonlyState = function(val) {
      if(!($(`#${val}`).attr('readonly')) ) {

        $(`#${val}`).attr('readonly', '');

        $http.put(`api/users/${$scope.email}`, {

          'age': $scope.age,
          'gender': $scope.gender,
          'phone': $scope.phone,
          'homeTown': $scope.homeTown,
          'subscribed': $scope.subscribed,
          'createdEvents': $scope.createdEvents
        //  'interests': $scope.interests

        });


        document.cookie = `age=${$scope.age}`;
        document.cookie = `phone=${$scope.phone}`;
        document.cookie = `homeTown=${$scope.homeTown}`;
        document.cookie = `gender=${$scope.gender}`;
        //document.cookie = `subscribed=${$scope.subscribed}`;


      } else {

        $(`#${val}`).removeAttr('readonly');

      }
    }


  });
