export default function(base) {
	base.controller('PhageDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			$scope.disabled = true;

			// Project Info
			$scope.edit_data = function() {
				$scope.disabled = false;
			}

			$scope.edit_data_save = function(){
				$scope.data.save();
				$scope.original_data = angular.copy($scope.data);
				$scope.disabled = true;
			}

			$scope.edit_data_cancel = function(){
				$scope.disabled = true;
				$scope.data = angular.copy($scope.original_data);
			}

			Restangular.one('lims/phages', $routeParams.phageID).get().then(function(data) {
				$scope.data = data;
				$scope.original_data = angular.copy(data);
			});

	}]);
}
