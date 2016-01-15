angular.module('starter.controllers', [])

.controller('TestCtrl', function($scope, $rootScope, $ionicUser, $ionicPush, $log, $window, restful_send, $http) {
  // Identifies a user with the Ionic User service
  $scope.doGetData = function() {
    $window.console.log("enter getData");
    $window.console.log($rootScope.token);
    $http({
      method: 'POST',
      url: "https://push.ionic.io/api/v1/push",
      data: {
        "tokens":[
          $rootScope.token
        ],
		"debug": true,
        "notification":{
          "alert":"Hello !",
        }
      },
      headers: {  'Content-Type': 'application/json' ,
                  'X-Ionic-Application-Id': "4023a170",
                  "Authorization": btoa('eead407bbe5e1a7641d3a7c2a3377ed160c769eac199b325' + ":" + "")
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
	  console.log('User ID ' + user.user_id);
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  /*
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
		if(notification["$state"]) {
			//prompt the user to switch
			navigator.notification.confirm("You have a new order - go to it?", function(btn) {
			  if(btn === 1) {
				$state.go(notification["$state"]);
			  }
			},"New Order!")
        return true;
      }
    });
  };*/

  $scope.pushNewOrder = function() {
	console.log("push new order");
    console.log($rootScope.token);
    $http({
      method: 'POST',
      url: "https://push.ionic.io/api/v1/push",
      data: {
        "tokens":[
          $rootScope.token
        ],
		"debug": true,
        "notification":{
          "alert":"New Order!",
		  "ios":{
			  "badge":1,
			  "sound":"ping.aiff",
			  "priority": 10,
			  "content-available":1,
			  "payload":{
				  "$state": "app.requests"
			  }
		  }
        }
      },
      headers: {  'Content-Type': 'application/json' ,
                  'X-Ionic-Application-Id': "4023a170",
                  "Authorization": btoa('eead407bbe5e1a7641d3a7c2a3377ed160c769eac199b325' + ":" + "")
              }
    });
  
  };
  
  /*
    // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    $log.info('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });*/
})

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $state, $http) {

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

  $scope.doLogout = function() {
    console.log('Doing logout');

    $timeout(function() {
      $state.go('login');
    }, 500);
  };

  $rootScope.getProto = function(type) {
	var builder = dcodeIO.ProtoBuf.loadProtoFile("https://raw.githubusercontent.com/ctrlxtech/mp_ui/master/protobuf/therapist.proto?token=AHZICztBIedbLOqFXhYuUG8Gw74X9Kfuks5Wne5WwA%3D%3D");
	var proto = builder.build("massagepanda");
	switch(type) {
    case 0:
        var ProtoList = proto.therapist.OrderList;
        break;
    case 1:
        var ProtoList = proto.therapist.Schedule;
        break;
	case 2:
		var ProtoList = proto.therapist.ActionRequest;
		break;
	}
	return ProtoList;
  };
	
  $rootScope.getFusionUrl = function(zipcode) {
	
	var query = "SELECT geometry FROM " +
		"1Lae-86jeUDLmA6-8APDDqazlTOy1GsTXh28DAkw" + " WHERE ZIP = " + zipcode;
	var encodedQuery = encodeURIComponent(query);

	var url = "https://www.googleapis.com/fusiontables/v2/query";
	url += "?sql=" + encodedQuery;
	url += "&key=AIzaSyBXJDMiaMdXj9e49HQGawt1i5CItAvLo_A";
	console.log(url);
	
	return url;
  };

  $rootScope.getMapSrc = function(data, state, zipcode) {
	var mapJson = data.rows[0][0].geometry; 
	//console.log('Map Json', $scope.mapJson);

	var pathParameter = "&path=fillcolor:0xAA000033|color:0xFFFFFF00";
	var coordinates = mapJson.coordinates[0];
	for (i = 0; i < coordinates.length; i++) {
		pathParameter += "|" + coordinates[i][1] + "," + coordinates[i][0];
	}

	var src = "https://maps.googleapis.com/maps/api/staticmap?center=" + state + "+" + zipcode + "&zoom=11&size=600x300&maptype=roadmap&key=AIzaSyDG4sCXrk0S3UVEdpwfm-YQYKWK_YJ3XX0";

	src += pathParameter;
	console.log(src);	
	return src;
  };
  
  $rootScope.convertLong = function(num) {
		//console.log(num);
		if (num){
			var longNum = new dcodeIO.Long(num.low, num.high, num.unsigned);
			return longNum.toString();
		}
		else{
			//console.log('Loading');
			return 'Loading';
		}
	};
  
})

.controller('LoginCtrl', function($rootScope, $scope, $timeout, $state, $http, $localstorage) {

  //$state.go('app.home');

  // Form data for the login modal
  $scope.loginData = {username : $localstorage.get('username'),password : ''};
  $rootScope.loginstatus = {};
  $scope.errshow = false;
	  
  $scope.doLogin = function() {
    console.log('Doing login', JSON.stringify($scope.loginData));
	$localstorage.set('username', $scope.loginData.username);
	//console.log($localstorage.get('username'));
	/*$http({
		method: 'POST',
		url: 'http://www.massagepanda.us/customer/userLogin',
		data: $scope.loginData,
		//headers: {'csrfmiddlewaretoken': 'VU3mDLhQjPgLxEbPPtdhkP9YdV893VfV'}
	}).then(function(result) {
			$scope.loginstatus = result.data;
			console.log($scope.loginstatus.status);
			if ($scope.loginstatus.status == "failure" ) { alert("failure");}
       }, function(error) {
           console.log('Error log', error);
       });*/
	var res = $http.post('http://www.massagepanda.us/customer/userLoginFromJson', JSON.stringify($scope.loginData));
	res.success(function(data, status, headers, config) { 
		$rootScope.loginstatus = data; 
		console.log('Login status', data);
		if ($rootScope.loginstatus.status == "success") {
			//alert("success!");
			$scope.errshow = false;
			$scope.loginData = {username : $localstorage.get('username'),password : ''};
			
			Ionic.io();

			var push = new Ionic.Push({
			  "debug": true,
			  "onNotification": function(notification) {
				var payload = notification.payload;
				console.log(notification, payload);
				alert(notification.text);
				if(notification["$state"]) {
					//prompt the user to switch
					navigator.notification.confirm("You have a new order - go to it?", function(btn) {
					  if(btn === 1) {
						$state.go(notification["$state"]);
					  }
					},"New Order!")
				}
			  },
			  "onRegister": function(data) {
				console.log(data.token);
			  },
			  "pluginConfig": {
				"ios": {
				  "alert": true,
				  "badge": true,
				  "sound": true,
				 }
			  }
			});
			var user = Ionic.User.current();
			
			// if the user doesn't have an id, you'll need to give it one.
			if (!user.id) {
			  user.id = Ionic.User.anonymousId();
			}

			user.set('name', $scope.loginData.username);
			user.set('bio', 'test account');
			//user.save();

			push.register(function(token) {
			  // Log out your device token (Save this!)
			  console.log("Got Token:",token.token);
			  $rootScope.token = token.token;
			  push.addTokenToUser(user);
			  user.save();
			});
			  
			// Simulate a login delay. Remove this and replace with your login
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

.controller('CheckInCtrl', function($scope, $rootScope, $timeout, $state, $ionicModal, $ionicPopup, $http) {
 
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

.controller('DetailCtrl', function ($scope, $stateParams) {
    $scope.orderId = $stateParams.orderId;
})

.controller('RequestCtrl', function($rootScope, $scope, $timeout, $state, $ionicModal, $http) {
	
  $ionicModal.fromTemplateUrl('templates/newOrder-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.closeOrder = function() {	  
	$timeout(function() {
		$scope.modalShow = false;
		$scope.modal.hide();
	}, 500);
  };
  
/*  $scope.requestlist = [
    { 
		id: 1,
		date: '1442370600000',
		duration: 60,
		type: 'Swedish',
		city: 'Mountain View',
		state: 'CA',
		zipcode: '94043',
		address: '123 Castro St',
		earn: 50,
		status: 'Done'
	}		
  ]; */

  $scope.openOrder = function(index) {
	console.log('Open Order', index);
	$scope.orderId = index;

    $timeout(function() {
	  	//show map
		state = $scope.requestlist.order[index].address.state;
		zipcode = $scope.requestlist.order[index].address.zipcode;
		
		var url = $rootScope.getFusionUrl(zipcode);
	
		$http.get(url).success(function(data) { 
			var src = $rootScope.getMapSrc(data, state, zipcode);
			$scope.src = src;
		});
		
	// Open the new order modal
      $scope.modal.show();
    }, 500);

  };

	$scope.nameStyle = [];
	$scope.viewedStyle = [];
	$scope.leftbarStyle = [];
	
	//data = {uid:$rootScope.loginstatus.uid};
	data = JSON.stringify({uid:$rootScope.loginstatus.uid});
	console.log(data);
  
  	var url = 'http://www.massagepanda.us/manager/getRequestlist';

	var res = $http.post(url, data, {responseType: 'arraybuffer'});
	res.success(function(data) {
		$scope.requestlist = $rootScope.getProto(0).decode(data);
		$scope.requestlist.order.sort(function(a, b) {
			return $rootScope.convertLong(b.creation_time) - $rootScope.convertLong(a.creation_time);
		});
		for (i = 0; i < $scope.requestlist.order.length; i++) {
			//$scope.requestlist.order[i].creation_time = $rootScope.convertLong($scope.requestlist.order[i].creation_time); 
			//console.log($scope.requestlist.order[i].creation_time);
			if ($scope.requestlist.order[i].order_status == 0) {
				$scope.leftbarStyle[i] = {'background': '#E87'};
				$scope.nameStyle[i] = {'font-weight': '500', 'color': '#000'};
				$scope.viewedStyle[i] = {'color': '#000'};
			}
			else{
				$scope.leftbarStyle[i] = {'background': '#69F', 'opacity': '0.8'};
			}
		}
		console.log('Request list', $scope.requestlist);
	});
	res.error(function(data, status, headers, config) {
		alert( "failure message: " + JSON.stringify({data: data}));
	});
		
	$scope.convertLongDate = $rootScope.convertLong;
	
})

.controller('HistoryCtrl', function($rootScope, $scope, $stateParams, $http) {

	data = JSON.stringify({uid:$rootScope.loginstatus.uid});
	console.log(data);
	$scope.orderlist = new Array();
	$scope.date = {low:0, high:0, unsigned:false};

	/*var res = $http.post('http://www.massagepanda.us/manager/getOrderlist', data);
	res.success(function(data, status, headers, config) {
		$scope.orderlist = data;
		console.log('Order list', data);
	});
	res.error(function(data, status, headers, config) {
		alert( "failure message: " + JSON.stringify({data: data}));
	});*/

	var url = 'http://www.massagepanda.us/manager/getOrderlist';

	var res = $http.post(url, data, {responseType: 'arraybuffer'});
	//res.success(function(data, status, headers, config) {
	res.success(function(data) {
		//var bb = new dcodeIO.ByteBuffer();
		//bb = dcodeIO.ByteBuffer.wrap(data, "binary");
		$scope.orderlist = $rootScope.getProto(0).decode(data);
		console.log('Order list', $scope.orderlist);
	});
	res.error(function(data, status, headers, config) {
		alert( "failure message: " + JSON.stringify({data: data}));
	});
	
	$scope.orderId = $stateParams.orderId;
	$scope.convertLongDate = $rootScope.convertLong;
	
	//show map
	if ($stateParams.orderId!==undefined) {
		state = "CA";
		zipcode = 94043;
		
		var url = $rootScope.getFusionUrl(zipcode);
	
		$http.get(url).success(function(data) { 
			var src = $rootScope.getMapSrc(data, state, zipcode);
			$scope.src = src;
		});
	};
	
});