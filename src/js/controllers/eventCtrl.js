angular.module('mainApp')
  .controller('eventCtrl',['$scope', '$http', 'cookieService','eventService', function($scope, $http, cookieService, eventService) {


    $scope.similar      = [];
    $scope.members      = [];
    $scope.weatherTemp  = ''
    let arr             = [];
    let ev              = location.pathname.slice(7);



    $http.get(`/api/events/${ev}`)
      .then(function(response) {
        console.log(response.data.place);
        injectWeather('Odesa');
        changeImage(response.data.photoURL);
        $scope.event = angular.fromJson(response.data);
        eventService.getMembers($scope);
        setTimeout(function(){
          console.log(weather);
          $scope.weatherTemp = weather.title;
          document.getElementById('weather').innerHTML = $scope.weatherTemp;
        }, 1000);
      });


      // function changes img photo


      function changeImage(url) {
        $('.event-picture').css({
          'background-image': `url(${url})`,
          'width': '100%',
          'height': '400px'
        });
      }


    $http.get('/api/events')
      .then(function(response) {
        response.data.forEach(elem => {
          if($scope.event.type === elem.type && $scope.event._id !== elem._id) $scope.similar.push(elem);
        });
        $scope.similar = $scope.similar.slice(0,4);
      });



      $scope.email = cookieService.getCookie('email');
      $scope.gender = cookieService.getCookie('gender');
      $scope.age = cookieService.getCookie('age');
      $scope.phone = cookieService.getCookie('phone');
      $scope.homeTown = cookieService.getCookie('homeTown');
      $scope.subscribed = cookieService.getCookie('subscribed')  + `,${ev}`;
      $scope.createdEvents = cookieService.getCookie('createdEvents');
      $scope.userPhoto = cookieService.getCookie('userPhoto');




    $scope.subscribe = function() {


        $http.put(`api/users/${$scope.email}`, {
          'age': $scope.age,
          'gender': $scope.gender,
          'phone': $scope.phone,
          'homeTown': $scope.phone,
          'subscribed': $scope.subscribed,
          'createdEvents': $scope.createdEvents,
          'userPhoto': $scope.userPhoto
        //  'interests': $scope.interests

        });


        $scope.event.members += `,${$scope.email}`;

        $http.put(`/api/events/${ev}`, {
          'name': $scope.event.name,
          'place': $scope.event.place,
          'date': $scope.event.date,
          'time': $scope.event.time,
          'type': $scope.event.type,
          'payment': $scope.event.payment,
          'description': $scope.event.description,
          'photoURL': $scope.event.photoURL,
          'members': $scope.event.members
        });

    // immediately updates info on the page

    document.cookie = `age=${$scope.age}`;
    document.cookie = `phone=${$scope.phone}`;
    document.cookie = `homeTown=${$scope.homeTown}`;
    document.cookie = `gender=${$scope.gender}`;
    document.cookie = `subscribed=${$scope.subscribed}`;
    document.cookie = `createdEvents=${$scope.createdEvents}`;
    document.cookie = `userPhoto=${$scope.userPhoto}`;



    }


  }]);
