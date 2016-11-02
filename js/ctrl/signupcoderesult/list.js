export default function(base) {
	base.controller("SignupCodeResultListCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			$scope.go = function(id) {
				$location.path("/signupcoderesults/" + id); ;
			};

			// uncomment if ordering filter is implemented in backend
			// $scope.ordering="name";

			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))) {
					$scope.query.page = page;
				}
				// uncomment if ordering filter is implemented in backend
				// $scope.query.ordering = $scope.ordering;
				$scope.promise = Restangular.all("account/signupcoderesults").getList($scope.query).then(function(data) {
					$scope.data = data;
				});
			};

			$scope.options = {
				limitSelect: true,
				pageSelect: true,
			};

			$scope.query = {
				limit: 5,
				page: 1,
				//uncomment if ordering filter is implemented in backend
				//ordering: $scope.ordering,
			};

			$scope.updateData(1);
		}]);
}
