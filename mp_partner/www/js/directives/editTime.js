angular.module('starter.controllers')

.directive('editTime', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
	replace: true,
    templateUrl: 'templates/editTime.html' 
  } 
});