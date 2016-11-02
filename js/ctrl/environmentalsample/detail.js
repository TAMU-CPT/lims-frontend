/**
 * Environmental Sample Detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/environmentalsamples", $routeParams.environmentalsampleID).get().then(function(data) {
				$scope.environmentalsample = data;
			});
		}]);
}
