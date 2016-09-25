angular.module('mainApp').service('eventService', ['$http', function ($http) {


  this.getMembers = function(sc) {
    var membs = sc.event.members;

    if(membs != '' &&  membs != undefined && membs != 'undefined') {
      if(membs[0] === ',') membs = membs.slice(1);


      membs = membs.split(',');
      for(let i = 0; i < membs.length; i++) {
        if(membs[i] === 'undefined' || membs[i] === 'null') {
          membs.splice(i,1);
        }
      }

      console.log('mmm',membs);



      for(let i = 0; i < membs.length; i++) {
        $http.get(`/api/users/${membs[i]}`)
          .then(function(response) {
            let member = response.data;
            sc.members.push(member);
          });
      }
    }
  }

}]);
