// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
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
  
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html'
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
		  controller: 'DetailCtrl'
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
    })
	
   .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    });
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
  $ionicConfigProvider.backButton.previousTitleText(false);
});
