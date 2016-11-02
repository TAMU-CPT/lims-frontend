/**
 * Sequencing Run Detail
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("SequencingRunDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/sequencingruns", $routeParams.sequencingrunID).get().then(function(data) {
				$scope.sequencingrun = data;
			});
		}]);
}
