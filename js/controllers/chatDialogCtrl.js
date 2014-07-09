'use strict';

app.controller('chatDialogCtrl', function($scope) {

	$scope.tabManager = {};

	$scope.tabManager.tabItems = [];

	$scope.tabManager.checkIfMaxTabs = function() {
		var max = 6;
		var i = $scope.tabManager.tabItems.length;
		if (i > max) {
			return true;
		}
		return false;
	};

	$scope.tabManager.getTitle = function(tabInfo) {
		console.log("[ title ] -> ", tabInfo.title);
		tabInfo.title.substr(0, 10);
	};

	$scope.tabManager.resetSelected = function() {
		angular.forEach($scope.tabManager.tabItems, function(pane) {
			pane.selected = false;
		});
	};

	$scope.tabManager.addTab = function( id ) {
		if ($scope.tabManager.checkIfMaxTabs()) {
			alert("[Max Tabs] You have opened max tabs for this page.");
			return;
		}
		
		$scope.tabManager.tabItems.push({
			title: "Tab No: " + id,
			thread: $scope.threads[id],
			thread_id: id,
			selected: false
		});
		
	};
	
	$scope.tabManager.deleteTab = function( id ) {

		angular.forEach($scope.tabManager.tabItems, function(tabInfo, key) {
			if (tabInfo.thread_id == id){
				$scope.tabManager.tabItems.splice(key, 1);
			};
		});
		
		console.log($scope.tabManager);
		
	};
	
	//to select the tab
	$scope.tabManager.select = function(i) {
		if ($scope.tabManager.tabItems.length < 1){
			return false;
		}
		angular.forEach($scope.tabManager.tabItems, function(tabInfo) {
			tabInfo.selected = false;
		});
		$scope.tabManager.tabItems[i].selected = true;
	}

	$scope.chats = {};

	$scope.fill = function() {

		angular.forEach($scope.threads, function(thread, key) {

			if ($scope.user.id == thread.user_id) {

				$scope.chats[key] = thread;

			}

		});

	};

	$scope.fill();

	//add few tabs
	angular.forEach($scope.chats, function(thread, thread_id){
		$scope.tabManager.tabItems.addTab(thread_id);
	})
	
	console.log($scope.tabManager.tabItems);
	
	$scope.tabManager.select(0);	
	
	$scope.send = function(thread_id) {
		var date = new Date();
        var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

		
		var message = $scope.chats[thread_id].message;
		$scope.chats[thread_id].dialog.push({time: time, message: message, own: true});
		$scope.chats[thread_id].dialog.push({time: time, message: 'что случилось', own: false});
		console.log(thread_id + ' try to send');
	}

	$scope.$on('SubscibeThread', function(event, data) {
		console.log('chatDialogCtrl::SubscibeThread ' + data.thread_id)
		$scope.chats[data.thread_id] = $scope.threads[data.thread_id];
		$scope.tabManager.addTab(data.thread_id);

	})

	$scope.$on('endThread', function(event, data) {
		console.log('chatDialogCtrl::endThread ' + data.thread_id);
		delete($scope.chats[data.thread_id]);
		$scope.tabManager.deleteTab(data.thread_id);
	});
})