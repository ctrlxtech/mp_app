// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core','ngCordova', 'starter.controllers','starter.services','ngResource', 'restful_sendServices', 'filters'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
		
	Ionic.io();
	var push = new Ionic.Push({
	  "debug": true,
	  "onNotification": function(notification) {
		var payload = notification.payload;
		console.log(notification, payload);
	  },
	  "pluginConfig": {
		"ios": {
		  "badge": true,
		  "sound": true
		 },
		 "android": {
		   "iconColor": "#343434"
		 }
	  } 
	});
	
	push.register(function(token) {
	  $rootScope.token = token.token;
	  console.log(token.token);
	});
	alert("Push registered");
  });
  
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
	controller: 'LoginCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
	  controller: 'AppCtrl'
  })
  
  /*.state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        controller: 'ProfileCtrl',
        templateUrl: 'templates/profile.html'
      }
    }
  })*/

  .state('app.test', {
    url: '/test',
    views: {
      'menuContent': {
        controller: 'TestCtrl',
        templateUrl: 'templates/test.html'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
		controller: 'CheckInCtrl',
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.requests', {
      url: '/requests',
      views: {
        'menuContent': {
          templateUrl: 'templates/requests.html',
		  controller: 'RequestCtrl'
  	    }
      }
    })

	
  .state('app.history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
		  controller: 'HistoryCtrl'
  	    }
      }
    })

    .state('app.order', {
      url: '/history/:orderId',
      views: {
        'menuContent': {
          templateUrl: 'templates/orderDetails.html',
		  controller: 'HistoryCtrl'
        }
      }
    })
	
	.state('app.schedule', {
      url: '/schedule',
      views: {
        'menuContent': {
          templateUrl: 'templates/schedule.html',
		  controller: 'ScheduleCtrl'
        }
      }
    })

	.state('app.editschedule', {
      url: '/editschedule',
      views: {
        'menuContent': {
          templateUrl: 'templates/schedule-edit.html',
		  controller: 'ScheduleCtrl'
        }
      }
    })
	
    .state('app.edittime', {
      url: '/editschedule/:dayId',
      views: {
        'menuContent': {
          templateUrl: 'templates/editTime.html',
		  controller: 'ScheduleCtrl'
        }
      }
    });
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
  $ionicConfigProvider.backButton.previousTitleText(false);
});
