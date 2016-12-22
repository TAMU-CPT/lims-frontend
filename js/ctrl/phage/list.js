/**
 * Phage list controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("PhageListCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			$scope.go = function(id) {
				$location.path("/phages/" + id);
			};

			// uncomment if ordering filter is implemented in backend
			$scope.ordering = "name";

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
			};

			$scope.updateData(1);
		}]);
}
