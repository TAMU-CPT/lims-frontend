export default function(base) {
	base.controller('BioprojectDetailCtrl', ['$scope','$location','$routeParams', 'Restangular', 'PERMISSION_LEVELS',
		function($scope, $location, $routeParams, Restangular, PERMISSION_LEVELS) {
			Restangular.one('bioproject/bioprojects', $routeParams.bioprojectID).get().then(function(data) {
				$scope.bioproject = data;
				$scope.permissions = PERMISSION_LEVELS;
			});
	}]);
}
