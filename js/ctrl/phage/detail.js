/**
 * Phage detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("PhageDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mapHandler", "$go",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mapHandler, $go) {
			$scope.go = $go;

			// Phage Info
			$scope.phage = {
				disabled: true,
				data: {},
				original_data: {},

				edit_data: function() {
					$scope.phage.disabled = false;
				},

				edit_data_save: function() {
					// Update previous names if primary_name has changed
					if($scope.phage.data.primary_name != $scope.phage.original_data.primary_name) {
						console.log("Changed " + $scope.phage.original_data.primary_name + " -> " + $scope.phage.data.primary_name);
						let hist_names = $scope.phage.original_data.historical_names.split(",").map(function(x) {
							return x.trim();
						});
						if(hist_names.indexOf($scope.phage.original_data.primary_name) == -1) {
							hist_names.push($scope.phage.original_data.primary_name);
						}
						// Remove empty strings
						hist_names = hist_names.filter(String);
						$scope.phage.data.historical_names = hist_names.join(", ");
					}

					if($scope.phage.data.host_lims != $scope.phage.original_data.host_lims) {
						console.log("New host");
					}


					$scope.phage.data.save().then(function(resp) {
						$scope.phage.data.host_lims = resp.host_lims;
					});
					$scope.phage.original_data = angular.copy($scope.phage.data);
					$scope.phage.disabled = true;
				},

				edit_data_cancel: function() {
					$scope.phage.disabled = true;
					$scope.phage.data = angular.copy($scope.phage.original_data);
				},
			};

			//$scope.ctrl = {
				//transformChip(chip) {
					//// If it is an object, it's already a known chip
					//if (angular.isObject(chip)) {
						//return chip;
					//};

					//// Otherwise, create a new one
					//let parts = chip.split(" ");
					//return {
						//genus: parts[0],
						//species: parts[1],
						//strain: parts.slice(2).join(" "),
					//};
				//},
				//selectedItem: null,
				//searchText: null,
				//querySearch: function(queryString) {
					//return Restangular.all("lims").customGET("bacterias", {name: queryString}).then(function(data) {
						//return data.results;
					//});
				//},
			//};


			$scope.promise = Restangular.one("lims/phages", $routeParams.phageID).get().then(function(data) {
				$scope.data = data;
				$scope.map = $mapHandler.calculateMap(data.lysate.env_sample_collection.env_sample);
				$scope.phage.original_data = angular.copy(data);
			});
		}]);
}
