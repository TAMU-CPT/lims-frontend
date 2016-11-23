/**
 * Environmental Sample List
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleListCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mapHandler",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mapHandler) {
			$scope.go = function(id) {
				$location.path("/environmentalsamples/" + id);
			};

			$scope.go_user = function(id) {
				$location.path("/accounts/" + id);
			};

			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))) {
					$scope.query.page = page;
				}

				$scope.promise = Restangular.all("lims/environmentalsamples").getList($scope.query).then(function(data) {
					$scope.data = data;
					$scope.data.forEach(function(x){
						x.collected_by_set = [x.collected_by];
					});
					$scope.map = $mapHandler.calculateMap(data);
				});
			};

			$scope.options = {
				limitSelect: true,
				pageSelect: true,
			};

			$scope.query = {
				limit: 10,
				page: 1,
			};
			$scope.updateData(1);
		}]);
}
