export default function(base) {
	base.controller('AccountDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one('account/accounts', $routeParams.accountID).get().then(function(data) {
				$scope.account = data;
			});

	}]);
}