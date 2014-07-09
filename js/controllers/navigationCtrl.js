'use strict';

app.controller('navigationCtrl', function($scope) {
	$scope.data = [
		{name: 'Главная', href: '#/'},
		{name: 'Пользователи', sub: [
				{name: 'Список посетителей', href: '#/'},
				{name: 'История диалогов', href: '#/'},
				{name: 'Нежелательные посетители', href: '#/'},
			]
		},
		{name: 'Управление', sub: [
				{name: 'Статистика', href: '#/'},
				{name: 'Настройки', href: '#/'},
			]
		}
	];
})

