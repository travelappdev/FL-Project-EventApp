angular.module('mainApp').service('generalService', ['$http', function ($http) {


  this.modifyArr = function(arr) {

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

}]);
