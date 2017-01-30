export default function(base) {
	base.controller("TestCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mapHandler", "$go",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mapHandler, $go) {

			$scope.ctrl = {
				transformChip(chip) {
					// If it is an object, it's already a known chip
					if (angular.isObject(chip)) {
						return chip;
					};
					console.log(chip);

					// Otherwise, create a new one
					let parts = chip.split(" ");
					return {
						genus: parts[0],
						species: parts[1],
						strain: parts.slice(2).join(" "),
					};
				},
				selectedItem: [],
				searchText: null,
				querySearch: function(queryString) {
					return Restangular.all("lims").customGET("bacterias", {full: queryString}).then(function(data) {
						return data.results;
					});
				},
			};


		}]);
}
