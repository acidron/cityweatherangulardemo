angular.module('module').directive('city', ['$timeout', '$http', 'CityList', function ($timeout, $http, CityList) {
	return {
		restrict: 'E',
		templateUrl: 'city.html',
		scope: {
			id: '=',
			time: '='
		},
		link: function(scope) {
			scope.loading = true;
			scope.alive = true;

			scope.setUpdateTimer = function() {
				$timeout(scope.updateInfo, scope.time);	
			}

			scope.remove = function () {
				CityList.remove(scope.id);
			}

			scope.updateInfo = function() {
				//scope.loading = true; // последующие загрузки не индицируем, иначе моргает при быстрой загрузке, надо делать задержку перед появлением предупреждения
				$http.get('http://api.openweathermap.org/data/2.5/weather?units=metric&q=' + scope.id).success(function(info) {
					// todo check the response
					scope.name = info.name;
					scope.temp = Math.round(info.main.temp);
					var weather = info.weather.pop();
					scope.condition = weather.main;
					scope.conditionIco = weather.icon;
					scope.loading = false;
					if (scope.alive) {
						scope.setUpdateTimer();	
					}
				})
			}

			scope.$on("$destroy", function() {
				// todo разобраться, почему был жив без этого, и мертв ли scope теперь
				scope.alive = false;
			})

			scope.setUpdateTimer();
		}
	}
}]);