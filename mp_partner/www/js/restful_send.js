'use strict';
angular.module('restful_sendServices',[]).factory('restful_send',['$http',function($http){
    return {
        get:function(){
            return $http.get('http://ec2-52-8-5-153.us-west-1.compute.amazonaws.com/manager/test',{});
        },
        getName:function(name){
            return $http.get('http://ec2-52-8-5-153.us-west-1.compute.amazonaws.com/manager/test', {params: {name: name}});
        },
        create_brc:function(data){
            return $http.post('https://push.ionic.io/api/v1/push',data,{
                headers:{
                    'Content-Type': application/json,
            		'X-Ionic-Application-Id': ce70fa55
                }
            });
        }
    }
}]);