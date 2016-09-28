angular.module('mainApp').service('cookieService', ['$http', function ($http) {


  this.getCookie = function(val) {
    let arr = document.cookie.split(';');
    let cookie = '';
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].includes(val)) {
        for(let j = 0; j < arr[i].length; j++) {
          if(arr[i][j] === '=') cookie = arr[i].substring(j+1);
        }
      }
    }
    if(cookie === 'undefined') return '';
    return cookie;
  }

}]);
