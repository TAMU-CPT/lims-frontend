/**
 * Bacteria detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("BacteriaDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$go",
		function($scope, $location, $routeParams, Restangular, $go) {
			$scope.go = $go;

			$scope.bact = {
				data: {},
				disabled: true,

				// Start editing
				edit_data: function() {
					$scope.bact.disabled = false;
				},

				// Finish editing
				edit_data_save: function() {
					$scope.bact.data.save().then(function(resp){
						$scope.bact.disabled = true;
					})
				},

				edit_data_cancel: function() {
					$scope.bact.disabled = true;
				},
			};

			// Phage List / Search
			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))) {
					$scope.query.page = page;
				}
				// uncomment if ordering filter is implemented in backend
				$scope.query.ordering = $scope.ordering;
				$scope.query.name = $scope.search_input;

				$scope.promise = Restangular.all("lims/phages").getList($scope.query).then(function(data) {
					$scope.data = data;
				});
			};

			$scope.options = {
				limitSelect: true,
				pageSelect: true,
			};

			$scope.query = {
				limit: 10,
				page: 1,
				// uncomment if ordering filter is implemented in backend
				ordering: $scope.ordering,
				name: $scope.search_input,
				host: $routeParams.bacteriaID,
			};

			$scope.updateData(1);


			Restangular.one("lims/bacterias", $routeParams.bacteriaID).get().then(function(data) {
				$scope.bact.data = data;
			});

		}]);
}
