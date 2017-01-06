/**
 * Lysate Create
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("LysateCreateCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$mdDialog", "$mdToast", "$go", "$cptStorage",
		function($scope, $location, $routeParams, Restangular, $mdDialog, $mdToast, $go, $cptStorage) {
			$scope.go = $go;

			$scope.promise_esc = Restangular.one("lims/environmentalsamplecollection", $routeParams.envSampleCollectionID).get().then(function(data) {
				$scope.esc = data;
				// For chips
				$scope.esc.env_sample = data.env_sample.map(function(env_sample){
					env_sample.collected_by_set = [env_sample.collected_by];
					return env_sample;
				});
			});


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






			$scope.host = {
				selectedItem: null,
				searchText: null,
				querySearch: function(queryString) {
					return Restangular.all("lims").customGET("bacterias", {full: queryString}).then(function(data) {
						return data.results;
					});
				},
				selectedItemChange: function(item) {
				},
                reset: function() {
                    $scope.host.searchText = null;
                    $scope.host.selectedItem = null;
                },
			};

			$scope.save = function() {
				var post_data = {
					env_sample_collection: $scope.esc.id,
					host: $scope.host.selectedItem || $scope.host.searchText,
					storage: $scope.storage.get_form(),
				};
				$scope.promise = Restangular.all("lims/lysates").post(post_data).then(function(data) {
					$go.lysate(data.id);
				}, function(error){
					if(error.data[0] === 'Duplicate storage'){
						$mdToast.showSimple(error.data[0])
					}
				});
			};

            $scope.clear_form = function() {
                $scope.storage.reset_all();
            };
		}]);
}
