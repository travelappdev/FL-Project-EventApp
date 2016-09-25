angular.module('mainApp')

  .controller('profileCtrl', function($scope, $http, cookieService, generalService) {



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
      $scope.userPhoto = $scope.getCookie('userPhoto');
      console.log('pht',$scope.userPhoto);
      //$scope.createdEvents = $scope.getCookie('createdEvents');

      $http.get('api/events')
        .then(function(response) {
          let line = '';
          response.data.forEach(elem => {
            if(elem.creator === $scope.email) {
              line += `,${elem._id}`;
            }
          });
          document.cookie = `createdEvents=${line}`;
          $scope.createdEvents = $scope.getCookie('createdEvents');

          $scope.created = eventsArr('created');
        });

        $scope.subscr = eventsArr('subscribed');



      function eventsArr(val) {

        let arr = [];
        let str = '';
        let z = 0;
        if(val === 'subscribed') str = $scope.subscribed;
        else if(val === 'created') str = $scope.createdEvents;

        str = str.slice(1);
        arr = str.split(',');

        let outputArr = new Array(Math.ceil(arr.length / 3));
        for(let i = 0; i < outputArr.length; i++) {
          outputArr[i] = { 'events': []};
        }


        for(let k = 0; k < outputArr.length; k++ ) {
          if(z > arr.length - 1) break;

          else {
            for(let i = 0; i < 3; i++) {

              $http.get(`api/events/${arr[z]}`)
                .then(function(response) {
                  response.data.date = (new Date(response.data.date)).toDateString();
                  outputArr[k]['events'].push(angular.fromJson(response.data));
                });

                z += 1;
                if(z > arr.length - 1) break;
            }
          }
        }

        return outputArr;
      }








      $scope.putUserPhoto = function() {
        $http.put(`api/users/${$scope.email}`, {

          'age': $scope.age,
          'gender': $scope.gender,
          'phone': $scope.phone,
          'homeTown': $scope.homeTown,
          'subscribed': $scope.subscribed,
          'createdEvents': $scope.createdEvents,
          'userPhoto': $scope.userPhoto
        //  'interests': $scope.interests

        });


        document.cookie = `age=${$scope.age}`;
        document.cookie = `phone=${$scope.phone}`;
        document.cookie = `homeTown=${$scope.homeTown}`;
        document.cookie = `gender=${$scope.gender}`;
        document.cookie = `userPhoto=${$scope.userPhoto}`;
        //document.cookie = `subscribed=${$scope.subscribed}`;
      }






    $scope.deleteReadonlyState = function(val) {

      if(!($(`#${val}`).attr('readonly')) ) {

        $(`#${val}`).attr('readonly', '');

        $http.put(`api/users/${$scope.email}`, {

          'age': $scope.age,
          'gender': $scope.gender,
          'phone': $scope.phone,
          'homeTown': $scope.homeTown,
          'subscribed': $scope.subscribed,
          'createdEvents': $scope.createdEvents,
          'userPhoto': $scope.userPhoto
        //  'interests': $scope.interests

        });


        document.cookie = `age=${$scope.age}`;
        document.cookie = `phone=${$scope.phone}`;
        document.cookie = `homeTown=${$scope.homeTown}`;
        document.cookie = `gender=${$scope.gender}`;
        // document.cookie = `userPhoto=${$scope.userPhoto}`;
        //document.cookie = `subscribed=${$scope.subscribed}`;


      } else {

        $(`#${val}`).removeAttr('readonly');

      }
    }


  });
