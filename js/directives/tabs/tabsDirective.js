'use strict';

app.directive('tabs', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: {},
		controller: function($scope, $element) {
			var panes = $scope.panes = [];

			$scope.select = function(pane) {
				angular.forEach(panes, function(pane) {
					pane.selected = false;
				});
				pane.selected = true;
			};

			this.addPane = function(pane) {
				if (panes.length === 0)
					$scope.select(pane);
				panes.push(pane);
			};
		},
		template:
				'<div class="tabbable">' +
				'<ul class="nav nav-tabs">' +
				'<li ng-repeat="pane in panes" ng-class="{active:pane.$parent.tabInfo.selected}">' +
				'<a href="" ng-click="pane.$parent.tabManager.select($index)">{{pane.title}}</a>' +
				'</li>' +
				'</ul>' +
				'<div class="tab-content" ng-transclude></div>' +
				'</div>',
		replace: true
	};
});