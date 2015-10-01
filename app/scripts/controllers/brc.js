'use strict';

/* Controllers */
var socControllers = angular.module('socControllers', []);
socControllers.controller('brcCtrl', ['$scope', '$window', 'ngSocket',
  function($scope, $window, ngSocket) {
    $window.console.log("get into rcv function");
    var soc = ngSocket('ws://localhost:8080/');
    soc.send(JSON.stringify({chat: 'get' }));
    soc.onMessage(function(message) {
        $scope.chat = message;
    });

  }
]);