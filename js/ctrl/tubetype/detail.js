export default function(base) {
    base.controller('TubeTypeDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('lims/tubetypes', $routeParams.tubetypeID).get().then(function(data) {
                $scope.tubetype = data;
            });

    }]);
}