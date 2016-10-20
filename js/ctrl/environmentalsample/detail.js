export default function(base) {
	base.controller('EnvironmentalSampleDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
	    function($scope, $location, $routeParams, Restangular) {
	        Restangular.one('lims/environmentalsamples', $routeParams.environmentalsampleID).get().then(function(data) {
	            $scope.environmentalsample = data;
	        });

	}]);
}