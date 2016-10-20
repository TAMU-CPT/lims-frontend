export default function(base) {
    base.controller('OrganisationDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('directory/organisations', $routeParams.organisationID).get().then(function(data) {
                $scope.organisation = data;
            });

    }]);
}