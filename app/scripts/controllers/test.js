'use strict';

/* Controllers */
var mpControllers = angular.module('mpControllers', []);

mpControllers.controller('testCtrl', ['$scope', '$window', 'restful', 'panda',
  function($scope, $window,restful, panda) {
  	$scope.getNameCity = function() {
  		$window.console.log("get name city");
    	restful.get({},function(data){
     		$scope.users=data.records;
     		$window.console.log(data);
    	});
    };
  	$scope.doGetData = function() {
  		$window.console.log("enter getData");
    	panda.get({},function(data){
    		$window.console.log("enter2");
     		$scope.mes=data;
     		$window.console.log($scope.mes);
    	});
    };

  }]);


