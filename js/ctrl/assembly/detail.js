/**
 * Assembly detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("AssemblyDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/assemblys", $routeParams.assemblyID).get().then(function(data) {
				$scope.assembly = data;
			});
		}]);
}
