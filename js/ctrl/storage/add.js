export default function(base) {
    base.controller("StorageAddCtrl", ["$scope", "$location", "$routeParams", "Restangular", "$mdLoginToast",
        function($scope, $location, $routeParams, Restangular, $mdLoginToast) {
            $scope.shelf;
            $scope.tube_label;

            $scope.room = {
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("storage/rooms", {room: queryString}).then(function(data) {
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                },
            };

            $scope.storage_type = {
                types: [0,1],
                type: 0,
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("storage/container_labels", {room: $scope.room.searchText, type: $scope.storage_type.type, container_label: $scope.storage_type.searchText}).then(function(data) {
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                },
                reset: function() {
                    $scope.storage_type.searchText = null;
                    $scope.storage_type.selectedItem = null;
                },
            };

            $scope.box = {
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("storage/boxes", {room: $scope.room.searchText, type: $scope.storage_type.type, container_label: $scope.storage_type.searchText, shelf: $scope.shelf, box: $scope.box.searchText}).then(function(data) {
                        return data.results;
                    });
                },
                selectedItemChange: function(item) {
                },
                reset: function() {
                    $scope.box.searchText = null;
                    $scope.box.selectedItem = null;
                },
            };


            $scope.$watch('room.searchText', function(newValue, oldValue) {
                $scope.storage_type.reset();
                $scope.box.reset();
            });
            $scope.$watch('storage_type.type', function(newValue, oldValue) {
                $scope.storage_type.reset();
                $scope.box.reset();
            });
            $scope.$watch('storage_type.searchText', function(newValue, oldValue) {
                $scope.box.reset();
            });
            $scope.$watch('shelf', function(newValue, oldValue) {
                $scope.box.reset();
            });

            $scope.saveData = function() {
                Restangular.all('lims/storage').post({
                    room: $scope.room.searchText,
                    type: $scope.storage_type.type,
                    container_label: $scope.storage_type.searchText,
                    shelf: $scope.shelf,
                    box: $scope.box.searchText,
                    sample_label: $scope.tube_label,
                })
                .then(function(gaf) {
                    $mdLoginToast.show("Success");
                }, function() {
                    console.log("there was an error");
                    $mdLoginToast.show("Error");
                });
            };

        }]);
}
