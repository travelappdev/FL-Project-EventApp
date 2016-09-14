angular.module('mainApp').controller('LoginController',[ '$scope', '$http', function (sc, http)
{
	sc.user_login = {};

	sc.submitForm = function ()	{
		console.log(sc.user_login);
		// http({
		// 	method: 'POST',
		// 	url: '/app/users',
		// 	data: sc.user_login,
		// 	//headers:  {}
		// });
	};
}]);

var loginType = 'simple';
