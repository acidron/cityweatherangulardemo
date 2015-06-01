angular.module('Weather').controller('MainLoopCtrl', ['$scope', function($scope) {
	$scope.cities = [
		{name: 'Berlin'},
		{name: 'London'},
		{name: 'Moscow'}
	];
}]);