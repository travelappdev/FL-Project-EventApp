angular.module('mainApp')

  .controller('congrCtrl',function($scope, $http, cookieService) {

    var user_email = cookieService.getCookie('email');

    $http.get('api/events')
      .then(function(response) {
        let line = '';
        response.data.forEach(elem => {
          if(elem.creator === user_email) {
            line += `,${elem._id}`;
          }
        });
        document.cookie = `createdEvents=${line}`;
      });

  });
