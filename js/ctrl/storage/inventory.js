export default function(base) {
	base.controller("InventoryCtrl", ["$scope", "$location", "$routeParams", "Restangular",
	    function($scope, $location, $routeParams, Restangular) {

            $scope.sample_label;
            $scope.choice = {
                sample_category: '',
                phage: '',
                rooms: [],
                container_labels: [],
                box_label: '',
                type: '' // fridge/freezer
            }

            $scope.deduped_data = {
                rooms: [],
                container_labels: [],
                box_label: []
            }

            $scope.go = function(id) {
                $location.path("/storage/" + id); ;
            };

            $scope.show_boxes = false;
            $scope.ordering="sample_label";
            $scope.sample_categories = ['lysate', 'phagednaprep', 'envsample'];
            $scope.storage_types = [0,1];
            Restangular.all("lims/phages").getList().then(function(data) {
                $scope.all_phages = data;
            })
            Restangular.all("lims/storage").getList().then(function(data) {
                $scope.deduped_data.rooms = $scope.deduplicate_data(data, 'room');
                $scope.deduped_data.container_labels = $scope.deduplicate_data(data, 'container_label');
            })

            $scope.updateData = function(page) {
                if(!isNaN(parseInt(page))) {
                    $scope.query.page = page;
                } else { $scope.query.page = 1;  }

                if ($scope.choice.container_labels.length) {
                    $scope.show_boxes = true;
                    $scope.deduped_data.box_label = $scope.deduplicate_data($scope.data, 'box');
                    console.log($scope.deduped_data.box_label);
                } else { $scope.show_boxes = false; }

                $scope.query.sample_label = $scope.sample_label;
                $scope.query.sample_category = $scope.choice.sample_category;
                $scope.query.phage = $scope.choice.phage;
                $scope.query.type = $scope.choice.type;
                $scope.query.rooms = $scope.choice.rooms.join()
                $scope.query.container_labels = $scope.choice.container_labels.join()
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
                type: $scope.choice.type,
                rooms: $scope.choice.rooms,
                phage: $scope.choice.phage,
                container_labels: $scope.choice.container_label,
                sample_label: null,
                ordering: $scope.ordering,
                sample_category: $scope.choice.sample_category,
            };

            $scope.deduplicate_data = function(data, field) {
                var flags = [], output = [];
                for( var i=0; i<data.length; i++) {
                    if( flags[data[i][field]]) continue;
                    flags[data[i][field]] = true;
                    output.push(data[i]);
                }
                return output;
            };

            $scope.updateData(1);

        }]);
}
