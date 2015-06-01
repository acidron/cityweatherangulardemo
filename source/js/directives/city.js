angular.module('Weather').directive('city', ['$timeout', '$http', function ($timeout, $http) {
	return {
		restrict: 'E',
		templateUrl: 'city.html',
		scope: {
			name: '='
		},
		link: function(scope) {
			scope.loading = true;


			scope.setUpdateTimer = function() {
				$timeout(scope.updateInfo, 2000);	
			}

			scope.updateInfo = function() {
				scope.loading = true;
				$http.get('http://api.openweathermap.org/data/2.5/weather?units=metric&q=' + scope.name).success(function(info) {
					// todo check the response
					scope.temp = Math.round(info.main.temp);
					var weather = info.weather.pop();
					scope.condition = weather.main;
					scope.conditionIco = weather.icon;
					scope.loading = false;
					scope.setUpdateTimer();
				})
			}

			scope.setUpdateTimer();
		}
	}
}]);