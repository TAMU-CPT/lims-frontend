/**
 * Phage DNA Prep controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("PhageDNAPrepDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/phagednapreps", $routeParams.phagednaprepID).get().then(function(data) {
				$scope.phagednaprep = data;
			});
		}]);
}
