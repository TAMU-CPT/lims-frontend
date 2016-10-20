export default function(base) {
	base.controller('BioprojectDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
	    function($scope, $location, $routeParams, Restangular) {
	        Restangular.one('bioproject/bioprojects', $routeParams.bioprojectID).get().then(function(data) {
	            $scope.bioproject = data;
	        });
	}]);
}
