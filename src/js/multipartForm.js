angular.module('mainApp').service('multipartForm', ['$http', function ($http){
	this.post = function (uploadUrl, data){
		var fd = new FormData ();
		
		for(var key in data)
			fd[key] = data[key];

		console.log(fd)
		// $http.post(uploadUrl, fd, {
		// 	transformRequest: angular.indentity,
		// 	headers: { 'Content-Type': undefined }
		// });
	};
}]);