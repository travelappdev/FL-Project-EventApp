'use strict';

angular.module('mainApp', ['router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']) //, 'date.picker', 'time.picker'

.controller('aboutCtrl', function ($scope) {
  $scope.myname = 'about';
}).controller('errorCtrl', function ($scope) {
  $scope.myname = 'about';
});
'use strict';

// inject ngRoute for all our routing needs

// TODO $state

angular.module('router', ['ngRoute']) // ui-router allow to maintain old browsers
// configure our routes
.config(function ($routeProvider, $locationProvider) {
  // providers

  $routeProvider

  // route for the home page
  .when('/', {
    templateUrl: 'general.html',
    controller: 'generalCtrl'
  }).when('/event/:event_id', {
    templateUrl: 'event.html',
    controller: 'eventCtrl'
  }).when('/event_manage/:event_id', {
    templateUrl: 'event_manage.html',
    controller: 'event_manageCtrl'
  }).when('/home', {
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  }).when('/about', {
    templateUrl: 'about.html',
    controller: 'aboutCtrl'
  }).when('/profile', {
    templateUrl: 'profile.html',
    controller: 'profileCtrl'
  }).when('/faq', {
    templateUrl: 'faq.html',
    controller: 'faqFindCtrl'
  }).when('/findus', {
    templateUrl: 'find.html',
    controller: 'faqFindCtrl'
  }).when('/event_manage', {
    templateUrl: 'event_manage.html',
    controller: 'event_manageCtrl'
  }).otherwise({
    templateUrl: '404.html',
    controller: 'errorCtrl'
  });

  // set our app up to have pretty URLS
  $locationProvider.html5Mode(true);
});
'use strict';

// initializes facebook client
window.fbAsyncInit = function () {

    FB.init({
        appId: '211283292620723',
        xfbml: true,
        status: true,
        cookie: true,
        version: 'v2.7'
    });
};

(function (d, s, id) {

    var js,
        fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) {
        return;
    }

    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

// logges facebook client, posts data to dataBase, sets cookie
function fbLogin() {

    loginType = 'fb';

    FB.login(function (response) {

        if (response.status === "connected") {

            FB.api('/me', 'GET', {
                fields: 'name,id,picture.width(300).height(300),email,hometown,gender,birthday'
            }, function (response) {

                var age = Math.floor((Date.now() - Date.parse(response.birthday)) / (1000 * 60 * 60 * 24 * 364.75));

                $.post('http://localhost:8000/api/users/', {

                    "email": response.id + '@com',
                    "username": response.name,
                    "userPhoto": response.picture.data.url,
                    "homeTown": response.hometown.name,
                    "gender": response.gender,
                    "age": age,
                    "password": 'pass'

                });

                $.get('http://localhost:8000/api/users/' + response.id + '@com', function (resp) {

                    document.cookie = 'email=' + resp.email;
                    document.cookie = 'password=' + resp.password;
                    document.cookie = 'username=' + resp.username;
                    document.cookie = 'age=' + resp.age;
                    document.cookie = 'phone=' + resp.phone;
                    document.cookie = 'homeTown=' + resp.homeTown;
                    document.cookie = 'gender=' + resp.gender;
                    document.cookie = 'subscribed=' + resp.subscribed;
                    document.cookie = 'createdEvents=' + resp.createdEvents;
                    document.cookie = 'userPhoto=' + resp.userPhoto;
                });

                /*console.log(response.hometown.name);
                console.log(response.gender);
                console.log(age);
                console.log(response.name);
                console.log(response.picture.data.url);*/
            });
        } else if (response.status === "not_authorized") {
            console.log("You are not logged in.");
        } else {
            console.log("You are not logged in facebook.");
        }
    });
}

// logges out facebook client
function fbLogout() {

    FB.logout(function (response) {

        console.log('FB user logged out');

        loginType = 'none';
    });
}
'use strict';

angular.module('mainApp').directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function link(scope, element, attrs) {

			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function () {
				scope.$apply(function () {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);
'use strict';

var auth2;
var googleUser = {};

// initializes google client
function initClient() {

	gapi.load('auth2', function () {

		auth2 = gapi.auth2.init({
			client_id: '828555280883-gnki4fgfl5p1lss9froaa6u8n77bld8j.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin'
		});

		// Attach the click handler to the sign-in button
		attachSignin(document.getElementById('g_l'));
	});
};

// attaches sign-in event click handler to the sign-in button
function attachSignin(element) {
	auth2.attachClickHandler(element, {}, onSuccess, onFailure);
}

// posts data to dataBase, sets cookie, works if click handler work is successful
function onSuccess(googleUser) {

	loginType = 'g';
	var profile = googleUser.getBasicProfile();

	$.post('http://localhost:8000/api/users/', {
		"email": '' + profile.getEmail(),
		"username": '' + profile.getName(),
		"userPhoto": '' + profile.getImageUrl(),
		"password": 'somePassword'
	});

	$.get('http://localhost:8000/api/users/' + profile.getEmail(), function (response) {
		document.cookie = 'email=' + response.email;
		document.cookie = 'password=' + response.password;
		document.cookie = 'username=' + response.username;
		document.cookie = 'age=' + response.age;
		document.cookie = 'phone=' + response.phone;
		document.cookie = 'homeTown=' + response.homeTown;
		document.cookie = 'gender=' + response.gender;
		document.cookie = 'subscribed=' + response.subscribed;
		document.cookie = 'createdEvents=' + response.createdEvents;
		document.cookie = 'userPhoto=' + response.userPhoto;
	});

	/*
 console.log('ID: ' + profile.getId());
 console.log('Name: ' + profile.getName());
 console.log('Image URL: ' + profile.getImageUrl());
 console.log('Email: ' + profile.getEmail());
 */
}

// works if click handler fails
function onFailure(error) {
	console.log(JSON.stringify(error, undefined, 2));
}

// signs google client out
function gSignout() {

	var auth2 = gapi.auth2.getAuthInstance();

	auth2.signOut().then(function () {
		loginType === 'g' ? console.log("Google User signed out") : 1;
		attachSignin(document.getElementById('g_l'));
		loginType = 'none';
	});
}

var loginType = 'simple';
initClient();
'use strict';

jQuery(document).ready(function () {
	if ($('.cd-stretchy-nav').length > 0) {
		var stretchyNavs = $('.cd-stretchy-nav');

		stretchyNavs.each(function () {
			var stretchyNav = $(this),
			    stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');

			stretchyNavTrigger.on('click', function (event) {
				event.preventDefault();
				stretchyNav.toggleClass('nav-is-visible');
			});
		});

		$(document).on('click', function (event) {
			!$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') && stretchyNavs.removeClass('nav-is-visible');
		});
	}
});
'use strict';

angular.module('mainApp').controller('EventController', ['$scope', 'multipartForm', '$uibModalInstance', function (sc, multipartForm, uibModalInstance) {

  sc.submit = function () {
    var uploadUrl = '/api/events';
    multipartForm.post(uploadUrl, sc.event);
    uibModalInstance.close();
  };
  //timepicker

  sc.hstep = 1;
  sc.mstep = 15;

  sc.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  sc.update = function () {
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    sc.time = d;
  };

  sc.options = {

    showWeeks: false
  };
  sc.close = function () {
    uibModalInstance.close();
  };
}]);
'use strict';

angular.module('mainApp').controller('eventCtrl', ['$scope', '$http', 'cookieService', 'eventService', function ($scope, $http, cookieService, eventService) {

  $scope.similar = [];
  $scope.members = [];
  var arr = [];
  var ev = location.pathname.slice(7);
  $scope.author = '';
  $scope.pht = '';

  //.sunny-rainy, .lightning, .cloudy, .snow, .sunny, .rainy


  $http.get('/api/events/' + ev).then(function (response) {
    changeImage(response.data.photoURL);
    response.data.time = response.data.time.substring(11, 16);
    response.data.date = response.data.date.substring(0, 10);
    $scope.event = angular.fromJson(response.data);
    injectWeather($scope.event.place);

    /////////////////////////////////////////////////////


    $http.get('/api/users/' + $scope.event.creator).then(function (response) {
      $scope.author = response.data.username;
      $scope.pht = response.data.userPhoto;
    });

    /////////////////////////////////////////////////////


    eventService.getMembers($scope);
    var interval = setInterval(function () {
      if (weather != undefined) {
        console.log(weather);

        document.getElementById('weather').innerHTML = weather.title;

        // find the proper date
        var dt = new Date($scope.event.date);
        var val = 0;

        for (var i = 0; i < 10; i++) {
          var api_dt = new Date(weather.item.forecast[i].date);

          if (dt.toString().substring(0, 15) == api_dt.toString().substring(0, 15)) {
            // transform F into C
            var temp = ((+weather.item.forecast[i].high - 32) / 1.8).toFixed(0);
            document.getElementById('weather_temp').innerHTML = temp + ' <sup>o</sup>C';
            var weather_code = weather.item.forecast[i].code;
            document.getElementById('weather_status').innerHTML = weather.item.forecast[i].text;

            val = 1;
          }
        }

        // show gif image
        for (var key in weather_img) {
          for (var _i = 0; _i < weather_img[key].length; _i++) {
            if (weather_img[key][_i] == weather_code) {
              document.getElementById('cloudy').style.display = 'inline-block';
            }
          }
        }

        if (val === 0) document.getElementById('weather_temp').innerHTML = 'Cannot find weather.';
        clearInterval(interval);
      } else if (weather === null) clearInterval(interval);
    }, 500);
  });

  // function changes img photo


  function changeImage(url) {
    $('.event-picture').css({
      'background-image': 'url(' + url + ')',
      'width': '100%',
      'height': '400px'
    });

    $('.upload_title').css({
      'display': 'none'
    });
  }

  $http.get('/api/events').then(function (response) {
    response.data.forEach(function (elem) {
      elem.date = new Date(elem.date).toDateString();
      if ($scope.event.type === elem.type && $scope.event._id !== elem._id) $scope.similar.push(elem);
    });
    $scope.similar = $scope.similar.slice(0, 4);
  });

  $scope.email = cookieService.getCookie('email');
  $scope.gender = cookieService.getCookie('gender');
  $scope.age = cookieService.getCookie('age');
  $scope.phone = cookieService.getCookie('phone');
  $scope.homeTown = cookieService.getCookie('homeTown');
  $scope.subscribed = cookieService.getCookie('subscribed') + (',' + ev);
  $scope.createdEvents = cookieService.getCookie('createdEvents');
  $scope.userPhoto = cookieService.getCookie('userPhoto');

  $scope.subscribe = function () {

    $http.put('api/users/' + $scope.email, {
      'age': $scope.age,
      'gender': $scope.gender,
      'phone': $scope.phone,
      'homeTown': $scope.phone,
      'subscribed': $scope.subscribed,
      'createdEvents': $scope.createdEvents,
      'userPhoto': $scope.userPhoto
      //  'interests': $scope.interests

    });

    $scope.event.members += ',' + $scope.email;

    $http.put('/api/events/' + ev, {
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

    // immediately updates info on the page

    document.cookie = 'age=' + $scope.age;
    document.cookie = 'phone=' + $scope.phone;
    document.cookie = 'homeTown=' + $scope.homeTown;
    document.cookie = 'gender=' + $scope.gender;
    document.cookie = 'subscribed=' + $scope.subscribed;
    document.cookie = 'createdEvents=' + $scope.createdEvents;
    document.cookie = 'userPhoto=' + $scope.userPhoto;
  };
}]);
'use strict';

angular.module('mainApp').controller('event_manageCtrl', ['$scope', '$http', 'cookieService', 'eventService', function ($scope, $http, cookieService, eventService) {

  var ev = location.pathname.slice(14);
  $scope.members = [];
  $scope.place = '';
  $scope.similar = [];
  $scope.author = cookieService.getCookie('username');
  $scope.pht = cookieService.getCookie('userPhoto');

  $http.get('/api/events/' + ev).then(function (response) {
    injectWeather(response.data.place);
    response.data.time = response.data.time.substring(11, 16);
    response.data.date = response.data.date.substring(0, 10);
    changeImage(response.data.photoURL);
    $scope.event = angular.fromJson(response.data);

    eventService.getMembers($scope);
    var interval = setInterval(function () {
      if (weather != undefined) {
        console.log(weather);

        document.getElementById('weather').innerHTML = weather.title;

        // find the proper date
        var dt = new Date($scope.event.date);
        var val = 0;

        for (var i = 0; i < 10; i++) {
          var api_dt = new Date(weather.item.forecast[i].date);

          if (dt.toString().substring(0, 15) == api_dt.toString().substring(0, 15)) {
            // transform F into C
            var temp = ((+weather.item.forecast[i].high - 32) / 1.8).toFixed(0);
            document.getElementById('weather_temp').innerHTML = temp + ' <sup>o</sup>C';
            var weather_code = weather.item.forecast[i].code;
            document.getElementById('weather_status').innerHTML = weather.item.forecast[i].text;

            val = 1;
          }
        }

        // show gif image
        for (var key in weather_img) {
          for (var _i = 0; _i < weather_img[key].length; _i++) {
            if (weather_img[key][_i] == weather_code) {
              document.getElementById('cloudy').style.display = 'block';
            }
          }
        }

        if (val === 0) document.getElementById('weather_temp').innerHTML = 'Cannot find weather.';
        clearInterval(interval);
      } else if (weather === null) clearInterval(interval);
    }, 500);
  });

  $http.get('/api/events').then(function (response) {
    response.data.forEach(function (elem) {
      elem.date = new Date(elem.date).toDateString();
      if ($scope.event.type === elem.type && $scope.event._id !== elem._id) $scope.similar.push(elem);
    });
    $scope.similar = $scope.similar.slice(0, 4);
  });

  // TODO put this func into service

  function changeImage(url) {
    $('.event-picture').css({
      'background-image': 'url(' + url + ')',
      'width': '100%',
      'height': '400px'
    });
  }

  $scope.change = function () {
    changeImage($scope.new_photo);

    $http.put('/api/events/' + ev, {
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
  };

  $scope.deleteReadonlyState = function (val) {
    if (!$('#' + val).attr('readonly')) {

      $('#' + val).attr('readonly', '');

      $http.put('/api/events/' + ev, {
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

      $('#' + val).removeAttr('readonly');
    }
  };
}]);
'use strict';

angular.module('mainApp').controller('faqFindCtrl', ['$scope', function ($scope) {}]);
'use strict';

angular.module('mainApp').controller('generalCtrl', ['$scope', '$http', '$uibModal', '$sce', 'generalService', function (sc, $http, uibModal, sce, generalService) {

  sc.errorMsg = '';

  sc.gallery_cells = [];
  var empty_arr = [];

  $http.get('/api/topevents').then(function (response) {
    response.data.forEach(function (elem) {
      elem.date = new Date(elem.date).toDateString();
      empty_arr.push(elem);
    });
    sc.gallery_cells = generalService.modifyArr(empty_arr);
  });

  // post user data on server

  sc.postData = function () {
    if (sc.user_password === sc.user_repassword) {
      $http.post('http://localhost:8000/api/users/', {
        "email": sc.user_email,
        "username": sc.user_name,
        "password": sc.user_password
      });
    } else {
      sc.errorMsg = 'Confirmation failed!';
      sc.user_password = '';
      sc.user_repassword = '';
    }
  };

  sc.animationsEnabled = true;

  sc.event = {
    name: "name",
    place: "place",
    payment: "type",
    dt: "date",
    time: "time",
    description: "text",
    file: ""
  };

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
'use strict';

angular.module('mainApp').controller('homeCtrl', function ($scope, $http, cookieService, $filter) {

  var arr = [];
  var events = [];

  var user_email = cookieService.getCookie('email');

  $http.get('api/events').then(function (response) {
    var line = '';
    response.data.forEach(function (elem) {
      elem.date = new Date(elem.date).toDateString();
      if (elem.creator === user_email) {
        line += ',' + elem._id;
      }
      events.push(elem);
    });
    document.cookie = 'createdEvents=' + line;
  });

  $scope.evs = events;
  $scope.eventFilterBy = {};
  $scope.currentPage = 1;
  $scope.pageSize = 6;
  $scope.itemsPerPage = $scope.pageSize;

  $scope.start;
  $scope.end;

  $scope.setItemsPerPage = function (num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1;
  };

  $scope.q = '';

  $scope.getData = function () {

    return $filter('filter')($scope.evs, $scope.q);
  };

  $scope.dateRangeFilter = function (property, startDate, endDate) {
    return function (item) {
      if (item[property] === null) return false;

      var itemDate = moment(item[property]);
      var s = moment(startDate, "DD-MM-YYYY");
      var e = moment(endDate, "DD-MM-YYYY");

      if (itemDate >= s && itemDate <= e) return true;
      return false;
    };
  };
});
angular.module('mainApp').filter('start', function () {
  return function (input, start) {
    if (!input || !input.length) {
      return;
    }

    start = +start;
    return input.slice(start);
  };
});
'use strict';

angular.module('mainApp').controller('loginCtrl', ['$scope', '$http', '$uibModal', '$sce', '$location', '$uibModalInstance', function (sc, $http, uibModal, sce, $location, uibModalInstance) {

  // get user data from server

  sc.getUser = function () {
    $http.get('/api/users/' + sc.email).then(function (response) {
      document.cookie = 'email=' + response.data.email;
      document.cookie = 'password=' + response.data.password;
      document.cookie = 'username=' + response.data.username;
      document.cookie = 'age=' + response.data.age;
      document.cookie = 'phone=' + response.data.phone;
      document.cookie = 'homeTown=' + response.data.homeTown;
      document.cookie = 'gender=' + response.data.gender;
      document.cookie = 'subscribed=' + response.data.subscribed;
      document.cookie = 'createdEvents=' + response.data.createdEvents;
      document.cookie = 'userPhoto=' + response.data.userPhoto;
    });
    $location.url('/home');
  };

  sc.close = function () {
    uibModalInstance.close();
  };
}]);
'use strict';

angular.module('mainApp').controller('mainCtrl', ['$scope', '$http', '$uibModal', '$sce', '$location', function (sc, $http, uibModal, sce, $location) {

  // Check the url

  sc.showLogin = function () {
    return location.pathname === '/';
  };

  // Button events


  sc.visitHome = function () {
    $location.url('/home');
  };

  sc.visitAbout = function () {
    $location.url('/about');
  };

  sc.visitFAQ = function () {
    $location.url('/faq');
  };

  sc.visitFindUs = function () {
    $location.url('/findus');
  };

  sc.logout = function () {

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
  };

  sc.visitProfile = function () {
    $location.url('/profile');
  };

  sc.errorMsg = '';

  // get user data from server

  sc.getUser = function () {
    $http.get('/api/users/' + sc.email).then(function (response) {

      document.cookie = 'email=' + response.data.email;
      document.cookie = 'password=' + response.data.password;
      document.cookie = 'username=' + response.data.username;
      document.cookie = 'age=' + response.data.age;
      document.cookie = 'phone=' + response.data.phone;
      document.cookie = 'homeTown=' + response.data.homeTown;
      document.cookie = 'gender=' + response.data.gender;
      document.cookie = 'subscribed=' + response.data.subscribed;
      document.cookie = 'createdEvents=' + response.data.createdEvents;
      document.cookie = 'userPhoto=' + response.data.userPhoto;
    });
    $location.url('/home');
  };

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
'use strict';

angular.module('mainApp').controller('EventController', ['$scope', 'multipartForm', '$uibModalInstance', 'cookieService', function (sc, multipartForm, uibModalInstance, cookieService) {

  sc.submit = function () {

    var uploadUrl = '/api/events';
    multipartForm.post(uploadUrl, sc.event);
    uibModalInstance.close();
  };
  //timepicker

  sc.hstep = 1;
  sc.mstep = 15;

  sc.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  sc.update = function () {
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    sc.time = d;
  };

  sc.options = {

    showWeeks: false
  };
  sc.close = function () {
    uibModalInstance.close();
  };
}]);
'use strict';

angular.module('mainApp').controller('profileCtrl', function ($scope, $http, cookieService, generalService) {

  $scope.getCookie = function (val) {
    var arr = document.cookie.split(';');
    var cookie = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].includes(val)) {
        for (var j = 0; j < arr[i].length; j++) {
          if (arr[i][j] === '=') cookie = arr[i].substring(j + 1);
        }
      }
    }
    if (cookie === 'undefined' || cookie === 'null') return '';
    return cookie;
  };

  // DATA from cookies

  $scope.email = $scope.getCookie('email');
  $scope.gender = $scope.getCookie('gender');
  $scope.age = $scope.getCookie('age');
  $scope.phone = $scope.getCookie('phone');
  $scope.homeTown = $scope.getCookie('homeTown');
  $scope.subscribed = $scope.getCookie('subscribed');
  $scope.userPhoto = $scope.getCookie('userPhoto');
  console.log('pht', $scope.userPhoto);
  //$scope.createdEvents = $scope.getCookie('createdEvents');

  $http.get('api/events').then(function (response) {
    var line = '';
    response.data.forEach(function (elem) {
      if (elem.creator === $scope.email) {
        line += ',' + elem._id;
      }
    });
    document.cookie = 'createdEvents=' + line;
    $scope.createdEvents = $scope.getCookie('createdEvents');

    $scope.created = eventsArr('created');
  });

  $scope.subscr = eventsArr('subscribed');

  function eventsArr(val) {

    var arr = [];
    var str = '';
    var z = 0;
    if (val === 'subscribed') str = $scope.subscribed;else if (val === 'created') str = $scope.createdEvents;

    str = str.slice(1);
    arr = str.split(',');

    var outputArr = new Array(Math.ceil(arr.length / 3));
    for (var i = 0; i < outputArr.length; i++) {
      outputArr[i] = { 'events': [] };
    }

    var _loop = function _loop(k) {
      if (z > arr.length - 1) return 'break';else {
        for (var _i = 0; _i < 3; _i++) {

          $http.get('api/events/' + arr[z]).then(function (response) {
            response.data.date = new Date(response.data.date).toDateString();
            outputArr[k]['events'].push(angular.fromJson(response.data));
          });

          z += 1;
          if (z > arr.length - 1) break;
        }
      }
    };

    for (var k = 0; k < outputArr.length; k++) {
      var _ret = _loop(k);

      if (_ret === 'break') break;
    }

    return outputArr;
  }

  $scope.putUserPhoto = function () {
    $http.put('api/users/' + $scope.email, {

      'age': $scope.age,
      'gender': $scope.gender,
      'phone': $scope.phone,
      'homeTown': $scope.homeTown,
      'subscribed': $scope.subscribed,
      'createdEvents': $scope.createdEvents,
      'userPhoto': $scope.userPhoto
      //  'interests': $scope.interests

    });

    document.cookie = 'age=' + $scope.age;
    document.cookie = 'phone=' + $scope.phone;
    document.cookie = 'homeTown=' + $scope.homeTown;
    document.cookie = 'gender=' + $scope.gender;
    document.cookie = 'userPhoto=' + $scope.userPhoto;
    //document.cookie = `subscribed=${$scope.subscribed}`;
  };

  $scope.deleteReadonlyState = function (val) {

    if (!$('#' + val).attr('readonly')) {

      $('#' + val).attr('readonly', '');

      $http.put('api/users/' + $scope.email, {

        'age': $scope.age,
        'gender': $scope.gender,
        'phone': $scope.phone,
        'homeTown': $scope.homeTown,
        'subscribed': $scope.subscribed,
        'createdEvents': $scope.createdEvents,
        'userPhoto': $scope.userPhoto
        //  'interests': $scope.interests

      });

      document.cookie = 'age=' + $scope.age;
      document.cookie = 'phone=' + $scope.phone;
      document.cookie = 'homeTown=' + $scope.homeTown;
      document.cookie = 'gender=' + $scope.gender;
      // document.cookie = `userPhoto=${$scope.userPhoto}`;
      //document.cookie = `subscribed=${$scope.subscribed}`;

    } else {

      $('#' + val).removeAttr('readonly');
    }
  };
});
'use strict';

angular.module('mainApp').controller('registController', ['$scope', '$http', '$uibModal', '$sce', '$uibModalInstance', function (sc, $http, uibModal, sce, uibModalInstance) {

			sc.errorMsg = '';

			// download top events
			// should be fixed

			$http.get('/api/topevents').then(function (response) {
						sc.events = angular.fromJson(response.data);
			});

			// post user data on server

			sc.postData = function () {
						if (sc.user_password === sc.user_repassword) {
									$http.post('http://localhost:8000/api/users/', {
												"email": sc.user_email,
												"username": sc.user_name,
												"password": sc.user_password,
												"userPhoto": ''
									});
						} else {
									sc.errorMsg = 'Confirmation failed!';
									sc.user_password = '';
									sc.user_repassword = '';
						}
			};

			sc.close = function () {
						uibModalInstance.close();
			};

			sc.event = {
						name: "name",
						place: "place",
						payment: "type",
						dt: "date",
						time: "time",
						description: "text",
						photoURL: ''

			};
}]);
'use strict';

function injectWeather(city) {

  var script = document.createElement('script');
  script.setAttribute("src", 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'' + city + '\')&format=json&callback=callbackFunction');
  document.body.appendChild(script);
}

var weather_img = {
  lightning: [3, 4, 23],
  cloudy: [20, 21, 22, 25, 26, 27, 28, 29, 30, 44, 42],
  snow: [5, 13, 15, 16, 41, 43, 7, 46],
  sunny: [32, 36, 34],
  rainy: [0, 1, 2, 6, 8, 9, 18, 35]
};
'use strict';

angular.module('mainApp').service('cookieService', ['$http', function ($http) {

  this.getCookie = function (val) {
    var arr = document.cookie.split(';');
    var cookie = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].includes(val)) {
        for (var j = 0; j < arr[i].length; j++) {
          if (arr[i][j] === '=') cookie = arr[i].substring(j + 1);
        }
      }
    }
    if (cookie === 'undefined') return '';
    return cookie;
  };
}]);
'use strict';

angular.module('mainApp').service('eventService', ['$http', function ($http) {

  this.getMembers = function (sc) {
    var membs = sc.event.members;

    if (membs != '' && membs != undefined && membs != 'undefined') {
      if (membs[0] === ',') membs = membs.slice(1);

      membs = membs.split(',');
      for (var i = 0; i < membs.length; i++) {
        if (membs[i] === 'undefined' || membs[i] === 'null') {
          membs.splice(i, 1);
        }
      }

      console.log('mmm', membs);

      for (var _i = 0; _i < membs.length; _i++) {
        $http.get('/api/users/' + membs[_i]).then(function (response) {
          var member = response.data;
          sc.members.push(member);
        });
      }
    }
  };
}]);
'use strict';

angular.module('mainApp').service('generalService', ['$http', function ($http) {

  this.modifyArr = function (arr) {

    var outputArr = [];
    var i = 0;

    while (i <= arr.length - 1) {
      var obj = {
        'events': []
      };

      for (var j = 0; j < 3; j++) {
        if (arr[i]) obj['events'].push(arr[i]);
        i += 1;
      }
      outputArr.push(obj);
    }
    return outputArr;
  };
}]);
'use strict';

angular.module('mainApp').service('multipartForm', ['$http', 'cookieService', '$location', function ($http, cookieService, $location) {
	this.post = function (uploadUrl, data) {
		var fd = new FormData();

		for (var key in data) {
			fd[key] = data[key];
		}

		var email = cookieService.getCookie('email');

		$http.post('/api/events/', {
			name: fd.name,
			description: fd.description,
			payment: fd.payment,
			place: fd.place,
			type: fd.type,
			date: fd.dt,
			time: fd.time,
			creator: email,
			members: '',
			photoURL: fd.photoURL
		});

		$location.url('/home');
	};
}]);