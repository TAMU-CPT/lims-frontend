export default function(base) {
    base.controller("StorageAddCtrl", ["$scope", "$location", "$routeParams", "Restangular",
        function($scope, $location, $routeParams, Restangular) {
            $scope.room = {
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("storage", {room: queryString}).then(function(data) {
                        $scope.StorageForm.containerField.$setPristine();
                        $scope.StorageForm.containerField.$setUntouched();
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                },
            };

            $scope.update = function() {
                $scope.StorageForm.containerField.$setPristine();
                $scope.StorageForm.containerField.$setUntouched();

            };

            $scope.container = {
                types: [0,1],
                type: 0,
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString, room, type) {
                    console.log(queryString, room, type);
                    return Restangular.all("lims").customGET("storage", {room: room, type: type}).then(function(data) {
                        $scope.StorageForm.containerField.$setPristine();
                        $scope.StorageForm.containerField.$setUntouched();
                        console.log($scope.StorageForm.containerField);
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                    console.log(item);
                },
            };

        }]);
}
