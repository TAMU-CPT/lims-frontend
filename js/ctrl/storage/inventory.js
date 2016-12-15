export default function(base) {
	base.controller("InventoryCtrl", ["$scope", "$location", "$routeParams", "Restangular",
	    function($scope, $location, $routeParams, Restangular) {

            $scope.sample_label;
            $scope.choice = {
                sample_category: ''
            }

            $scope.go = function(id) {
                $location.path("/storage/" + id); ;
            };

            $scope.ordering="sample_label";
            $scope.sample_categories = ['lysate', 'phagednaprep', 'envsample']
            Restangular.all("lims/phages").getList().then(function(data) {
                $scope.all_phages = data;
            })

            $scope.updateData = function(page) {
                if(!isNaN(parseInt(page))) {
                    $scope.query.page = page;
                }
                $scope.query.sample_label = $scope.sample_label;
                $scope.query.sample_category = $scope.choice.sample_category;
                $scope.query.ordering = $scope.ordering;
                $scope.promise = Restangular.all("lims/storage").getList($scope.query).then(function(data) {
                    $scope.data = data;
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
                sample_category: $scope.choice.sample_category,
            };

            $scope.updateData(1);

        }]);
}
