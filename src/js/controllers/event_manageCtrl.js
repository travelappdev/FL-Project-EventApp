angular.module('mainApp')
  .controller('event_manageCtrl',['$scope', '$http', 'cookieService', 'eventService', function($scope, $http, cookieService, eventService) {

    let ev = location.pathname.slice(14);
    $scope.members = [];
    $scope.place = '';
    $scope.similar = [];
    $scope.author = cookieService.getCookie('username');
    $scope.pht = cookieService.getCookie('userPhoto');




  $http.get(`/api/events/${ev}`)
    .then(function(response) {
      injectWeather(response.data.place);
      response.data.time = response.data.time.substring(11,16);
      response.data.date = response.data.date.substring(0,10);
      changeImage(response.data.photoURL);
      $scope.event = angular.fromJson(response.data);


      eventService.getMembers($scope);
      var interval = setInterval(function(){
        if(weather != undefined) {
          console.log(weather);

          document.getElementById('weather').innerHTML = weather.title;

          // find the proper date
          let dt = new Date($scope.event.date);
          let val = 0;

          for(let i = 0; i < 10; i++) {
            let api_dt = new Date(weather.item.forecast[i].date);

            if( dt.toString().substring(0,15) == api_dt.toString().substring(0,15)) {
              // transform F into C
              let temp = ((+weather.item.forecast[i].high - 32) / 1.8).toFixed(0);
              document.getElementById('weather_temp').innerHTML = temp + ' <sup>o</sup>C';
              var weather_code = weather.item.forecast[i].code;
              document.getElementById('weather_status').innerHTML = weather.item.forecast[i].text;

              val = 1;
            }
          }


          // show gif image
          for(var key in weather_img) {
            for(let i = 0; i < weather_img[key].length; i++) {
              if(weather_img[key][i] == weather_code) {
                document.getElementById('cloudy').style.display = 'block';
              }
            }
          }



          if(val === 0) document.getElementById('weather_temp').innerHTML = 'Cannot find weather.';
          clearInterval(interval);
        }
        else if(weather === null) clearInterval(interval);


      }, 500);
    });


    $http.get('/api/events')
      .then(function(response) {
        response.data.forEach(elem => {
          elem.date = (new Date(elem.date)).toDateString();
          if($scope.event.type === elem.type && $scope.event._id !== elem._id) $scope.similar.push(elem);
        });
        $scope.similar = $scope.similar.slice(0,4);
      });


    // TODO put this func into service

    function changeImage(url) {
      $('.event-picture').css({
        'background-image': `url(${url})`,
        'width': '100%',
        'height': '400px'
      });
    }



    $scope.change = function() {
      changeImage($scope.new_photo);

      $http.put(`/api/events/${ev}`, {
        'name': $scope.event.name,
        'place': $scope.event.place,
        'date': $scope.event.date,
        'time': $scope.event.time,
        'type': $scope.event.type,
        'payment': $scope.event.payment,
        'description': $scope.event.description,
        'photoURL': $scope.new_photo,
        'members': $scope.event.members
      });
    }




      $scope.deleteReadonlyState = function(val) {
        if(!($(`#${val}`).attr('readonly')) ) {

          $(`#${val}`).attr('readonly', '');

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


          } else {

            $(`#${val}`).removeAttr('readonly');

          }

      };


  }]);
