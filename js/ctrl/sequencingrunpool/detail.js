export default function(base) {
	base.controller('SequencingRunPoolDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
	    function($scope, $location, $routeParams, Restangular) {
	        Restangular.one('lims/sequencingrunpools', $routeParams.sequencingrunpoolID).get().then(function(data) {
	            $scope.sequencingrunpool = data;
	        });

	}]);
}