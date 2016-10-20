export default function(base) {
	base.controller('AppDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
	    function($scope, $location, $routeParams, Restangular) {
	        Restangular.one('lims_app/apps', $routeParams.appID).get().then(function(data) {
	            $scope.app = data;
	        });

	}]);
}