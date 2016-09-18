angular.module('mainApp').service('multipartForm', ['$http', function ($http) {
	this.post = function (uploadUrl, data){
		var fd = new FormData ();

		for(var key in data)
			fd[key] = data[key];

			console.log(fd);

		$http.post('/api/events/', {
			name: fd.name,
			description: fd.description,
			payment: fd.payment,
			place: fd.place,
			type: fd.type,
			date: fd.dt,
			time: fd.time
		});
	}
}]);
