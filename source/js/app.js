(function() {
	var  app = angular.module('Weather', ['templates']);


angular.module('Weather').factory('CityList', function () {
	var service = {
		data: [
			'Berlin,DE',
			'Moscow,RU'
		]
	};

	service.add = function(value) {
		service.data.push(value);
	}

	service.remove = function(value) {
		var index = service.data.indexOf(value);
		if (index != -1) {
			service.data.splice(index, 1);
		}
	}

	return service;
});
})();