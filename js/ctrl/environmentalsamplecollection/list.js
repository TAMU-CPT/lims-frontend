/**
 * Environmental Sample Collection List
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleCollectionListCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mapHandler",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mapHandler) {
			$scope.go = function(id) {
				$location.path("/environmentalsamplecollection/" + id);
			};


// CICADA: NEW_INPUTS_HERE_DO_NOT_REMOVE


			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))) {
					$scope.query.page = page;
				}

				$scope.promise = Restangular.all("lims/environmentalsamplecollection").getList($scope.query).then(function(data) {
					$scope.data = data;
					var samples = [];
					data.forEach(function(x){
						x.env_sample.forEach(function (y){
							samples.push(y);
						});
					});
					$scope.map = $mapHandler.calculateMap(samples);
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
