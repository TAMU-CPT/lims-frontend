export default function(base) {
	base.controller('BioprojectListCtrl', ['$scope','$location','$routeParams', 'Restangular',
		function($scope, $location, $routeParams, Restangular) {
			$scope.go = function(id) {
			    $location.path('/bioprojects/' + id);;
			};

			$scope.updateData = function(page) {
			    if(!isNaN(parseInt(page))){
			        $scope.query.page = page;
			    }
			    $scope.promise = Restangular.all('bioproject/bioprojects').getList($scope.query).then(function(data) {
			        $scope.data = data;
			    });
			};

			$scope.options = {
			    limitSelect: true,
			    pageSelect: true
			};

			$scope.query = {
			    limit: 5,
			    page: 1,
			};

			$scope.updateData(1);
	}]);
}
