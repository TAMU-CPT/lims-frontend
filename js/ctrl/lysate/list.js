/**
 * Lysate list controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("LysateListCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$go",
		function($scope, $location, $routeParams, Restangular, $go) {
			$scope.go = $go;

			// uncomment if ordering filter is implemented in backend
			// $scope.ordering="name";

			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))) {
					$scope.query.page = page;
				}
				// uncomment if ordering filter is implemented in backend
				// $scope.query.ordering = $scope.ordering;
				$scope.promise = Restangular.all("lims/lysates").getList($scope.query).then(function(data) {
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
				//uncomment if ordering filter is implemented in backend
				//ordering: $scope.ordering,
			};

			$scope.updateData(1);
		}]);
}
