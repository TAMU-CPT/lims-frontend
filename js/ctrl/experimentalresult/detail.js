/**
 * Experiment result detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("ExperimentalResultDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/experimentalresults", $routeParams.experimentalresultID).get().then(function(data) {
				$scope.experimentalresult = data;
			});
		}]);
}
