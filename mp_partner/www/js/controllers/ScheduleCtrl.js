angular.module('starter.controllers')

.controller('ScheduleCtrl', function($scope, $state, $stateParams) {
  $scope.weekdays = [ 
    { 
      day: 'Monday',
	  intervals: [
		{
		  starttime:'02:00 pm', 
		  endtime: '05:00 pm' 
		},
		{
		  starttime:'12:00 pm', 
		  endtime: '01:00 pm' 
		}
	  ],
      toggle: true 
    },
	{
      day: 'Tuesday', 
	  intervals: [
		{
		  starttime:'03:00 pm', 
		  endtime: '06:00 pm' 
		}
	  ],
      toggle: false 
    }
  ];
  $scope.editmode = function() {
    $state.go('app.editschedule');
  };
  $scope.saveedit = function() {
    $state.go('app.editschedule');
  };
  
  $scope.addTimeslot = function(dayId){
	var newTime = {	starttime:'00:00 am', endtime: '00:00 am' };
	$scope.weekdays[dayId].intervals.push(newTime);
  };
  
  $scope.delTimeslot = function(dayId, index){
	$scope.weekdays[dayId].intervals.splice(index,1);
  };
  
  $scope.dayId = $stateParams.dayId;
});