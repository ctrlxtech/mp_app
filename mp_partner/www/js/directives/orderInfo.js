angular.module('starter.controllers')

.directive('orderInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      orderinfo: '=orderinfo' 
    }, 
	replace: true,
    templateUrl: 'templates/orderInfo.html' 
  } 
});