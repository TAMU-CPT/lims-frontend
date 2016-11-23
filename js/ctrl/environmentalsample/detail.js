/**
 * Environmental Sample Detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$mapHandler",
		function($scope, $location, $routeParams, Restangular, $mapHandler) {
			Restangular.one("lims/environmentalsamples", $routeParams.environmentalsampleID).get().then(function(data) {
				$scope.environmentalsample = data;
				$scope.map = $mapHandler.calculateMap([data]);
				$scope.environmentalsample.collected_by_set = [data.collected_by];
			});
		}]);
}
