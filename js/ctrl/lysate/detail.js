/**
 * Lysate detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("LysateDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$go",
		function($scope, $location, $routeParams, Restangular, $go) {
			$scope.go = $go;

			Restangular.one("lims/lysates", $routeParams.lysateID).get().then(function(data) {
				$scope.data = data;
			});
		}]);
}
