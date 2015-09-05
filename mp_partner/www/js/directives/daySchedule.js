app.directive('daySchedule', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'templates/daySchedule.html' 
  }; 
});