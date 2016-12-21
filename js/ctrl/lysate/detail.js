/**
 * Lysate detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("LysateDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			$scope.go_storage = function(storage_id) {
				$location.path("/storage/" + storage_id);
			};

			Restangular.one("lims/lysates", $routeParams.lysateID).get().then(function(data) {
				$scope.data = data;
			});
		}]);
}
