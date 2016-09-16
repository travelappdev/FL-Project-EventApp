angular.module('mainApp')

  .controller('profileCtrl', function($scope) {

    $scope.getCookie = function(val) {
      let arr = document.cookie.split(';');
      let cookie = '';
      let o = '';
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].includes(val)) {
          console.log(arr[i]);
          for(let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] === '=') cookie = arr[i].substring(j+1);
          }
        }
      }
      if(cookie === 'undefined') return '';
      return cookie;
    }

  });
