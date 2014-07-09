'use strict';

app.directive('listgroup', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'templates/listGroup.html'
	};
});