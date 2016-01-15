angular.module('starter.controllers')

.directive('orderInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      orderinfo: '=orderinfo',
	  mapSrc: '=mapSrc',
	  convertDate: '&convertDate'
    }, 
	replace: true,
    templateUrl: 'templates/orderInfo.html',
	/*link: function($scope, element) {
		console.log($scope.orderinfo);
		scope.date = scope.convertDate({date: scope.orderinfo.service_time});
	}*/
  } 
});