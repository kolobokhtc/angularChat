'use strict';

app.directive('navlist', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'templates/navlist.html',
		scope: {
			ngModel: '=',
			data: '=',
			primary: '@',
			secondary: '@'
		}
	};
});

