angular.module('starter.controllers', [])

.controller('TestCtrl', function($scope, $rootScope, $ionicUser, $ionicPush, $log, $window, restful_send, $http) {
  // Identifies a user with the Ionic User service
  $scope.doGetData = function() {
    $window.console.log("enter getData");
    $window.console.log($scope.token);
    $http({
      method: 'POST',
      url: "https://push.ionic.io/api/v1/push",
      data: {
        "tokens":[
          $scope.token
        ],

        "notification":{
          "alert":"Hello !",
        }
      },
      headers: {  'Content-Type': 'application/json' ,
                  'X-Ionic-Application-Id': "ce70fa55",
                  "Authorization": btoa('d03a2dc3aa95b5884312c4102b731f54fc70a9d2a8479fd9' + ":" + "")
              }
    });

  };
  $scope.identifyUser = function() {
    $log.info('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionmanaa',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  $scope.pushRegister = function() {
    $log.info('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        $log.info(notification);

        return true;
      }
    });
  };

    // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    $log.info('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });
})

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
/*
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
*/
})

.controller('LoginCtrl', function($rootScope, $scope, $timeout, $state, $http) {

  $state.go('app.home');

  // Form data for the login modal
  $scope.loginData = {username : '',password : ''};
  $rootScope.loginstatus = {};
  $scope.errshow = false;
  
  $scope.doLogin = function() {
    console.log('Doing login', JSON.stringify($scope.loginData));
	
	/*$http({
		method: 'POST',
		url: 'http://ec2-52-8-5-153.us-west-1.compute.amazonaws.com/customer/userLogin',
		data: $scope.loginData,
		//headers: {'csrfmiddlewaretoken': 'VU3mDLhQjPgLxEbPPtdhkP9YdV893VfV'}
	}).then(function(result) {
			$scope.loginstatus = result.data;
			console.log($scope.loginstatus.status);
			if ($scope.loginstatus.status == "failure" ) { alert("failure");}
       }, function(error) {
           console.log('Error log', error);
       });*/
	var res = $http.post('http://ec2-52-8-5-153.us-west-1.compute.amazonaws.com/customer/userLoginFromJson', JSON.stringify($scope.loginData));
	res.success(function(data, status, headers, config) { 
		$rootScope.loginstatus = data; 
		console.log('Login status', data);
		if ($rootScope.loginstatus.status == "success") {
			//alert("success!");
			$scope.errshow = false;
			// Simulate a login delay. Remove this and replace with your login
			// code if using a login system
			$timeout(function() {
			  $state.go('app.home');
			}, 1000);
		}
		else{
			$scope.errshow = true;
		}
	});
	res.error(function(data, status, headers, config) {
		alert( "failure message: " + JSON.stringify({data: data}));
	});
	
  };
  
})

.controller('CheckInCtrl', function($scope, $timeout, $state, $ionicModal, $ionicPopup) {
 
  // Create the working modal that we will use later
  $ionicModal.fromTemplateUrl('templates/working-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the working modal to close it
  $scope.doCheckout = function() {	  
	console.log('Doing Checkout');
	
    $timeout(function() {
		$scope.modal.hide();
	}, 500);
  };
  
  $scope.checkInData = {};
  
  $scope.doCheckin = function() {
    console.log('Doing Checkin', $scope.checkInData);

    $timeout(function() {
	// Open the working modal
      $scope.modal.show();
    }, 500);
  };
  
  $scope.doAlert = function() {
	$scope.modal['backdropClickToClose'] = false;
    $scope.modal['hardwareBackButtonClose'] = false;
   
	$ionicPopup.confirm({
       title: 'Report Emergency',
       template: 'We are going to report the emercency to our operator. Do you want to proceed?'
     }).then(function(res) { 
		 if(res) {
			console.log('Emergency reported');   
		 }
		 else {
			return;
		}
    });
  };
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DetailCtrl', function ($scope, $stateParams) {
    $scope.orderId = $stateParams.orderId;
})

.controller('bak_HistoryCtrl', function($scope, $stateParams) {
  $scope.orderlist = [
    { 
		id: 1,
		date: '1442370600000',
		duration: 60,
		type: 'Swedish',
		city: 'Mountain View',
		state: 'CA',
		address: '123 Castro St',
		total: 85.12,
		status: 'Done'
	},
    { 
		id: 2,
		date: '1442527200000',
		duration: 90,
		type: 'Deep Tissue',
		city: 'San Francisco',
		state: 'CA',
		address: '456 Market St',
		total: 117.23,
		status: 'Done'
	}
  ];
  
  $scope.orderId = $stateParams.orderId;
})

.controller('HistoryCtrl', function($rootScope, $scope, $stateParams, $http) {
	/*$http.get('http://ec2-52-8-5-153.us-west-1.compute.amazonaws.com/manager/getOrderlist').success(function(data) { 
		$scope.orderlist = data; 
		console.log('Order list', data);
	});*/
	data = JSON.stringify({uid:$rootScope.loginstatus.uid})
	console.log(data);

	var res = $http.post('http://ec2-52-8-5-153.us-west-1.compute.amazonaws.com/manager/getOrderlist', data);
	res.success(function(data, status, headers, config) {
		$scope.orderlist = data;
		console.log('Order list', data);
	});
	res.error(function(data, status, headers, config) {
		alert( "failure message: " + JSON.stringify({data: data}));
	});
	
	$scope.orderId = $stateParams.orderId;
});