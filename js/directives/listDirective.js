'use strict';

app.directive('list', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'templates/list.html',
		scope: {
			ngModel: '=',
			data: '=',
			primary: '@',
			secondary: '@',
			href: '@'
		}
	};
});