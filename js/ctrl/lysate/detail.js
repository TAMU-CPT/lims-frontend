export default function(base) {
	base.controller('LysateDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
	    function($scope, $location, $routeParams, Restangular) {
	        Restangular.one('lims/lysates', $routeParams.lysateID).get().then(function(data) {
	            $scope.lysate = data;
	        });

	}]);
}