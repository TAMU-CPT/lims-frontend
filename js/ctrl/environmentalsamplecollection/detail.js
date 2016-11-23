/**
 * Environmental Sample Detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleCollectionDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$mapHandler",
		function($scope, $location, $routeParams, Restangular, $mapHandler) {
			Restangular.one("lims/environmentalsamplecollection", $routeParams.environmentalsampleID).get().then(function(data) {
				$scope.data = data;
				$scope.map = $mapHandler.calculateMap(data.env_sample);
			});
		}]);
}
