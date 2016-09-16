angular.module('mainApp')

  .controller('profileCtrl', function($scope, $http) {

    $scope.getCookie = function(val) {
      let arr = document.cookie.split(';');
      let cookie = '';
      let o = '';
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

     $scope.email = $scope.getCookie('email');
     $scope.password = $scope.getCookie('password');


// create post/put request for that

$scope.gender = 'Gender: ';
$scope.age = 'Age: ';
// **********************************************************************

    $scope.deleteRead = function(val) {
      if(!($(`#${val}`).attr('readonly')) ) {

        $(`#${val}`).attr('readonly', '');
        // $http.put(`/users/${$scope.email}/${$scope.password}`, {
        //   'username': $scope.username,
        //   'age': $scope.age,
        //   'gende': $scope.gender,
        //   'phone': $scope.phone,
        //   'homeTown': $scope.homeTown,
        //   'interests': $scope.interests
        // });
        console.log($scope.age);

      } else {

        $(`#${val}`).removeAttr('readonly');

      }
    }

// ***********************************************************************

  });
