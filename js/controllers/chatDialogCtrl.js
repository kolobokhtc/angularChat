'use strict';

app.controller('chatDialogCtrl', function($scope, tabs, messageService) {

	$scope.messageService = messageService;

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
		
	$scope.tabManager.select(0);	
	
	$scope.send = function(thread_id) {
		
		var date = new Date();
        var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

		var message = {
				text: $scope.chats[thread_id].message,
				thread_id: thread_id
		};
		
		$scope.chats[thread_id].dialog.push($scope.messageService.SendMessage(message));
		
		$scope.$broadcast('SendMessage', message);
		
	}

	$scope.$on('RecieveMessage', function(event, data){

		$scope.chats[data.thread_id].dialog.push(messageService.RecieveMessage(data));
		
	});

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