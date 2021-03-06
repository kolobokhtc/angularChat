'use strict';

app.directive('pane', function() {
	return {
		require: '^tabs',
		restrict: 'A',
		transclude: true,
		scope: {title: '@'},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		template:
				'<div class="tab-pane" ng-class="{active: $parent.tabInfo.selected}" ng-transclude>' +
				'</div>',
		replace: true
	};
});