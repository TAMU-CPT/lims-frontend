/**
 * Lysate Create
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("LysateCreateCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$mdDialog",
		function($scope, $location, $routeParams, Restangular, $mdDialog) {
			$scope.go = function(id) {
				$location.path("/environmentalsamples/" + id);
			};

			$scope.promise_esc = Restangular.one("lims/environmentalsamplecollection", $routeParams.envSampleCollectionID).get().then(function(data) {
				$scope.esc = data;
				// For chips
				$scope.esc.env_sample = data.env_sample.map(function(env_sample){
					env_sample.collected_by_set = [env_sample.collected_by];
					return env_sample;
				});
			});


			$scope.storage = {
				init: function(){
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
				},

				room: {
					selectedItem: null,
					searchText: null,
					querySearch: function(queryString) {
						return Restangular.all("lims").customGET("storage/rooms", {room: queryString}).then(function(data) {
							return data.results;
						});
					},
					selectedItemChange: function(item) {
					},
				},

				storage_type: {
					types: [0,1],
					type: 0,
					selectedItem: null,
					searchText: null,
					querySearch: function(queryString) {
						return Restangular.all("lims").customGET("storage/container_labels", {room: $scope.storage.room.searchText, type: $scope.storage.storage_type.type, container_label: $scope.storage.storage_type.searchText}).then(function(data) {
							return data.results;
						});
					},
					selectedItemChange: function(item) {
					},
					reset: function() {
						$scope.storage.storage_type.searchText = null;
						$scope.storage.storage_type.selectedItem = null;
					},
				},

				box: {
					selectedItem: null,
					searchText: null,
					querySearch: function(queryString) {
						return Restangular.all("lims").customGET("storage/boxes", {room: $scope.storage.room.searchText, type: $scope.storage.storage_type.type, container_label: $scope.storage.storage_type.searchText, shelf: $scope.storage.shelf, box: $scope.storage.box.searchText}).then(function(data) {
							return data.results;
						});
					},
					selectedItemChange: function(item) {
					},
					reset: function() {
						$scope.storage.box.searchText = null;
						$scope.storage.box.selectedItem = null;
					},
				},

				get_form: function(){
					return {
						// Room              | room
						room: $scope.storage.room.selectedItem ? $scope.storage.room.selectedItem.room : $scope.storage.room.searchText,
						// Fridge / Freezer  | type
						type: $scope.storage.storage_type.type,
						// Fridge Name       | container_label
						container_label: $scope.storage.storage_type.selectedItem ? $scope.storage.storage_type.selectedItem.type : $scope.storage.storage_type.searchText,
						// Shelf/Rack        | shelf
						shelf: $scope.storage.shelf,
						// Box Label         | box
						box: $scope.storage.box.selectedItem ? $scope.storage.box.selectedItem.box: $scope.storage.box.searchText,
						// Sample Label      | sample_label
						sample_label: $scope.storage.tube_label,
					}
				}
			};
			$scope.storage.init();

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
			};

			$scope.save = function() {
				var post_data = {
					env_sample_collection: $scope.esc.id,
					host: $scope.host.selectedItem || $scope.host.searchText,
					storage: $scope.storage.get_form(),
				};
				$scope.promise = Restangular.all("lims/lysates").post(post_data).then(function(data) {
					$location.path("/lysats/" + data.id);
				});
			};
		}]);
}
