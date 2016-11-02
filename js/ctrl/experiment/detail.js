/**
 * Experimental detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("ExperimentDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/experiments", $routeParams.experimentID).get().then(function(data) {
				$scope.experiment = data;
			});
		}]);
}
