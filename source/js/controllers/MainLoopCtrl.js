angular.module('Weather').controller('MainLoopCtrl', ['$scope', function($scope) {
	$scope.cities = [
		{name: 'Berlin,de'},
		//{name: 'London'},
		{name: 'Moscow,ru'}
	];
}]);