export default function(base) {
    base.controller("StorageAddCtrl", ["$scope", "$location", "$routeParams", "Restangular",
        function($scope, $location, $routeParams, Restangular) {

            $scope.room = {
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("storage", {room: queryString}).then(function(data) {
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                },
            };

            $scope.container = {
                types: [0,1],
                type: 0,
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("storage", {room: $scope.room.searchText, type: $scope.container.type}).then(function(data) {
                        console.log(queryString, $scope.room.searchText, $scope.container.type);
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                    //console.log(item);
                },
            };

            $scope.$watch('room.searchText', function(newValue, oldValue) {
                $scope.container.querySearch($scope.container.searchText);
            });
            $scope.$watch('container.type', function(newValue, oldValue) {
                $scope.container.querySearch($scope.container.searchText);
            });
        }]);
}
