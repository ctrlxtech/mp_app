angular.module('filters', [])

.filter('zpad', function() {
	return function(input, n) {
		if(!input) input = "";
		var len = input.toString().length;
		while(len < n) {  
			input = "0" + input;  
			len++;  
		};
		return input;  
	};
})

.filter('floor', function() {
  return function(input) {
    return Math.floor(input);
  };
});