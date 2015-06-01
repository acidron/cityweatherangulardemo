angular.module('module').directive('autocomplete', ['$http', 'CityList', function($http, CityList) {
	return {
		restrict: 'E',
		templateUrl: 'autocomplete.html',
		link: function(scope, element, attributes) {
			var input = element.find('input')[0];
			var options = {types: ['geocode']};
			var autocomplete = new google.maps.places.Autocomplete(input, options);

			scope.time = 2;

			scope.add = function(a) {
				var place = autocomplete.getPlace();
				// получаем строку "Город,Код_страны" (тут что то более надежное надо бы)
				var weatherAPIName = place.address_components[0].long_name + ',' + place.address_components.slice(-1)[0].short_name;
				CityList.add(weatherAPIName, scope.time * 1000);
				input.blur();
				input.value = "";
			};

			//google.maps.event.addListener(autocomplete, 'place_changed', function() {});
		}
	}
}]);