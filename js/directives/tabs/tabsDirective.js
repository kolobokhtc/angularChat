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

			$scope.delPane = function(thread_id) {
				angular.forEach(panes, function(pane, key) {
					if (pane.$parent.tabInfo.thread_id == thread_id) {
						$scope.panes.splice(key, 1);
					}
				});
			}

			$scope.$on('endThread', function(event, data) {
				console.log('tabs::EndThread ' + data.thread_id);
				$scope.delPane(data.thread_id);
			})
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