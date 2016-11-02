/**
 * Tube Detail
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("TubeDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/tubes", $routeParams.tubeID).get().then(function(data) {
				$scope.tube = data;
			});
		}]);
}
