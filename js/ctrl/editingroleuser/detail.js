export default function(base) {
    base.controller('EditingRoleUserDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('bioproject/editingroleusers', $routeParams.editingroleuserID).get().then(function(data) {
                $scope.editingroleuser = data;
            });

    }]);
}