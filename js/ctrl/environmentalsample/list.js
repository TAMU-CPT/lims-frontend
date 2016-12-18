/**
 * Environmental Sample List
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleListCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mapHandler", "$mdDialog",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mapHandler, $mdDialog) {
			$scope.go = function(id, route) {
				console.log('id', id, 'route', route);
				if(route){
					console.log('id', id, 'route', route);
					$location.path(route.substring(1) + id);
				} else {
					$location.path("/environmentalsamples/" + id);
				}
			};

// CICADA: NEW_INPUTS_HERE_DO_NOT_REMOVE

			$scope.popup_envSampleCreate = {
				data: {
				},

				show: function(ev) {
					$mdDialog.show({
						contentElement: "#popup_envSampleCreate",
						parent: angular.element(document.body),
						clickOutsideToClose: true,
					});
				},

				create: function() {
					$scope.promise = Restangular.all("lims/environmentalsamples").post($scope.popup_envSampleCreate.data).then(function(data) {
						$scope.popup_envSampleCreate.data = {};
						// Maybe do a redirect to your new model
						// $location.path("/environmentalsamples/" + data.id);
					});
					$mdDialog.cancel();
				},

				cancel: function() {
					$mdDialog.cancel();
				}
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
