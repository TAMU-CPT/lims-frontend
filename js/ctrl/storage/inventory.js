export default function(base) {
	base.controller("InventoryCtrl", ["$scope", "$location", "$routeParams", "Restangular",
	    function($scope, $location, $routeParams, Restangular) {

            $scope.sample_label;

            $scope.go = function(id) {
                $location.path("/storage/" + id); ;
            };

             $scope.ordering="sample_label";

            $scope.updateData = function(page) {
                if(!isNaN(parseInt(page))) {
                    $scope.query.page = page;
                }
                $scope.query.sample_label = $scope.sample_label;
                 $scope.query.ordering = $scope.ordering;
                $scope.promise = Restangular.all("lims/storage").getList($scope.query).then(function(data) {
                    $scope.data = data;
                    console.log($scope.data[0]);
                });
            };

            $scope.options = {
                limitSelect: true,
                pageSelect: true,
            };

            $scope.query = {
                limit: 5,
                page: 1,
                sample_label: null,
                ordering: $scope.ordering,
            };

            $scope.updateData(1);

        }]);
}
