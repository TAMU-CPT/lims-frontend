/**
 * Container type detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("ContainerTypeDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/containertypes", $routeParams.containertypeID).get().then(function(data) {
				$scope.containertype = data;
			});
		}]);
}
