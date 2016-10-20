export default function(base) {
    base.controller('SampleTypeDetailCtrl', ['$scope','$location','$routeParams', 'Restangular',
        function($scope, $location, $routeParams, Restangular) {
            Restangular.one('lims/sampletypes', $routeParams.sampletypeID).get().then(function(data) {
                $scope.sampletype = data;
            });

    }]);
}