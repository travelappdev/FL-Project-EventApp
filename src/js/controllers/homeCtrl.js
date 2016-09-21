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


      //$scope.evs = events;


      $scope.filteredTodos = [];
      $scope.currentPage = 1;
      $scope.numPerPage = 10;
      $scope.maxSize = 5;
      
      $scope.todos = events;
      console.log($scope.todos)
      // $scope.makeTodos = function() {
      //   $scope.todos = [];
      //   for (var i=1;i<=1000;i++) {
      //     $scope.todos.push({ text:'todo '+i, done:false});
      //   }
      // };
      //$scope.makeTodos(); 
      
      // $scope.numPages = function () {
      //   return Math.ceil($scope.todos.length / $scope.numPerPage);
      // };
      
      // $scope.$watch('currentPage + numPerPage', function() {
      //   var begin = (($scope.currentPage - 1) * $scope.numPerPage)
      //   , end = begin + $scope.numPerPage;
        
      //   $scope.filteredTodos = $scope.todos.slice(begin, end);
      // });

  });
