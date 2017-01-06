/**
 * Bioproject list controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("BioprojectListCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$mdDialog",
		function($scope, $location, $routeParams, Restangular, $mdDialog) {
			$scope.choice_popup = function(ev) {
				$mdDialog.show({
					contentElement: "#create",
					parent: angular.element(document.body),
					clickOutsideToClose: true,
				});
			};

			$scope.create = function() {
				$scope.promise = Restangular.all("bioproject/bioprojects").post({
					name: $scope.createData.name,
					description: $scope.createData.description,
                    sample_env: [],
                    sample_phage: [],
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
					$location.path("/bioprojects/" + data.id);
				});
				$mdDialog.cancel();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.go = function(id) {
				if(id.startsWith('#')){
					$location.path(id);
				} else {
					$location.path("/bioprojects/" + id); ;
				}
			};

			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))) {
					$scope.query.page = page;
				}
				$scope.promise = Restangular.all("bioproject/bioprojects").getList($scope.query).then(function(data) {
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
			};

			$scope.updateData(1);
		}]);
}
