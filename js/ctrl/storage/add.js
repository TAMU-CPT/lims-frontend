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
                    console.log(item);
                },
            };

        }]);
}
