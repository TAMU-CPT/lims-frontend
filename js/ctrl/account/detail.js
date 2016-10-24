export default function(base) {
	base.controller('AccountDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			$scope.self = true;
			$scope.disabled = true;

			$scope.edit_user = function() {
				$scope.disabled = false;
			}

			$scope.edit_user_save = function(){
				$scope.account.save();
				$scope.original_data = angular.copy($scope.account);
				$scope.disabled = true;
			}

			$scope.edit_user_cancel = function(){
				$scope.disabled = true;
				$scope.account = angular.copy($scope.original_data);
			}

			Restangular.one('account/accounts', $routeParams.accountID).get().then(function(data) {
				$scope.account = data;
				// Keep copy of data in case of cancelling.
				$scope.original_data = angular.copy($scope.account);
			});

	}]);
}
