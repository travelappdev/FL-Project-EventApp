var app = angular.module('app', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'date.picker', 'time.picker']);
app.controller('Ctrl', ['$scope', '$uibModal', '$sce', function (sc, uibModal, sce){

  sc.animationsEnabled = true;

  sc.event = {
    name: "name",
    place: "place",
    payment: "type",
    dt: "date",
    time: "time",
    description: "text",
    image: ""
  };

  var modalInstance;

  sc.open = function (url, size, controller)
  {

    modalInstance = uibModal.open({
      animation: this.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: sce.trustAsResourceUrl(url),
      controller: controller,
      sc: sc,
      size: size
    });
   
    // sc.openComponentModal = function () {
    //   var modalInstance = uibModal.open({
    //   animation: this.animationsEnabled,
    //   component: 'modalComponent'
    //   });
    // };

    sc.toggleAnimation = function () {
      this.animationsEnabled = !this.animationsEnabled;
    };
  };

}])

.controller('EventController', ['$scope', 'multipartForm', function (sc, multipartForm, $uibModalInstance, event) 
{
  sc.event = event;
  console.log(sc.event);
  sc.submit = function () 
  {
      // console.log(multipartForm);
      var uploadUrl = '/upload';
      multipartForm.post(uploadUrl, sc.event);
  };
//timepicker
  sc.time = new Date();

  sc.hstep = 1;
  sc.mstep = 15;

  sc.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  sc.ismeridian = true;
  sc.toggleMode = function() {
    sc.ismeridian = ! sc.ismeridian;
  };

  sc.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    sc.time = d;
  };

  // sc.event.time = new Date();

  // sc.hstep = 1;
  // sc.mstep = 15;

  // sc.options = {
  //   hstep: [1, 2, 3],
  //   mstep: [1, 5, 10, 15, 25, 30]
  // };

  // sc.ismeridian = true;
  // sc.toggleMode = function() {
  //   sc.ismeridian = ! sc.ismeridian;
  // };

  // sc.update = function() {
  //   var d = new Date();
  //   d.setHours( 14 );
  //   d.setMinutes( 0 );
  //   sc.event.time = d;
  // };

  // // sc.changed = function () {
  // //   console.log('Time changed to: ' + sc.time);
  // // };

  // sc.clear = function() {
  //   sc.event.time = null;
  // };
//datepicker
  sc.popup = {
    opened: false
  };

  sc.openDatePicker = function() 
  {
    sc.popup.opened = true;
  };
  // $scope.required= {};
  //   $scope.dt = {};
  //   $scope.disabled = function(date, mode) {
  //     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  //   };
  //   $scope.minDate = new Date();
  //   $scope.$watch('dt.value', function(newValue) { 
  //     if (newValue) $scope.required.timestamp = Math.floor(newValue.getTime() / 1000); 
  //     console.log('timestamp: ', $scope.required.timestamp, '/ dt: ', newValue);
  //   });

  // sc.ok = function () {
  //   $uibModalInstance.close($ctrl.selected.item);
  // };

  // sc.cancel = function () {
  //   $uibModalInstance.dismiss('cancel');
  // };
}]);
