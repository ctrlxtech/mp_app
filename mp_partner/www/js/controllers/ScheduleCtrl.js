angular.module('starter.controllers')

.controller('ScheduleCtrl', function($scope) {
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
});