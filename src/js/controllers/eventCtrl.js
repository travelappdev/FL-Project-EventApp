angular.module('mainApp')
  .controller('eventCtrl',['$scope', '$http', 'cookieService','eventService', function($scope, $http, cookieService, eventService) {


    $scope.similar      = [];
    $scope.members      = [];
    let arr             = [];
    let ev              = location.pathname.slice(7);



    $http.get(`/api/events/${ev}`)
      .then(function(response) {
        changeImage(response.data.photoURL);
        response.data.time = response.data.time.substring(11,16);
        response.data.date = response.data.date.substring(0,10);
        $scope.event = angular.fromJson(response.data);
        injectWeather($scope.event.place);


        eventService.getMembers($scope);
        var interval = setInterval(function(){
          console.log(weather);
          if(weather != undefined) {
            console.log(weather);

            document.getElementById('weather').innerHTML = weather.title;

            // find the proper date
            let dt = new Date($scope.event.date);
            let val = 0;

            for(let i = 0; i < 10; i++) {
              let api_dt = new Date(weather.item.forecast[i].date);
              console.log(api_dt);

              if( dt.toString().substring(0,15) == api_dt.toString().substring(0,15)) {
                // transform F into C
                let temp = ((+weather.item.forecast[i].high - 32) / 1.8).toFixed(0);
                document.getElementById('weather_temp').innerHTML = temp + ' <sup>o</sup>C';
                document.getElementById('weather_status').innerHTML = weather.item.forecast[i].text;
                val = 1;
              }
            }
            if(val === 0) document.getElementById('weather_temp').innerHTML = 'Cannot find weather.';
            console.log(dt);
            clearInterval(interval);
          }



        }, 200);
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
