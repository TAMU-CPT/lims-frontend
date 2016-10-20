export default function(base) {
    base.controller('EmailAddressDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('account/emailaddresses', $routeParams.emailaddressID).get().then(function(data) {
                $scope.emailaddress = data;
            });

    }]);
}