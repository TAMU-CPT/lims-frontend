export default function(base) {
	base.controller('PhageDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one('lims/phages', $routeParams.phageID).get().then(function(data) {
			    $scope.phage = data;
			});

	}]);
}