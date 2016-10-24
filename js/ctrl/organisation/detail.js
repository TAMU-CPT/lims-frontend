export default function(base) {
	base.controller('OrganisationDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			$scope.disabled = true;

			$scope.edit_user = function() {
				$scope.disabled = false;
			}

			$scope.edit_user_save = function(){
				$scope.organisation.save();
				$scope.original_data = angular.copy($scope.organisation);
				$scope.disabled = true;
			}

			$scope.edit_user_cancel = function(){
				$scope.disabled = true;
				$scope.organisation = angular.copy($scope.original_data);
			}

			Restangular.one('directory/organisations', $routeParams.organisationID).get().then(function(data) {
				$scope.organisation = data;
				$scope.original_data = angular.copy($scope.organisation);
			});

	}]);
}
