export default function(base) {
	base.controller("PhageDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers) {
			$scope.disabled = true;

			// Project Info
			$scope.edit_data = function() {
				$scope.disabled = false;
			};

			$scope.edit_data_save = function() {
				// Update previous names if primary_name has changed
				if($scope.data.primary_name != $scope.original_data.primary_name) {
					console.log("Changed " + $scope.original_data.primary_name + " -> " + $scope.data.primary_name);
					let hist_names = $scope.original_data.historical_names.split(",").map(function(x) {
						return x.trim();
					});
					if(hist_names.indexOf($scope.original_data.primary_name) == -1) {
						hist_names.push($scope.original_data.primary_name);
					}
					// Remove empty strings
					hist_names = hist_names.filter(String);
					$scope.data.historical_names = hist_names.join(", ");
				}

				if($scope.data.host_lims != $scope.original_data.host_lims) {
					console.log("New host");
				}


				$scope.data.save().then(function(resp) {
					$scope.data.host_lims = resp.host_lims;
				});
				$scope.original_data = angular.copy($scope.data);
				$scope.disabled = true;
			};

			$scope.edit_data_cancel = function() {
				$scope.disabled = true;
				$scope.data = angular.copy($scope.original_data);
			};


			$scope.ctrl = {
				transformChip(chip) {
					// If it is an object, it's already a known chip
					if (angular.isObject(chip)) {
						return chip;
					};

					// Otherwise, create a new one
					let parts = chip.split(" ");
					return {
						genus: parts[0],
						species: parts[1],
						strain: parts.slice(2).join(" "),
					};
				},
				selectedItem: null,
				searchText: null,
				querySearch: function(queryString) {
					return Restangular.all("lims").customGET("bacterias", {name: queryString}).then(function(data) {
						return data.results;
					});
				},
			};


			$scope.promise = Restangular.one("lims/phages", $routeParams.phageID).get().then(function(data) {
				$scope.data = data;

				// Markers for env sample map.
				let markers = {};
				$scope.data.env_sample_collection.env_sample.forEach(function(env_sample) {
					markers[env_sample.id] = {
						lat: env_sample.location_xy[1],
						lng: env_sample.location_xy[0],
						message: "<b>Environmental Sample</b><br />Type: " + env_sample.sample_type.name + "<br />Desc: " + env_sample.description,
						focus: false,
						draggable: false,
					};
				});

				let points = $scope.data.env_sample_collection.env_sample.map(function(e) {
					return [e.location_xy[1], e.location_xy[0]];
				});
				let maxbounds = null;
				let center = null;

				// If there are multiple points, calculate bounds using their
				// library, otherwise just use the single point as the bounds.
				if(points.length > 1) {
					maxbounds = leafletBoundsHelpers.createBoundsFromArray(points);
					center = {
						lat: (maxbounds.northEast.lat + maxbounds.southWest.lat) / 2,
						lng: (maxbounds.northEast.lng + maxbounds.southWest.lng) / 2,
						zoom: 1,
					};
				} else {
					center = {
						lat: points[0][0],
						lng: points[0][1],
						zoom: 4,
					};
				}
				$scope.map = {
					bounds: maxbounds,
					markers: markers,
					center: center,
				};

				// Backup copy for edit/restore functionality.
				$scope.original_data = angular.copy(data);
			});
		}]);
}
