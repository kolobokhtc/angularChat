'use strict';

app.factory('tabs', function($scope){
	
	var tabManager = {};

	tabManager.tabItems = [];
	
	tabManager.checkIfMaxTabs = function() {
		var max = 6;
		var i = tabManager.tabItems.length;
		if (i > max) {
			return true;
		}
		return false;
	};

	tabManager.getTitle = function(tabInfo) {
		console.log("[ title ] -> ", tabInfo.title);
		tabInfo.title.substr(0, 10);
	};

	tabManager.resetSelected = function() {
		angular.forEach(tabManager.tabItems, function(pane) {
			pane.selected = false;
		});
	};

	tabManager.addTab = function( id ) {
		if (tabManager.checkIfMaxTabs()) {
			alert("[Max Tabs] You have opened max tabs for this page.");
			return;
		}
		
		tabManager.tabItems.push({
			title: "Tab No: " + id,
			thread: $scope.threads[id],
			thread_id: id,
			selected: false
		});
		
	};
	
	tabManager.deleteTab = function( id ) {

		angular.forEach(tabManager.tabItems, function(tabInfo, key) {
			if (tabInfo.thread_id == id){
				tabManager.tabItems.splice(key, 1);
			};
		});
		
		console.log($scope.tabManager);
		
	};
	
	//to select the tab
	tabManager.select = function(i) {
		if (tabManager.tabItems.length < 1){
			return false;
		}
		angular.forEach(tabManager.tabItems, function(tabInfo) {
			tabInfo.selected = false;
		});
		tabManager.tabItems[i].selected = true;
	};
	
});