/**
 * Box detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("BoxDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/boxs", $routeParams.boxID).get().then(function(data) {
				$scope.box = data;
			});
		}]);
}
