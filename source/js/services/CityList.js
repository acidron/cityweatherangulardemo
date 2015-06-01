	angular.module('module').factory('CityList', function () {
		var service = {
			data: [
				{name: 'Berlin,DE', time: 2000},
				{name: 'Moscow,RU', time: 2000}
			]
		};

		service.add = function(value, time) {
			service.data.push({
				name: value,
				time: time
			});
		}

		service.remove = function(value) {
			var index = -1;
			for (var i = 0; i < service.data.length; i++) {
				if (service.data[i].name == value) {
					index = i;
					break;
				}
			};

			if (index != -1) {
				service.data.splice(index, 1);
			}
		}

		return service;
	});