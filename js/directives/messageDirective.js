'use strict';

app.directive('message', function(){
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		templateUrl: 'templates/message.html'
	}
})