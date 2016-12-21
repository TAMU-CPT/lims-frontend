/**
 * Environmental Sample Detail controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("EnvironmentalSampleCollectionDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$mapHandler",
		function($scope, $location, $routeParams, Restangular, $mapHandler) {
			$scope.go = function(id){
				$location.path("/environmentalsamples/" + id);
			};


			Restangular.one("lims/environmentalsamplecollection", $routeParams.environmentalsampleID).get().then(function(data) {
				$scope.data = data;
				$scope.data.env_sample = $scope.data.env_sample.map(function(env_sample){
					env_sample.collected_by_set = [env_sample.collected_by];
					return env_sample;
				});

				$scope.map = $mapHandler.calculateMap(data.env_sample);

				$scope.create_lysate = function(){
					$location.path("/lysates/create/" + data.id + "/");
				}
			});
		}]);
}
