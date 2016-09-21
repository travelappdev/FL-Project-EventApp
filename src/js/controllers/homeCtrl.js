angular.module('mainApp')

  .controller('homeCtrl', function($scope, $http, cookieService) {

    let arr = [];
    let events = [];

    let user_email = cookieService.getCookie('email');

    $http.get('api/events')
      .then(function(response) {
        let line = '';
        response.data.forEach(elem => {
          if(elem.creator === user_email) {
            line += `,${elem._id}`;
          }
          events.push(elem);
        });
        document.cookie = `createdEvents=${line}`;
      });


      $scope.evs = events;


  });
