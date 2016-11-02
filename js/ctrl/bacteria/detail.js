/**
 * Bacteria detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("BacteriaDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/bacterias", $routeParams.bacteriaID).get().then(function(data) {
				$scope.bacteria = data;
			});
		}]);
}
