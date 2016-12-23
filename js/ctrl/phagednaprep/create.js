/**
 * Phage DNA Prep Create controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("PhageDNAPrepCreateCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$cptStorage", "$go", "$mdToast",
		function($scope, $location, $routeParams, Restangular, $cptStorage, $go, $mdToast) {
			$scope.go = $go;
			//$scope.morphology = 0;

			$scope.save = function() {
				var post_data = {
					phage: $routeParams.phageID,
					//morphology: $scope.morphology,
					storage: $scope.storage.get_form(),
				};
				$scope.promise = Restangular.all("lims/phagednapreps").post(post_data).then(function(data) {
					$go.phage(data.phage);
				}, function(error){
					if(error.data[0] === 'Duplicate storage'){
						$mdToast.showSimple(error.data[0])
					}
				});
			};


			$scope.storage = $cptStorage;
			$scope.$watch('storage.room.searchText', function(newValue, oldValue) {
				$scope.storage.storage_type.reset();
				$scope.storage.box.reset();
			});
			$scope.$watch('storage.storage_type.type', function(newValue, oldValue) {
				$scope.storage.storage_type.reset();
				$scope.storage.box.reset();
			});
			$scope.$watch('storage.storage_type.searchText', function(newValue, oldValue) {
				$scope.storage.box.reset();
			});
			$scope.$watch('storage.shelf', function(newValue, oldValue) {
				$scope.storage.box.reset();
			});

		}]);
}
