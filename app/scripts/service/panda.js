'use strict';
angular.module('pandaServices', ['ngResource']).
    factory('panda', function($resource){
      return $resource("http://ec2-52-8-5-153.us-west-1.compute.amazonaws.com/manager/test", {
        'get': {method:'GET'},
    });
});

