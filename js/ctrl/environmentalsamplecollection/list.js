/**
 * Environmental Sample Collection List
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleCollectionListCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mapHandler", '$mdDialog',
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mapHandler, $mdDialog) {
			$scope.go = function(id) {
				$location.path("/environmentalsamplecollection/" + id);
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
					$scope.promise = Restangular.all("lims/environmentalsamplecollection").post($scope.popup_envSampleCreate.data).then(function(data) {
						$scope.popup_envSampleCreate.data = {};
						// Maybe do a redirect to your new model
						// $location.path("/environmentalsamplecollection/" + data.id);
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
