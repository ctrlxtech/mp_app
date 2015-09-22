angular.module('starter.controllers')

.directive('daySchedule', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
	replace: true,
    templateUrl: 'templates/daySchedule.html' 
  } 
});