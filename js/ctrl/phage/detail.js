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
					hist_names.push($scope.original_data.primary_name);
					$scope.data.historical_names = hist_names.join(", ");
				}
				$scope.data.save();
				$scope.original_data = angular.copy($scope.data);
				$scope.disabled = true;
			}

			$scope.edit_data_cancel = function(){
				$scope.disabled = true;
				$scope.data = angular.copy($scope.original_data);
			}

			$scope.promise = Restangular.one('lims/phages', $routeParams.phageID).get().then(function(data) {
				$scope.data = data;
				$scope.original_data = angular.copy(data);
			});

	}]);
}
