'use strict';
angular.module('restfulServices', ['ngResource']).
    factory('restful', function($resource){
      return $resource("http://www.w3schools.com/angular/customers.php", {
        'get': {method:'GET'},
    });
});

