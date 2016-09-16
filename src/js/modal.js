angular.module('mainApp')
.controller('EventController', ['$scope', 'multipartForm', '$uibModalInstance', function (sc, multipartForm, uibModalInstance)
{
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


  sc.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    sc.time = d;
  };

  sc.options = {

    showWeeks: false
  };
  sc.close = function () {
    uibModalInstance.close();
  };

}]);
