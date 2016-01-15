angular.module('starter.controllers')

.controller('ScheduleCtrl', function($rootScope, $scope, $state, $stateParams, $http, $filter, $cordovaDialogs) {
	  
  $scope.dayId = $stateParams.dayId;
  
  weekdaysTest = {
	slot:[ 
	   { 
		  day: 0,
		  interval: [
			{
			  start_time:54000,
			  end_time:57600
			}
		  ],
		  status: true 
		},
		{
		  day: 1, 
		  interval: [
		  ],
		  status: false 
		}
    ]
  };
  
  $scope.convertTime = function(time) {
	  convertedHour = $filter('zpad')($filter('floor')(time/3600), 2);
	  convertedMinute = $filter('zpad')($filter('floor')(time%3600/60), 2);
	  convertedTime = convertedHour + ':' + convertedMinute;
	  date = new Date(1970, 0, 1, convertedHour, convertedMinute);
	  //console.log(date);
	  return date;
  };
  
  $scope.revConvertTime = function(time) {
	  convertedHour = $filter('date')(time, 'H');
	  convertedMinute = $filter('date')(time, 'm');
	  convertedTime = parseInt(convertedHour) * 3600 + parseInt(convertedMinute) * 60;
	  //console.log(convertedTime);
	  return convertedTime;
  };
  
    //$scope.Math = window.Math;
	if ($rootScope.scheduleLoaded == true) {
		$scope.weekdays = $rootScope.weekdays;
		for (i = 0; i < $scope.weekdays.slot.length; i++) { 
			var intervalTemp = $scope.weekdays.slot[i].interval;
			for (j = 0; j < intervalTemp.length; j++) { 
			  intervalTemp[j].start_time_temp = $scope.convertTime(intervalTemp[j].start_time);
			  intervalTemp[j].end_time_temp = $scope.convertTime(intervalTemp[j].end_time);
			}
		}
		console.log('Read from cache', $scope.weekdays);
	}
	else {
		data = JSON.stringify({uid:$rootScope.loginstatus.uid});
		var url = 'http://www.massagepanda.us/manager/getSchedule';

		var res = $http.post(url, data, {responseType: 'arraybuffer'});
		res.success(function(data) {
			cache = $rootScope.getProto(1).decode(data);
			console.log('Read from server', cache);
			if (cache.slot.length!==0)	$scope.weekdays = cache;
			else $scope.weekdays = weekdaysTest;
			console.log('Schedule list', $scope.weekdays);
			//process integer interval time and output date object to temp
			for (i = 0; i < $scope.weekdays.slot.length; i++) { 
				var intervalTemp = $scope.weekdays.slot[i].interval;
				for (j = 0; j < intervalTemp.length; j++) { 
				  intervalTemp[j].start_time_temp = $scope.convertTime(intervalTemp[j].start_time);
				  intervalTemp[j].end_time_temp = $scope.convertTime(intervalTemp[j].end_time);
				}
			}
			$rootScope.scheduleLoaded = true;
			$rootScope.weekdays = $scope.weekdays;			
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}
	
  /*$http.get('http://www.massagepanda.us/manager/getSchedule').success(function(data) { 
	$scope.weekdays = data; 
	console.log('Schedule', data);
  });*/
  
  $scope.editmode = function() {
    $state.go('app.editschedule');
  };
  
  $scope.checkInterval = function(interval){
	  return false;
  }
  
  $scope.saveedit = function() {
	
	test = false;
	//sort interval by start_time
	$scope.weekdays.slot[$scope.dayId].interval.sort(function(a, b) {
		return a.start_time_temp - b.start_time_temp;
	});

	var intervalValid = true;
	//var intervalTemp = JSON.parse(JSON.stringify($scope.weekdays.slot[$scope.dayId].interval));
	var intervalTemp = angular.copy($scope.weekdays.slot[$scope.dayId].interval);
	for (i = 0; i < intervalTemp.length; i++) {
		if (intervalTemp[i].start_time_temp === undefined || intervalTemp[i].end_time_temp === undefined) {intervalValid = false; break;}
		if (intervalTemp[i].start_time_temp >= intervalTemp[i].end_time_temp) {intervalValid = false; break;}
		if (i+1 < intervalTemp.length){
			if (intervalTemp[i].end_time_temp > intervalTemp[i+1].start_time_temp) {intervalValid = false; break;}
		}
	}
	
	console.log(intervalValid);
	
test: if (intervalValid && (!test)){
		//update integer interval time with time_temp
		for (i = 0; i < intervalTemp.length; i++) {
			intervalTemp[i].start_time = $scope.revConvertTime(intervalTemp[i].start_time_temp);
			intervalTemp[i].end_time = $scope.revConvertTime(intervalTemp[i].end_time_temp);
		}
	
		//delete time_temp in temp interval
		for (i = 0; i < intervalTemp.length; i++) {
			delete intervalTemp[i]["start_time_temp"];
			delete intervalTemp[i]["end_time_temp"];
			delete intervalTemp[i]["$$hashKey"];
		}
	
		//construct json to be sent to the server
		var updateData = {
			uid:$rootScope.loginstatus.uid,
			schedule_list:{
				slot:[
					{
						status: $scope.weekdays.slot[$scope.dayId].status,
						day: $scope.weekdays.slot[$scope.dayId].day,
						interval: intervalTemp
					}
				]
			}
		};
		
		console.log(updateData);
		//break test;
		
		//json to protobuf: ERROR!!
		/*protoSchedule = $rootScope.getProto(1);		
		var cache = new protoSchedule(updateData.schedule_list);
		var byteBuffer = cache.encode();
		var buffer = byteBuffer.toArrayBuffer();
		
		updateData.schedule_list = buffer;*/
		
		var url = 'http://www.massagepanda.us/manager/updateSchedule';

		var res = $http.post(url, JSON.stringify(updateData), {responseType: 'json'});
		//var res = $http.post(url, JSON.stringify(updateData), {responseType: 'json'});
		res.success(function(data) {
			//$scope.updateResult = $rootScope.getProto(1).decode(data);
			console.log('Update Result', data);
			if (data.status == "success") {
				$scope.weekdays.slot[$scope.dayId].interval = intervalTemp;
				$state.go('app.editschedule');
			}
			
		});
		res.error(function(data, status, headers, config) {
			$cordovaDialogs.alert( "failure message: " + JSON.stringify({data: data}), "Error");
		});

	}
	else $cordovaDialogs.alert("There is conflict in the schedule!", "Error"); //navigator.notification
  };
  
  $scope.addTimeslot = function(dayId){
	var newTime = {	
		start_time:0, 
		end_time: 0,
		start_time_temp: new Date(1970, 0, 1, 0, 0),
		end_time_temp: new Date(1970, 0, 1, 0, 0)
	};
	$scope.weekdays.slot[dayId].interval.push(newTime);
  };
  
  $scope.delTimeslot = function(dayId, index){
	$scope.weekdays.slot[dayId].interval.splice(index,1);
  };
  
});