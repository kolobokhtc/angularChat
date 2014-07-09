'use strict';

app.controller('chatGroupCtrl', function($scope) {

	$scope.chatGroupActive = 2;

	$scope.chatGroups = [
		{id: 1, name: 'Абоненты', description: 'обращение абонов'},
		{id: 2, name: 'офисная сеть', description: 'сообщения офисной сети'}
	]

	$scope.usersOnGroup = function(group_id) {
		var threads = $scope.threads;
		var threadsOnGroup = {};

		angular.forEach(threads, function(thread, key) {
			if (thread.group_id == group_id){
				threadsOnGroup[key] = thread;
			}
		});

		return threadsOnGroup;
	}

	$scope.count = function(items){
		var count = 0;
		
		angular.forEach(items, function(key, $value){
			count++;
		})
		
		return count;
	}

	$scope.fillThreads = function() {

		angular.forEach($scope.chatGroups, function(group, key) {
			$scope.chatGroups[key].threads = $scope.usersOnGroup(group.id);
		})
	}

	$scope.fillThreads();

	$scope.$on('addThread', function() {
		
		$scope.fillThreads();
	});

	$scope.$on('endThread', function(event, data) {
		console.log('chatGroupCtrl::endThread ' + data.thread_id);
		$scope.fillThreads();
	});

})