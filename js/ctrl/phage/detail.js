export default function(base) {
	base.controller('PhageDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			$scope.disabled = true;

			// Project Info
			$scope.edit_data = function() {
				$scope.disabled = false;
			}

			$scope.edit_data_save = function(){
				// Update previous names if primary_name has changed
				if($scope.data.primary_name != $scope.original_data.primary_name){
					console.log("Changed " + $scope.original_data.primary_name + " -> " + $scope.data.primary_name);
					var hist_names = $scope.original_data.historical_names.split(',').map(function(x){ return x.trim(); });
					if(hist_names.indexOf($scope.original_data.primary_name) == -1){
						hist_names.push($scope.original_data.primary_name);
					}
					// Remove empty strings
					hist_names = hist_names.filter(String);
					$scope.data.historical_names = hist_names.join(", ");
				}

				if($scope.data.host_lims != $scope.original_data.host_lims){
					console.log("New host");
				}


				$scope.data.save().then(function(resp){
					$scope.data.host_lims = resp.host_lims;
				});
				$scope.original_data = angular.copy($scope.data);
				$scope.disabled = true;
			}

			$scope.edit_data_cancel = function(){
				$scope.disabled = true;
				$scope.data = angular.copy($scope.original_data);
			}


			$scope.ctrl = {
				transformChip(chip) {
					// If it is an object, it's already a known chip
					if (angular.isObject(chip)) {
						return chip;
					};

					// Otherwise, create a new one
					var parts = chip.split(' ')
					return {
						genus: parts[0],
						species: parts[1],
						strain: parts.slice(2).join(' ')
					}
				},
				selectedItem: null,
				searchText: null,
				querySearch: function(queryString){
					return Restangular.all('lims').customGET('bacterias', {name: queryString}).then(function(data) {
						return data.results
					});
				}
			}


			$scope.promise = Restangular.one('lims/phages', $routeParams.phageID).get().then(function(data) {
				$scope.data = data;
				$scope.original_data = angular.copy(data);
			});

	}]);
}
