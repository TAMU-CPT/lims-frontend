export default function(base) {
	base.controller('SignupCodeResultDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one('account/signupcoderesults', $routeParams.signupcoderesultID).get().then(function(data) {
				$scope.signupcoderesult = data;
			});

	}]);
}