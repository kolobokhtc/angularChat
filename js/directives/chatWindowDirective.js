'use strict';

app.directive('chatwindow', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'templates/chatWindow.html'
	};
});