/**
 * Sequencing Run List
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("SequencingRunListCtrl", ["$scope", "$location", "$routeParams", "Restangular", "GLOBAL_PAGINATION_LIMIT","$mdDialog", "$go",
		function($scope, $location, $routeParams, Restangular, GLOBAL_PAGINATION_LIMIT, $mdDialog, $go) {
			$scope.go = $go;

			$scope.choice_popup = function(ev) {
				$mdDialog.show({
					contentElement: "#create",
					parent: angular.element(document.body),
					clickOutsideToClose: true,
				});
			};

			$scope.create = function() {
				$scope.promise = Restangular.all("lims/sequencingruns").post({
					name: $scope.createData.name,
					description: $scope.createData.description,
					editingrolegroup_set: [],
					editingroleuser_set: [],
					owner: {
						// This is provided but completely unused by the
						// backend. Just makes the serializer behave. TODO see
						// if we can remove.
						id: -1,
						username: "a",
					},
					sample: [],
				}).then(function(data) {
					$scope.createData = {};
					$scope.go.sequencing(data.id);
				});
				$mdDialog.cancel();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			};


			// uncomment if ordering filter is implemented in backend
			// $scope.ordering="name";

			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))) {
					$scope.query.page = page;
				}
				// uncomment if ordering filter is implemented in backend
				// $scope.query.ordering = $scope.ordering;
				$scope.promise = Restangular.all("lims/sequencingruns").getList($scope.query).then(function(data) {
					$scope.data = data;
				});
			};

			$scope.options = {
				limitSelect: true,
				pageSelect: true,
			};

			$scope.query = {
				limit: GLOBAL_PAGINATION_LIMIT,
				page: 1,
				//uncomment if ordering filter is implemented in backend
				//ordering: $scope.ordering,
			};

			$scope.updateData(1);
		}]);
}
