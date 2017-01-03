/**
 * Environmental Sample Create
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleCreateCtrl", ["$scope", "$location", "$routeParams", "Restangular", "leafletBoundsHelpers", "$mdDialog",
		function($scope, $location, $routeParams, Restangular, leafletBoundsHelpers, $mdDialog) {
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
					});
			};
		}]);
}
