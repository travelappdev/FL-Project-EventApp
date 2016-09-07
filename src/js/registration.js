app.controller('RegistController',[ '$scope', '$http', function (sc, http) 
{
	sc.user_regist = {};

	sc.submitForm = function ()
	{
		console.log(sc.user_regist)
		// http({
		// 	method: 'POST',
		// 	url: '/app/users',
		// 	data: sc.user_regist,
		// 	//headers:  {}
		// });
	};
}]);