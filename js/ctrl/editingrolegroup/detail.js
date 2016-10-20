export default function(base) {
    base.controller('EditingRoleGroupDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('bioproject/editingrolegroups', $routeParams.editingrolegroupID).get().then(function(data) {
                $scope.editingrolegroup = data;
            });

    }]);
}