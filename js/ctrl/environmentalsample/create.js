/**
 * Environmental Sample Create
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleCreateCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mdDialog", "$cptStorage",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mdDialog, $cptStorage) {
			$scope.go = function(id) {
				$location.path("/environmentalsamples/" + id);
			};

			$scope.marker = {
				lat: 0,
				lng: 0,
				draggable: true,
			}

			$scope.map = {
				markers: [$scope.marker],
				center: {
					lng: 0,
					lat: 0,
					zoom: 4,
				}
			}

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


            $scope.sample_type = {
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("environmentalsamples/types", {sample_type: queryString}).then(function(data) {
                        $scope.data.sample_type = $scope.sample_type.searchText;
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                },
            };

			// The position isn't being updated.
			// http://tombatossals.github.io/angular-leaflet-directive/#!/examples/dragging-markers
			// So this is a working solution at least.
			$scope.$on("leafletDirectiveMarker.dragend", function(event, args){
				$scope.marker.lat = args.model.lat;
				$scope.marker.lng = args.model.lng;

				$scope.map.center.lat = $scope.marker.lat;
				$scope.map.center.lng = $scope.marker.lng;
			});

			$scope.detect_location = function(){
				navigator.geolocation.getCurrentPosition(function(location) {
					$scope.marker.lat = location.coords.latitude;
					$scope.marker.lng = location.coords.longitude;

					$scope.map.center.lat = $scope.marker.lat;
					$scope.map.center.lng = $scope.marker.lng;
					$scope.map.center.zoom = 14;
				});
			}

			$scope.data = {
				location: $scope.marker,
				collection: new Date()
			};

			$scope.save = function() {
					$scope.promise = Restangular.all("lims/environmentalsamples").post($scope.data).then(function(data) {
                        $location.path("/environmentalsamples/" + data.id);
                        Restangular.one("lims/environmentalsamplecollection/simple", data.default_collection_id).get().then(function(envsamplecoll) {
                            envsamplecoll.storage = $scope.storage.get_form();
                            envsamplecoll.put().then(function() {
                            });
                            // TODO: put failure state (e.g. if storage is duplicated)
                        });

					});
			};
		}]);
}
