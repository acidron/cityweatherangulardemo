angular.module('module').controller('MainLoopCtrl', ['$scope', 'CityList', function($scope, CityList) {
	$scope.cities = CityList.data;
}]);