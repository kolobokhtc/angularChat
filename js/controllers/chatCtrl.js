'use strict';


app.controller('chatCtrl', function($rootScope, $scope) {

	$rootScope.threads = {
		1123: {head: 'Vladimir', dialog: [
				{time: '12:12:21', message: 'Ошибка программы', own: false},
				{time: '12:13:21', message: 'что случилось', own: true}
			],
			isNew: true, group_id: 1, user_id: 2},
		89345634: {head: 'Тестовый', dialog: [
				{time: '12:12:21', message: 'Ошибка программы', own: false},
				{time: '12:13:21', message: 'что случилось', own: true}
			], isNew: false, group_id: 1, user_id: 2},
		1123123123123: {head: 'Vl', dialog: [
				{time: '12:12:21', message: 'Ошибка программы', own: false},
				{time: '12:13:21', message: 'что случилось', own: true}
			], isNew: true, group_id: 1, user_id: 2},
		1123123: {head: 'V2', dialog: [
				{time: '12:12:21', message: 'Ошибка программы', own: false},
				{time: '12:13:21', message: 'что случилось', own: true}
			], isNew: true, group_id: 1, user_id: false},
	};

	$scope.add = function() {
		$scope.threads[112345] = {head: 'VladimirOfiice', dialog: [
				{time: '12:12:21', message: 'Ошибка программы', own: false},
				{time: '12:13:21', message: 'что случилось', own: true}
			], isNew: true, group_id: 2, user_id: false};

		$scope.$broadcast('addThread');
	}

	$scope.end = function(thread_id) {

		delete($scope.threads[thread_id]);

		$scope.$broadcast('endThread', {'thread_id': thread_id});
	}

	$scope.subscibe = function(thread_id) {

		if ($scope.threads[thread_id].user_id == false) {
			$scope.threads[thread_id].user_id = $scope.user.id;

			$scope.$broadcast('SubscibeThread', {'thread_id': thread_id});
			console.log($scope.user.id + ' subscribe to ' + $scope.threads[thread_id].head);
		} else {
			console.log($scope.user.id + ' cann`t subscribe to ' + $scope.threads[thread_id].head + ' other chatting')
		}

	}

	$scope.$on('endChat', function(thread_id) {
		$scope.end(thread_id);
	})

})

