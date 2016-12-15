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
				point: $scope.marker,
			};

			$scope.create = function() {
				console.log('hi');
			}
			//$scope.create = function() {
					//$scope.promise = Restangular.all("lims/environmentalsamples").post($scope.popup_envSampleCreate.data).then(function(data) {
						//$scope.popup_envSampleCreate.data = {};
						//// Maybe do a redirect to your new model
						//// $location.path("/environmentalsamples/" + data.id);
					//});
					//$mdDialog.cancel();
			//};
		}]);
}
