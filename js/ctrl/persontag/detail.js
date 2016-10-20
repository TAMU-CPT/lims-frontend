export default function(base) {
	base.controller('PersonTagDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
	    function($scope, $location, $routeParams, Restangular) {
	        Restangular.one('directory/persontags', $routeParams.persontagID).get().then(function(data) {
	            $scope.persontag = data;
	        });

	}]);
}