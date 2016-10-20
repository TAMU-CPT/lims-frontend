export default function(base) {
    base.controller('AnonymousAccountDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('account/anonymousaccounts', $routeParams.anonymousaccountID).get().then(function(data) {
                $scope.anonymousaccount = data;
            });

    }]);
}