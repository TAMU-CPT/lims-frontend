export default function(base) {
	base.controller("StorageLocationDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/storagelocations", $routeParams.storagelocationID).get().then(function(data) {
				$scope.storagelocation = data;
			});
		}]);
}
