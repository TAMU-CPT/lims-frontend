export default function(base) {
    base.controller("StorageAddCtrl", ["$scope", "$location", "$routeParams", "Restangular",
        function($scope, $location, $routeParams, Restangular) {
            $scope.shelf;
            $scope.tube_label;

            $scope.room = {
                selectedItem: null,
                searchText: null,
                querySearch: function(queryString) {
                    return Restangular.all("lims").customGET("storage", {room: queryString}).then(function(data) {
                        console.log(data);
                        var flags = [], output = [];
                        for( var i=0; i<data.results.length; i++) {
                            if( flags[data.results[i].room]) continue;
                            flags[data.results[i].room] = true;
                            output.push(data.results[i]);
                        }
                        return output;
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
                    return Restangular.all("lims").customGET("storage", {room: $scope.room.searchText, type: $scope.storage_type.type, container_label: $scope.storage_type.searchText}).then(function(data) {

                        console.log(data);
                        var flags = [], output = [];
                        for( var i=0; i<data.results.length; i++) {
                            if( flags[data.results[i].container_label]) continue;
                            flags[data.results[i].container_label] = true;
                            output.push(data.results[i]);
                        }
                        return output;
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
                    return Restangular.all("lims").customGET("storage", {room: $scope.room.searchText, type: $scope.storage_type.type, container_label: $scope.storage_type.searchText, shelf: $scope.shelf, box: $scope.box.searchText}).then(function(data) {
                        var flags = [], output = [];
                        for( var i=0; i<data.results.length; i++) {
                            if( flags[data.results[i].box]) continue;
                            flags[data.results[i].box] = true;
                            output.push(data.results[i]);
                        }
                        return output;
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

        }]);
}
