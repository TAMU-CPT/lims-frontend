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

            $scope.inventory = {
                rooms: [],
                container_labels: [],
                box_label: []
            }

            $scope.go = function(id) {
                $location.path("/storage/" + id); ;
            };

            $scope.show_boxes = false;
            $scope.sample_categories = ['lysate', 'phagednaprep', 'envsample'];
            $scope.storage_types = [0,1];
            Restangular.all("lims/phages").getList().then(function(data) {
                $scope.all_phages = data;
            })
            Restangular.all("lims/storage/rooms").getList().then(function(data) {
                $scope.inventory.rooms = data;
            })
            Restangular.all("lims/storage/container_labels").getList().then(function(data) {
                $scope.inventory.container_labels = data;
            })

            $scope.ordering="sample_label";

            $scope.updateData = function(page) {
                if(!isNaN(parseInt(page))) {
                    $scope.query.page = page;
                } else { $scope.query.page = 1;  }

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

            $scope.updateContainerandBox = function() {
                $scope.choice.container_labels = [];
                $scope.choice.box = [];
                $scope.show_boxes= false;
                Restangular.all("lims").customGET("storage/container_labels", {rooms: $scope.choice.rooms.join(), type: $scope.choice.type}).then(function(data) {
                    $scope.inventory.container_labels = data.results;
                });
                $scope.updateData();
            };

            $scope.updateBox = function() {
                $scope.choice.box = [];
                if ($scope.choice.container_labels.length != 0) {
                    Restangular.all("lims").customGET("storage/boxes", {container_labels: $scope.choice.container_labels.join()}).then(function(data) {
                        $scope.inventory.box_label = data.results;
                    });
                    $scope.show_boxes = true;
                } else { $scope.show_boxes = false; }
                $scope.updateData();
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

            $scope.updateData(1);

        }]);
}
