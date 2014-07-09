'use strict';

app.controller('chatDialogCtrl', function($scope, tabs) {

	$scope.tabManager = tabs;

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