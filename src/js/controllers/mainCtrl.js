angular.module('mainApp')
  .controller('mainCtrl',['$scope', '$http', '$uibModal', '$sce', '$location', function (sc, $http, uibModal, sce, $location){



    // Check the url

     sc.showLogin = function() {
       return location.pathname === '/';
     };



     // Button events


     sc.visitHome = function() {
       $location.url('/home');
     };

     sc.visitAbout = function() {
       $location.url('/about');
     };

     sc.visitFAQ = function() {
       $location.url('/faq');
     };

    sc.visitFindUs = function() {
       $location.url('/findus');
     };



     sc.logout = function() {

       document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "age=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "fullname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "homeTown=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "gender=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "subscribed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "createdEvents=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "time=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "userPhoto=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "fblo_211283292620723=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
       document.cookie = "G_AUTHUSER_H=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

       loginType === 'fb' ? fbLogout() : 1;
       gSignout();
       $location.url('/');
     }

     sc.visitProfile = function() {
       $location.url('/profile');
     }



    sc.errorMsg = '';



  // get user data from server

    sc.getUser = function() {
      $http.get(`/api/users/${sc.email}`)
        .then(function(response) {

          document.cookie = `email=${response.data.email}`;
          document.cookie = `password=${response.data.password}`;
          document.cookie = `username=${response.data.username}`;
          document.cookie = `age=${response.data.age}`;
          document.cookie = `phone=${response.data.phone}`;
          document.cookie = `homeTown=${response.data.homeTown}`;
          document.cookie = `gender=${response.data.gender}`;
          document.cookie = `subscribed=${response.data.subscribed}`;
          document.cookie = `createdEvents=${response.data.createdEvents}`;
          document.cookie = `userPhoto=${response.data.userPhoto}`;

        });
      $location.url('/home');
    }


      sc.animationsEnabled = true;

      var modalInstance;

      sc.open = function (url, size, controller) {

        modalInstance = uibModal.open({
          animation: this.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: sce.trustAsResourceUrl(url),
          controller: controller,
          sc: sc,
          size: size

        });

        sc.openComponentModal = function () {

          var modalInstance = uibModal.open({
          animation: this.animationsEnabled,
          component: 'modalComponent'
          });

        };


      };

  }]);
