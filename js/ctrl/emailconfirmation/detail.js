export default function(base) {
	base.controller('EmailConfirmationDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one('account/emailconfirmations', $routeParams.emailconfirmationID).get().then(function(data) {
				$scope.emailconfirmation = data;
			});

	}]);
}