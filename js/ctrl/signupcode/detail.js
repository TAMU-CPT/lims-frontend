export default function(base) {
    base.controller('SignupCodeDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('account/signupcodes', $routeParams.signupcodeID).get().then(function(data) {
                $scope.signupcode = data;
            });

    }]);
}