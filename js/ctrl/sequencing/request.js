/**
 * Sequencing Run Request
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("SequencingRunRequestCtrl", [
		"$scope", "$location", "$routeParams", "Restangular", "GLOBAL_PAGINATION_LIMIT","$mdDialog", "$mdToast", "$go",
		function($scope, $location, $routeParams, Restangular, GLOBAL_PAGINATION_LIMIT, $mdDialog, $mdToast, $go) {
			$scope.go = $go;

			Restangular.one("lims/phagednapreps", $routeParams.dnaPrepID).get().then(function(data) {
				$scope.dnaprep = data;
			});

			$scope.submit_disabled = false;

			$scope.request = function(){
				$scope.submit_disabled = true;
				Restangular.all("lims/sequencingrunpoolitems").post({
					dna_prep: $scope.dnaprep.id,
					pool: null,
				}).then(function(data) {
					$mdToast.showSimple("Success");
					$scope.submit_disabled = false;
				}, function() {
					$mdToast.showSimple("Error");
				});
				//
			}
		}
	]);
}
