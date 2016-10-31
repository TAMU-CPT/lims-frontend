export default function(base) {
	base.controller('BioprojectListCtrl', ['$scope','$location','$routeParams', 'Restangular', '$mdDialog',
		function($scope, $location, $routeParams, Restangular, $mdDialog) {

			$scope.choice_popup = function(ev) {
				$mdDialog.show({
					contentElement: '#create',
					parent: angular.element(document.body),
					clickOutsideToClose: true
				});
			};

			$scope.create = function() {
				$scope.promise = Restangular.all('bioproject/bioprojects').post({
					name: $scope.createData.name,
					description: $scope.createData.description,
					editingrolegroup_set: [],
					editingroleuser_set: [],
					sample: [],
				}).then(function(data) {
					$scope.createData = {};
					$location.path('/bioprojects/' + data.id);
				});
				$mdDialog.cancel();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.go = function(id) {
				$location.path('/bioprojects/' + id);;
			};

			$scope.updateData = function(page) {
				if(!isNaN(parseInt(page))){
					$scope.query.page = page;
				}
				$scope.promise = Restangular.all('bioproject/bioprojects').getList($scope.query).then(function(data) {
					$scope.data = data;
				});
			};

			$scope.options = {
				limitSelect: true,
				pageSelect: true
			};

			$scope.query = {
				limit: 5,
				page: 1,
			};

			$scope.updateData(1);
	}]);
}
