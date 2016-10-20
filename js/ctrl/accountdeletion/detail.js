export default function(base) {
	base.controller('AccountDeletionDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one('account/accountdeletions', $routeParams.accountdeletionID).get().then(function(data) {
				$scope.accountdeletion = data;
			});

	}]);
}